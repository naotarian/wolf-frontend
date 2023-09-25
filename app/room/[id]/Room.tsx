'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button, Typography } from '@mui/material'
import Pusher from 'pusher-js'
export default function Room(props: { userId: string; roomId: string }) {
  const { userId, roomId } = props
  const [users, setUsers] = useState<Array<{ name: string; id: string }>>([])
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  })
  useEffect(() => {
    ;(async () => {
      const url = '/room/participation'
      const baseUrl = process.browser
        ? process.env.NEXT_PUBLIC_API_ROOT
        : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
      await fetch(baseUrl + url, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: userId,
          roomId: roomId,
        }),
      })
    })()
  }, [])
  useEffect(() => {
    const channel = pusher.subscribe(`room${roomId}-channel`)
    channel.bind(`room${roomId}-event`, data => {
      setUsers(data.users)
    })

    // return () => {
    //   pusher.unsubscribe('my-channel')
    // }
  }, [users])
  return (
    <div className="grid grid-cols-4 gap-4">
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
  )
}
