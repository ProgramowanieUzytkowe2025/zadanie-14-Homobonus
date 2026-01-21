import { useEffect } from 'react';
import api from './api';
import { useLoading } from './LoadingContext';

const AxiosInterceptor = ({ children }) => {
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        const reqInterceptor = api.interceptors.request.use(
            (config) => {
                showLoader();
                return config;
            },
            (error) => {
                hideLoader();
                return Promise.reject(error);
            }
        );

        const resInterceptor = api.interceptors.response.use(
            (response) => {
                hideLoader();
                return response;
            },
            (error) => {
                hideLoader();
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(reqInterceptor);
            api.interceptors.response.eject(resInterceptor);
        };
    }, [showLoader, hideLoader]);

    return children;
};

export default AxiosInterceptor;