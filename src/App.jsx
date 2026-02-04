import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Organization from './pages/Organization';
import Notices from './pages/Notices';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Alumni from './pages/Alumni';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminNotices from './pages/admin/AdminNotices';
import AdminEvents from './pages/admin/AdminEvents';
import AdminGallery from './pages/admin/AdminGallery';
import AdminAlumni from './pages/admin/AdminAlumni';
import { DataProvider, useData } from './context/DataContext';

const Placeholder = ({ title }) => (
  <div className="container section" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <h1 style={{ marginBottom: '1rem' }}>{title}</h1>
    <p style={{ color: 'var(--text-secondary)' }}>This page is currently under construction.</p>
  </div>
);

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="organization" element={<Organization />} />
          <Route path="notices" element={<Notices />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="achievements" element={<Placeholder title="Achievements" />} />
          <Route path="alumni" element={<Alumni />} />
          <Route path="*" element={<Placeholder title="404 - Not Found" />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="alumni" element={<AdminAlumni />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useData();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default App;

