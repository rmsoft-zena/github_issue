import React from "react";
import SearchForm from "./SearchForm";

export default function SearchHeader() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1>Welcome back!</h1>
        <h3 className="text-zinc-500">Here&apos;s a list of github issues!</h3>
      </div>
      <SearchForm />
    </div>
  );
}
