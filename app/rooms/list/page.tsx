import { auth } from '@/functions/common/auth'
import List from '@/app/rooms/list/List'

export default async function Home() {
  const user = await auth()
  const url = '/rooms/list'
  const baseUrl = process.browser
    ? process.env.NEXT_PUBLIC_API_ROOT
    : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
  const res = await fetch(baseUrl + url)
  const list = await res.json()
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      {user && <List list={list} />}
    </main>
  )
}
