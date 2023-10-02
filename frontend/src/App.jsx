// React Imports
import React from 'react';
import MainPage from './pages/MainPage';
import SchemaSelectionPage from './pages/SchemaSelectionPage';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { IngestionDataProvider } from './context/IngestionDataProvider';
import HarmonizationPage from './pages/HarmonizationPage';
// CSS Imports
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: 
            <IngestionDataProvider>
                <MainPage />
            </IngestionDataProvider>
        },
        {
            path: "/schema_selection",
            element:
            <IngestionDataProvider>
                <SchemaSelectionPage />
            </IngestionDataProvider>
        },
        {
            path: "/harmonization",
            element:
                <HarmonizationPage />
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
