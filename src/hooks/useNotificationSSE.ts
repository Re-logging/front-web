// hooks/useNotificationSSE.ts
import { useEffect } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useNotificationStore } from '@/store/notificationStore'

// 알림 SSE 연결하는
export const useNotificationSSE = () => {
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    // EventSourcePolyfill 설정
    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/subscribe`,
      {
        withCredentials: true, // Next 서버에서 관리하는 쿠키 전송을 위해 필요
      },
    )
    // 알림 수신
    eventSource.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data)
        addNotification(notification)
      } catch (error) {
        console.error('알림 파싱 실패:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE 에러:', error)
      eventSource.close()
    }
    // 컴포넌트 언마운트 시 SSE 연결 종료
    return () => {
      eventSource.close()
    }
  }, [addNotification])
}
