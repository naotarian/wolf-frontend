'use client'
import { useState } from 'react'
import { Button, TextField, Paper, Typography } from '@mui/material'

export default function TestPusher() {
  const [text, setText] = useState<string>('')
  const submit = async () => {
    const url = '/pusher_test'
    const baseUrl = process.browser
      ? process.env.NEXT_PUBLIC_API_ROOT
      : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
    await fetch(baseUrl + url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
      }),
    })
  }
  return (
    <Paper className="p-4 w-6/12 my-1 mx-auto rounded-none">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Typography
            variant="body1"
            className={`before:content-['■'] text-[#a1080f] font-bold`}>
            文字列
          </Typography>
        </div>
        <div>
          <TextField
            required
            fullWidth
            id="text"
            label="文字列"
            name="text"
            autoComplete="text"
            size="small"
            value={text}
            onChange={e => {
              setText(e.target.value)
            }}
            InputProps={{ sx: { borderRadius: 0 } }}
          />
        </div>
      </div>
      <div className="p-1 text-center mt-3">
        <Button variant="contained" className="rounded-none" onClick={submit}>
          pusher-test
        </Button>
      </div>
    </Paper>
    // <Paper >
    //   <form onSubmit={submit}>
    //     <TextField />
    //     <Button
    //       fullWidth
    //       variant="contained"
    //       className="rounded-none"
    //       type="submit">
    //       test-pusher
    //     </Button>
    //   </form>
    // </Paper>
  )
}
