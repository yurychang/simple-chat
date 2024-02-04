import { zodResolver } from '@hookform/resolvers/zod';
import { ElementRef, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { sendMessage } from '@/features/message';
import { useStore } from '@/store';

const formSchema = z.object({
  message: z.string().min(1),
});

export function RoomView() {
  const currentRoom = useStore.use.currentRoomId();

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
      sendMessage(currentRoom, values.message);
      form.reset();
      if (messageInput.current) {
        messageInput.current.textContent = '';
      }
    }
  }

  return (
    <div className="relative h-full col-span-3 py-5">
      {currentRoom && (
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
      )}
    </div>
  );
}
