import React from "react";


import "./styles/global.scss";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import { LoadPages } from './pages';

function App() {
  return (
    <Provider store={store}>
      <LoadPages />
    </Provider>
  );
}

export default App;
