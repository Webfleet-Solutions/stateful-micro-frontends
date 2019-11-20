[![build status](https://img.shields.io/travis/Webfleet-Solutions/stateful-micro-frontends/master.svg?style=flat-square)](https://travis-ci.org/Webfleet-Solutions/stateful-micro-frontends)
[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

# Stateful Micro Frontends with React and Redux
This is a simplistic micro-frontend demo inspired by Cam Jackson's great article on 
[Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) and his corresponding
[demo implementation](https://github.com/micro-frontends-demo). He defines **micro frontends** as
"An architectural style where independently deliverable frontend applications are composed into a greater whole".

This project goes beyond Cam's demo by showcasing
* an implementation based on [iframes](https://www.w3schools.com/tags/tag_iframe.asp) (mentioned in Cam's article, but left open in his demo),
* an alternative implementation using module imports with [React.lazy](https://reactjs.org/docs/code-splitting.html),
* cross-module management of shared [Redux](https://redux.js.org/) state.

The demo consists of a content server, a shared library (`lib-common`), three modules
(`mod-consumer`, `mod-producer`, and `mod-solitary`), and three applications (`app-script`, `app-iframe` and `app-import`),
which include the modules at runtime under specific routes maintained by React Router.

Application `app-script` loads its modules with help of runtime-inserted `<script>` tags. When loaded, each
module adds a global function to window. For example, module "Consumer" adds a `mountConsumer` function.
When the container app calls the unique global function of a module passing the id of an HTML tag, the module
calls `ReactDOM.render` to mount the root element of the module to the given tag. The loader also handles the
combination of Redux stores into a single state object (see [module-loader.tsx](app-script/src/module-loader.tsx)).

Application `app-iframe` loads its modules into `<iframe>` tags by fetching their `index-*.html` documents.
Each module is completely separated from the container app, no code is shared. Redux actions are dispatched
between the container app and modules using the Browser's event system (`postMessage` and `addEventListener`).
On loading, modules either copy parts of the container app's state or they read the initial state from local storage.

Application `app-import` uses `React.lazy` to load [ES6 modules](https://exploringjs.com/impatient-js/ch_modules.html)
via [dynamic imports](https://javascript.info/modules-dynamic-imports). The `import` call is intercepted to enhance the
global set of Redux reducers (see [module-loader.ts](app-import/src/module-loader.ts)). As for all app variants, there
is no overarching build step. The container app and all modules can be built, tested, and deployed separately. 

The project demonstrates several cases of global state management:
* `mod-consumer` changes its color if a checkbox in the application menu is ticked.
* `mod-producer` has a checkbox that changes the color of the application menu.
* `mod-solitary` uses a local action and a local reducer to flip its own background color.

This project uses [typescript](https://www.typescriptlang.org/), [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/),
and [rollup](https://rollupjs.org/guide/en/).

## Installation
```
yarn install
```

## Building
```
yarn build
```
This builds the shared library, all modules (in all formats needed by the applications), and all application variants.
It puts the results into subdirectories of [public](public) named after the applications.

## Running
```
yarn start
```
This starts a server at http://localhost:3000. To start one of the three applications, please click on the folder names.
