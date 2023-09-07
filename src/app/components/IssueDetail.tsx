"use client";
import { Issue } from "@/types/Issue";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  issue: Issue;
};

export default function IssueDetail({
  issue: { photoUrl, number, title, author, created_at, contents, comments },
}: Props) {
  return (
    <div className="flex flex-col gap-10 p-10 py-32 rounded-xl border border-zinc-300">
      <div className="flex gap-8 justify-center items-center border-b-2 border-zinc-300 pb-10">
        <Image
          className="rounded-full"
          src={photoUrl}
          alt={author}
          width={70}
          height={70}
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 font-semibold text-xl">
            <p>#{number}</p>
            <p>{title}</p>
          </div>
          <div className="flex gap-3">
            <p>작성자 : {author}</p>
            <p>작성일 : {new Date(created_at).toLocaleDateString("ko-KR")}</p>
          </div>
        </div>
        <p>코멘트 : {comments}</p>
      </div>
      <div className="mx-auto">
        <ReactMarkdown
          className="prose"
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {contents}
        </ReactMarkdown>
      </div>
    </div>
  );
}
