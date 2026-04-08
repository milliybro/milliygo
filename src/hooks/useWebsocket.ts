import { ConnectionStatus } from '@/types/websocket'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface WebSocketState {
  connectionStatus: ConnectionStatus
  webSocket: WebSocket | null
  error: Error | null
}

interface WebSocketActions {
  setWebSocket: (_ws: WebSocket | null) => void
  setConnectionStatus: (_status: ConnectionStatus) => void
  setError: (_error: Error | null) => void
  initializeWebSocket: (_type: 'support' | 'complaint', _token: string, _chatRoomId: number) => void
  closeWebSocket: () => void
}

type WebSocketStore = WebSocketState & WebSocketActions

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL

if (!WEBSOCKET_URL) {
  throw new Error('WebSocket URL not defined in environment variables')
}

const useWebSocket = create<WebSocketStore>()(
  devtools((set, get) => ({
    connectionStatus: 'disconnected',
    webSocket: null,
    error: null,

    setWebSocket: (ws) => set({ webSocket: ws }),
    setConnectionStatus: (status) => set({ connectionStatus: status }),
    setError: (error) => set({ error }),

    initializeWebSocket: (type, token, chatRoomId) => {
      const { closeWebSocket } = get()
      closeWebSocket()

      try {
        const url = `${WEBSOCKET_URL}/${type}/?token=${token}&chat_room=${chatRoomId}`
        const ws = new WebSocket(url)

        ws.onopen = () => {
          get().setConnectionStatus('connected')
          get().setError(null)
        }

        ws.onclose = () => {
          get().setConnectionStatus('disconnected')
          get().setWebSocket(null)

          setTimeout(() => get().initializeWebSocket(type, token, chatRoomId), 3000)
        }

        ws.onerror = (error) => {
          get().setConnectionStatus('error')
          get().setError(error instanceof Error ? error : new Error('WebSocket error'))
        }

        get().setWebSocket(ws)
      } catch (error) {
        get().setError(error instanceof Error ? error : new Error('WebSocket initialization error'))
      }
    },

    closeWebSocket: () => {
      const { webSocket } = get()
      if (webSocket) {
        webSocket.close()
        set({ webSocket: null })
      }
    },
  }))
)

export default useWebSocket
