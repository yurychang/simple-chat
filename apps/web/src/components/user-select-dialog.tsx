import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { socket } from '@/libs/socket';

type User = {
  id: string;
  name: string;
};

export type UserSelectDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (user: User) => void;
};

export function UserSelectDialog({
  open,
  onOpenChange,
  onSelect,
}: UserSelectDialogProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['chat/online-users'],
    queryFn: () =>
      fetch(`http://localhost:8080/chat/online-users?userId=${socket.id}`).then(
        (res) => res.json() as Promise<User[]>,
      ),
  });

  useEffect(() => {
    if (open) {
      queryClient.invalidateQueries({ queryKey: ['chat/online-users'] });
      console.log('refetch');
    }
  }, [open, queryClient]);

  const _onSelect = (user: User) => {
    onSelect?.(user);
    onOpenChange?.(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type username to search for..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Online Users">
          {query.data?.map((user) => (
            <CommandItem onSelect={() => _onSelect(user)} key={user.id}>
              {user.name || user.id}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
