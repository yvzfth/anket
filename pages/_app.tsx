import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

import { Toaster } from 'react-hot-toast';
import { VoteContext } from '../context/VoteContext';
import { IResult } from '../types';
import { CityContext } from '../context/CityContext';
import cities from '../lib/cities';

function MyApp({ Component, pageProps }: AppProps) {
  const [city, setCity] = React.useState<string | undefined>();
  const getLocation = async () => {
    await axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACTAPI_API_KEY}&fields=city`
      )
      .then((response: any) => {
        setCity(cities[String(response.data.city)]);
      })
      .catch((error: any) => {
        console.log(error);
      });
    // if (!navigator.geolocation) {

    //   setStatus('Geolocation is not supported by your browser');
    //   setStatus('Locating...');
    //   axios
    //     .get(
    //       `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACTAPI_API_KEY}&fields=city`
    //     )
    //     .then((response: any) => {
    //       setCity(cities[String(response.data.city)]);
    //     })
    //     .catch((error: any) => {
    //       console.log(error);
    //     });
    // } else {
    //   setStatus('Locating...');
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setLat(position.coords.latitude);
    //       setLon(position.coords.longitude);
    //     },
    //     (err) => {
    //       setStatus(err.message);
    //       setStatus('Locating...');
    //       axios
    //         .get(
    //           `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACTAPI_API_KEY}&fields=city`
    //         )
    //         .then((response: any) => {
    //           setCity(cities[String(response.data.city)]);
    //         })
    //         .catch((error: any) => {
    //           console.log(error);
    //         });
    //     }
    //   );
    // }
  };
  if (typeof city === 'undefined') getLocation();

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
      <CityContext.Provider value={city}>
        <Toaster />
        <Component {...pageProps} />
      </CityContext.Provider>
    </VoteContext.Provider>
  );
}

export default MyApp;
