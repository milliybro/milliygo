import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'

const StatusBadge = ({ status }: { status: 'ON_PROCESS' | 'FAILED' | 'COMPLETED' }) => {
  const t = useTranslations()

  const statusStyles = {
    ON_PROCESS: 'bg-yellow-500/20 text-yellow-600',
    FAILED: 'bg-red-500/20 text-red-600',
    COMPLETED: 'bg-green-500/20 text-green-600',
    RETURNED: 'bg-orange-500/20 text-orange-600',
  }

  return (
    <span className={twMerge('px-2 py-1 rounded-lg font-medium text-[12px]', statusStyles[status])}>
      {t(`transport.ticket-status.${status}`)}
    </span>
  )
}

export default StatusBadge
