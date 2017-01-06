import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
// pass store to the server. Add a subscriber listener to change in state
startServer(store);