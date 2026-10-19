//react and components
import { lazy } from 'react';

export const Home = lazy(() => import('@pages/Home/Home.jsx'));
export const Location = lazy(() => import('@pages/Location/Location.jsx'));
export const AuthForm = lazy(() => import('@pages/AuthForm/AuthForm.jsx'));
