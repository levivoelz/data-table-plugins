# Deep Origin Frontend Technical Assessment

## Stack Choices

### Turborepo
Turbo makes it easy to set up a monorepo and scale a full-stack TS/Node codebase by sharing components, libraries, and utilities across applications. It also provides a handy CLI that makes development a more enjoyable experience.

### Next.js
Next.js has some extra tools built in over a bare React project that makes it simple to add an API and choose a rendering pattern. This project will emulate a SPA by using client side rendering only, but with the added benefit of having the API baked in. No separate Node.js server needed. While an http server like express.js would be helpful in certain situations like websockets, the specs for this challenge do not require it.

### shadcn/ui
It's all the rage and for a good reason. It's frequently updated, has an extensive component repository, is highly curated, includes Tailwind, and follows the Headless UI pattern. You can stick to the script and use what is provided or you can easily customize your components by editing the source file.

### Zod
Zod is used to validate incoming JSON data and validate cell plugin data.

## [Feature Architecture](https://excalidraw.com/#json=Hlqtw8GuUCFSCZCelzZJO,_86q9cHY0TWeKRftAGwOgg)
![architecture](/architecture.png)

## Requirements
- Node >=22
- PNPM >= 9 [instructions](https://pnpm.io/installation)
- Turborepo >= 2 `pnpm install turbo --global`

## Installation
First, clone this repo `git clone git@github.com:levivoelz/deep-origin-fe-assessment.git`
```bash
cd deep-origin-fe-assessment
pnpm i
turbo dev
```
Then, open [http://localhost:3000/](http://localhost:3000/)

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```
