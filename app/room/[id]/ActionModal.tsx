'use client'

import { useState, useEffect } from 'react'

import { Button } from '@mui/material'
import { useCountDownInterval } from '@/hooks/useCountDownInterval'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

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
}) {
  const { actionModalOpen, setActionModalOpen, positionId, aliveUser } = props
  const [countTime, setCountTime] = useState<number>(30)
  useCountDownInterval(countTime, setCountTime)
  console.log(aliveUser)
  console.log(positionId)
  const handleClose = () => setActionModalOpen(false)
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
          <Typography>じんろう</Typography>
        </div>
      )
    }
    if (positionId === 3) {
      return (
        <div>
          <Typography variant="h2">どのプレイヤーを占いますか？</Typography>
          <div className="flex gap-4">
            {aliveUser.map((data, index) => (
              <div>
                <Button variant="contained" className="rounded-none">
                  {data.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
  useEffect(() => {
    ;(async () => {
      if (countTime !== 0) return
      console.log(countTime)
    })()
  }, [countTime])
  return (
    <div>
      <Modal
        open={actionModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography>{countTime}</Typography>
          {modalContents(positionId)}
        </Box>
      </Modal>
    </div>
  )
}
