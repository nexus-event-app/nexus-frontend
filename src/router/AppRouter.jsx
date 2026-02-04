    import React from 'react';
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import Login from '../pages/Login';
    import Dashboard from '../pages/Dashboard';
    import CreateEvent from '../pages/CreateEvent';
    import EditEvent from '../pages/EditEvent';
    import PublicEvents from '../pages/PublicEvents';
    import ProtectedRoute from './ProtectedRoute';

    function AppRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PublicEvents />} />
            
            <Route path="/login" element={<Login />} />
            
            <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
            }
            />
            
            <Route
            path="/events/create"
            element={
                <ProtectedRoute>
                <CreateEvent />
                </ProtectedRoute>
            }
            />
            
            <Route
            path="/events/edit/:id"
            element={
                <ProtectedRoute>
                <EditEvent />
                </ProtectedRoute>
            }
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
    );
    }

    export default AppRouter;