'use client'

import { useState } from 'react'

import Image from 'next/image'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import theme from '@/components/common/theme'

export default function Form(props: {
  user: {
    id: string
    email: string
  }
  characterFiles: Array<string>
}) {
  const { user, characterFiles } = props

  const [selectCharacter, setSelectCharacter] = useState<number>(1)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!data.get('user_name')) return
    if (!data.get('password')) return
    if (!data.get('password_confirmed')) return
    const url = '/definitive_regist'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    const res = await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.get('email'),
        name: data.get('user_name'),
        password: data.get('password'),
        password_confirmation: data.get('password_confirmed'),
        character: selectCharacter,
      }),
    })
    await res.json()
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className="bg-white p-16">
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
        className="font-bold"
        color={`${theme.palette.primary.main}`}>
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              value={user.email}
              // disabled
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              size="small"
              InputProps={{ sx: { borderRadius: 0 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="ユーザー名"
              name="user_name"
              autoComplete="user_name"
              size="small"
              InputProps={{ sx: { borderRadius: 0 } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="パスワード"
              name="password"
              autoComplete="password"
              size="small"
              type="password"
              InputProps={{ sx: { borderRadius: 0 } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="パスワード確認用"
              name="password_confirmed"
              autoComplete="password_confirmed"
              size="small"
              type="password"
              InputProps={{ sx: { borderRadius: 0 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body1"
              className={`before:content-['■'] text-[#a1080f] font-bold`}>
              キャラクターの選択
            </Typography>
            <div className="flex flex-wrap gap-4">
              {characterFiles.map((data, index) => (
                <Button onClick={() => setSelectCharacter(index + 1)}>
                  <Image
                    src={`/images/characters/${data}`}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    priority={false}
                    className={`border ${
                      selectCharacter === index + 1 ? 'border-[#a1080f]' : ''
                    }`}
                  />
                </Button>
              ))}
            </div>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="rounded-none"
          sx={{ mt: 3, mb: 2 }}>
          登録
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2" className="font-bold">
              ログインはこちら
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
