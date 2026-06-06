import { useState } from 'react';
import './WithdrawalModal.css';
//interface for popup state
interface PopupState {
    show: boolean;
    type: "success" | "error";
    message: string;
}
// WithdrawalModal component
export default function WithdrawalModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState<PopupState>({ show: false, type: "success", message: "" });
// Function to handle withdrawal action
    const handleWithdraw = async () => {
        if (!amount) {
            setPopup({ show: true, type: "error", message: "Please enter an amount." });
            return;
        }
    
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("amount", amount);
// Send POST request to the backend API for withdrawal
            const response = await fetch('http://127.0.0.1:8000/api/withdrawals', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                },
                body: formData
            });
// Parse the JSON response from the backend
            const result = await response.json();
// Handle the response based on success or error
            if (result.success) {
                setPopup({ 
                    show: true, 
                    type: "success", 
                    message: `Withdrawal completed successfully! Reference: ${result.data.reference_number}` 
                });
                setAmount('');
                setIsOpen(false);
            } else {
                setPopup({ show: true, type: "error", message: result.message });
            }
        } catch (error) {
            console.error(error);
            setPopup({ show: true, type: "error", message: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="withdrawal-section">
            {/*Header */ }
            <div className="action-header">
                <div className="header-text">
                    <h3>Withdraw Funds</h3>
                    <p>Transfer money from your account balance to your personal bank account securely.</p>
                </div>
                <button className="main-action-btn" onClick={() => setIsOpen(true)}>
                    Withdraw Now
                </button>
            </div>

            {/* Withdrawal Modal */}
            {isOpen && (
                <div className="modal-overlay">
                    <div className="transfer-modal">
                        <h3>Withdraw Money</h3>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="modal-actions">
                            <button className="confirm-btn" onClick={handleWithdraw} disabled={loading}>
                                {loading ? "Processing..." : "Withdraw"}
                            </button>
                            <button className="cancel-btn" onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup Notification */}
            {popup.show && (
                <div className="mh-popup-overlay">
                    <div className={`mh-popup-card ${popup.type}`}>
                        <div className="popup-icon">
                            {popup.type === "success" ? "✓" : "✕"}
                        </div>
                        <h3>{popup.type === "success" ? "Success" : "Error"}</h3>
                        <p>{popup.message}</p>
                        <button
                            className="btn-close-popup"
                            onClick={() => setPopup(prev => ({ ...prev, show: false }))}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}