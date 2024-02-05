import { zodResolver } from '@hookform/resolvers/zod';
import { ElementRef, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { sendMessage } from '@/features/message/socket-handlers';
import { useStore } from '@/store';
import { userId } from '@/store/user';
import { cn } from '@/utils/cn';

const formSchema = z.object({
  message: z.string().min(1),
});

export function RoomView() {
  const { currentRoom } = useStore((s) => ({
    currentRoom: s.currentRoom(),
  }));

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
    if (currentRoom) {
      sendMessage(currentRoom.id, values.message);
      form.reset();
      if (messageInput.current) {
        messageInput.current.textContent = '';
      }
    }
  }

  return (
    <div className="relative col-span-3 ">
      {currentRoom && (
        <div className="flex flex-col h-screen py-5">
          <div className="flex-1 h-full pr-5 space-y-3 overflow-y-auto">
            {currentRoom.messages.map((m) => (
              <div
                key={m.createAt}
                className={cn('flex gap-3', {
                  'flex-row-reverse justify-start': m.author === userId,
                })}
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'inline-block px-4 py-2 bg-gray-100 border rounded-full',
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <Form {...form}>
            <form
              className="flex items-end w-full gap-3 pr-5 mt-3"
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
      )}
    </div>
  );
}
