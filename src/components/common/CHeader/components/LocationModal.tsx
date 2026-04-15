import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Typography, message, Space, AutoComplete, Input } from 'antd'
import { YMaps, Map, Placemark, Polygon, ZoomControl, GeolocationControl, useYMaps } from '@pbe/react-yandex-maps'
import { EnvironmentOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { SERVICE_AREA, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '@/constants/location'
import { checkServiceArea } from '@/helpers/location-helper'
import { useLocationStore } from '@/store/useLocationStore'
import { LocationService, YandexAddressOption } from '@/services/location-service'
import { YANDEX_API_KEY } from '@/constants/api-keys'

interface LocationModalProps {
  open: boolean
  onClose: () => void
}

const TASHKENT_BOUNDS: [[number, number], [number, number]] = [
  [41.1, 69.1],
  [41.5, 69.5],
]

const LocationModalContent: React.FC<LocationModalProps> = ({ open, onClose }) => {
  const { location, setLocation, setIsInServiceArea } = useLocationStore()
  const ymaps = useYMaps(['geocode'])

  const [tempCoords, setTempCoords] = useState<[number, number]>(
    location ? [location.lat, location.lng] : (DEFAULT_MAP_CENTER as [number, number])
  )
  const [address, setAddress] = useState<string>(location?.address || '')
  const [isValid, setIsValid] = useState<boolean>(
    location ? checkServiceArea(location.lat, location.lng) : false
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<YandexAddressOption[]>([])

  const geocodeCoords = async (lat: number, lng: number): Promise<string> => {
    if (!ymaps) return 'Yuklanmoqda...'
    try {
      const result = await ymaps.geocode([lat, lng], { results: 1 })
      const firstGeoObject = result.geoObjects.get(0)
      const addressLine = firstGeoObject ? firstGeoObject.getAddressLine() : ''
      
      // Agar manzil aniqlanmasa yoki juda qisqa bo'lsa, G'allaorol deb qaytaramiz
      if (!addressLine || addressLine === "Noma'lum manzil") {
        return "G'allaorol"
      }
      return addressLine
    } catch (error) {
      console.error('Geocoding error:', error)
      return "G'allaorol"
    }
  }

  const onSearch = async (searchText: string) => {
    if (!ymaps || searchText.length < 3) return
    setLoading(true)
    try {
      const result = await ymaps.geocode(searchText, {
        boundedBy: TASHKENT_BOUNDS,
        strictBounds: false,
        results: 7,
      })
      const results: YandexAddressOption[] = []
      result.geoObjects.each((obj: any) => {
        results.push({
          label: obj.getAddressLine(),
          value: obj.getAddressLine(),
          coords: obj.geometry.getCoordinates() as [number, number],
        })
      })
      setOptions(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSelectAddress = (value: string, option: any) => {
    if (option?.coords) {
      const coords: [number, number] = option.coords
      setTempCoords(coords)
      setAddress(value)
      setIsValid(checkServiceArea(coords[0], coords[1]))
    }
  }

  const handleMapClick = useCallback(
    async (e: any) => {
      const coords = e.get('coords') as [number, number]
      const inArea = checkServiceArea(coords[0], coords[1])

      setTempCoords(coords)
      setIsValid(inArea)
      setLoading(true)

      const addr = await geocodeCoords(coords[0], coords[1])
      setAddress(addr)
      setLoading(false)

      if (!inArea) {
        message.warning("Tanlangan hudud xizmat doirasidan tashqarida")
      }
    },
    [ymaps]
  )
  const handleConfirm = () => {
    if (!isValid) {
      message.error("Kechirasiz, bu hududda xizmat ko'rsata olmaymiz")
      return
    }
    setLocation({
      lat: tempCoords[0],
      lng: tempCoords[1],
      address: address || 'Tanlangan manzil',
    })
    setIsInServiceArea(true)
    message.success('Manzil muvaffaqiyatli saqlandi')
    onClose()
  }

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const coords: [number, number] = [latitude, longitude]
        setTempCoords(coords)
        setIsValid(checkServiceArea(latitude, longitude))
        const addr = await geocodeCoords(latitude, longitude)
        setAddress(addr)
        setLoading(false)
      },
      () => {
        message.error("Joylashuvni aniqlab bo'lmadi")
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    if (open && location) {
      setTempCoords([location.lat, location.lng])
      setAddress(location.address || '')
      setIsValid(checkServiceArea(location.lat, location.lng))
    }
  }, [open, location])

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        {/* <AutoComplete
          style={{ width: '100%' }}
          onSearch={onSearch}
          onSelect={onSelectAddress}
          options={options}
        >
          <Input.Search
            size="large"
            placeholder="Manzilni qidiring"
            loading={loading}
            enterButton
          />
        </AutoComplete> */}
      </div>

      <div
        style={{
          position: 'relative',
          height: '450px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #eee',
        }}
      >
        <Map
          state={{ center: tempCoords, zoom: DEFAULT_MAP_ZOOM }}
          width="100%"
          height="100%"
          onClick={handleMapClick}
          options={{ suppressMapOpenBlock: true }}
        >
          <Polygon
            geometry={[SERVICE_AREA.map((p) => [p[1], p[0]])]}
            onClick={handleMapClick}
            options={{
              fillColor: 'rgba(230, 81, 0, 0.08)',
              strokeColor: '#E65100',
              strokeOpacity: 0.8,
              strokeWidth: 2,
              fillOpacity: 1,
            }}
          />
          <Placemark
            geometry={tempCoords}
            options={{
              preset: 'islands#dotIcon',
              iconColor: isValid ? '#E65100' : '#ff4d4f',
            }}
          />
          <ZoomControl options={{ position: { right: 20, top: 108 } }} />
          <GeolocationControl options={{ position: { right: 20, top: 180 } }} />
        </Map>

        {!isValid && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              padding: '10px 20px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #ffccc7',
            }}
          >
            <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '18px' }} />
            <Typography.Text strong style={{ color: '#ff4d4f' }}>
              Xizmat doirasidan tashqarida
            </Typography.Text>
          </div>
        )}

        <Button
          icon={<EnvironmentOutlined />}
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '20px',
            zIndex: 100,
            borderRadius: '10px',
            height: '40px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          onClick={handleCurrentLocation}
        >
          Mening joylashuvim
        </Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Typography.Text
            type="secondary"
            style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            Tanlangan manzil
          </Typography.Text>
          <div
            style={{
              marginTop: '4px',
              padding: '12px',
              background: '#f5f5f5',
              borderRadius: '8px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {loading ? (
              <Typography.Text italic>Aniqlanmoqda...</Typography.Text>
            ) : address ? (
              <Typography.Text strong>{address}</Typography.Text>
            ) : (
              <Typography.Text type="secondary">Xarita orqali manzilni tanlang</Typography.Text>
            )}
          </div>
        </div>

        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button size="large" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            type="primary"
            size="large"
            disabled={!isValid || loading}
            onClick={handleConfirm}
            style={{
              background: isValid ? '#111' : '#ccc',
              borderColor: isValid ? '#111' : '#ccc',
              height: '46px',
              padding: '0 32px',
              fontWeight: 600,
            }}
          >
            Tasdiqlash
          </Button>
        </Space>
      </div>
    </>
  )
}

const LocationModal: React.FC<LocationModalProps> = (props) => {
  return (
    <Modal
      title={
        <Space>
          <EnvironmentOutlined style={{ color: '#E65100' }} />
          <span>Yetkazib berish hududini tanlang</span>
        </Space>
      }
      open={props.open}
      onCancel={props.onClose}
      footer={null}
      width={900}
      centered
      className="location-modal"
      styles={{ body: { padding: '24px' } }}
    >
      <YMaps query={{ apikey: YANDEX_API_KEY, lang: 'uz_UZ' }}>
        <LocationModalContent {...props} />
      </YMaps>
    </Modal>
  )
}

export default LocationModal