// components/NotificationBell.tsx
'use client'

import { useState } from 'react'
import { useNotificationStore } from '@/store/notificationStore'
import { useNotificationSSE } from '@/hooks/useNotificationSSE'
import { Bell, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import { INotification } from '@/types/INotification'
import { Button } from '@/components/ui/button'
// import UnreadCommentAlarmIcon from '@/assets/icon_unreadComment.svg'
// import ReadCommentAlarmIcon from '@/assets/icon_readComment.svg'
import CheckedIcon from '@/assets/icon_checked.svg'

export function NotificationBell() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead } = useNotificationStore()

  // SSE 연결
  useNotificationSSE()

  const handleNotificationClick = (notification: INotification) => {
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
            <span className="absolute -top-0 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <div className="max-h-[400px] overflow-y-auto">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-lg font-semibold">알림</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-solid"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              새로운 알림이 없습니다
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex h-[80px] cursor-pointer items-center gap-4 border-b p-4 hover:bg-hoverGray ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div>
                  {/* <UnreadCommentAlarmIcon />
                   */}
                  {/* <ReadCommentAlarmIcon /> */}
                  <CheckedIcon color="#1EE494" />
                </div>
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
