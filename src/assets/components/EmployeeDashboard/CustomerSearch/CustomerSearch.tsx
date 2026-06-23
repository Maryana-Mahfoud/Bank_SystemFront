import React, { useState } from 'react';
import axios from 'axios';
interface CustomerSearchProps {
    onSelectCustomer: (customer: any) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ onSelectCustomer }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        const token = localStorage.getItem('token');
        try {
      
            const res = await axios.get(`http://127.0.0.1:8000/api/employee/search-customer?q=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResults(res.data.data || res.data);
        } catch (e) {
            console.error("Error searching customers:", e);
        }
    };

    return (
        <div className="em-section">
            <h2 className="em-section-title">Customer Search</h2>
            
            {/* شريط البحث */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    className="em-modal-input"
                    type="text" 
                    placeholder="Enter customer name or ID..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="em-btn-add" onClick={handleSearch}>Search</button>
            </div>

            {/* جدول النتائج */}
            <table className="em-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>
                                {/* الزر الذي يربط البحث بصفحة البروفايل */}
                                <button 
                                    className="em-btn-unfreeze" 
                                    onClick={() => onSelectCustomer(customer)}
                                >
                                    View Profile
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerSearch;