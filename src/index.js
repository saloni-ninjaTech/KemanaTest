import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/component';
import * as data from "./_assets/dataJson"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App props={data} />
  </React.StrictMode>
);

