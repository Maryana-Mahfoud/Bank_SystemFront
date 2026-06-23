import { useState } from 'react';

export default function WithdrawalModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleWithdraw = async () => {
        if (!amount || !companyId) {
            alert("Please enter amount and select a company.");
            return;
        }
    
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("amount", amount);
            formData.append("transfer_company_id", companyId);

            const response = await fetch('http://127.0.0.1:8000/api/withdrawals', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                alert("Withdrawal successful!");
                setIsOpen(false);
            } else {
                const errorData = await response.json();
                console.error("Server Error:", errorData);
                alert(errorData.message || "Failed to withdraw.");
            }
        } catch (error) {
            console.error("Network Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <button onClick={() => setIsOpen(true)}>Withdraw Now</button>
            {isOpen && (
                <div className="modal-overlay">
                    <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                    <select onChange={(e) => setCompanyId(e.target.value)}>
                        <option value="">Select Company</option>
                        <option value="1">AL-Haram</option>
                        <option value="2">AL-Fouad</option>
                    </select>
                    <button onClick={handleWithdraw} disabled={loading}>{loading ? "Processing..." : "Confirm"}</button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            )}
        </section>
    );
}