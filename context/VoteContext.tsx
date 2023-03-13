import React from 'react';
import { IResult } from '../types';

export const VoteContext = React.createContext<IResult[] | undefined>([]);
