import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import AuthState from "./context/auth/AuthState.jsx";
import EventState from "./context/events/EventState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthState>
      <EventState>
        <App />
      </EventState>
    </AuthState>
  </StrictMode>
);
