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
  const aliveUser = users.filter(user => user.is_alive !== false)
  console.log(aliveUser)
  return (
    <div>
      {situation && positionId && (
        <Night positionId={positionId.position} aliveUser={aliveUser} />
      )}
      {!situation && <p>朝</p>}
    </div>
  )
}
