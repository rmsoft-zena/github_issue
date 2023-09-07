import { Issue, ResIssue } from "@/types/Issue";

export default class IssueClient {
  private httpClient;
  constructor() {
    this.httpClient = "https://api.github.com/repos/facebook/react/issues";
  }

  public async getIssues(): Promise<Issue[]> {
    const res: ResIssue[] = await fetch(this.httpClient, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }).then((res) => res.json());
    const data = res.map((issue) => ({
      number: issue.number,
      state: issue.state,
      title: issue.title,
      author: issue.user.login,
      created_at: issue.created_at,
      comments: issue.comments,
      contents: issue.body,
      photoUrl: issue.user.avatar_url,
    }));
    return data;
  }

  public async getIssue(number: number): Promise<Issue> {
    const issues = await this.getIssues();
    const issue = issues.find((issue) => issue.number === number);
    return issue!;
  }

  public async getCategory(): Promise<string[]> {
    const issues = await this.getIssues();
    const categories = Object.keys(issues[0]).filter(
      (el) => el !== "contents" && el !== "photoUrl"
    );
    return categories;
  }
}
