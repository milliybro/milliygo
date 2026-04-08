import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: number
    uuid: string
    name: string
    price: number
    image: string
    weight?: string
    quantity: number
    oldPrice?: number
    description?: string
}

export interface RestaurantInfo {
    id: string | number
    name: string
    slug: string
    image: string
    deliveryTime?: string
    rating?: number
}

export interface CartStoreData {
    items: CartItem[]
    restaurant?: RestaurantInfo
}

interface CartState {
    carts: Record<string, CartStoreData>
    addItem: (storeId: string, item: Omit<CartItem, 'quantity'>, restaurant?: RestaurantInfo) => boolean
    removeItem: (storeId: string, itemId: number) => void
    updateQuantity: (storeId: string, itemId: number, qty: number) => void
    clearCart: (storeId: string) => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            carts: {},

            addItem: (storeId, item, restaurant) => {
                const state = get()
                // Check if there's any OTHER store that has items
                const otherStoreWithItems = Object.keys(state.carts).find(
                    (id) => id !== storeId && (state.carts[id].items?.length || 0) > 0
                )

                console.log('AddItem check - carts:', Object.keys(state.carts), 'Conflict with:', otherStoreWithItems)

                if (otherStoreWithItems) {
                    return false
                }

                set((state) => {
                    const cartData = state.carts[storeId] || { items: [], restaurant }
                    const cartItems = cartData.items
                    const existing = cartItems.find((i) => i.id === item.id)
                    
                    const newItems = existing
                        ? cartItems.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        )
                        : [...cartItems, { ...item, quantity: 1 }]

                    return {
                        carts: {
                            ...state.carts,
                            [storeId]: {
                                ...cartData,
                                items: newItems,
                                ...(restaurant ? { restaurant } : {})
                            },
                        },
                    }
                })
                return true
            },

            removeItem: (storeId, itemId) =>
                set((state) => {
                    const cartData = state.carts[storeId]
                    if (!cartData) return state
                    
                    return {
                        carts: {
                            ...state.carts,
                            [storeId]: {
                                ...cartData,
                                items: cartData.items.filter((i) => i.id !== itemId),
                            },
                        },
                    }
                }),

            updateQuantity: (storeId, itemId, qty) =>
                set((state) => {
                    const cartData = state.carts[storeId]
                    if (!cartData) return state

                    const newItems = qty <= 0
                        ? cartData.items.filter((i) => i.id !== itemId)
                        : cartData.items.map((i) =>
                            i.id === itemId ? { ...i, quantity: qty } : i
                        )

                    return {
                        carts: {
                            ...state.carts,
                            [storeId]: {
                                ...cartData,
                                items: newItems,
                            },
                        },
                    }
                }),

            clearCart: (storeId) =>
                set((state) => {
                    const cartData = state.carts[storeId]
                    return {
                        carts: { 
                            ...state.carts, 
                            [storeId]: { ...cartData, items: [] } 
                        },
                    }
                }),
        }),
        { name: 'food-cart-storage' }
    )
)