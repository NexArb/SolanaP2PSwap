import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ModalState, UserState } from '@/types/userStore.types'

export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  toggleModal: () => set((state) => ({ showModal: !state.showModal }))
}))

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null
    }),
    {
      name: 'auth'
      // skipHydration: true
    }
  )
)
