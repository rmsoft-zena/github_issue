"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import usePage from "@/hooks/usePage";

export default function Pagination() {
  const { currentPage, prevPage, nextPage, perPage, setPerPage, MaxPage } =
    usePage();

  const goPrevPage = () => {
    if (currentPage !== 1) {
      prevPage();
    }
  };
  const goNextPage = () => {
    if (currentPage !== MaxPage) {
      nextPage();
    }
  };

  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex items-center gap-3">
        <p>Rows per page</p>
        <Select value={perPage} onValueChange={(value) => setPerPage(value)}>
          <SelectTrigger className="w-28 rounded-xl border-zinc-300">
            <SelectValue placeholder="30" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((perPage) => (
              <SelectItem key={perPage} value={`${perPage}`}>
                {perPage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-5">
        <p>
          Page {currentPage} of {MaxPage}
        </p>
        <div className="flex gap-3">
          <Button
            className="rounded-full border-zinc-300 hover:bg-zinc-100"
            variant={"outline"}
            size={"icon"}
            onClick={goPrevPage}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="rounded-full border-zinc-300 hover:bg-zinc-100"
            variant={"outline"}
            size={"icon"}
            onClick={goNextPage}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
