import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  title: "",
  description: "",
  onConfirm: null,

  openModal: (data) =>
    set({
      isOpen: true,
      ...data,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      title: "",
      description: "",
      onConfirm: null,
    }),
}));

export default useModalStore;
