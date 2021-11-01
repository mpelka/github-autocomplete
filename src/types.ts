export type GHItemUser = {
  html_url: string;
  id: number;
  name: string;
  type: "user";
};

export type GHItemRepo = {
  html_url: string;
  id: number;
  name: string;
  type: "repo";
};

export type GHItem = GHItemUser | GHItemRepo;

export type Status = "idle" | "loading" | "success" | "error";
