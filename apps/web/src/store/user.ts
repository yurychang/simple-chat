import { StateCreator } from 'zustand';

export type User = {
  name: string;
};

export interface UserSlice {
  user: User;
  setUsername: (name: string) => void;
}

export const userId = 'U-' + Math.random().toString().substring(2, 10);

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  user: { name: '' },
  setUsername: (name) =>
    set(() => ({
      user: {
        name,
      },
    })),
});
