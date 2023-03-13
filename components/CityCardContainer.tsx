import { Skeleton } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import cities from '../lib/cities';
import { IResult, VoteOption } from '../types';
import CityCard from './CityCard';

const CityCardContainer = ({ result }: { result: IResult }) => {
  const totalVote =
    result['Recep Tayyip Erdoğan'] +
    result['Kemal Kılıçdaroğlu'] +
    result['Muharrem İnce'] +
    result['Sinan Oğan'];
  return (
    <div className='w-[18rem] min-w-[18rem] max-w-[18rem]'>
      {_.isEmpty(result) ? (
        <Skeleton variant='rectangular' width={100} height={500} />
      ) : (
        <div>
          <div className='text-center font-semibold text-xl capitalize'>
            {cities[result.id].toLowerCase()}
          </div>
          <CityCard
            name={VoteOption.Option1}
            vote={result['Recep Tayyip Erdoğan']}
            totalVote={totalVote}
          />
          <CityCard
            name={VoteOption.Option2}
            vote={result['Kemal Kılıçdaroğlu']}
            totalVote={totalVote}
          />
          <CityCard
            name={VoteOption.Option3}
            vote={result['Muharrem İnce']}
            totalVote={totalVote}
          />
          <CityCard
            name={VoteOption.Option4}
            vote={result['Sinan Oğan']}
            totalVote={totalVote}
          />
          <div className='text-right pr-4 text-gray-500 text-sm'>
            Toplam {totalVote} oy kullanıldı
          </div>
        </div>
      )}
    </div>
  );
};

export default CityCardContainer;
