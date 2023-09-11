import { useCurrentPageStore, usePerPageStore } from "@/store/pageStore";

export default function usePage() {
  const { currentPage, prevPage, nextPage } = useCurrentPageStore();
  const { perPage, setPerPage } = usePerPageStore();
  const MaxIssue = 5000;
  const MaxPage = Math.ceil(MaxIssue / +perPage);
  return { currentPage, prevPage, nextPage, perPage, setPerPage, MaxPage };
}
