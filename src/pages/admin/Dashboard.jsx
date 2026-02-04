import { FileText, Calendar, Image } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Dashboard = () => {
    const { notices, events, gallery } = useData();

    // Real Data
    const stats = [
        { title: 'Total Notices', value: notices.length, icon: <FileText size={24} />, color: 'var(--color-primary)' },
        { title: 'Upcoming Events', value: events.length, icon: <Calendar size={24} />, color: '#d97706' },
        { title: 'Gallery Albums', value: gallery.length, icon: <Image size={24} />, color: '#2563eb' },
    ];

    return (
        <div className="admin-dashboard">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="glass p-6 rounded-xl border border-gray-100 flex items-center gap-4" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'white' }}>
                        <div className="p-3 rounded-lg bg-opacity-10" style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium" style={{ fontSize: '0.875rem', color: '#6b7280' }}>{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="recent-activity glass p-6 rounded-xl bg-white" style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem' }}>
                <h3 className="text-lg font-bold mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Activity</h3>
                <div className="space-y-4">
                    <p className="text-gray-500 italic">No recent activity logged.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
