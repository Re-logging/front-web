export type IIconComponent = {
  default: (props: { color?: string; className?: string }) => JSX.Element
}

export type IMessageMapType = {
  [key in INotificationTypes]: {
    comment: string
    iconPath: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
  }
}
export type INotificationTypes = 'COMMENT' | 'REPLY'

export interface INotification {
  id: string
  type: INotificationTypes
  message: string
  isRead?: boolean
  createdAt: string
  targetUrl?: string
}
