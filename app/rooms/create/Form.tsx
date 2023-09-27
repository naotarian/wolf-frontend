'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Paper, Typography, TextField, Button } from '@mui/material'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import type { User } from '@/types/common/User'

export default function Form(props: { user: User }) {
  const { user } = props
  const router = useRouter()
  const [text, setText] = useState<string>('')
  const submit = async () => {
    const url = '/rooms/create'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    const res = await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        text,
      }),
    })
    const room = await res.json()
    router.push(`/room/${room.roomId}`)
  }
  return (
    <Paper className="p-4 w-6/12 my-1 mx-auto rounded-none">
      <div className="">
        <div className="my-2">
          <Typography
            variant="body1"
            className={`before:content-['■'] text-[#a1080f] font-bold`}>
            ルームパスワード
          </Typography>
        </div>
        <div className="my-2">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group">
              <FormControlLabel value="0" control={<Radio />} label="なし" />
              <FormControlLabel value="1" control={<Radio />} label="あり" />
            </RadioGroup>
          </FormControl>
          <TextField
            required
            id="email"
            label="パスワード設定"
            name="pasword"
            autoComplete="pasword"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
        </div>
        <div className="my-2">
          <Typography
            variant="body1"
            className={`before:content-['■'] text-[#a1080f] font-bold`}>
            このルームのルールや注意事項
          </Typography>
        </div>
        <div className="my-2">
          <TextField
            required
            fullWidth
            placeholder="3000文字以内で記述可能 後からでも設定可能"
            value={text}
            autoComplete="text"
            size="small"
            multiline
            onChange={e => {
              setText(e.target.value)
            }}
            rows={8}
            InputProps={{ sx: { borderRadius: 0 } }}
          />
        </div>
      </div>
      <div className="p-1 text-center mt-3">
        <Button variant="contained" className="rounded-none" onClick={submit}>
          ルームを作成
        </Button>
      </div>
    </Paper>
  )
}
