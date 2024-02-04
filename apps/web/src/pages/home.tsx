import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { socket } from '@/libs/socket';
import { useStore } from '@/store';

import { Sidebar } from '../components/sidebar';

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

const userFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function SetupUsernameDialog({
  children,
}: {
  children: React.ReactNode;
}) {
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
      username: user.name || 'Peter',
    },
  });

  function onSubmit(values: z.infer<typeof userFormSchema>) {
    setUsername(values.username);
    socket.emit(
      'user:update',
      { name: values.username },
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
