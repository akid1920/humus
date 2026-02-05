import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, FileText, Calendar, LogOut, LayoutDashboard, Image, User, Menu, X } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className={`admin-layout ${mobileMenuOpen ? 'menu-open' : ''}`}>
            {/* Mobile Menu Toggle - Only hamburger when closed */}
            {!mobileMenuOpen && (
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <Menu size={24} />
                </button>
            )}

            {/* Mobile Overlay */}
            <div
                className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={closeMobileMenu}
            ></div>

            <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="admin-brand">
                    <h2>HUMUS Admin</h2>
                    {/* Close button inside brand area on mobile */}
                    <button className="mobile-close-btn" onClick={closeMobileMenu}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className={`admin-nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`} onClick={closeMobileMenu}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/notices" className={`admin-nav-item ${isActive('/admin/notices') ? 'active' : ''}`} onClick={closeMobileMenu}>
                        <FileText size={20} />
                        <span>Notices</span>
                    </Link>

                    <Link to="/admin/events" className={`admin-nav-item ${isActive('/admin/events') ? 'active' : ''}`} onClick={closeMobileMenu}>
                        <Calendar size={20} />
                        <span>Events</span>
                    </Link>
                    <Link to="/admin/gallery" className={`admin-nav-item ${isActive('/admin/gallery') ? 'active' : ''}`} onClick={closeMobileMenu}>
                        <Image size={20} />
                        <span>Gallery</span>
                    </Link>
                    <Link to="/admin/alumni" className={`admin-nav-item ${isActive('/admin/alumni') ? 'active' : ''}`} onClick={closeMobileMenu}>
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
