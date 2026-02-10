import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import PublicEvents from '../pages/PublicEvents';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateEvent from '../pages/CreateEvent';
import EditEvent from '../pages/EditEvent';
import ManageNews from '../pages/ManageNews';
import ManageTestimonials from '../pages/ManageTestimonials';
import ProtectedRoute from './ProtectedRoute';
import News from '../pages/News';
import NewsDetail from '../pages/NewsDetail';
import Forum from '../pages/Forum';
import CreateDiscussion from '../pages/CreateDiscussion';
import DiscussionDetail from '../pages/DiscussionDetail';
import ManageDiscussions from '../pages/ManageDiscussions';
import ManageDiscussionComments from '../pages/ManageDiscussionComments';
import ScrollToTop from './ScrollToTop';



function AppRouter() {
    return (
        <BrowserRouter>

        <ScrollToTop /> 
        
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/eventos" element={<PublicEvents />} />
                <Route path="/login" element={<Login />} />
                <Route path="/noticias" element={<News />} />
                <Route path="/noticias/:id" element={<NewsDetail />} />
                <Route path="/foro" element={<Forum />} />
                <Route path="/foro/crear" element={<CreateDiscussion />} />
                <Route path="/foro/:id" element={<DiscussionDetail />} />
                <Route path="/dashboard/discussions" element={<ManageDiscussions />} />
                <Route path="/dashboard/discussions/:id/comments" element={<ManageDiscussionComments />} />





                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/news"
                    element={
                        <ProtectedRoute>
                            <ManageNews />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/testimonials"
                    element={
                        <ProtectedRoute>
                            <ManageTestimonials />
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