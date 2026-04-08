import { Button, DatePicker, Divider, Form, Input, Select, Typography } from 'antd'

import DeleteIcon from '@/components/icons/delete'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

const ForthContent = () => {
  const t = useTranslations()

  let currentLang = localStorage.getItem('i18nextLng') || 'ru'

  if (currentLang === 'uz') {
    currentLang = 'uz-cyrillic'
  } else if (currentLang === 'oz') {
    currentLang = 'uz-latin'
  }

  return (
    <div className="flex h-full max-h-[635px] flex-col overflow-auto">
      <Typography.Text className="text-[18px] font-medium">
        {t('my-properties.child-info')}
      </Typography.Text>
      <Divider />

      <Form.List name="children">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} className="mb-4 grid grid-cols-3 gap-4">
                <Form.Item
                  name={[name, 'full_name']}
                  fieldKey={[fieldKey ?? 0, 'full_name']}
                  label={t('my-properties.child-full-name')}
                  {...restField}
                >
                  <Input type="text" placeholder={t('my-properties.select')} size="large" />
                </Form.Item>

                <Form.Item
                  label={t('personal-information.birth-date')}
                  name={[name, 'birth_date']}
                  fieldKey={[fieldKey ?? 0, 'birth_date']}
                  {...restField}
                >
                  <DatePicker
                    format={{
                      format: 'DD.MM.YYYY',
                      type: 'mask',
                    }}
                    placeholder={t('tours.date')}
                    size="large"
                    className="h-[47px] w-full px-4"
                  />
                </Form.Item>

                <Form.Item
                  label={t('personal-information.sex')}
                  name={[name, 'gender']}
                  fieldKey={[fieldKey ?? 0, 'gender']}
                  {...restField}
                >
                  <Select
                    size="large"
                    allowClear
                    options={[
                      { value: 'male', label: t('genders.man') },
                      { value: 'female', label: t('genders.woman') },
                    ]}
                    placeholder={t('my-properties.select')}
                  />
                </Form.Item>

                <Button danger type="text" onClick={() => remove(name)}>
                  <DeleteIcon className="text-[20px]" />
                </Button>
              </div>
            ))}

            <Button
              type="dashed"
              className="flex w-full items-center justify-center border-primary text-base font-medium text-primary"
              onClick={add}
            >
              <PlusCircleOutlined />
              {t('my-properties.add-more')}
            </Button>
          </>
        )}
      </Form.List>
    </div>
  )
}

export default memo(ForthContent)
