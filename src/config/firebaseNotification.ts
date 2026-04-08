import { getApp, getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const notificationConfig = {
  apiKey: 'AIzaSyB90EHd0x7VfsFSVktSzvCJhLKCsyJdC5E',
  authDomain: 'myuzbekistan-34339.firebaseapp.com',
  projectId: 'myuzbekistan-34339',
  messagingSenderId: '598826341312',
  appId: '1:598826341312:web:5aabe88821049183b7ee25',
}

const app = !getApps().length ? initializeApp(notificationConfig) : getApp()

const messaging = typeof window !== 'undefined' ? getMessaging(app) : null

export async function getFcmToken(): Promise<string | null> {
  if (!messaging) return null // SSRda xatolik bo‘lmasligi uchun

  try {
    const token = await getToken(messaging, {
      vapidKey:
        'BELvXYw6d13OKlKHom1krun3ylDx-KNKs8dtO52deWpXB6A2el82Yh-NGNrCXPJzItxTnjWAI09vk9by3cIWSms',
    })
    return token || null
  } catch (err) {
    console.error('FCM token olishda xatolik:', err)
    return null
  }
}
