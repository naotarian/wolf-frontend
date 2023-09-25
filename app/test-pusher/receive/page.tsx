'use client'
import React, { useState, useEffect } from 'react'
import Pusher from 'pusher-js'
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
})
const Notifications = () => {
  const [notifications, setNotifications] = useState<Array<string>>([])

  useEffect(() => {
    const channel = pusher.subscribe('my-channel')
    channel.bind('my-event', (data: string) => {
      console.log('my-event' + data)
      setNotifications([...notifications, data])
    })

    return () => {
      pusher.unsubscribe('my-channel')
    }
  }, [notifications])

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications
