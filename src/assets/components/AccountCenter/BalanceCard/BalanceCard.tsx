import { useEffect, useState } from 'react';
import axios from 'axios';
import '../AccountCenter.css'; 

const BalanceCard = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/balance', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setBalance(res.data.current_balance); 
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error retrieving balance:", err);
            setError("We were unable to load the balance");
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="ad-loading">Loading balance...</div>;
    if (error) return <div className="ad-error">{error}</div>;

    return (
        <div className="ad-stat-card">
            <div className="ad-stat-label">Current Balance</div>
            <div className="ad-stat-value">
                {balance !== null && balance !== undefined ? `${balance} $` : '0 $'}
            </div>
        </div>
    );
};

export default BalanceCard;