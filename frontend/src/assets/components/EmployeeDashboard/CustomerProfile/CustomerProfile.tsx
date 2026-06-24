
import axios from 'axios';

const CustomerProfile: React.FC<{ customer: any }> = ({ customer }) => {
    const token = localStorage.getItem('token');

    const handleAction = async (action: 'freeze' | 'unfreeze') => {
        await axios.post(`http://127.0.0.1:8000/api/employee/customers/${customer.id}/${action}`, 
            { reason: 'Updated via dashboard' }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("تمت العملية");
    };

    return (
        <div className="em-section">
            <h3>{customer.name}</h3>
            <button onClick={() => handleAction('freeze')}>Freeze</button>
            <button onClick={() => handleAction('unfreeze')}>Unfreeze</button>
            <div className="history">
                <a href={`/customers/${customer.id}/transfers`}>View Transfers</a>
                <a href={`/customers/${customer.id}/transactions`}>View Transactions</a>
            </div>
        </div>
    );
};
export default  CustomerProfile;