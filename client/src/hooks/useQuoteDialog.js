import { create } from "zustand";

const useQuoteDialog = create((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),
}));

export default useQuoteDialog;