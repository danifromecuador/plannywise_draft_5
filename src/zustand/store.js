import { create } from 'zustand'

export const useStore = create((set) => ({
  bears: 20,
  inc: () => set((state) => ({ bears: state.bears + 1 })),
}))

