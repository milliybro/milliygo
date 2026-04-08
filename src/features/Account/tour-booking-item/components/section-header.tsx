import { ReactNode } from 'react'

type IProps = {
  icon: ReactNode
  title: string
  desc: string
}

const SectionHeader = ({ desc, icon, title }: IProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-[44px] w-[44px] items-center justify-center rounded-lg bg-[#2563EB1F]">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-[#1F2937]">{title}</p>
        <p className="text-sm text-secondary">{desc}</p>
      </div>
    </div>
  )
}

export default SectionHeader
