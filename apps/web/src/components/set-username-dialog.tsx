import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const userFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function SetUsernameDialog({ children }: { children: React.ReactNode }) {
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
