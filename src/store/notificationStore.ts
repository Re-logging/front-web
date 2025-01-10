// store/notificationStore.ts
import { create } from 'zustand'
import { Notification } from '@/types/Inotification'

interface NotificationStore {
  notifications: Notification[] // 알림 목록
  unreadCount: number // 읽지 않은 알림 개수
  addNotification: (notification: Notification) => void // 알림 추가
  markAsRead: (id: string) => void // 알림 읽음 처리
  clearAll: () => void // 모든 알림 삭제
}

// 알림 관련 스토어
export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  // 알림 추가
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),

  // 알림 읽음 처리
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  // 모든 알림 삭제
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}))
