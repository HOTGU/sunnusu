import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: (currentIsOpen: boolean) => void;
}

export default create<UploadModalStore>((set) => {
  return {
    isOpen: false,
    onOpen: () => {
      set({ isOpen: true });
    },
    onClose: () => {
      set({ isOpen: false });
    },
    onToggle: (currentIsOpen) => {
      set({ isOpen: !currentIsOpen });
    },
  };
});
