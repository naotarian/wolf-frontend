import { redirect } from 'next/navigation'

import { getAllCookies } from '@/functions/getAllCookies'

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
    const url = '/user'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    const res = await fetch(baseUrl + url, options)
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
    referrerPolicy: 'origin',
    credentials: 'include',
    headers: {
      cookie,
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    cache: 'no-store',
  }
  const url = '/user'
  const baseUrl = process.browser
    ? process.env.NEXT_PUBLIC_API_ROOT
    : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
  const res = await fetch(baseUrl + url, options)
  if (res.status !== 401) redirect('/')
  const test = await res.json()
  console.log(test)
  return test
}
