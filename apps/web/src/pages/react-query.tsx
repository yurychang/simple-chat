import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  getTodos,
} from '@/apis';
import { Button } from '@/components/button';

const ReactQuery = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos });

  // Mutations
  const addTodo = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold">React Query example</h2>
      <Button
        onClick={() => {
          addTodo.mutate('Do Laundry');
        }}
      >
        Add Todo
      </Button>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>
            {todo.title}{' '}
            <Button
              onClick={() => {
                deleteTodo.mutate(todo.id);
              }}
            >
              X
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactQuery;
