import React from 'react';

const AvatarGenerator = ({ name, size = 40, className = '' }) => {
    const seed = name.toLowerCase().replace(/[^a-z0-9]/g, '');

    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&size=${size}&backgroundColor=0ea5e9,14b8a6,6366f1,8b5cf6,ec4899,f97316,f59e0b&textColor=ffffff&fontSize=40&fontWeight=600&fontFamily=Arial`;

    return (
        <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className={`rounded-xl ${className}`}
            width={size}
            height={size}
        />
    );
};

export default AvatarGenerator;
