import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './Login.css';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useData();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Simulate network delay for feel
        await new Promise(resolve => setTimeout(resolve, 500));

        const success = login(password);

        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid password');
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container glass">
                <div className="login-header">
                    <h2>Admin Portal</h2>
                    <p>Sign in to manage HUMUS</p>
                </div>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                        {loading ? 'Verifying...' : 'Access Admin Panel'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
