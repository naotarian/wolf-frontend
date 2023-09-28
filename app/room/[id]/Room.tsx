'use client'

import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button, Paper, Typography } from '@mui/material'
import Pusher from 'pusher-js'

import AudioI from '@/app/Audio'
import PlayerInformationModal from '@/app/room/[id]/PlayerInformationModal'
import PositionSelectModal from '@/app/room/[id]/PositionSelectModal'
import { leavingHook, dissolutionHook } from '@/functions/room/roomAction'
import Game from '@/app/room/[id]/Game'
export default function Room(props: { userId: string; roomId: string }) {
  const router = useRouter()
  const { userId, roomId } = props
  const [playerInformationModalOpen, setPlayerInformationModalOpen] =
    useState<boolean>(false)
  const [positionSelectModalOpen, setPositionSelectModalOpen] =
    useState<boolean>(false)
  const [selectedPlayer, setSelectedPlayer] = useState<{
    name: string
    id: string
    character_id: number
  }>({ name: '', id: '', character_id: 0 })
  const [users, setUsers] = useState<
    Array<{ name: string; id: string; character_id: number }>
  >([])
  const [pusherI, setPusherI] = useState<Pusher>()
  const [roomMasterId, setRoomMasterId] = useState<string>('')
  const [voiceOnUser, setVoiceOnUser] = useState<Array<string>>([])
  const [phase, setPhase] = useState<number>(0)

  useEffect(() => {
    console.log('ousher')
    setPusherI(
      new Pusher(String(process.env.NEXT_PUBLIC_PUSHER_KEY), {
        cluster: String(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
      }),
    )
    return () => {
      // アンマウント時にチャンネル購読を辞める
      if (!pusherI) return
      pusherI.unsubscribe(`room${roomId}-channel`)
    }
  }, [])
  // useEffect(() => {
  //   if (phase !== 1) return
  //   const sampleInterval = setInterval(() => {
  //     if (secs > 0) {
  //       setSeconds(secs - 1)
  //     }
  //   }, 1000)
  //   return () => {
  //     clearInterval(sampleInterval)
  //   }
  // }, [phase])
  useEffect(() => {
    ;(async () => {
      if (!pusherI) return
      const channel = pusherI.subscribe(`room${roomId}-channel`)
      channel.bind(
        `room${roomId}-event`,
        (data: {
          users: Array<{ id: string; name: string; character_id: number }>
        }) => {
          const exist = data.users.find(e => e.id === userId)
          if (!exist) {
            pusherI.unsubscribe(`room${roomId}-channel`)
            router.push('/')
          }
          setUsers(data.users)
        },
      )
      channel.bind(
        `room-voice-${roomId}-event`,
        (data: { voice_user_id: Array<string> }) => {
          setVoiceOnUser(data.voice_user_id)
        },
      )
      channel.bind(
        `room-phase-${roomId}-event`,
        (data: { roomId: string; phase: number }) => {
          setPhase(data.phase)
          setPositionSelectModalOpen(data.phase === 1)
        },
      )
      channel.bind(
        `room-confirmed-${roomId}-event`,
        (data: { roomId: string; confirmed: boolean }) => {
          if (data.confirmed) {
            setPhase(2)
            setPositionSelectModalOpen(false)
          }
        },
      )
      const url = '/room/participation'
      const baseUrl = process.browser
        ? process.env.NEXT_PUBLIC_API_ROOT
        : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
      const res = await fetch(baseUrl + url, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: userId,
          roomId,
        }),
      })
      const room = await res.json()
      // setP
      setRoomMasterId(room.master_user_id)
    })()
  }, [pusherI])
  // 退室処理
  const leaving = async () => {
    await leavingHook(userId, roomId)
    router.push('/')
  }
  // 部屋を解散
  const dissolution = async () => {
    await dissolutionHook(userId, roomId)
    router.push('/')
  }
  const gameStart = async () => {
    const url = '/room/pre_start'
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
      }),
    })
    setPositionSelectModalOpen(true)
    // console.log('test')
    // const audio = new Audio('/audio/gameReady.mp3')
    // await audio.play().then(() => {
    //   console.log('jkkll')
    // })
  }
  if (!pusherI) return <div />
  return (
    <div className="h-screen">
      {roomMasterId && (
        <div>
          <div className="grid grid-cols-4 gap-4 min-h-[50%]">
            {users.map((data, index) => (
              <div className="text-center" key={data.name}>
                <Typography
                  variant="body1"
                  className={`${
                    voiceOnUser.includes(data.id)
                      ? 'text-[#a1080f]'
                      : 'text-white'
                  }`}>
                  {index + 1}.{data.name}
                </Typography>
                <Button
                  onClick={() => {
                    setSelectedPlayer(data)
                    setPlayerInformationModalOpen(true)
                  }}>
                  <Image
                    src={`/images/characters/No${data.character_id}.jpg`}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    priority={false}
                    className={`border-2 mx-auto ${
                      voiceOnUser.includes(data.id) ? 'border-[#a1080f]' : ''
                    }`}
                  />
                </Button>
              </div>
            ))}
          </div>
          {phase === 0 && (
            <Paper className="w-96 my-3 mx-auto p-2 rounded-none flex justify-between">
              {roomMasterId === userId ? (
                <div className="flex gap-4 justify-between">
                  <Button
                    variant="outlined"
                    className="rounded-none"
                    onClick={dissolution}>
                    部屋を解散する
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outlined"
                  className="rounded-none"
                  onClick={() => leaving()}>
                  退室する
                </Button>
              )}
              {roomMasterId === userId && (
                <Button
                  variant="contained"
                  className="rounded-none"
                  onClick={gameStart}>
                  ゲーム開始
                </Button>
              )}
            </Paper>
          )}
          {phase === 0 && (
            <Paper className="w-96 my-3 mx-auto p-2 rounded-none flex justify-between">
              {roomMasterId === userId && (
                <Button
                  variant="outlined"
                  className="rounded-none"
                  onClick={dissolution}>
                  部屋を解散する
                </Button>
              )}
              <AudioI
                voiceOnUser={voiceOnUser}
                // setVoiceOnUser={setVoiceOnUser}
                userId={userId}
                roomId={roomId}
              />
            </Paper>
          )}
        </div>
      )}
      <PlayerInformationModal
        playerInformationModalOpen={playerInformationModalOpen}
        setPlayerInformationModalOpen={setPlayerInformationModalOpen}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        roomMasterId={roomMasterId}
        userId={userId}
        roomId={roomId}
      />
      {phase === 1 && (
        <PositionSelectModal
          positionSelectModalOpen={positionSelectModalOpen}
          setPositionSelectModalOpen={setPositionSelectModalOpen}
          userId={userId}
          roomId={roomId}
        />
      )}
      {phase === 2 && <Game />}
    </div>
  )
}
