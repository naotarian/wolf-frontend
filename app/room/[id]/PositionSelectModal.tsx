'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { Button, Typography } from '@mui/material'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { position } from '@/const/position'

const style = {
  position: 'absolute' as const,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function PositionSelectModal(props: {
  positionSelectModalOpen: boolean
  setPositionSelectModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
  roomId: string
}) {
  const {
    positionSelectModalOpen,
    setPositionSelectModalOpen,
    userId,
    roomId,
  } = props
  const handleClose = () => setPositionSelectModalOpen(false)
  const [secs, setSeconds] = useState(15)
  const [decisionPosition, setDecisionPosition] = useState<number>(0)
  const [buyMessage, setBuyMessage] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [castId, setCastId] = useState<number>(0)
  useEffect(() => {
    const sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1)
      }
    }, 1000)
    return () => {
      clearInterval(sampleInterval)
    }
  })
  useEffect(() => {
    if (status === 0) {
      const audio = new Audio('/audio/gameReady.mp3')
      audio.play()
    }
    if (status === 1) {
      const audio = new Audio(`/audio/position/${decisionPosition}.mp3`)
      audio.play()
    }
  }, [status])
  // 0秒になった時
  useEffect(() => {
    ;(async () => {
      if (secs !== 0) return
      const url = '/room/ramdom_position'
      const baseUrl = process.browser
        ? process.env.NEXT_PUBLIC_API_ROOT
        : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
      const res = await fetch(baseUrl + url, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          roomId,
        }),
      })
      const result = await res.json()
      setDecisionPosition(result.position_id)
      setCastId(result.id)
      setStatus(1)
    })()
  }, [secs])
  // 役職が選択されたとき
  const selectPosition = async (positionId: number) => {
    if (decisionPosition !== 0) return
    const url = '/room/select_position'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    const res = await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        roomId,
        positionId,
      }),
    })
    const result = await res.json()
    if (result.couldBuy) {
      setDecisionPosition(positionId)
    }
    if (!result.couldBuy) {
      setBuyMessage('購入できませんでした。')
    }
    window.setTimeout(() => {
      setBuyMessage('')
    }, 2000)
  }
  const confirmed = async () => {
    const url = '/room/confirmed'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        roomId,
        castId,
      }),
    })
  }
  return (
    <div>
      <Modal
        open={positionSelectModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {status === 0 && (
            <div>
              <div>
                {secs && (
                  <Typography variant="h2" className="text-[#333]">
                    {secs}
                  </Typography>
                )}
              </div>{' '}
              <Typography variant="h2">役職を先取り</Typography>
              {buyMessage && (
                <Typography
                  variant="body1"
                  className="text-[#a1080f] font-bold">
                  {buyMessage}
                </Typography>
              )}
              <div className="flex gap-4">
                {position.map((data, index) => (
                  <div>
                    <Typography variant="body1">
                      {data.name} x{data.number}
                    </Typography>
                    <Button
                      onClick={() => selectPosition(data.id)}
                      className="p-0">
                      <Image
                        src={`/images/position/${data.id}.png`}
                        alt="Picture of the author"
                        width={100}
                        height={100}
                        priority={false}
                        className={`border-2 mx-auto ${
                          decisionPosition === data.id ? 'border-[#a1080f]' : ''
                        }`}
                      />
                    </Button>
                    {decisionPosition === data.id && (
                      <Typography
                        variant="body1"
                        className="text-[#a1080f] font-bold">
                        購入済み
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {status === 1 && (
            <div>
              <Typography variant="h1">役職を確認してください</Typography>
              <Typography variant="h2">あなたの役職は.....</Typography>
              <Typography variant="body1" className="text-center">
                {position[decisionPosition - 1].name}
              </Typography>
              <Image
                src={`/images/position/${
                  position[decisionPosition - 1].id
                }.png`}
                alt="Picture of the author"
                width={100}
                height={100}
                priority={false}
                className="border-2 mx-auto"
              />
              <Button
                className="rounded-none float-right"
                variant="contained"
                onClick={confirmed}>
                確認した
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}
