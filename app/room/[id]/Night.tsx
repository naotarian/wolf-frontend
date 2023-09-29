'use client'

import { useState, useEffect } from 'react'

import { useCountDownInterval } from '@/hooks/useCountDownInterval'

export default function Night(props: { positionId: number }) {
  const { positionId } = props
  const [countTime, setCountTime] = useState<number>(60)
  const [status, setStatus] = useState(true)
  useCountDownInterval(countTime, setCountTime)
  useEffect(() => {
    if (!status) return
    const audio = new Audio(`/audio/night/${positionId}.mp3`)
    audio.play()
    setStatus(false)
  }, [status])
  // useEffect(() => {
  //   if (status) return
  //   const audio = new Audio(`/audio/night/2.mp3`)
  //   audio.play()
  // }, [status])
  return (
    <div>
      <p>ゲーム残り時間: {countTime}</p>
    </div>
  )
}
