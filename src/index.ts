import { HYDRATE } from 'next-redux-wrapper';
import {
  Reducer, ReducersMapObject, AnyAction,
} from 'redux';

/**
 * The `hydrated` value is only used within the current page and should not
 * be accessed, modified, or sent to the server.
 */
const hydrated = Symbol('hydrated');

/**
 * Add an action(HYDRATE) to the reducer
 * that synchronizes the state of the data processed by the server.
 * @see https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
 * @param reducerName
 * @param reducer
 */
const composeHydrateReducer = (
  reducerName: string, reducer: Reducer,
) => (state: any, action: AnyAction): Reducer => {
  const reducers = action?.payload;
  const newState = reducers?.[reducerName];
  if (action.type === HYDRATE) {
    if (newState[hydrated] !== true) {
      if (typeof window !== 'undefined') {
        /**
         * Let Hydrate run only once in a CSR environment.
         * @see https://github.com/kirill-konshin/next-redux-wrapper/issues/280
         */
        Object.assign(newState, { [hydrated]: true });
      }
      return {
        ...state,
        ...newState,
      };
    }
  }
  return reducer(state, action);
};

/**
 * Add an action(HYDRATE) to the reducers
 * that synchronizes the state of the data processed by the server.
 * @param reducers
 */
const composeHydrateReducers = <R extends ReducersMapObject>(reducers: R): R => {
  const ret: ReducersMapObject = {};
  Object.keys(reducers).forEach(
    (name: string) => {
      const reducer: Reducer = reducers[name];
      ret[name] = composeHydrateReducer(name, reducer);
    },
  );
  return ret as R;
};

export default composeHydrateReducers;
export { composeHydrateReducer, composeHydrateReducers };
