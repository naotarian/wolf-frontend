import * as React from 'react'
import Container from '@mui/material/Container'
import Form from '@/app/(auth)/register/definitive/Parts/Form'

export default async function SignUp({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const token = searchParams?.token
  const url = '/definitive_regist_token'
  const baseUrl = process.browser
    ? process.env.NEXT_PUBLIC_API_ROOT
    : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
  const res = await fetch(baseUrl + url, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
    }),
  })
  const user = await res.json()

  return (
    <Container component="main" maxWidth="md">
      {user.email !== undefined && <Form user={user} />}
      {user.email === undefined && <div>もう一度仮登録してください</div>}
    </Container>
  )
}
