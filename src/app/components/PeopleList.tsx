"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PeopleList() {
  const { ref, inView } = useInView({ threshold: 0 });
  const { fetchNextPage, hasNextPage, data, isLoading, isFetching, error } =
    useInfiniteQuery({
      queryKey: ["people"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `https://swapi.dev/api/people/?page=${pageParam}`
        ).then((res) => res.json());
        return { ...res, pageParam };
      },
      getNextPageParam: (lastPage) => lastPage.pageParam + 1,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) return <p>Loading....💫</p>;
  if (error) return <p>{error.toString()}</p>;
  return (
    <div className="flex flex-col items-center">
      {data?.pages.map((page) =>
        page?.results?.map(({ name }: { name: string }) => (
          <h2 key={name}>{name}</h2>
        ))
      )}
      <div ref={ref} />
      {isFetching && <p>fetching...</p>}
    </div>
  );
}
