import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './input.css';

// Libs
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from './redux/store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
