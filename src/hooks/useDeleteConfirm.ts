import { create } from "zustand";

interface deleteConfirmStore {
  isOpen: boolean;
  target: string;
  onOpen: (target: string) => void;
  onClose: () => void;
}

const useDeleteConfirm = create<deleteConfirmStore>((set) => {
  return {
    isOpen: false,
    target: "",
    onOpen: (target: string) => set({ isOpen: true, target }),
    onClose: () => set({ isOpen: false, target: "" }),
  };
});

export default useDeleteConfirm;
