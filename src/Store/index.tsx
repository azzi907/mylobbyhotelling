import React, {createContext, useContext} from 'react';
import State from './Store';
import UserAuth from './UserAuth';

// const StoreContext = React.createContext();

// export const StoreProvider = ({ children, store }) => {
//   return (
//     <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
//   );
// };
export class MobXRootStore {
  store = new State(this);
  userStore = new UserAuth(this);
}

export const MobXRootStoreContext = createContext<MobXRootStore>(
  {} as MobXRootStore,
);

export const useRootStoreContext = (): MobXRootStore =>
  useContext(MobXRootStoreContext);
