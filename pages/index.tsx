import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { FormEvent } from 'react';
import React from 'react';
import { toast } from 'react-hot-toast';
// import cities from '../lib/cities';
import { VoteContext } from '../context/VoteContext';
import _ from 'lodash';
import { VoteOption } from '../types';

import CityCardContainer from '../components/CityCardContainer';
import { mutate } from 'swr';
import { Skeleton } from '@mui/material';
import { CityContext } from '../context/CityContext';
import cities from '../lib/cities';
const Home: NextPage = () => {
  const votes = React.useContext(VoteContext);
  const city = React.useContext(CityContext);

  // const [lat, setLat] = React.useState<number | null>(null);
  // const [lon, setLon] = React.useState<number | null>(null);
  // const [status, setStatus] = React.useState<string | null>(null);
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!Object.keys(cities).includes(city!))
      return toast.error('Konumunuz Türkiye İçinde Bulunmalı!');
    if (selectedOption === '') return toast.error('Aday Şeçimi Yapmadınız!');

    try {
      await axios
        .post('/api/vote', {
          option: selectedOption,
          city: city,
        })
        .then((res) => {
          if (res.status === 403)
            toast.error('Konumunuz Türkiye İçinde Bulunmalı!');
          else {
            toast.success('🗳️ Oy Kullanıldı 🎉');
            mutate('/api/vote');
          }
        })
        .catch((err) => toast.error(err));
      setSelectedOption('');
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>2023 Seçim Anketi</title>
        <meta name='description' content='2023 Cumhurbaşkanı Seçim Anketi ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex gap-4 flex-wrap'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1 justify-center w-[16rem] p-4 bg-slate-50 rounded-xl shadow-lg'>
            <label>
              <input
                type='radio'
                name='option'
                value={VoteOption.Option1}
                checked={selectedOption === VoteOption.Option1}
                onChange={(event) => setSelectedOption(event.target.value)}
              />{' '}
              {VoteOption.Option1}
            </label>
            <label>
              <input
                type='radio'
                name='option'
                value={VoteOption.Option2}
                checked={selectedOption === VoteOption.Option2}
                onChange={(event) => setSelectedOption(event.target.value)}
              />{' '}
              {VoteOption.Option2}
            </label>
            <label>
              <input
                type='radio'
                name='option'
                value={VoteOption.Option3}
                checked={selectedOption === VoteOption.Option3}
                onChange={(event) => setSelectedOption(event.target.value)}
              />{' '}
              {VoteOption.Option3}
            </label>
            <label>
              <input
                type='radio'
                name='option'
                value={VoteOption.Option4}
                checked={selectedOption === VoteOption.Option4}
                onChange={(event) => setSelectedOption(event.target.value)}
              />{' '}
              {VoteOption.Option4}
            </label>
            <button type='submit'>Oy Kullan</button>
          </div>
        </form>
        {_.isEmpty(votes) ? (
          <div className='w-[18rem] h-[2rem]'>
            <Skeleton
              animation='wave'
              height='2rem'
              width={'50%'}
              style={{
                padding: '.5rem 4rem 0rem 4rem',
                margin: '0 auto',
              }}
            />

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='m-4'>
                <Skeleton
                  animation='wave'
                  height='2rem'
                  width={'50%'}
                  style={{
                    padding: '.5rem 4rem .5rem 4rem',
                  }}
                />

                <div className='border border-gray-200 rounded-lg p-4 '>
                  <div>
                    <Skeleton
                      animation='wave'
                      height='1.6rem'
                      width={'100%'}
                      style={{
                        margin: '.5rem 0 .5rem 0',
                        borderRadius: '.5rem',
                      }}
                    />
                  </div>
                  <Skeleton
                    animation='wave'
                    height='1.5rem'
                    width={'3rem'}
                    style={{
                      margin: '0 auto',
                    }}
                  />
                </div>
              </div>
            ))}
            <Skeleton
              animation='wave'
              height='1rem'
              width={'20%'}
              style={{
                padding: '.5rem 4rem .5rem 4rem',
                marginLeft: 'auto',
                marginRight: '1rem',
              }}
            />
          </div>
        ) : (
          votes?.map((vote) => (
            <CityCardContainer key={vote.id} result={vote} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
