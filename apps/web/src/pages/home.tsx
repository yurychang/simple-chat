import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuSearch } from 'react-icons/lu';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  UserSelectDialog,
  UserSelectDialogProps,
} from '@/components/user-select-dialog';
import { RoomType } from '@/constants/enums';
import { socket } from '@/libs/socket';
import { useStore } from '@/store';
import { Room } from '@/types';

const formSchema = z.object({
  message: z.string().min(1),
});

export function Home() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    form.register('message');
  });

  const messageInput = useRef<ElementRef<'div'>>(null);

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    form.setValue('message', e.currentTarget.textContent || '');
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    socket.emit('message', values.message);
    form.reset();
    if (messageInput.current) {
      messageInput.current.textContent = '';
    }
  }

  return (
    <>
      <div>
        <Outlet />
        <div className="grid min-h-screen grid-cols-4 gap-3 px-5">
          <Sidebar></Sidebar>
          <div className="relative h-full col-span-3 py-5">
            <Form {...form}>
              <form
                className="absolute left-0 right-0 flex items-end w-full gap-3 bottom-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={() => (
                    <>
                      <FormItem className="flex-1">
                        <FormControl>
                          <div
                            ref={messageInput}
                            contentEditable
                            className="px-3 py-[7px] border rounded-md min-h-[38px]"
                            onInput={onInput}
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  const [open, setOpen] = useState(false);
  const user = useStore((state) => state.user);
  const userRooms = useQuery({
    queryKey: ['chat/user-rooms'],
    queryFn: () =>
      fetch(
        `http://localhost:8080/chat/user-rooms/${socket.id?.toLowerCase()}`,
      ).then((res) => res.json() as Promise<Room[]>),
  });

  const createDmRoom = useStore((state) => state.createDmRoom);

  const onSelect: UserSelectDialogProps['onSelect'] = (user) => {
    const existRoom = userRooms.data?.find(
      (room) => room.type === RoomType.DM && room.members.includes(user.id),
    );

    if (existRoom) {
      console.log('exist room', existRoom);
    } else {
      createDmRoom(user.id, user.name || user.id);
    }
  };

  return (
    <div className="py-5">
      <SetupUsernameDialog>
        <p>{user.name}</p>
        <p className="text-sm text-slate-400">#{socket.id}</p>
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

function UserRooms() {
  const existRooms = useQuery({
    queryKey: ['chat/user-rooms'],
    queryFn: () =>
      fetch(
        `http://localhost:8080/chat/user-rooms/${socket.id?.toLowerCase()}`,
      ).then((res) => res.json() as Promise<Room[]>),
  });

  const localRooms = useStore((state) => state.rooms);

  const rooms = [...(existRooms.data || []), ...localRooms]
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((room) => {
      if (room.type === RoomType.DM) {
        return {
          ...room,
          name: room.members.find((member) => member !== socket.id),
        };
      }
      return room;
    });

  return (
    <div className="space-y-3">
      {rooms.map((room) => (
        <div key={room.id} className="p-3 border rounded">
          <p className="overflow-hidden text-clip whitespace-nowrap">
            {room.name}
          </p>
        </div>
      ))}
    </div>
  );
}

const userFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

function SetupUsernameDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const user = useStore((state) => state.user);

  const changeOpen = (value: boolean) => {
    if (!user.name) return;
    setOpen(value);
  };

  const setUsername = useStore((state) => state.setUsername);

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: user.name || '',
    },
  });

  function onSubmit(values: z.infer<typeof userFormSchema>) {
    setUsername(values.username);
    socket.emit(
      'updateUsername',
      values.username,
      (response: { ok: boolean }) => {
        if (response.ok) {
          changeOpen(false);
        }
      },
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogTrigger asChild>
          <Button className="flex-col items-start h-[60px] text-md w-full bg-slate-800">
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter your name</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Home;
