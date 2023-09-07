import { searchKeywordAction, searchKeywordState } from "@/types/Issue";
import { create } from "zustand";

export const useSearchKeyword = create<
  searchKeywordState & searchKeywordAction
>((set) => ({
  searchKeyword: "",
  setSearchKeyword: (keyword: string) =>
    set(() => ({ searchKeyword: keyword })),
}));
