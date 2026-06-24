import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../EmployeeDashboard.css';

const PendingApprovals: React.FC = () => {
    const [approvals, setApprovals] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/employee/pending-approvals', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setApprovals(Array.isArray(res.data) ? res.data : (res.data.data || [])))
        .catch(err => console.error("Error:", err));
    }, []);

    return (
        <div className="em-section">
            <h2 className="em-section-title">Pending Approvals</h2>
            <table className="em-table">
                <tbody>
                    {approvals.length > 0 ? approvals.map((a, i) => (
                        <tr key={i}><td>{a.description || 'Approval Item'}</td></tr>
                    )) : <tr><td>There are no pending approvals.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};
export default PendingApprovals;