import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingWithdrawals: React.FC = () => {
    const [withdrawals, setWithdrawals] = useState<any[]>([]);

   const fetchWithdrawals = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/api/employee/pending-withdrawals', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("البيانات اللي وصلت من السيرفر:", res.data); // هذا السطر هو الأهم
        setWithdrawals(res.data.data || res.data);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
    }
};
    const handleAction = async (id: number, endpoint: string) => {
        const token = localStorage.getItem('token');
        await axios.post(`http://127.0.0.1:8000/api/employee/${endpoint}/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchWithdrawals();
    };

    useEffect(() => { fetchWithdrawals(); }, []);

    return (
        <div className="em-section">
            <h2>Pending Withdrawals</h2>
            {withdrawals.map((w) => (
                <div key={w.id} className="em-row">
                    <span>{w.amount}</span>
                    <button onClick={() => handleAction(w.id, 'approve-withdrawal')}>Approve</button>
                    <button onClick={() => handleAction(w.id, 'reject-withdrawal')}>Reject</button>
                </div>
            ))}
        </div>
    );
};
export default PendingWithdrawals;