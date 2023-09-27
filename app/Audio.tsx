import React, { useState, useRef, useEffect, useCallback } from 'react'

import { Button } from '@mui/material'
import { useLongPress } from 'use-long-press'

export default function Audio(props: {
  voiceOnUser: Array<string>
  setVoiceOnUser: React.Dispatch<React.SetStateAction<Array<string>>>
  userId: string
  roomId: string
}) {
  const { voiceOnUser, setVoiceOnUser, userId, roomId } = props
  const [isAudioMute, setIsAudioMute] = useState(false)
  const userVideo = useRef(null)
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(stream => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream
          userVideo.current.srcObject.getAudioTracks()[0].enabled = false
          setIsAudioMute(true)
        }
      })
  }, [])
  const toggleAudioEnabled = () => {
    if (userVideo.current && userVideo.current.srcObject) {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = isAudioMute
      setIsAudioMute(!isAudioMute)
    }
  }
  const callback = useCallback(() => {}, [])
  const bind = useLongPress(callback, {
    onStart: async () => {
      toggleAudioEnabled()
      const url = '/room/voiceUser/add'
      const baseUrl = process.browser
        ? process.env.NEXT_PUBLIC_API_ROOT
        : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
      await fetch(baseUrl + url, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voiceOnUser,
          userId,
          roomId,
        }),
      })
    },
    onFinish: async () => {
      toggleAudioEnabled()
      const url = '/room/voiceUser/remove'
      const baseUrl = process.browser
        ? process.env.NEXT_PUBLIC_API_ROOT
        : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
      await fetch(baseUrl + url, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voiceOnUser,
          userId,
          roomId,
        }),
      })
    },
    onCancel: () => toggleAudioEnabled(),
    cancelOnMovement: 25,
  })

  return (
    <div className="VideoView">
      <Button {...bind()} variant="contained" className="rounded-none">
        話す
      </Button>
      <div>
        <video ref={userVideo} autoPlay playsInline className="absolute" />
      </div>
    </div>
  )
}
