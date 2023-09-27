'use client'

import * as React from 'react'

import { Button } from '@mui/material'

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

export default function PlayerInformationModal(props: {
  playerInformationModalOpen: boolean
  setPlayerInformationModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedPlayer: {
    name: string
    id: string
    character_id: number
  }
  setSelectedPlayer: React.Dispatch<
    React.SetStateAction<{
      name: string
      id: string
      character_id: number
    }>
  >
  roomMasterId: string
  userId: string
  roomId: string
}) {
  const {
    playerInformationModalOpen,
    setPlayerInformationModalOpen,
    selectedPlayer,
    setSelectedPlayer,
    roomMasterId,
    userId,
    roomId,
  } = props
  const handleClose = () => setPlayerInformationModalOpen(false)
  function PaperContent(title: string, value: number | string) {
    return (
      <Paper className="p-4 bg-red-100 rounded-none">
        <Typography
          variant="body1"
          className={`before:content-['■'] text-[#a1080f] font-bold`}>
          {title}
        </Typography>
        <Typography variant="body1" className="text-[#a1080f] font-bold">
          {value}
        </Typography>
      </Paper>
    )
  }
  const forceLeaving = async (leavingUserId: string) => {
    const url = '/room/leaving'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: leavingUserId,
        roomId,
      }),
    })
    setSelectedPlayer({ name: '', id: '', character_id: 0 })
    setPlayerInformationModalOpen(false)
  }
  return (
    <div>
      <Modal
        open={playerInformationModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex justify-between">
            <div className="flex gap-4 my-0 w-fit	items-center">
              <Avatar
                alt="Remy Sharp"
                className="border"
                sx={{ width: 48, height: 48 }}
                src={`/images/characters/No${selectedPlayer.character_id}.jpg`}
              />
              <Typography variant="h1">{selectedPlayer.name}</Typography>
            </div>
            {roomMasterId === userId && userId !== selectedPlayer.id && (
              <Button
                variant="outlined"
                className="rounded-none"
                onClick={() => forceLeaving(selectedPlayer.id)}>
                退室させる
              </Button>
            )}
          </div>
          <div className="flex gap-4">
            {PaperContent('通算ゲーム数', 100)}
            {PaperContent('通算勝利数', 70)}
            {PaperContent('勝率', '70%')}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
