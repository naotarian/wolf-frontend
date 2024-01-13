import Room from '@/app/room/[id]/Room'
import { auth } from '@/functions/common/auth'

export default async function Home({ params }: { params: { id: string } }) {
  const user = await auth()
  const roomId = params.id

  return (
    <main className="min-h-screen flex-col items-center justify-between p-24 h-[100vh] bg-[url('/images/room/room.jpg')] bg-cover">
      <Room userId={user.id} roomId={roomId} />
    </main>
  )
}
