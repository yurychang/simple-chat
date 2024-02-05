import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from '@/utils/createSelectors';

import { createRoomSlice, RoomSlice } from '../features/room/store';
import { createUserSlice, UserSlice } from './user';

export const store = create<RoomSlice & UserSlice>()(
  devtools(
    (...a) => ({
      ...createRoomSlice(...a),
      ...createUserSlice(...a),
    }),
    { enabled: import.meta.env.DEV },
  ),
);

export const useStore = createSelectors(store);
