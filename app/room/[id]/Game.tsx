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
}) {
  const { situation, userId, users } = props
  console.log(userId)
  console.log(users)
  const positionId = users.find(e => e.id === userId)
  console.log(positionId)
  return (
    <div>
      {situation && positionId && <Night positionId={positionId.position} />}
      {!situation && <p>朝</p>}
    </div>
  )
}
