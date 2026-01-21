import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useTheme } from '../ThemeContext';
import { toast } from 'react-toastify';

const DeviceFormPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        power_watts: '',
        is_active: false,
        room_id: '',
    });
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomsRes = await api.get('/pobierzPokoje/');
                setRooms(roomsRes.data);

                if (id) {
                    const deviceRes = await api.get(`/pobierzUrzadzenie/${id}`);
                    const device = deviceRes.data;
                    setFormData({
                        name: device.name,
                        power_watts: device.power_watts,
                        is_active: device.is_active,
                        room_id: device.room_id || '',
                    });
                }
            } catch (err) {
                console.error("Błąd pobierania danych:", err);
                setError("Nie udało się pobrać danych.");
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const dataToSave = {
            ...formData,
            power_watts: parseInt(formData.power_watts, 10),
            room_id: formData.room_id ? parseInt(formData.room_id, 10) : null,
        };

        try {
            if (id) {
                await api.put(`/aktualizujUrzadzenie/${id}`, dataToSave);
            } else {
                await api.post('/dodajUrzadzenie/', dataToSave);
            }
            toast.success("Poprawnie zapisano zmiany");
            navigate('/dane');
        } catch (err) {
            toast.error("Wystąpił błąd");
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Wystąpił błąd podczas zapisywania.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-transparent py-3">
                    <h3 className="mb-0">{id ? 'Edytuj urządzenie' : 'Dodaj nowe urządzenie'}</h3>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nazwa urządzenia</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="power_watts" className="form-label">Moc (W)</label>
                            <input type="number" className="form-control" id="power_watts" name="power_watts" value={formData.power_watts} onChange={handleChange} required />
                            <div className="form-text">Uwaga: API odrzuci wartości powyżej 3000 W.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="room_id" className="form-label">Pokój</label>
                            <select className="form-select" id="room_id" name="room_id" value={formData.room_id} onChange={handleChange}>
                                <option value="">-- Brak przypisania --</option>
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>{room.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-check form-switch mb-4">
                            <input className="form-check-input" type="checkbox" role="switch" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="is_active">Urządzenie aktywne</label>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Zapisywanie...' : 'Zapisz'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dane')}>
                                Anuluj
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeviceFormPage;