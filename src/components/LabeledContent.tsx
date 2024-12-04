import Link from 'next/link'
import LinkIcon from '@/assets/icon_link.svg'
interface LabeledContentProps {
  label: string
  content: string
  type?: string
}

export default function LabeledContent({
  label,
  content,
  type,
}: LabeledContentProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="border-green- whitespace-nowrap rounded-md border bg-green p-1 text-xs font-semibold text-white">
        {label ?? '-'}
      </span>
      {type === 'link' ? (
        <Link
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-center gap-1 text-sm font-bold text-blue-600 underline underline-offset-2"
          href={content}
        >
          <span>
            <LinkIcon />
          </span>{' '}
          웹사이트 바로가기
        </Link>
      ) : (
        <span className="text-xs text-text">{content ?? '-'}</span>
      )}
    </div>
  )
}
