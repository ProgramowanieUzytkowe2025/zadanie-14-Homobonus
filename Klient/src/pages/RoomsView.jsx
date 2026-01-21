import React, { useState, useEffect } from 'react';
import api from '../api';
import RoomCard from '../components/RoomCard';
import RoomFormModal from './RoomFormModal';
import { useTheme } from '../ThemeContext';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const RoomsView = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme();

    const [showModal, setShowModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get('/pobierzPokoje/');
            setRooms(response.data);
        } catch (err) {
            setError("Nie udało się pobrać danych o pokojach.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddRoom = () => {
        setCurrentRoom(null);
        setShowModal(true);
    };

    const handleEditRoom = (room) => {
        setCurrentRoom(room);
        setShowModal(true);
    };

    const handleSaveRoom = async (roomData) => {
        try {
            if (currentRoom) {
                await api.put(`/aktualizujPokoj/${currentRoom.id}`, roomData);
            } else {
                await api.post('/dodajPokoj/', roomData);
            }
            setShowModal(false);
            fetchData();
            toast.success("Poprawnie zapisano zmiany");
        } catch (err) {
            console.error("Błąd zapisu pokoju:", err);
            toast.error("Wystąpił błąd");
        }
    };

    if (loading) return (
        <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p>Ładowanie pokoi...</p>
        </div>
    );

    if (error) return <div className="alert alert-danger container mt-4">{error}</div>;

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2>Dashboard Pokoi</h2>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddRoom}>
                    <FaPlus /> Dodaj pokój
                </button>
            </div>

            <div className="row g-4">
                {rooms.map(room => (
                    <div key={room.id} className="col-12 col-md-6 col-lg-4">
                        <RoomCard room={room} onDeviceUpdate={fetchData} onEdit={handleEditRoom} />
                    </div>
                ))}
            </div>

            <RoomFormModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                onSave={handleSaveRoom} 
                theme={theme}
                room={currentRoom}
            />
        </div>
    );
};

export default RoomsView;