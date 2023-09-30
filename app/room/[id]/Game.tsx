import type Pusher from 'pusher-js'

import Night from '@/app/room/[id]/Night'

export default function Game(props: {
  situation: boolean
  userId: string
  users: Array<{
    name: string
    id: string
    character_id: number
    is_alive: boolean
    position: number
  }>
  channelI: Pusher
  roomId: string
}) {
  const { situation, userId, users, channelI, roomId } = props
  const positionId = users.find(e => e.id === userId)
  const aliveUser = users.filter(user => user.is_alive !== false)
  return (
    <div>
      {situation && positionId && (
        <Night
          positionId={positionId.position}
          aliveUser={aliveUser}
          channelI={channelI}
          roomId={roomId}
        />
      )}
      {!situation && <p>朝</p>}
    </div>
  )
}
