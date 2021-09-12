# Compose Hydrate Reducers for Redux Wrapper

Automatically handles the `HYDRATE` action executed by [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper).

## Installation

The easiest way to install `compose-hydrate-reducers` is with [npm](https://www.npmjs.com/).

```bash
npm install compose-hydrate-reducers
```

Alternately, download the source.

```bash
git clone https://github.com/stegano/compose-hydrate-reducers.git
```

### Implementation
- Overwrite the client side state to the state delivered from the server side When the page is first rendered.

### Example

- See [next-redux-wrapper#usage](https://github.com/kirill-konshin/next-redux-wrapper#usage) for information on handling `HYDRATE` action

```typescript
// store.ts
...
const reducers = combineReducers(
  /**
   * Reducers with `HYDRATE` action handling added is returned. 
   * ✨ Now you don't have to handle the `HYDRATE' operation directly on each reducer.
   */
  composeHydrateReducers({
    yourReducer1,
    yourReducer2
    ...
  });
)

type RootState = ReturnType<typeof reducers>;

// create a makeStore function
const makeStore = () => createStore(reducers);

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });
...
```
