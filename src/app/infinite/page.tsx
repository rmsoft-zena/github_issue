import PeopleList from "../components/PeopleList";

export default async function PeopleListPage() {
  return (
    <div className="w-screen bg-black flex flex-col items-center gap-8 text-amber-500 py-10">
      <h1>STAR WARS</h1>
      <PeopleList />
    </div>
  );
}
