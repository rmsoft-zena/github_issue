"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchKeyword } from "@/store/searchKeywordStore";
import { Issue } from "@/types/Issue";
import Link from "next/link";
import React from "react";

type Props = {
  columns: string[];
  data: Issue[];
};

export default function IssueTable({ columns, data }: Props) {
  const { searchKeyword } = useSearchKeyword();
  const issues = data.filter((issue) => issue.title.includes(searchKeyword));

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
        {issues.map(
          ({ number, state, title, author, created_at, comments }) => (
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
          )
        )}
      </TableBody>
    </Table>
  );
}
