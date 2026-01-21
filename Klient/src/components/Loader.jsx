import React from 'react';
import { PacmanLoader } from 'react-spinners';
import { useLoading } from '../LoadingContext';

const Loader = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <div style={overlayStyle}>
            <div style={contentStyle}>
                <PacmanLoader color="#211d89" size={50} />
                <h2 style={{ color: 'white', marginTop: '20px', fontFamily: 'Poppins, sans-serif' }}>wczytywanie...</h2>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export default Loader;