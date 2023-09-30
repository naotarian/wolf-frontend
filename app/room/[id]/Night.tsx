'use client'

import { useState, useEffect } from 'react'

import type Pusher from 'pusher-js'

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
  channelI: Pusher
  roomId: string
}) {
  const { positionId, aliveUser, channelI, roomId } = props

  const [status, setStatus] = useState(false)
  const [actionModalOpen, setActionModalOpen] = useState<boolean>(false)
  const [count, setCount] = useState<number>(60)
  useEffect(() => {
    if (status) return
    const audio = new Audio(`/audio/night/${positionId}.mp3`)
    audio.play()
    setStatus(true)
    setActionModalOpen(true)
  }, [status])
  useEffect(() => {
    channelI.bind(
      `room-countdown-${roomId}-event`,
      (data: { roomId: string; count: number }) => {
        setCount(data.count)
      },
    )
  }, [channelI])
  return (
    <div>
      <ActionModal
        actionModalOpen={actionModalOpen}
        setActionModalOpen={setActionModalOpen}
        positionId={positionId}
        aliveUser={aliveUser}
        channelI={channelI}
        count={count}
      />
    </div>
  )
}
