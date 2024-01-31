import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from '@/utils/createSelectors';

import { createLocalRoomSlice, LocalRoomSlice } from './local-room';

export const useStore = createSelectors(
  create<LocalRoomSlice>()(
    devtools(
      (...a) => ({
        ...createLocalRoomSlice(...a),
      }),
      { enabled: import.meta.env.DEV },
    ),
  ),
);
