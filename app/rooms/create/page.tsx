import { auth } from '@/functions/common/auth'
import Form from '@/app/rooms/create/Form'

export default async function Home() {
  const user = await auth()
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      {user && <Form user={user} />}
    </main>
  )
}
