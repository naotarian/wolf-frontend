import Form from '@/app/rooms/create/Form'
import { auth } from '@/functions/common/auth'

export default async function Home() {
  const user = await auth()
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24 bg-[url('/images/top/top_background01.jpeg')]">
      {user && <Form user={user} />}
    </main>
  )
}
