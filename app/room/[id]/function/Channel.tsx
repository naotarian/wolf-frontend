import Pusher from 'pusher-js'

export const Channel = (setPusherI: React.Dispatch<Pusher>) => {
  const pusherConnect = new Pusher(String(process.env.NEXT_PUBLIC_PUSHER_KEY), {
    cluster: String(process.env.NEXT_PUBLIC_PUSHER_CLUSTER),
  })
  setPusherI(pusherConnect)
}

export const Unsubscribe = (pusherI: Pusher, roomId: string) => {
  if (!pusherI) return
  pusherI.unsubscribe(`room${roomId}-channel`)
}
