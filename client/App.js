import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/Store/index.js'
import Main from './Src/Screens/Main.jsx';

export default function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>  
  );
}
