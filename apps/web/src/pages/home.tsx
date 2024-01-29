import { zodResolver } from '@hookform/resolvers/zod';
import { ElementRef, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
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
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col justify-end min-h-screen">
            <div className="my-5">
              <Form {...form}>
                <form className="flex" onSubmit={form.handleSubmit(onSubmit)}>
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
                              className="flex-1 px-3 py-2 border rounded-md min-h-4"
                              onInput={onInput}
                            />
                          </FormControl>
                        </FormItem>
                      </>
                    )}
                  />
                  <Button className="ml-3" type="submit">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
