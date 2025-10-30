import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import "./index.css";
import App from "./App.jsx";
import { initializeDefaultData } from "./utils/cookieStorage";

// Initialize default cookie and localStorage data
initializeDefaultData();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
            <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="dark"
      />
    </Provider>
  </StrictMode>
);
