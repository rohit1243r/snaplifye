import { create } from "zustand";

const useLeadDialog = create((set) => ({
  isOpen: false,
  lead: null,

  open: (lead) =>
    set({
      isOpen: true,
      lead,
    }),

  close: () =>
    set({
      isOpen: false,
      lead: null,
    }),
}));

export default useLeadDialog;