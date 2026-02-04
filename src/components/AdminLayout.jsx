import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, FileText, Calendar, LogOut, LayoutDashboard, Image, User } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>HUMUS Admin</h2>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className={`admin-nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/notices" className={`admin-nav-item ${isActive('/admin/notices') ? 'active' : ''}`}>
                        <FileText size={20} />
                        <span>Notices</span>
                    </Link>

                    <Link to="/admin/events" className={`admin-nav-item ${isActive('/admin/events') ? 'active' : ''}`}>
                        <Calendar size={20} />
                        <span>Events</span>
                    </Link>
                    <Link to="/admin/gallery" className={`admin-nav-item ${isActive('/admin/gallery') ? 'active' : ''}`}>
                        <Image size={20} />
                        <span>Gallery</span>
                    </Link>
                    <Link to="/admin/alumni" className={`admin-nav-item ${isActive('/admin/alumni') ? 'active' : ''}`}>
                        <User size={20} /> {/* Assuming User is imported, layout uses lucide-react */}
                        <span>Alumni</span>
                    </Link>
                </nav>

                <div className="admin-footer">

                    <Link to="/" className="back-to-site">
                        Back to Website
                    </Link>
                </div>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
