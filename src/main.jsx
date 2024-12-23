import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorProvider } from "./contexts/ErrorContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </ErrorProvider>
    </QueryClientProvider>
);
