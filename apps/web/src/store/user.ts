import { StateCreator } from 'zustand';

export type User = {
  name: string;
};

export interface UserSlice {
  user: User;
  setUsername: (name: string) => void;
}

export const userId = Math.random().toString();

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
