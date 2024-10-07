// src/SkeletonScreen.jsx
import React from 'react';
import './SkeletonScreen.css'; // Import styles for the skeleton

const SkeletonScreen = () => {
    return (
        <div className="skeleton">
            {/* Add your skeleton structure here */}
            <div className="skeleton-header" />
            <div className="skeleton-row" />
            <div className="skeleton-row" />
            <div className="skeleton-row" />
            <div className="skeleton-row" />
        </div>
    );
};

export default SkeletonScreen;
