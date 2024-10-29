import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./input.css";
import "react-toastify/dist/ReactToastify.css";
// Libs
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
