import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useTheme } from '../ThemeContext';
import RoomFormModal from './RoomFormModal';
import { FaPlus, FaDoorOpen, FaEdit, FaTrash } from 'react-icons/fa';
import DevicePowerChart from '../components/DevicePowerChart';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const DataView = () => {
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme();
    const [filterStatus, setFilterStatus] = useState('all');
    const [showRoomModal, setShowRoomModal] = useState(false);


    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            let params = {};
            if (filterStatus === 'true') params.is_active = true;
            if (filterStatus === 'false') params.is_active = false;

            const [devicesRes, roomsRes] = await Promise.all([
                api.get('/pobierzUrzadzenia', { params }),
                api.get('/pobierzPokoje/')
            ]);
            setData(devicesRes.data);
            setRooms(roomsRes.data);
        } catch (err) {
            setError("Nie udało się pobrać danych z API. Upewnij się, że serwer FastAPI działa i sprawdź konsolę przeglądarki (F12) w poszukiwaniu błędów CORS.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterStatus]);

    // --- CRUD Handlers ---

    const handleDelete = (deviceId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <p>Czy na pewno chcesz usunąć to urządzenie?</p>
                        <div className='d-flex justify-content-center gap-3 mt-4'>
                            <button
                                className='btn btn-success'
                                onClick={async () => {
                                    try {
                                        await api.delete(`/usunUrzadzenie/${deviceId}`);
                                        setData(prevData => prevData.filter(device => device.id !== deviceId));
                                        toast.success("Poprawnie zapisano zmiany");
                                    } catch (err) {
                                        console.error("Błąd podczas usuwania urządzenia:", err);
                                        toast.error(`Wystąpił błąd: ${err.response.data.detail}` );
                                    }
                                    onClose();
                                }}
                            >
                                Tak
                            </button>
                            <button className='btn btn-danger' onClick={onClose}>
                                Anuluj
                            </button>
                        </div>
                    </div>
                );
            }
        });
    };

    const handleSaveRoom = async (roomData) => {
        try {
            await api.post('/dodajPokoj/', roomData);
            setShowRoomModal(false);
            fetchData(); 
            toast.success("Poprawnie zapisano zmiany");
        } catch (err) {
            console.error("Błąd dodawania pokoju:", err);
            toast.error("Wystąpił błąd");
        }
    };

    if (loading) return (
        <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p>Ładowanie danych...</p>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger container mt-4" role="alert">
            {error}
        </div>
    );


    return (
        <div className="container">

            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2 className="mb-0">Lista Urządzeń</h2>
                <div className="d-flex gap-2">
                    <select 
                        className="form-select me-3" 
                        style={{ width: 'auto' }}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Wszystkie</option>
                        <option value="true">Aktywne</option>
                        <option value="false">Nieaktywne</option>
                    </select>
                    <button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={() => setShowRoomModal(true)}>
                        <FaDoorOpen /> Dodaj pokój
                    </button>
                    <Link to="/dodaj-urzadzenie" className="btn btn-primary d-flex align-items-center gap-2">
                        <FaPlus /> Dodaj urządzenie
                    </Link>
                </div>
            </div>

            {/* Devices Grid Section */}
            <div className="row g-4 mb-4">
                {data.map((device) => (
                    <div key={device.id} className="col-12 col-md-6 col-lg-4">
                        <div className={`card h-100 shadow-sm border-0`}>
                            <div className="card-body">
                                <h5 className="card-title mb-3 fw-bold">{device.name}</h5>
                                
                                <p className="card-text mb-1">
                                    <span className="text-muted">Moc:</span> <strong>{device.power_watts} W</strong>
                                </p>
                                <p className="card-text mb-3">
                                    <span className="text-muted">Aktywne:</span> <strong>{device.is_active ? 'Tak' : 'Nie'}</strong>
                                </p>

                                <div className="d-flex justify-content-end gap-2">
                                    <Link to={`/edytuj-urzadzenie/${device.id}`} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                                        <FaEdit /> Edytuj
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1" onClick={() => handleDelete(device.id)}>
                                        <FaTrash /> Usuń
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {data.length === 0 && !loading && <p className="text-center p-3">Brak danych do wyświetlenia. Dodaj pierwsze urządzenie!</p>}

            {/* New Chart Section */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <DevicePowerChart devices={data} />
                </div>
            </div>

            <RoomFormModal
                show={showRoomModal}
                onHide={() => setShowRoomModal(false)}
                onSave={handleSaveRoom}
                theme={theme}
            />
        </div>
    );
};

export default DataView;
