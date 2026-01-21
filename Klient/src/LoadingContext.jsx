import React, { createContext, useState, useContext, useCallback } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);

    const showLoader = useCallback(() => {
        setLoadingCount(prev => prev + 1);
    }, []);

    const hideLoader = useCallback(() => {
        setTimeout(() => {
            setLoadingCount(prev => Math.max(0, prev - 1));
        }, 500);
    }, []);

    return (
        <LoadingContext.Provider value={{ loading: loadingCount > 0, showLoader, hideLoader }}>
            {children}
        </LoadingContext.Provider>
    );
};