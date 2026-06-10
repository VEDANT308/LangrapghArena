import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import Layout from '../components/Layout/Layout';
import LandingPage from '../pages/LandingPage';
import ArenaPage from '../pages/ArenaPage';
import DashboardPage from '../pages/DashboardPage';
import HistoryPage from '../pages/HistoryPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="arena" element={<ArenaPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;