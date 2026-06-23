import { useState } from 'react';
import '../AccountCenter.css'; 


interface PopupState {
    show: boolean;
    type: "success" | "error";
    message: string;
}

export default function DepositModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState<PopupState>({ show: false, type: "success", message: "" });

    const handleDeposit = async () => {
        if (!amount) {
            setPopup({ show: true, type: "error", message: "Please enter an amount." });
            return;
        }
    
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("amount", amount);

            const response = await fetch('http://localhost:8000/api/deposit', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok || result.success) {
                setPopup({ 
                    show: true, 
                    type: "success", 
                    message: "Deposit completed successfully!" 
                });
                setAmount('');
                setIsOpen(false);
            } else {
                // إذا لم يكن ناجحاً، نعرض الرسالة القادمة من السيرفر
                setPopup({ show: true, type: "error", message: result.message || "Failed to deposit" });
            }
        } catch (error) {
            console.error(error);
            setPopup({ show: true, type: "error", message: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="deposit-section">
            <button className="ad-btn-add" onClick={() => setIsOpen(true)}>
                Deposit Now
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="mh-popup-overlay">
                    <div className="ad-modal">
                        <h3>Deposit Money</h3>
                        <label>
                            Amount:
                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </label>
                        <div className="ad-modal-actions">
                            <button className="ad-btn-add" onClick={handleDeposit} disabled={loading}>
                                {loading ? "Processing..." : "Deposit"}
                            </button>
                            <button className="ad-btn-cancel" onClick={() => setIsOpen(false)}>
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