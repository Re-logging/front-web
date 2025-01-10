// components/NotificationBell.tsx
'use client'

import { useState } from 'react'
import { useNotificationStore } from '@/store/notificationStore'
import { useNotificationSSE } from '@/hooks/useNotificationSSE'
import { Bell } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import { Notification } from '@/types/Inotification'
import { Button } from '@/components/ui/button'

export function NotificationBell() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead } = useNotificationStore()

  // SSE 연결
  useNotificationSSE()

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.targetUrl) {
      router.push(notification.targetUrl)
    }
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="relative cursor-pointer bg-white text-black">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              새로운 알림이 없습니다
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`cursor-pointer border-b p-4 hover:bg-gray-50 ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="text-sm">{notification.message}</div>
                <div className="mt-1 text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
