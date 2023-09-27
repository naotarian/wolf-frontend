export const leavingHook = async (userId: string, roomId: string) => {
  const url = '/room/leaving'
  const baseUrl = process.browser
    ? process.env.NEXT_PUBLIC_API_ROOT
    : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
  await fetch(baseUrl + url, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId,
      roomId: roomId,
    }),
  })
  return true
}

export const dissolutionHook = async (userId: string, roomId: string) => {
  const url = '/room/dissolution'
  const baseUrl = process.browser
    ? process.env.NEXT_PUBLIC_API_ROOT
    : process.env.NEXT_PUBLIC_API_ROOT_LOCAL
  await fetch(baseUrl + url, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId,
      roomId: roomId,
    }),
  })
  return true
}
