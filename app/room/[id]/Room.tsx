'use client'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'
import { Button, Paper, Typography } from '@mui/material'
import Pusher from 'pusher-js'
import { useRouter } from 'next/navigation'
import PlayerInformationModal from '@/app/room/[id]/PlayerInformationModal'
export default function Room(props: { userId: string; roomId: string }) {
  const router = useRouter()
  const { userId, roomId } = props
  const [playerInformationModalOpen, setPlayerInformationModalOpen] =
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
  useEffect(() => {
    setPusherI(
      new Pusher(String(process.env.NEXT_PUBLIC_PUSHER_KEY), {
        cluster: String(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
      }),
    )
    return () => {
      //アンマウント時にチャンネル購読を辞める
      if (!pusherI) return
      pusherI.unsubscribe(`room${roomId}-channel`)
    }
  }, [])
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
          roomId: roomId,
        }),
      })
      const room = await res.json()
      setRoomMasterId(room.master_user_id)
    })()
  }, [pusherI])
  const leaving = async () => {
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
        userId: userId,
        roomId: roomId,
      }),
    })
    router.push('/')
  }

  const dissolution = async () => {
    const url = '/room/dissolution'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        roomId: roomId,
      }),
    })
    router.push('/')
  }
  if (!pusherI) return <div></div>
  return (
    <div className="h-screen">
      {roomMasterId && (
        <div>
          <div className="grid grid-cols-4 gap-4 min-h-[50%]">
            {users.map((data, index) => (
              <div className="text-center" key={index}>
                <Typography variant="body1" className="text-white">
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
                    className={`border mx-auto`}
                  />
                </Button>
              </div>
            ))}
          </div>
          <Paper className="w-96 my-3 mx-auto p-2 rounded-none flex justify-between">
            {roomMasterId === userId ? (
              <Button
                variant="outlined"
                className="rounded-none"
                onClick={dissolution}>
                部屋を解散する
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="rounded-none"
                onClick={leaving}>
                退室する
              </Button>
            )}
            <Button variant="contained" className="rounded-none">
              ゲーム開始
            </Button>
          </Paper>
        </div>
      )}
      <PlayerInformationModal
        playerInformationModalOpen={playerInformationModalOpen}
        setPlayerInformationModalOpen={setPlayerInformationModalOpen}
        selectedPlayer={selectedPlayer}
      />
    </div>
  )
}
