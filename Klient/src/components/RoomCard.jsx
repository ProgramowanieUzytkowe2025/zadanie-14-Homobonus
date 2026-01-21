import React from 'react';
import { FaLightbulb, FaEdit } from 'react-icons/fa';
import api from '../api';
import { toast } from 'react-toastify';

const RoomCard = ({ room, onDeviceUpdate, onEdit }) => {
    const activeDevices = room.devices.filter(d => d.is_active);
    const totalPower = activeDevices.reduce((sum, device) => sum + device.power_watts, 0);

    const handleToggleDevice = async (device) => {
        const updatedDevice = { ...device, is_active: !device.is_active };
        try {
            await api.put(`/aktualizujUrzadzenie/${device.id}`, updatedDevice);
            onDeviceUpdate(); // Inform parent component to refetch data
            toast.success("Poprawnie zapisano zmiany");
        } catch (error) {
            console.error("Failed to update device status", error);
            toast.error("Wystąpił błąd");
        }
    };

    return (
        <div className="card h-100 shadow-sm border-0">
            <div className="card-header bg-transparent border-bottom-0 pt-3 d-flex justify-content-between align-items-start">
                <div>
                    <h5 className="card-title mb-0">{room.name}</h5>
                    <small className="text-muted">
                        {activeDevices.length} z {room.devices.length} włączone | Moc: {totalPower} W
                    </small>
                </div>
                <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => onEdit(room)} title="Edytuj pokój">
                    <FaEdit />
                </button>
            </div>
            <div className="card-body">
                {room.devices.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {room.devices.map(device => (
                            <li key={device.id} className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent">
                                <div>
                                    <FaLightbulb className={`me-2 ${device.is_active ? 'text-warning' : 'text-muted'}`} />
                                    {device.name}
                                    <span className="ms-2 badge bg-light text-dark rounded-pill">{device.power_watts} W</span>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        checked={device.is_active}
                                        onChange={() => handleToggleDevice(device)}
                                        aria-label={`Toggle ${device.name}`}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted text-center mt-3">Brak urządzeń w tym pokoju.</p>
                )}
            </div>
        </div>
    );
};

export default RoomCard;