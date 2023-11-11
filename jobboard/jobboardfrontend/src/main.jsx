import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { RegistrationDataProvider } from './context/RegistrationDataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <RegistrationDataProvider>
    <App />
    </RegistrationDataProvider>
    </BrowserRouter></PersistGate></Provider>
  </React.StrictMode>,
)
