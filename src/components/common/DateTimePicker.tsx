import { DatePicker, DatePickerProps, Form } from 'antd'
import { useTranslations } from 'next-intl'
import CalendarIcon from '@/components/icons/calendar'
import { useState } from 'react'

interface IProps extends DatePickerProps {
  name?: string
  optional?: boolean
}

const AutoCloseDateTimePicker = (props: IProps) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const { name, ...rest } = props

  const handleChange = (val: any) => {
    if (val && val.isValid() && val.$H !== undefined && val.$m !== undefined) {
      setOpen(false)
    }
  }

  return (
    <Form.Item
      className="col-span-10 m-0"
      name={name}
      rules={[{ required: !!props?.optional || true, message: '' }]}
    >
      <DatePicker
        {...rest}
        showTime={{ showNow: false, format: 'HH:mm' }}
        open={open}
        onFocus={() => setOpen(true)}
        onChange={handleChange}
        size="large"
        className="h-[56px] w-full"
        suffixIcon={<CalendarIcon className="pointer-events-none text-[22px] text-secondary/50" />}
        placeholder={t('taxi.arrival')}
        format={{ format: 'YYYY-MM-DD HH:mm', type: 'mask' }}
        needConfirm={true}
      />
    </Form.Item>
  )
}

export default AutoCloseDateTimePicker
