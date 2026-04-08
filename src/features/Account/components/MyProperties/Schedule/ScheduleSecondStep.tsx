/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Divider, Flex, InputNumber, Switch, Typography } from 'antd'
import SuccessIcon from '@/components/icons/success-icon'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import QuestionIcon from '@/components/icons/question'
import CustomModal from '@/components/common/CModal'
import { useTranslations } from 'next-intl'

function ScheduleSecondStep({
  setCurrentStep,
  form,
  currencies,
}: {
  setCurrentStep: (step: number) => void
  form: any
  currencies: any
}): React.ReactElement {
  const t = useTranslations()
  const [cancellationPolicy, setCancellationPolicy] = useState<boolean>(false)
  const [differentPricing, setDifferentPricing] = useState<boolean>(false)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Flex vertical gap={24} className="mb-4">
      <Flex className="items-center justify-between">
        <Flex className="items-center gap-[8px]">
          <Typography className="text-lg font-semibold">
            {t('my-properties.cancellation-policy')}
          </Typography>
        </Flex>

        <Button
          aria-label={t('my-properties.change')}
          type="link"
          className="flex items-center p-0"
          onClick={() => setCancellationPolicy(true)}
        >
          {t('my-properties.change')}
          <ArrowRightUpIcon />
        </Button>
      </Flex>

      <Typography className="text-[#777E90]">
        {t('my-properties.cancellation-policy-description')}
      </Typography>

      <Flex vertical className="gap-[16px]">
        <Flex className="flex items-center gap-[8px]">
          <SuccessIcon className="text-[#4DD282]" />
          <Typography className="text-[#777E90]">
            {t('my-properties.guests-cancelling-reservation')}
          </Typography>
        </Flex>

        <Flex className="flex items-center gap-[8px]">
          <SuccessIcon className="text-[#4DD282]" />
          <Typography className="text-[#777E90]">
            {t('my-properties.guests-cancelling-reservation-24-hours')}
          </Typography>
        </Flex>
      </Flex>

      {/* <Divider className="m-0" />

      <Flex className="justify-between items-center">
        <Flex className="items-center gap-[8px]">
          <Typography className="text-lg font-semibold">
            {t('my-properties.discounted-price-2')}
          </Typography>

          <QuestionIcon />
        </Flex>

        <Button
          type="link"
          className="p-0 flex items-center"
          onClick={() => setDifferentPricing(true)}
        >
          {t('my-properties.change')}
          <ArrowRightUp className='text-xs' />
        </Button>
      </Flex>

      <Typography className="text-[#777E90]">
        {t('my-properties.discounted-price-description')}
      </Typography>

      <div>
        <table className="border w-full">
          <tbody>
            <tr>
              <th className="border p-[12px_20px] text-start text-[#777E90] font-medium">
                {t('my-properties.capacity')}
              </th>
              <th className="border p-[12px_20px] text-start text-[#777E90] font-medium">
                {t('my-properties.discount')}
              </th>
              <th className="border p-[12px_20px] text-start text-[#777E90] font-medium">
                {t('my-properties.guests-pay')}
              </th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border p-[23px_20px] text-start font-medium text-[#232E40] text-lg">
                {t('my-properties.guests-2')}
              </td>
              <td className="border p-[23px_20px] text-start font-medium text-[#232E40] text-lg">
                {form.watch('schedule.discount.forTwoPlus') ?? 0}%
              </td>
              <td className="border p-[23px_20px] text-start font-medium text-[#232E40] text-lg">
                {Math.round(
                  (form.watch('schedule.price') ?? 0) -
                    ((form.watch('schedule.price') ?? 0) *
                      (form.watch('schedule.discount.forTwoPlus') ?? 0)) /
                      100
                )}{' '}
              {currencies?.find((currency: any) => currency.value === form.watch('schedule.currency'))?.label}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border p-[23px_20px] text-start font-medium text-[#232E40] text-lg">
                {t('my-properties.guests-1')}
              </td>
              <td className="border p-[23px_20px] text-start font-medium text-[#232E40] text-lg">
                {form.watch('schedule.discount.forOne') ?? 0}%
              </td>
              <td className="border p-[23px_20px] text-start font-medium text-[#232E40] text-lg">
                {Math.round(
                  (form.watch('schedule.price') ?? 0) -
                    ((form.watch('schedule.price') ?? 0) *
                      (form.watch('schedule.discount.forOne') ?? 0)) /
                      100
                )}{' '}
                {currencies?.find((currency: any) => currency.value === form.watch('schedule.currency'))?.label}
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <Flex vertical gap={24}>
        <Flex vertical>
          <Flex className="mt-4">
            <div className="grid w-full grid-cols-2 gap-8">
              <Button
                aria-label={t('my-properties.prev')}
                className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
                onClick={() => {
                  scrollToTop()
                  setCurrentStep(1)
                }}
              >
                {t('my-properties.prev')}
              </Button>
              <Button
                aria-label={t('my-properties.next')}
                type="primary"
                className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
                onClick={() => {
                  scrollToTop()
                  setCurrentStep(3)
                }}
              >
                {t('my-properties.next')}
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>

      <CustomModal
        width={1073}
        modalTitle={t('my-properties.cancellation-policy-2')}
        open={cancellationPolicy}
        onOk={() => setCancellationPolicy(false)}
        onCancel={() => setCancellationPolicy(false)}
      >
        <Flex vertical>
          <Typography className="mb-[8px] text-lg font-semibold">
            {t('my-properties.free-cancellation')}
          </Typography>

          <Flex className="mb-[24px] grid w-full grid-cols-4 bg-[#F8F8FA] p-[4px]">
            <Button
              aria-label={t('my-properties.free-cancellation-1')}
              type="text"
              className={`${
                form.watch('schedule.freeCancellation') === 1 && 'border border-[#FFC107]'
              } relative h-max py-[12px]`}
              onClick={() => form.setValue('schedule.freeCancellation', 1)}
            >
              {t('my-properties.free-cancellation-1')}
              <span className="absolute left-1/4 top-[-12px] w-max rounded-lg bg-[#FFC107] p-[2px_8px] text-[#FFFFFF]">
                {t('my-properties.recommended')}
              </span>
            </Button>
            <Button
              aria-label={t('my-properties.free-cancellation-5')}
              type="text"
              onClick={() => form.setValue('schedule.freeCancellation', 5)}
              className={`${
                form.watch('schedule.freeCancellation') === 5 && 'border border-[#FFC107]'
              } h-max py-[12px]`}
            >
              {t('my-properties.free-cancellation-5')}
            </Button>
            <Button
              aria-label={t('my-properties.free-cancellation-14')}
              type="text"
              onClick={() => form.setValue('schedule.freeCancellation', 14)}
              className={`${
                form.watch('schedule.freeCancellation') === 14 && 'border border-[#FFC107]'
              } h-max py-[12px]`}
            >
              {t('my-properties.free-cancellation-14')}
            </Button>
            <Button
              aria-label={t('my-properties.free-cancellation-30')}
              type="text"
              onClick={() => form.setValue('schedule.freeCancellation', 30)}
              className={`${
                form.watch('schedule.freeCancellation') === 30 && 'border border-[#FFC107]'
              } h-max py-[12px]`}
            >
              {t('my-properties.free-cancellation-30')}
            </Button>
          </Flex>

          <Typography className="mb-[24px] text-base font-normal">
            {t('my-properties.free-cancellation-description')}
          </Typography>

          <Typography className="mb-[16px] text-lg font-semibold">
            {t('my-properties.protection-booking')}
          </Typography>

          <Flex className="mb-[16px] gap-[8px]">
            <Switch
              checkedChildren="|"
              unCheckedChildren="0"
              checked={form.watch('schedule.protectionBooking')}
              onChange={(e) => form.setValue('schedule.protectionBooking', e)}
              style={{
                backgroundColor: form.watch('schedule.protectionBooking') ? '#65C466' : '#E9E9EA',
              }}
            />
            {form.watch('schedule.protectionBooking') ? (
              <Typography className="text-[#777E90]">{t('my-properties.enabled')}</Typography>
            ) : (
              <Typography className="text-[#777E90]">{t('my-properties.disabled')}</Typography>
            )}
          </Flex>

          <Typography className="text-base font-normal text-[#777E90]">
            {t('my-properties.protection-booking-description')}
          </Typography>

          <Flex className="mt-[24px] justify-end gap-[32px]">
            <Button
              aria-label={t('my-properties.cancel')}
              className="h-[auto] rounded-[16px] border-0 bg-[#F8F8FA] p-[16px_48px] text-base text-[#777E90]"
              onClick={() => setCancellationPolicy(false)}
            >
              {t('my-properties.cancel')}
            </Button>

            <Button
              aria-label={t('my-properties.save-changes')}
              className="h-[auto] rounded-[16px] border-0 bg-[#3276FF] p-[16px_48px] text-base text-[#FFFFFF]"
              onClick={() => setCancellationPolicy(false)}
            >
              {t('my-properties.save-changes')}
            </Button>
          </Flex>
        </Flex>
      </CustomModal>

      <CustomModal
        width={1073}
        modalTitle={t('my-properties.discounted-price-2-modal')}
        open={differentPricing}
        onOk={() => setDifferentPricing(false)}
        onCancel={() => setDifferentPricing(false)}
      >
        <Flex vertical>
          <Typography className="mb-[8px] text-base font-normal">
            {t('my-properties.recommendations-sizes-discounts')}
          </Typography>

          <Typography className="mb-[24px] text-base font-normal">
            {t('my-properties.recommendations-sizes-discounts-description')}
          </Typography>

          <Flex className="mb-[24px] gap-[8px]">
            <Switch
              checkedChildren="|"
              unCheckedChildren="0"
              checked={form.watch('schedule.isEnabledDifferentPricing')}
              onChange={(e) => form.setValue('schedule.isEnabledDifferentPricing', e)}
            />
            {form.watch('schedule.isEnabledDifferentPricing') ? (
              <Typography className="text-[#777E90]">{t('my-properties.enabled')}</Typography>
            ) : (
              <Typography className="text-[#777E90]">{t('my-properties.disabled')}</Typography>
            )}
          </Flex>

          <Flex>
            <table className="w-full border">
              <tbody>
                <tr>
                  <th className="border p-[12px_20px] text-start font-medium text-[#777E90]">
                    {t('my-properties.capacity')}
                  </th>
                  <th className="border p-[12px_20px] text-start font-medium text-[#777E90]">
                    {t('my-properties.discount')}
                  </th>
                  <th className="border p-[12px_20px] text-start font-medium text-[#777E90]">
                    {t('my-properties.guests-pay')}
                  </th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="border p-[23px_20px] text-start text-lg font-medium text-[#232E40]">
                    {t('my-properties.guests-2')}
                  </td>
                  <td className="border p-[23px_20px] text-start text-lg font-medium text-[#232E40]">
                    <InputNumber
                      className="flex h-[53px] w-full items-center rounded-2xl border-none !bg-[#F8F8FA] px-4 !text-primary-dark"
                      disabled={!form.watch('schedule.isEnabledDifferentPricing')}
                      defaultValue={0}
                      value={form.watch('schedule.discount.forTwoPlus') ?? 0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value: any) => value!.replace('%', '')}
                      onChange={(value) => form.setValue('schedule.discount.forTwoPlus', value)}
                    />
                  </td>
                  <td className="border p-[23px_20px] text-start text-lg font-medium text-[#232E40]">
                    {Math.round(
                      (form.watch('schedule.price') ?? 0) -
                        ((form.watch('schedule.price') ?? 0) *
                          (form.watch('schedule.discount.forTwoPlus') ?? 0)) /
                          100
                    )}{' '}
                    {
                      currencies?.find(
                        (currency: any) => currency.value === form.watch('schedule.currency')
                      )?.label
                    }
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="border p-[23px_20px] text-start text-lg font-medium text-[#232E40]">
                    {t('my-properties.guests-1')}
                  </td>
                  <td className="border p-[23px_20px] text-start text-lg font-medium text-[#232E40]">
                    <InputNumber
                      className="flex h-[53px] w-full items-center rounded-2xl border-none !bg-[#F8F8FA] px-4 !text-primary-dark"
                      disabled={!form.watch('schedule.isEnabledDifferentPricing')}
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value: any) => value!.replace('%', '')}
                      onChange={(value) => form.setValue('schedule.discount.forOne', value)}
                      value={form.watch('schedule.discount.forOne') ?? 0}
                    />
                  </td>
                  <td className="border p-[23px_20px] text-start text-lg font-medium text-[#232E40]">
                    {Math.round(
                      (form.watch('schedule.price') ?? 0) -
                        ((form.watch('schedule.price') ?? 0) *
                          (form.watch('schedule.discount.forOne') ?? 0)) /
                          100
                    )}{' '}
                    {
                      currencies?.find(
                        (currency: any) => currency.value === form.watch('schedule.currency')
                      )?.label
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </Flex>

          <Flex className="mt-[24px] justify-end gap-[32px]">
            <Button
              aria-label={t('my-properties.cancel')}
              className="h-[auto] rounded-[16px] border-0 bg-[#F8F8FA] p-[16px_48px] text-base text-[#777E90]"
              onClick={() => setDifferentPricing(false)}
            >
              {t('my-properties.cancel')}
            </Button>

            <Button
              aria-label={t('my-properties.save-changes')}
              className="h-[auto] rounded-[16px] border-0 bg-[#3276FF] p-[16px_48px] text-base text-[#FFFFFF]"
              onClick={() => setDifferentPricing(false)}
            >
              {t('my-properties.save-changes')}
            </Button>
          </Flex>
        </Flex>
      </CustomModal>
    </Flex>
  )
}

export default ScheduleSecondStep
