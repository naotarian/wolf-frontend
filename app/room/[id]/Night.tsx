'use client'

import { useState, useEffect } from 'react'

import ActionModal from '@/app/room/[id]/ActionModal'
export default function Night(props: {
  positionId: number
  aliveUser: Array<{
    name: string
    id: string
    character_id: number
    is_alive: boolean
    position: number
  }>
}) {
  const { positionId, aliveUser } = props

  const [status, setStatus] = useState(false)
  const [actionModalOpen, setActionModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (status) return
    const audio = new Audio(`/audio/night/${positionId}.mp3`)
    audio.play()
    setStatus(true)
    setActionModalOpen(true)
  }, [status])
  return (
    <div>
      <ActionModal
        actionModalOpen={actionModalOpen}
        setActionModalOpen={setActionModalOpen}
        positionId={positionId}
        aliveUser={aliveUser}
      />
    </div>
  )
}
