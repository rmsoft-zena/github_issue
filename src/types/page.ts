export type currentPageState = {
  currentPage: number;
};

export type currentPageAction = {
  prevPage: () => void;
  nextPage: () => void;
};

export type perPageState = {
  perPage: string;
};

export type perPageAction = {
  setPerPage: (page: string) => void;
};
