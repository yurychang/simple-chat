import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

import { Input } from '@/components/ui/input';
import { UserRooms } from '@/components/user-rooms';
import {
  UserSelectDialog,
  UserSelectDialogProps,
} from '@/components/user-select-dialog';
import { RoomType } from '@/constants/enums';
import { useStore } from '@/store';
import { userId } from '@/store/user';

import { SetupUsernameDialog } from '../pages/home';

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const user = useStore((state) => state.user);

  const createDmRoom = useStore.use.createLocalDmRoom();

  const onSelect: UserSelectDialogProps['onSelect'] = (user) => {
    createDmRoom(user.id, user.name || user.id);
  };

  return (
    <div className="py-5">
      <SetupUsernameDialog>
        <p>{user.name}</p>
        <p className="text-sm text-slate-400">#{userId}</p>
      </SetupUsernameDialog>
      <div className="my-3"></div>
      <Input
        leftIcon={<LuSearch />}
        readOnly
        className="focus-visible:ring-0"
        onFocus={() => setOpen(true)}
      ></Input>
      <UserSelectDialog
        open={open}
        onOpenChange={setOpen}
        onSelect={onSelect}
      ></UserSelectDialog>
      <div className="my-3"></div>
      <UserRooms></UserRooms>
    </div>
  );
}
