import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
// import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>,
  // document.getElementById("root")
);

reportWebVitals();
