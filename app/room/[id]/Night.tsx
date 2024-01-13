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
  roomId: string
  remainingTime: number
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>
}) {
  const {
    positionId,
    aliveUser,
    // channelI,
    roomId,
    remainingTime,
    setRemainingTime,
  } = props

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
    const sampleInterval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1)
      }
    }, 1000)
    return () => {
      clearInterval(sampleInterval)
    }
  })
  // 0秒になった時
  useEffect(() => {
    ;(async () => {
      if (remainingTime !== 0) return
      console.log('0になったよ')
    })()
  }, [remainingTime])
  return (
    <div>
      <ActionModal
        actionModalOpen={actionModalOpen}
        setActionModalOpen={setActionModalOpen}
        positionId={positionId}
        aliveUser={aliveUser}
        count={count}
        remainingTime={remainingTime}
      />
    </div>
  )
}
