import { createAction } from '@reduxjs/toolkit';
import { State } from './types';

export const setData = createAction<Partial<State>>('setData');
