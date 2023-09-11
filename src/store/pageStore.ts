import {
  currentPageAction,
  currentPageState,
  perPageAction,
  perPageState,
} from "@/types/page";
import { create } from "zustand";

export const useCurrentPageStore = create<currentPageState & currentPageAction>(
  (set) => ({
    currentPage: 1,
    prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
    nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  })
);

export const usePerPageStore = create<perPageState & perPageAction>((set) => ({
  perPage: "30",
  setPerPage: (page: string) => set({ perPage: page }),
}));
