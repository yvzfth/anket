import '../styles/globals.css';
import type { AppProps } from 'next/app';

import axios from 'axios';
import useSWR from 'swr';

import { Toaster } from 'react-hot-toast';
import { VoteContext } from '../context/VoteContext';
import { IResult } from '../types';

function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => {
      return res.data;
    });
  const { data: votes } = useSWR<IResult[]>('/api/vote', fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return (
    <VoteContext.Provider value={votes}>
      <Toaster />
      <Component {...pageProps} />
    </VoteContext.Provider>
  );
}

export default MyApp;
