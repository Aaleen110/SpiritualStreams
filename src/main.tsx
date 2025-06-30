// Main entry point for the application
// This file will be populated with the actual React application setup 
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
        <StrictMode>
                <AuthProvider>
                        <BrowserRouter>
                                <App />
                        </BrowserRouter>
                </AuthProvider>
        </StrictMode>
);
