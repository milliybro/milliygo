import { Card, Flex } from 'antd'

const RegionCardSkeleton = () => {
  return (
    <Card variant="borderless" className="rounded-2xl" styles={{ body: { padding: 4 } }}>
      <Flex vertical gap={24}>
        <div className="flex items-start gap-3 rounded-2xl bg-secondary-light p-4">
          <div className="h-[24px] min-w-[24px] bg-secondary/50 mb-2 mt-1 animate-pulse rounded-3xl" />
          <Flex vertical className="w-full">
            <div className="h-[13px] w-[50%] bg-secondary/50 my-2 animate-pulse rounded-3xl" />
            <div className="h-[13px] w-[25%] bg-secondary/50 mt-2 animate-pulse rounded-3xl" />
          </Flex>
        </div>
        <Flex vertical className="px-4 pb-4" gap={16}>
          <Flex vertical>
            <div className="h-[13px] w-[50%] bg-secondary/50 mb-2 animate-pulse rounded-3xl" />
            <div className="h-[13px] w-full bg-secondary/50 mb-2 animate-pulse rounded-3xl" />
            <div className="h-[13px] w-full bg-secondary/50 mb-2 animate-pulse rounded-3xl" />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default RegionCardSkeleton
