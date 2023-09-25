'use client'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'
import { Button, Paper, Typography } from '@mui/material'
import Pusher from 'pusher-js'
import { useRouter } from 'next/navigation'
export default function Room(props: { userId: string; roomId: string }) {
  const router = useRouter()
  const { userId, roomId } = props
  const [users, setUsers] = useState<Array<{ name: string; id: string }>>([])
  const [roomMasterId, setRoomMasterId] = useState<string>('')
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  })
  useLayoutEffect(() => {
    const channel = pusher.subscribe(`room${roomId}-channel`)
    channel.bind(
      `room${roomId}-event`,
      (data: { users: Array<{ id: string; name: string }> }) => {
        const exist = data.users.find(e => e.id === userId)
        if (!exist) {
          pusher.unsubscribe(`room${roomId}-channel`)
          router.push('/')
        }
        setUsers(data.users)
      },
    )
  }, [])
  useEffect(() => {
    ;(async () => {
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
      return () => {
        alert('unsubscribe')
        pusher.unsubscribe(`room${roomId}-channel`)
        leaving()
      }
    })()
  }, [])
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
                <Button>
                  <Image
                    src="/images/characters/No1.png"
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
    </div>
  )
}
