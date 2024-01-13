'use client'

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import PositionSelectModal from './PositionSelectModal'

import type Pusher from 'pusher-js'

import Game from '@/app/room/[id]/Game'
import PlayerInformationModal from '@/app/room/[id]/PlayerInformationModal'
import RoomOperation from '@/app/room/[id]/RoomOperation'
import UserList from '@/app/room/[id]/UserList'
import { Channel, Unsubscribe } from '@/app/room/[id]/function/Channel'

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
    Array<{
      name: string
      id: string
      character_id: number
      is_alive: boolean
      position: number
    }>
  >([])
  const [pusherI, setPusherI] = useState<Pusher>()
  const [roomMasterId, setRoomMasterId] = useState<string>('')
  const [voiceOnUser, setVoiceOnUser] = useState<Array<string>>([])
  const [phase, setPhase] = useState<number>(0)
  const [remainingTime, setRemainingTime] = useState<number>(30)
  const [situation, setSituation] = useState<boolean>(true)
  useEffect(() => {
    Channel(setPusherI)
    return () => {
      // アンマウント時にチャンネル購読を辞める
      if (!pusherI) return
      Unsubscribe(pusherI, roomId)
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
          users: Array<{
            id: string
            name: string
            character_id: number
            is_alive: boolean
            position: number
          }>
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
          console.log(remainingTime)
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
      channel.bind(
        `room-situation-${roomId}-event`,
        (data: { roomId: string; situation: boolean }) => {
          setSituation(data.situation)
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
      console.log(room.selectPositionRemainTime)
      setRemainingTime(room.selectPositionRemainTime)
      setRoomMasterId(room.master_user_id)
    })()
  }, [pusherI])

  if (!pusherI) return <div />
  return (
    <div className="h-screen">
      {roomMasterId && (
        <>
          <UserList
            users={users}
            voiceOnUser={voiceOnUser}
            setSelectedPlayer={setSelectedPlayer}
            setPlayerInformationModalOpen={setPlayerInformationModalOpen}
          />
          <RoomOperation
            userId={userId}
            roomId={roomId}
            setPositionSelectModalOpen={setPositionSelectModalOpen}
            phase={phase}
            roomMasterId={roomMasterId}
            voiceOnUser={voiceOnUser}
          />
          {phase === 0 && (
            <RoomOperation
              userId={userId}
              roomId={roomId}
              setPositionSelectModalOpen={setPositionSelectModalOpen}
              phase={phase}
              roomMasterId={roomMasterId}
              voiceOnUser={voiceOnUser}
            />
          )}
        </>
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
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
          // channelI={channelI}
        />
      )}
      {phase === 2 && (
        <Game
          situation={situation}
          users={users}
          userId={userId}
          // channelI={channelI}
          roomId={roomId}
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
        />
      )}
    </div>
  )
}
