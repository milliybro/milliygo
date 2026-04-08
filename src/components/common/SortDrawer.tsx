import { Card, Button, Typography } from 'antd'
import { useState } from 'react'
import CloseIcon from '@/components/icons/close'

const { Title } = Typography

interface SortDrawerProps {
  title?: string
  trigger?: any
  children: any
  onApply?: () => void
}

export default function SortDrawer({ title = 'Filter', trigger, children }: SortDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {trigger || (
          <Button type="default" className="px-4 py-2">
            {title}
          </Button>
        )}
      </div>

      <Card
        variant="borderless"
        styles={{ body: { padding: 0 } }}
        className={`fixed bottom-0 left-0 right-0 z-[100] transform rounded-t-2xl bg-white transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'} shadow-[0_-4px_12px_rgba(0,0,0,0.15)]`}
      >
        <div className="relative px-6 pt-8">
          <button
            className="absolute right-4 top-4 text-lg text-gray-500"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>

          <Title level={3} className="mb-6">
            {title}
          </Title>

          <div className="mb-8">{children}</div>

          {/* <Button
            type="primary"
            size="large"
            className="w-full h-[58px] mb-8 bg-[#3978FF]"
            onClick={() => {
              onApply?.()
              setOpen(false)
            }}
          >
            Apply
          </Button> */}
        </div>
      </Card>
    </>
  )
}
