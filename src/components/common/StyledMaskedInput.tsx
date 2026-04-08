import { Form, FormInstance } from 'antd'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { IMaskInput, IMaskInputProps } from 'react-imask'
import { twMerge } from 'tailwind-merge'
import { createMask } from 'imask'

interface MaskDatePickerProps extends Omit<IMaskInputProps<HTMLInputElement>, 'mask'> {
  placeholderText?: string
  mask?: string | (string | RegExp)[]
  showPlaceholderMask?: boolean
  formValidation: {
    name: string | (string | number)[]
    form?: FormInstance<any>
  }
}

export default function StyledMaskedInput({
  className,
  formValidation,
  showPlaceholderMask = true,
  ...props
}: MaskDatePickerProps) {
  const ref = useRef(null)
  const defaultForm = Form.useFormInstance()
  const form = formValidation?.form ?? defaultForm
  const hasError = formValidation?.name && form.getFieldError(formValidation.name).length > 0

  const t = useTranslations()
  const value = '' + (props?.value || '')
  const placeholderText = props?.placeholderText || t('tours.date')
  const placeholderMask = value ? placeholderText.slice(value?.length) : placeholderText

  return (
    <div
      className={twMerge(
        'relative rounded-2xl transition-all duration-300 focus-within:shadow-[0_0_0_2px]',
        hasError ? 'focus-within:shadow-red-500/10' : 'focus-within:shadow-primary/10'
      )}
    >
      <IMaskInput
        {...props}
        ref={ref}
        mask={createMask({
          mask: (props.mask as string) || '00.00.0000',
        })}
        className={twMerge(
          `w-full rounded-2xl border border-transparent bg-[#F8F8FA] p-[15px_11px] text-black caret-black outline-none transition-all duration-200 placeholder:normal-case`,
          className,
          hasError
            ? 'border-red-500 hover:border-red-500/50 focus:border-red-500'
            : 'hover:border-primary/50 focus:border-primary'
        )}
        onAccept={(value) => {
          const upper = value.toUpperCase()
          form.setFieldValue(formValidation?.name, upper)
          props?.onAccept?.(upper as any, ref.current as any)
        }}
        spellCheck={false}
        {...{ autoComplete: 'none' }}
      />
      {showPlaceholderMask && value && (
        <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-[calc(50%)] select-none items-center gap-px text-black">
          <div className="text-transparent">{value}</div>
          <span className="line-clamp-1 text-secondary">{placeholderMask}</span>
        </div>
      )}
    </div>
  )
}
