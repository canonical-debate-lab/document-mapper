import { createBrowserHistory } from "history";

export default target => {
  const history = createBrowserHistory();
  history.replace(target);
};
