import { StarFilled } from '@ant-design/icons'
import { Divider, Flex, Typography } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'

const ObjectReviewItem = ({ item }: any) => {
  return (
    <>
      <Flex vertical gap={16}>
        <Flex gap={16}>
          <Flex className="min-w-[40px] rounded-[8px] overflow-hidden">
            <Image
              src={item?.placement?.image}
              alt={item?.placement?.name}
              height={40}
              width={40}
              unoptimized
            />
          </Flex>

          <Flex vertical gap={4} className="w-full">
            <Flex>
              <Typography.Title level={5} className="font-normal text-sm text-[#232E40] m-0">
                {item?.placement?.name}
              </Typography.Title>
            </Flex>
            <Flex>
              <Typography.Text className="font-normal text-sm text-[#B7BFD5]">
                {item?.placement?.address}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex gap={8}>
          <Flex className="flex items-center gap-[4px]">
            {[...Array(5)].map((_, index) => (
              <StarFilled
                key={index}
                style={{ color: item?.rating > index ? '#FFB800' : '#B7BFD5' }}
              />
            ))}
          </Flex>

          <Flex>
            <Typography.Text className="text-[#232E40] font-normal text-sm">
              {dayjs(item?.created_at).format('DD.MM.YYYY')}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex>
          <Typography.Text className="text-[#232E40] font-normal text-base">
            {item?.review}
          </Typography.Text>
        </Flex>

        <Flex gap={16}>
          <Flex className="w-[40px] min-w-[40px] h-[40px] overflow-hidden rounded-full relative">
            <Image
              src={item?.user?.avatar ? item?.user?.avatar : '/images/avatar.png'}
              alt="Profile picture"
              fill
              unoptimized
            />
          </Flex>

          <Flex vertical>
            <Flex>
              <Typography.Title level={5} className="font-normal text-sm text-[#232E40] m-0">
                {item?.user?.first_name}
              </Typography.Title>
            </Flex>
            <Flex>
              <Typography.Text className="font-normal text-sm text-[#B7BFD5]">
                {item?.user?.country}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Divider className="m-0" />
    </>
  )
}

export default ObjectReviewItem
