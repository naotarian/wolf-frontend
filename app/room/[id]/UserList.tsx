'use client'

import * as React from 'react'

import Image from 'next/image'

import { Typography, Button } from '@mui/material'

export default function UserList(props: {
  users: Array<{
    name: string
    id: string
    character_id: number
    is_alive: boolean
    position: number
  }>
  voiceOnUser: Array<string>
  setSelectedPlayer: React.Dispatch<{
    name: string
    id: string
    character_id: number
  }>
  setPlayerInformationModalOpen: React.Dispatch<boolean>
}) {
  const {
    users,
    voiceOnUser,
    setSelectedPlayer,
    setPlayerInformationModalOpen,
  } = props

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 min-h-[50%]">
        {users.map((data, index) => (
          <div>
            {data.is_alive ? (
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
            ) : (
              <div className="text-center" key={data.name}>
                <Typography
                  variant="body1"
                  className={`${
                    voiceOnUser.includes(data.id)
                      ? 'text-[#a1080f]'
                      : 'text-white'
                  }`}>
                  {index + 1}.{data.name}(死亡)
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
                    className="border-2 mx-auto opacity-25"
                  />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
