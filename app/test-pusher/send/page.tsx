'use client'

import { Button } from '@mui/material'

export default function TestPusher() {
  const submit = async () => {
    const url = '/pusher_test'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    const res = await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'vvvv',
      }),
    })
    const event = await res.json()
    console.log(event)
  }
  return <Button onClick={submit}>test_pusher</Button>
}
