import { getAllCookies } from '@/functions/getAllCookies'
import { redirect } from 'next/navigation'
export const auth = async () => {
  const cookie = getAllCookies()
  const options: RequestInit = {
    headers: {
      cookie,
    },
    cache: 'no-store',
  }
  const res = await fetch('http://wolf_web/api/user', options)
  const test = await res.json()
  if (!test) redirect('/login')
  return test
}
export const guest = async () => {
  const cookie = getAllCookies()
  const options: RequestInit = {
    headers: {
      cookie,
    },
    cache: 'no-store',
  }
  const res = await fetch('http://wolf_web/api/user', options)
  const test = await res.json()
  if (test) redirect('/')
  return test
}
