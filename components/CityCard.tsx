import React from 'react';
import { IResult, VoteOption } from '../types';

const CityCard = ({
  name,
  vote,
  totalVote,
}: {
  name: VoteOption;
  vote: number;
  totalVote: number;
}) => {
  const columnHeight = `${(vote * 100) / totalVote}%`;

  return (
    <div className=' px-4 py-2'>
      <div className='text-lg font-medium mb-2'>{name}</div>
      <div className='border border-gray-200 rounded-lg p-4'>
        <div className='bg-gray-100 rounded-lg'>
          <div
            className='bg-blue-500 h-full rounded-lg'
            style={{ width: columnHeight, height: '1rem' }}
          />
        </div>
        <p className='text-gray-600 text-center mt-2'>{vote} oy</p>
      </div>
    </div>
  );
};

export default CityCard;
