import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer, { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { QueryClient, QueryClientProvider } from 'react-query';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  //composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
const persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true, // Fallback Ui 설정
      refetchOnWindowFocus: false,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
