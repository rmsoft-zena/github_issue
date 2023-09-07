import IssueDetail from "@/app/components/IssueDetail";
import IssueClient from "@/service/issueClient";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const issueClient = new IssueClient();

export default async function IssueDetailPage({ params: { slug } }: Props) {
  const number = +slug;
  const issue = await issueClient.getIssue(number);

  return (
    <div className="w-screen max-w-screen-2xl h-screen flex justify-center p-8 ">
      <IssueDetail issue={issue} />
    </div>
  );
}
