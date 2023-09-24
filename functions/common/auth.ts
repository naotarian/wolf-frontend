import { getAllCookies } from '@/functions/getAllCookies'
import { redirect } from 'next/navigation'
export const auth = async () => {
  try {
    const cookie = getAllCookies()
    const options: RequestInit = {
      headers: {
        cookie,
        'X-Requested-With': 'XMLHttpRequest',
      },
      cache: 'no-store',
    }
    const res = await fetch('http://wolf-web/api/user', options)
    if (res.status === 401) redirect('/login')
    const test = await res.json()
    return test
  } catch (e) {
    redirect('/login')
  }
}
export const guest = async () => {
  const cookie = getAllCookies()
  const options: RequestInit = {
    headers: {
      cookie,
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    cache: 'no-store',
  }
  const res = await fetch('http://wolf-web/api/user', options)
  if (res.status !== 401) redirect('/')
  const test = await res.json()
  return test
}
