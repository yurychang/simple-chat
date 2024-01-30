import { zodResolver } from '@hookform/resolvers/zod';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserSelectDialog } from '@/components/user-select-dialog';
import { socket } from '@/libs/socket';

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
  return (
    <div className="py-5">
      <Input
        leftIcon={<RxMagnifyingGlass />}
        readOnly
        className="focus-visible:ring-0"
        onFocus={() => setOpen(true)}
      ></Input>
      <UserSelectDialog open={open} onOpenChange={setOpen}></UserSelectDialog>
    </div>
  );
}

export default Home;
