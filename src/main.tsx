// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
// import App from './App.tsx'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookManage from './pages/BookManage';
import Login from './pages/Login';
import Register from './pages/Register';

const routes = [
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/",
    element: <BookManage/>,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
)
