//react
import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '@context/context.js';

export default function ProtectedRoute({ loading }) {
    const [userId] = useContext(AuthContext);
    if (loading) return null;
    return userId ? <Outlet /> : <Navigate to='/signin' replace />;
}