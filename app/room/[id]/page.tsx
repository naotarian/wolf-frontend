import { auth } from '@/functions/common/auth'
import Form from '@/app/rooms/create/Form'
import { redirect } from 'next/navigation'
export default async function Home({ params }: { params: { id: string } }) {
  const user = await auth()
  try {
    const roomId = params.id
    const url = '/room/participation'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    console.log(user)
    const res = await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: user.id,
        roomId: roomId,
      }),
    })
    redirect('/')
  } catch (e) {
    console.log(e)
  }
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      {user && <Form user={user} />}
    </main>
  )
}
