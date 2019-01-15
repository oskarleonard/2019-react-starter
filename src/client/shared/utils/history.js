import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
let history;

if (process.env.SERVER === true) {
  // Server should use createMemoryHistory
  history = createMemoryHistory();
} else {
  // client should use createBrowserHistory
  history = createBrowserHistory();
}

export default history;
