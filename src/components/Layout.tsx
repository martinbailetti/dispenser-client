import Head from "next/head";
import React, { ReactNode } from "react";
import useBridge from "@/hooks/useBridge";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { useAppSelector } from "@/redux/hooks";
import MessageModal from "./common/MessageModal";
type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
  description: string;
};

export default function Layout({ children, pageTitle, description }: LayoutProps) {
  const appData = useAppSelector((state) => state.appData);
  const configData = useAppSelector((state) => state.configData);

  useBridge();

  return (
    <ErrorBoundary>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="#" />
      </Head>

      <main className="main">{children}</main>
      <audio id="winnerAudio" src={`${configData.audio_song}`} loop={true}  />
      {appData.message && <MessageModal />}
    </ErrorBoundary>
  );
}
