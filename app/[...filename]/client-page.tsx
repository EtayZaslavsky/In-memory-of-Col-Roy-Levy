"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "../../components/blocks";
import { Cover } from "../../components/hero-cover";
import { PageQuery } from "../../tina/__generated__/types";
import Head from "next/head";

interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}



export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });
  return (
    <>
      <Head>
        <title>{data?.page?.title}</title>
      </Head>
      <Cover image={data?.page?.hero ?? ''} title='לזכרו של אל״מ רועי לוי' description={data?.page?.description ?? ''} />
      <Blocks {...data?.page} />
    </>
  );
}
