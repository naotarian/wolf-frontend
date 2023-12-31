import Room from '@/app/room/[id]/Room'
import { auth } from '@/functions/common/auth'

export default async function Home({ params }: { params: { id: string } }) {
  const user = await auth()
  const roomId = params.id

  // const url = '/room/participation'
  // const baseUrl = process.browser
  //   ? process.env.NEXT_PUBLIC_API_ROOT
  //   : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
  // const roomInformation = await fetch(baseUrl + url, {
  //   method: 'POST',
  //   cache: 'no-store',
  //   credentials: 'include',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     user: user.id,
  //     roomId,
  //   }),
  // }).then(res => res.json())
  // console.log(roomInformation)
  // if (res.status === 404) redirect('/')
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24 h-[100vh] bg-[url('/images/room/room.jpg')] bg-cover">
      <Room userId={user.id} roomId={roomId} />
    </main>
  )
}
