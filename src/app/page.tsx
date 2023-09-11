import IssueClient from "@/service/issueClient";
import IssueTable from "./components/IssueTable";
import SearchHeader from "./components/SearchHeader";
import Pagination from "./components/Pagination";

const issueClient = new IssueClient();

export default async function Home() {
  const columns = await issueClient.getCategory();

  return (
    <div className="flex flex-col gap-5 border border-zinc-300 rounded-xl p-8 mx-10 my-10 overflow-y-auto">
      <SearchHeader />
      <IssueTable columns={columns} />
      <Pagination />
    </div>
  );
}
