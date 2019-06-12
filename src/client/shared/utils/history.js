import { createMemoryHistory, createBrowserHistory } from 'history';

let history;

if (process.env.SERVER === true) {
  // Server should use createMemoryHistory
  history = createMemoryHistory();
} else {
  // client should use createBrowserHistory
  history = createBrowserHistory();
}

export default history;
