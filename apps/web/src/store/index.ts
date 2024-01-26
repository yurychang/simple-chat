import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from '@/utils/createSelectors';

import { BearSlice, createBearSlice } from './bear';
import { createFishSlice, FishSlice } from './fish';

export const useStore = createSelectors(
  create<BearSlice & FishSlice>()(
    devtools(
      (...a) => ({
        ...createBearSlice(...a),
        ...createFishSlice(...a),
      }),
      { enabled: import.meta.env.DEV },
    ),
  ),
);
