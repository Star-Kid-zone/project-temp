import "./bootstrap";
import "./index.css"
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { DataContext } from "./Contexts/data.context";
import { ToastContainer } from "react-toastify";
import Main from "./Main";
import Routespath from "./Routes/Routespath";
import { ThemeProviderWrapper } from "./Contexts/theme.context";

createRoot(document.getElementById("app")).render(
    <React.StrictMode>
            <ThemeProviderWrapper>
        <DataContext>
            <ToastContainer />
            <Routespath />
        </DataContext>
        </ThemeProviderWrapper>

    </React.StrictMode>
);
