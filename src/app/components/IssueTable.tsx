"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePage from "@/hooks/usePage";
import IssueClient from "@/service/issueClient";
import { useSearchKeyword } from "@/store/searchKeywordStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  columns: string[];
};

const issueClient = new IssueClient();

export default function IssueTable({ columns }: Props) {
  const queryClient = useQueryClient();
  const { currentPage, perPage, MaxPage } = usePage();
  const { searchKeyword } = useSearchKeyword();

  const { data, isLoading, error, isPreviousData } = useQuery({
    queryKey: ["issue", currentPage, perPage],
    queryFn: () =>
      issueClient
        .getIssues(currentPage, +perPage)
        .then((data) =>
          data.filter((issue) => issue.title.includes(searchKeyword))
        ),
    keepPreviousData: true,
    staleTime: 5000,
  });
  console.log(isPreviousData);

  useEffect(() => {
    if (!isPreviousData && currentPage !== MaxPage) {
      queryClient.prefetchQuery({
        queryKey: ["issue", currentPage + 1, perPage],
        queryFn: () =>
          issueClient
            .getIssues(currentPage + 1, +perPage)
            .then((data) =>
              data.filter((issue) => issue.title.includes(searchKeyword))
            ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPreviousData, currentPage, queryClient, perPage]);

  if (isLoading) return <h1>Loading...💫</h1>;
  if (error) return <p>{error.toString()}</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow className="capitalize">
          {columns.map((column, index) => (
            <TableHead key={index}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(({ number, state, title, author, created_at, comments }) => (
          <TableRow key={number}>
            <TableCell>{number}</TableCell>
            <TableCell>{state}</TableCell>
            <TableCell>
              <Link href={`/issue/${number}`}>{title}</Link>
            </TableCell>
            <TableCell>{author}</TableCell>
            <TableCell>
              {new Date(created_at).toLocaleDateString("en-US")}
            </TableCell>
            <TableCell>{comments}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
