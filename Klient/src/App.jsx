import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataView from './pages/DataView';
import RoomsView from './pages/RoomsView';
import DeviceFormPage from './pages/DeviceFormPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './LoadingContext';
import Loader from './components/Loader';
import AxiosInterceptor from './AxiosInterceptor';

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AxiosInterceptor>
          <Router>
            <div className="min-vh-100 d-flex flex-column">
              <Loader />
              <Navbar />
              <ToastContainer position="top-right" autoClose={3000} />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dane" element={<DataView />} />
                  <Route path="/pokoje" element={<RoomsView />} />
                  <Route path="/dodaj-urzadzenie" element={<DeviceFormPage />} />
                  <Route path="/edytuj-urzadzenie/:id" element={<DeviceFormPage />} />
                </Routes>
              </main>
              <footer className="text-center py-3 mt-auto opacity-50">
                <small>&copy; Mikołaj Manowski - Programowanie użytkowe</small>
              </footer>
            </div>
          </Router>
        </AxiosInterceptor>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
