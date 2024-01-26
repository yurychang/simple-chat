# React + TypeScript + Vite Template

Template for React.

## Check List

- [x] React
- [x] Typescript
- [x] ESLint & Prettier
- [x] Commit guard - Husky
- [ ] Unit test - Vitest

## Scrips

### `npm run dev`

Start development server.

### `npm run build`

Build production bundle to `dist` folder.

#### `npm run lint`

Run ESLint for source code.

#### `npm run preview`

Preview build app on local, should execute `build` script first.

## Tech Stack

### ESLint
auto fix on save:
```json
"editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": false
}
```

### Zustand

This template pre-installed zustand, you can follow [here](https://docs.pmnd.rs/zustand/integrations/third-party-libraries) to integrate other useful extensions.

**Common recommendations:**

- [Immer](https://immerjs.github.io/immer/)
  [Immer middleware](https://docs.pmnd.rs/zustand/integrations/immer-middleware)
- [@colorfy-software/zfy](https://colorfy-software.gitbook.io/zfy/) — 🧸 Useful helpers for state management in React with Zustand.
- [auto-zustand-selectors-hook](https://github.com/Albert-Gao/auto-zustand-selectors-hook) — Automatic generation of Zustand hooks with Typescript support.

### Tailwindcss

**Excellent tailwindcss frameworks:**

- [shadcn/ui](https://ui.shadcn.com/)
- [flowbite](https://flowbite.com/)
