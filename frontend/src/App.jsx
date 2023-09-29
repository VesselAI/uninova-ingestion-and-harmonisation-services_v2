// React Imports
import React from 'react';
import MainPage from './pages/MainPage';
import SchemaSelectionPage from './pages/SchemaSelectionPage';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
// CSS Imports
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: 
                <MainPage />
        },
        {
            path: "/schema_selection",
            element: 
                <SchemaSelectionPage />
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
