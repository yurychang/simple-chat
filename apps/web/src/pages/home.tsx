import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { socket } from '@/libs/socket';

const formSchema = z.object({
  message: z.string().min(1),
});

export function Home() {
  // const [username, setUsername] = useState('');
  // const updateName = () => {
  //   username && socket.emit('updateName', username);
  // };

  // const [message, setMessage] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    form.register('message');
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    socket.emit('message', values.message);
  }
  return (
    <>
      <div>
        <Outlet />
        <div className="max-w-screen-lg mx-auto">
          {/* <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <Button onClick={updateName}>Update name</Button>
          </div> */}
          <div className="flex flex-col justify-end min-h-screen">
            <div className="my-5">
              <Form {...form}>
                <form
                  className="flex space-y-8"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormControl>
                            <div
                              contentEditable
                              className="flex-1 px-3 py-2 border rounded-md min-h-4"
                              {...field}
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
