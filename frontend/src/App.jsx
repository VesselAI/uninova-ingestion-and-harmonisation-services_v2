// React Imports
import React from 'react';
import MainPage from './pages/MainPage';

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
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
