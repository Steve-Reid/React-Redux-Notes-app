import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import configureStore from './store/configureStore';
// import LoadingPage from './components/LoadingPage';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <Router />
  </Provider>
);

// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     render(jsx, document.getElementById('root'));
//     hasRendered = true;
//   }
// };
// render(<LoadingPage />, document.getElementById('root'));

// store.dispatch(getNotes()).then(() => renderApp());

render(jsx, document.getElementById('root'));

registerServiceWorker();
