'use client'

import { useState, useEffect } from 'react'

import { Button } from '@mui/material'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { useCountDownInterval } from '@/hooks/useCountDownInterval'

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

export default function ActionModal(props: {
  actionModalOpen: boolean
  setActionModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  positionId: number
  aliveUser: Array<{
    name: string
    id: string
    character_id: number
    is_alive: boolean
    position: number
  }>
  // channelI: Pusher
  count: number
  remainingTime: number
}) {
  const {
    actionModalOpen,
    setActionModalOpen,
    positionId,
    aliveUser,
    // channelI,
    count,
    remainingTime,
  } = props

  const [countTime, setCountTime] = useState<number>(30)
  const [resultText, setResultText] = useState<string>('')
  useCountDownInterval(countTime, setCountTime)
  const handleClose = () => setActionModalOpen(false)
  const telling = (user: {
    name: string
    id: string
    character_id: number
    is_alive: boolean
    position: number
  }) => {
    console.log(user)
    let result = 'ではありませんでした。'
    if (user.character_id === 2) {
      result = 'です。'
    }
    setResultText(`占った対象は人狼${result}`)
  }
  const modalContents = (positionId: number) => {
    if (positionId === 1) {
      return (
        <div className="flex gap-4">
          <Typography>村人の方は、人狼に気をつけてください</Typography>
        </div>
      )
    }
    if (positionId === 2) {
      return (
        <div className="flex gap-4">
          <Typography variant="h2">どのプレイヤーを殺害しますか？</Typography>
          <div className="flex gap-4">
            {aliveUser.map((data, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  className="rounded-none"
                  onClick={() => telling(data)}>
                  {data.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )
    }
    if (positionId === 3) {
      return (
        <div>
          <Typography variant="h2">どのプレイヤーを占いますか？</Typography>
          <div className="flex gap-4">
            {aliveUser.map((data, index) => (
              <div key={index}>
                <Button
                  variant="contained"
                  className="rounded-none"
                  onClick={() => telling(data)}>
                  {data.name}
                </Button>
              </div>
            ))}
          </div>
          {resultText && <Typography variant="body1">{resultText}</Typography>}
        </div>
      )
    }
  }

  useEffect(() => {
    ;(async () => {
      if (remainingTime !== 0) return
      console.log('0になった')
    })()
  }, [remainingTime])
  return (
    <div>
      <Modal
        open={actionModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography>{remainingTime}</Typography>
          {modalContents(positionId)}
        </Box>
      </Modal>
    </div>
  )
}
