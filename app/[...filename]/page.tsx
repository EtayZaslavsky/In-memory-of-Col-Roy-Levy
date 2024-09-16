import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "./client-page";
import Layout from "../../components/layout/layout";
import { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: { filename: string[] };
}) {
  const data = await client.queries.page({
    relativePath: `${params.filename}.md`,
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data}></ClientPage>
    </Layout>
  );
}

// Dynamically set the metadata title based on the page data
export async function generateMetadata({
  params,
}: {
  params: { filename: string[] };
}): Promise<Metadata> {
  const data = await client.queries.page({
    relativePath: `${params.filename}.md`,
  });

  const title = data.data.page?.title || "רועי לוי"; // Fallback title
  const description = data.data.page?.description || 'אתר לזכר אל"מ רועי לוי';

  return {
    title,
    description
  };
}


export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();

  // Safely handle potential null or undefined
  const edges = pages?.data?.pageConnection?.edges || [];

  // Filter out edges where edge or edge.node is null or undefined
  const paths = edges
    .filter((edge) => edge !== null && edge !== undefined && edge.node !== null && edge.node !== undefined) // Check if edge and edge.node exist
    .map((edge) => ({
      filename: edge!.node!._sys.breadcrumbs, // Use non-null assertion after the check
    }));

  return paths;
}

