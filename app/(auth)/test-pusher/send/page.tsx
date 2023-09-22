'use client'

import { Button } from '@mui/material'

export default function TestPusher() {
  const submit = async () => {
    const res = await fetch('http://127.0.0.190/api/pusher_test', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'aaaa',
      }),
    })
  }
  return <Button onClick={submit}>test_pusher</Button>
}
