import { InputNumber } from 'antd'
import React from 'react'

interface DiscountHotelInputProps {
  className: string
  discount: number
  setDiscount: React.Dispatch<React.SetStateAction<number>> // Update this type
  form: import('react-hook-form').UseFormReturn<any>
}

function DiscountHotelInput({
  className,
  setDiscount,
  discount,
  form,
}: DiscountHotelInputProps): React.ReactElement {
  function discountValue(value: number | null) {
    if (value !== null) {
      setDiscount(value)
      form.setValue('schedule.discounted', value)
    }
  }

  return (
    <span className={`${className} mb-4`}>
      <InputNumber
        className="mb-1 h-[48px] rounded-lg"
        min={0}
        max={100}
        formatter={(value) => `${value}%`}
        value={discount}
        onChange={discountValue}
        disabled={!form.watch('schedule.isDiscounted')}
      />
    </span>
  )
}

export default DiscountHotelInput
