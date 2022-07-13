import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Preferences({ user, children }) {
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}