import React, { useState, useEffect } from 'react';

const RoomFormModal = ({ show, onHide, onSave, theme, room }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (show) {
            setName(room ? room.name : '');
        }
    }, [show, room]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;
        onSave({ name });
        setName('');
    };

    if (!show) return null;

    const modalBgClass = theme === 'dark' ? 'bg-dark' : 'bg-light';
    const modalTextClass = theme === 'dark' ? 'text-light' : 'text-dark';

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className={`modal-content ${modalBgClass} ${modalTextClass} border shadow-lg`}>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header border-0">
                            <h5 className="modal-title">{room ? 'Edytuj pokój' : 'Dodaj nowy pokój'}</h5>
                            <button type="button" className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`} onClick={onHide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="roomName" className="form-label">Nazwa pokoju</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="roomName" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" onClick={onHide}>Anuluj</button>
                            <button type="submit" className="btn btn-primary">Zapisz</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RoomFormModal;