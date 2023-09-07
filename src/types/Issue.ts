export type Issue = {
  number: number;
  state: "open" | "closed" | "all";
  title: string;
  author: string;
  created_at: string;
  comments: number;
  contents: string;
  photoUrl: string;
};

export type ResIssue = {
  number: number;
  state: "open" | "closed" | "all";
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  comments: number;
  body: string;
};

export type searchKeywordState = {
  searchKeyword: string;
};

export type searchKeywordAction = {
  setSearchKeyword: (keyword: string) => void;
};
