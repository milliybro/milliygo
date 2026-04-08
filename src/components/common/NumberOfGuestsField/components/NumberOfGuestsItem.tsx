import { memo } from 'react'
import { Button, Flex, Typography } from 'antd'

import RemoveCircle2Icon from '@/components/icons/remove-circle2'
import AddCircle2Icon from '@/components/icons/add-circle'

import type { FC } from 'react'

const { Text } = Typography

interface IProps {
  title: string
  info: string
  count: number
  addDisable: boolean
  removeDisable: boolean
  onAddClick: () => void
  onRemoveClick: () => void
}

const NumberOfGuestsItem: FC<IProps> = ({
  title,
  info,
  count,
  addDisable,
  removeDisable,
  onAddClick,
  onRemoveClick,
}) => {
  const removeHandler = () => {
    onRemoveClick()
  }

  const addHandler = () => {
    onAddClick()
  }

  return (
    <Flex justify="space-between">
      <Flex vertical>
        <Text className="text-base font-semibold">{title}</Text>
        <Text className="text-sm text-secondary">{info}</Text>
      </Flex>
      <Flex align="center" justify="space-between" className="max-w-[86px] notranslate w-full">
        <Button
          aria-label="remove guest"
          size="small"
          shape="circle"
          type="text"
          className="text-2xl flex disabled:bg-white disabled:opacity-30 items-center justify-center text-secondary/50"
          onClick={removeHandler}
          disabled={removeDisable}
        >
          <RemoveCircle2Icon className="text-[22px]" />
        </Button>
        <Text className="whitespace-nowrap">{count}</Text>
        <Button
          aria-label="add route"
          size="small"
          shape="circle"
          type="text"
          className="text-2xl flex items-center justify-center text-secondary/50"
          onClick={addHandler}
          disabled={addDisable}
        >
          <AddCircle2Icon />
        </Button>
      </Flex>
    </Flex>
  )
}

export default memo(NumberOfGuestsItem)
