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
  const [secs, setSeconds] = useState(30)
  useEffect(() => {
    const sampleInterval = setInterval(() => {
      // if (secs === 0) handleClose()
      if (secs > 0) {
        setSeconds(secs - 1)
      }
    }, 1000)
    return () => {
      clearInterval(sampleInterval)
    }
  })
  useEffect(() => {
    const audio = new Audio('/audio/gameReady.mp3')
    audio.play()
  }, [])
  // const forceLeaving = async (leavingUserId: string) => {
  //   const url = '/room/leaving'
  //   const baseUrl = process.browser
  //     ? process.env.NEXT_PUBLIC_API_ROOT
  //     : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
  //   await fetch(baseUrl + url, {
  //     method: 'POST',
  //     cache: 'no-store',
  //     credentials: 'include',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       userId: leavingUserId,
  //       roomId,
  //     }),
  //   })
  //   setSelectedPlayer({ name: '', id: '', character_id: 0 })
  //   setPositionSelectModalOpen(false)
  // }
  return (
    <div>
      <Modal
        open={positionSelectModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div>{secs && <span>{secs}</span>}</div>{' '}
          <Typography variant="h2">役職を先取り</Typography>
          <div className="flex gap-4">
            {position.map((data, index) => (
              <div>
                <Typography variant="body1">{data.name}</Typography>
                <Button>
                  <Image
                    src={`/images/position/${data.id}.png`}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    priority={false}
                    className="border-2 mx-auto"
                  />
                </Button>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
