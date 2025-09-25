import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    signInWithPopup, 
    signOut,
    GoogleAuthProvider 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign in with Google (with Google Docs API scopes)
    const signInWithGoogle = async () => {
        try {
            // Add scopes for Google Docs API
            googleProvider.addScope('https://www.googleapis.com/auth/documents');
            googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
            
            const result = await signInWithPopup(auth, googleProvider);
            
            // Get the access token for Google APIs
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            
            // Store the access token for Google Docs API usage
            if (accessToken) {
                localStorage.setItem('google_access_token', accessToken);
            }
            
            return result.user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    // Sign out
    const logout = async () => {
        try {
            await signOut(auth);
            // Clear the stored access token
            localStorage.removeItem('google_access_token');
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const value = {
        currentUser,
        signInWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};