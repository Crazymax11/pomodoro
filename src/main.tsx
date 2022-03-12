import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// @ts-ignore
import { registerSW } from 'virtual:pwa-register';
import { App } from './App';

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
