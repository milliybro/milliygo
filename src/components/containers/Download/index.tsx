import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Card, Col, Flex, Row, Typography } from 'antd'

import usePreferencesStore from '@/store/preferences'

import PlayMarketImage from '../../icons/playmarket'
import AppStoreImage from '../../icons/appstore'

import shape from '@/assets/download-shape.svg'
import phones from '@/assets/download-app-tiny.png'

const Download = () => {
  const t = useTranslations('download')
  const { preferences } = usePreferencesStore((store) => store)

  const appstore = preferences?.find((val) => val.key === 'app_store')
  const playmarket = preferences?.find((val) => val.key === 'play_market')

  return (
    <div className="container mb-[100px] mt-52 dmd:hidden">
      <Card
        variant="borderless"
        className="relative rounded-[40px] bg-primary shadow-none"
        rootClassName="custom-card-body"
        style={{ padding: '60px 80px' }}
      >
        <Image
          src={shape}
          width={631}
          height={597}
          alt="shape"
          style={{
            width: 631,
            height: 597,
            position: 'absolute',
            top: '-40%',
            pointerEvents: 'none',
            left: '-15%',
            transform: 'scale(1.5)',
          }}
          unoptimized
        />
        <Row>
          <Col span={12}>
            <Flex vertical className="h-full">
              <Typography.Title level={2} className="text-white">
                {t('title')}
              </Typography.Title>
              <Typography.Text className="mb-8 whitespace-pre-wrap text-[18px] text-white">
                {t('subtitle')}
              </Typography.Text>
              <Flex gap={24}>
                <a target="_blank" rel="noreferrer" href={playmarket?.description}>
                  <PlayMarketImage className="text-[56px]" />
                </a>
                <a target="_blank" rel="noreferrer" href={appstore?.description}>
                  <AppStoreImage className="text-[56px]" />
                </a>
              </Flex>
            </Flex>
          </Col>
          <Col span={10}></Col>
        </Row>
        <Image
          src={phones}
          alt="phones"
          width={465}
          style={{
            position: 'absolute',
            right: 50,
            bottom: 0,
            width: 550,
            height: 'auto',
          }}
          unoptimized
        />
      </Card>
    </div>
  )
}

export default Download
