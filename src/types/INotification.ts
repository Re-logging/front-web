export interface Notification {
  id: string
  type: 'COMMENT' | 'LIKE' | 'MENTION'
  message: string
  isRead: boolean
  createdAt: string
  targetUrl?: string
}
