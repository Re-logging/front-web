// components/common/Dialog/CommonDialog.tsx
import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface MyPageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  showCloseButton?: boolean
  closeButtonLabel?: string
  onClose?: () => void
  className?: string
}

export function MyPageModal({
  open = true,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  closeButtonLabel = '로그아웃',
  onClose,
  className,
}: MyPageModalProps) {
  const handleClose = () => {
    onClose?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}

        {(footer || showCloseButton) && (
          <DialogFooter>
            {footer}
            {showCloseButton && (
              <Button
                className="rounded-none bg-white"
                variant="outline"
                onClick={handleClose}
              >
                {closeButtonLabel}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
