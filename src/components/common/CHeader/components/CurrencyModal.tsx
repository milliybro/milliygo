import { useQuery } from '@tanstack/react-query'
import { Button, Flex, Typography } from 'antd'
import { memo, useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'

import { getCurrencies } from '@/api'
import useCurrencyStore from '@/store/currency'

import CustomModal from '@/components/common/CModal'

import type { FC } from 'react'
import { useTranslations } from 'next-intl'
import ArrowDown from '@/components/icons/arrow-down'

const CurrencyModal: FC<{ light?: boolean }> = ({ light }) => {
  const { currency, updateCurrency, setAllCurrencies } = useCurrencyStore((state) => state)
  const [watchCurrencyModal, setWatchCurrencyModal] = useState(false)
  const t = useTranslations()
  const currencyCookie = getCookie('currency')

  const { data: currenciesResponse } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const res = await getCurrencies()
      return res
    },
  })

  useEffect(() => {
    if (currencyCookie) {
      updateCurrency(JSON.parse(currencyCookie))
    } else if (Array.isArray(currenciesResponse) && currenciesResponse.length > 0) {
      updateCurrency(
        currenciesResponse.find((val) => val?.short_name === 'UZS') ||
          currenciesResponse.reduce((prev, curr) => (prev.id < curr.id ? prev : curr))
      )
    }

    setAllCurrencies(currenciesResponse || [])
  }, [currencyCookie, updateCurrency, currenciesResponse, setAllCurrencies])

  return (
    <>
      <Button
        type="text"
        size="middle"
        className={`notranslate flex h-[42px] items-center justify-center gap-2 rounded-[12px] p-0 text-[14px] font-medium dmd:p-0 dmd:px-0 ${
          light ? 'text-primary-dark' : 'text-white dmd:text-[#0c0c0c]'
        }`}
        onClick={() => setWatchCurrencyModal(true)}
        aria-label="watch currency"
      >
        {currency?.short_name}
        <div className="hidden dmd:inline">{currency?.name}</div>
        <ArrowDown className="text-[14px]" />
      </Button>
      <CustomModal
        width={950}
        modalTitle={t('others.select-currency')}
        modalDesc={t('others.select-currency-desc')}
        open={watchCurrencyModal}
        onOk={() => setWatchCurrencyModal(false)}
        onCancel={() => setWatchCurrencyModal(false)}
        closable={watchCurrencyModal}
      >
        <Flex vertical>
          <Typography.Title level={4}>{t('others.recommended-currencies')}</Typography.Title>
          <div className="notranslate mb-6 grid grid-cols-3 gap-6 dmd:grid-cols-2 dxs:grid-cols-1">
            {currenciesResponse
              ?.sort((a: any, b: any) => a.id - b.id)
              ?.map((val: any, i: number) => (
                <Button
                  key={'currencies-item-' + val?.short_name + i}
                  size="large"
                  className={`flex h-[80px] flex-col gap-2 rounded-lg hover:border-primary ${
                    val?.id === currency?.id ? '' : 'border-transparent'
                  }`}
                  onClick={() => {
                    setCookie('currency', val)
                    setWatchCurrencyModal(false)
                  }}
                  aria-label="watch currency"
                >
                  <span className="text-secondary">{val?.name}</span>
                  <span className="font-medium">{val?.short_name}</span>
                </Button>
              ))}
          </div>
        </Flex>
      </CustomModal>
    </>
  )
}

export default memo(CurrencyModal)
