import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingTransfers: React.FC = () => {
    const [transfers, setTransfers] = useState<any[]>([]);

    const fetchTransfers = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/employee/pending-transfers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransfers(res.data.data || res.data);
        } catch (e) { console.error(e); }
    };

const handleAction = async (id: number, action: 'approve' | 'reject') => {
    const token = localStorage.getItem('token');
    const url = action === 'approve' 
        ? `http://127.0.0.1:8000/api/employee/approve-transfer/${id}` 
        : `http://127.0.0.1:8000/api/employee/reject-transfer/${id}`;
    
    try {
        await axios.post(url, {}, { 
            headers: { 
                Authorization: `Bearer ${token}`,
                Accept: 'application/json' 
            } 
        });
        alert("Action successful!"); // رسالة النجاح
        fetchTransfers(); // لتحديث الجدول فوراً بعد العملية
    } catch (e: any) {
        // إذا كان هناك خطأ (مثل نقص الرصيد)، سيعرضه هذا السطر للمستخدم
        const errorMessage = e.response?.data?.message || "Something went wrong!";
        alert(errorMessage); 
    }
};

    useEffect(() => { fetchTransfers(); }, []);

    return (
        <div className="em-section">
            <h2 className="em-section-title">Pending Transfers</h2>
            <table className="em-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.amount}</td>
                            <td>
                                <div className="em-actions-container">
                                    <button 
                                        className="em-btn-approve" 
                                        onClick={() => handleAction(t.id, 'approve')}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        className="em-btn-reject" 
                                        onClick={() => handleAction(t.id, 'reject')}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PendingTransfers;