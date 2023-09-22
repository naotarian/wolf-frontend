import Grid from '@mui/material/Grid'
import Form from '@/app/(auth)/login/Form'
import { guest } from '@/functions/common/auth'
export default async function SignInSide() {
  await guest()
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Form />
    </Grid>
  )
}
