import { useRouter } from 'next/navigation'

import { Button, Paper } from '@mui/material'

import AudioI from '@/app/Audio'
import { dissolutionHook, leavingHook } from '@/functions/room/roomAction'

export default function RoomOperation(props: {
  userId: string
  roomId: string
  setPositionSelectModalOpen: React.Dispatch<boolean>
  phase: number
  roomMasterId: string
  voiceOnUser: Array<string>
}) {
  const {
    userId,
    roomId,
    setPositionSelectModalOpen,
    phase,
    roomMasterId,
    voiceOnUser,
  } = props
  const router = useRouter()
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
  }
  return (
    <>
      <Button variant="outlined" className="rounded-none" onClick={dissolution}>
        部屋を解散する
      </Button>
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
          <AudioI voiceOnUser={voiceOnUser} userId={userId} roomId={roomId} />
        </Paper>
      )}
    </>
  )
}
