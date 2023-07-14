import { PostWithMetadata } from "@/types";
import { create } from "zustand";

interface UpdateModalStore {
  isOpen: boolean;
  target: PostWithMetadata | undefined;
  onOpen: (target: PostWithMetadata) => void;
  onClose: () => void;
}

export default create<UpdateModalStore>((set) => {
  return {
    isOpen: false,
    target: undefined,
    onOpen: (target: PostWithMetadata) => set({ isOpen: true, target }),
    onClose: () => set({ isOpen: false, target: undefined }),
  };
});
