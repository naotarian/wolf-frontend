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
  // channelI: Pusher
  roomId: string
  remainingTime: number
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>
}) {
  const { situation, userId, users, roomId, remainingTime, setRemainingTime } =
    props
  const positionId = users.find(e => e.id === userId)
  const aliveUser = users.filter(user => user.is_alive !== false)
  return (
    <div>
      {situation && positionId && (
        <Night
          positionId={positionId.position}
          aliveUser={aliveUser}
          roomId={roomId}
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
        />
      )}
      {!situation && <p>朝</p>}
    </div>
  )
}
