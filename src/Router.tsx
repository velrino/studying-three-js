import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SolarSystemPage } from './pages/solar-system';

export const RoutesComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<Navigate replace to="/solar-system" />} />
                <Route path="/solar-system" element={<SolarSystemPage />} />
            </Routes>
        </Router>
    );
};
