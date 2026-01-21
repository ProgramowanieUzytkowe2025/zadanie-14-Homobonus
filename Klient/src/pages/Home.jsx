import { Link } from 'react-router-dom';
import { FaPlug, FaMapMarkedAlt, FaArrowRight } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="container mt-4">
            <div className="card text-center p-5 mb-4 shadow border-0 text-white gradient">
                <div className="card-body">
                    <h1 className="display-5 fw-bold">Witaj w Panelu Smart Home</h1>
                    <p className="col-md-8 fs-4 mx-auto">
                        Zarządzaj swoimi inteligentnymi urządzeniami, monitoruj zużycie energii i automatyzuj swój dom.
                    </p>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-0 text-white gradient" >
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="fs-2 me-3"><FaPlug /></div>
                                    <h4 className="card-title mb-0">Zarządzaj Urządzeniami</h4>
                                </div>
                                <p className="card-text">
                                    Dodawaj, edytuj i usuwaj urządzenia w swoim domu. Sprawdzaj ich status i moc.
                                </p>
                            </div>
                            <Link to="/dane" className="btn btn-light mt-3 align-self-start">
                                Przejdź do listy <FaArrowRight className="ms-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-0 text-white gradient">
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="fs-2 me-3"><FaMapMarkedAlt /></div>
                                    <h4 className="card-title mb-0">Dashboard Pokoi</h4>
                                </div>
                                <p className="card-text">
                                    Przeglądaj pokoje i steruj urządzeniami w czasie rzeczywistym z jednego miejsca.
                                </p>
                            </div>
                            <Link to="/pokoje" className="btn btn-light mt-3 align-self-start">
                                Otwórz dashboard <FaArrowRight className="ms-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
