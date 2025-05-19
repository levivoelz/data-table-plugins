# Deep Origin Frontend Technical Assessment
[Demo](https://deep-origin-fe-assessment-web.vercel.app/)

[Data Table Docs](/packages/ui/src/components/data-table/README.md)

## Stack Choices

### Turborepo
Turbo makes it easy to set up a monorepo and scale a full-stack TS/Node codebase by sharing components, libraries, and utilities across applications. It also provides a handy CLI that makes development a more enjoyable experience.

### Next.js
Next.js has some extra tools built in over a bare React project that makes it simple to add an API and choose a rendering pattern. This project will emulate a SPA by using client side rendering only, but with the added benefit of having the API baked in. No separate Node.js server needed. While an http server like express.js would be helpful in certain situations like websockets, the specs for this project do not require it.

### shadcn/ui
It provides a large set of component templates and is easily customizable.

### TanStack Table
This library adds a powerful set of tools for data manipulation in a table format.

## Design decisions

While the requirements doc appears to show usage of Google Material and likely MUI as the UI library, I chose to use Shadcn UI. The docs don’t specifically say the look and feel should be mirrored and seemed to indicate some creative liberty. I use headless libraries like Radix and TanStack frequently, and Shadcn wraps them with Tailwind and some sensible default styling and functionality. Another advantage is you get a nice CLI to install component templates that are fully customizable. Conversely, I have concerns about the ability to upgrade components and dependent libraries over the long term. Heavily modified core components could become so out of sync with the templates that they become virtually impossible to upgrade. A possible solution would be to never touch a core component and update frequently, however, this would likely stifle productivity given you would need go out of your way to create new components to wrap the core components, cancelling out any net gains in the long run.

While I used a full featured headless data table library, TanStack, I chose to strip some of the features that weren’t related to the requirements. Common features like sorting, filtering, and column selection can be easily added and I chose to leave them out to reduce complexity and achieve the task at hand in a reasonable timeframe.

Another primary consideration was how to implement the plugin structure. While trying not to reinvent the wheel, I wanted to provide a way for developers to not only create and implement plugins, but to easily add them for their use case. Please see `packages/ui/components/data-table/plugins/text.tsx` for an example of plugin structure and `apps/web/components/tasks-table.tsx` for how a plugin is implemented.

### Drawbacks and other considerations
While I like the ease of use the plugin structure provides, there are some drawbacks. By default, the plugins include default plugins, increasing build size. While you can customize plugins being used and exclude them, this is not documented and isn't clear from how the plugin API is designed. A more deliberate declaration of plugins may be beneficial, but at the sacrifice of usability and brevity.

Data tables are complex mechanisms and it's difficult to build a truly reusable data table that fits a range of scenarios. While it is a fun exercise, I wouldn't recommend a plugable data table from a practical standpoint. There are too many edge cases to consider and it's really not that difficult to take a declarative approach to building up a DT for each use case.

## [Technical Design](https://excalidraw.com/#json=agodTQgik-73BYkqqr7kz,qCmAWYcMwlhyXp-Krm9JFA)
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
