import { rest } from 'msw';

import { Todo } from '@/apis';

let mockTodos: Todo[] = [
  {
    id: '0',
    title: 'buy dinner',
    completed: false,
  },
];

let todoId = 1;

export const handlers = [
  rest.get('/todos', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTodos));
  }),

  rest.post('/todos', async (req, res, ctx) => {
    const title = (await req.json<{ title: string }>()).title;
    const newTodo = { id: (todoId++).toString(), title, completed: false };
    mockTodos.push(newTodo);

    return res(ctx.status(200), ctx.json(newTodo));
  }),

  rest.delete('/todos/:id', async (req, res, ctx) => {
    mockTodos = mockTodos.filter(({ id }) => id !== req.params.id);
    return res(ctx.status(200));
  }),
];
