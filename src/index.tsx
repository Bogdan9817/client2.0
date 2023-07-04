import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import AnimatedBg from "./UI/animated-bg/AnimatedBg";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AnimatedBg>
      <div className='main'>
        <CookiesProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
            <ToastContainer />
          </Provider>
        </CookiesProvider>
      </div>
    </AnimatedBg>
  </React.StrictMode>
);
