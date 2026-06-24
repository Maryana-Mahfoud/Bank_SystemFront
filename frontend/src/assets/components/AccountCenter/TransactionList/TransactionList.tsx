import { useEffect, useState } from 'react';
import axios from 'axios';
import "../AccountCenter.css";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/transactions', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {

            setTransactions(res.data.transactions || []); 
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching transactions:", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="ad-loading">Loading the record...</div>;

    return (
        <div className="transaction-container">
            <table className="ad-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(transactions) && transactions.length > 0 ? (
                        transactions.map((t: any) => (
                            <tr key={t.id || Math.random()}>
                                <td>{t.date || 'N/A'}</td>
                                <td>{t.type || 'N/A'}</td>
                                <td>{t.amount || 0} $</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'center' }}>
                                No transactions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;