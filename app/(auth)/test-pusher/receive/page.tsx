'use client'
import React, { useState, useEffect } from 'react'
import Pusher from 'pusher-js'

const pusher = new Pusher('165e661ad8f22889f643', {
  cluster: 'ap3',
})
const Notifications = () => {
  const [notifications, setNotifications] = useState<Array<string>>([])

  useEffect(() => {
    const channel = pusher.subscribe('my-channel')

    channel.bind('my-event', data => {
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
        {notifications.map(notification => (
          <li key={notification}>{notification}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications
