import React from 'react';
import { Provider } from "react-redux";
import MainSection from "./components/MainSection.js" 
import store from "./store";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainSection/>
      </div>
    </Provider>
  );
}

export default App;
