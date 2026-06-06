import { useState } from 'react';
import "./RecentTransictions.css"
// Define TypeScript interfaces for transaction and popup state
interface Transaction {
    id: number | string;
    type: string;
    amount: number | string;
}
// Define the shape of the popup state
interface PopupState {
    show: boolean;
    type: "success" | "error";
    message: string;
}
// Main component for recent transactions and transfer form
export const RecentTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showList, setShowList] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [popup, setPopup] = useState<PopupState>({ show: false, type: "success", message: "" });

    // Transfer form state
    const [receiveEmail, setReceiveEmail] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [transferLoading, setTransferLoading] = useState<boolean>(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/latest-transactions", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                }
            });
            const result = await response.json();
            setTransactions(result?.data?.slice(0, 3) || []);
            setShowList(true);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };
// Handle the transfer action when the user submits the form
    const handleTransfer = async () => {
        if (!receiveEmail || !amount) {
            setPopup({ show: true, type: "error", message: "Please fill in all fields." });
            return;
        }
// Basic email format validation
        setTransferLoading(true);
        try {
            const formData = new FormData();
            formData.append("receive_email", receiveEmail);
            formData.append("amount", amount);
// Make the API call to perform the transfer
            const response = await fetch("http://127.0.0.1:8000/api/transfers", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                },
                body: formData
            });

            const result = await response.json();
// Handle the response and update the UI accordingly
            if (result.success) {
                setPopup({ 
                    show: true, 
                    type: "success", 
                    message: `Transfer completed successfully! Reference: ${result.data.reference_number}` 
                });
                setReceiveEmail("");
                setAmount("");
                fetchTransactions();
            } else {
                setPopup({ show: true, type: "error", message: result.message });
            }
        } catch (error) {
            console.error("Transfer error:", error);
            setPopup({ show: true, type: "error", message: "Network error. Please try again." });
        } finally {
            setTransferLoading(false);
        }
    };

    return (
        <section className="transactions-section">
            {/* Transfer Form */}
            <div className="transfer-form">
                <h3>Transfer Money</h3>
                <input
                    type="email"
                    placeholder="Recipient Email"
                    value={receiveEmail}
                    onChange={(e) => setReceiveEmail(e.target.value)}
                    className="transfer-input"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="transfer-input"
                />
                <button 
                    onClick={handleTransfer} 
                    className="toggle-btn"
                    disabled={transferLoading}
                >
                    {transferLoading ? "Processing..." : "Send Transfer"}
                </button>
            </div>

            {/* Recent Transactions */}
            <div className="transactions-header">
                <h3>Latest 3 Transactions</h3>
                {!showList && (
                    <button onClick={fetchTransactions} className="toggle-btn">
                        {loading ? "Loading..." : "Show Transactions"}
                    </button>
                )}
            </div>

            {showList && (
                <ul className="transactions-list">
                    {transactions.length === 0 ? (
                        <p>No previous transactions</p>
                    ) : (
                        transactions.map((trans: Transaction) => (
                            <li key={trans.id} className="transaction-item">
                                <span>{trans.type}</span>
                                <span className="trans-amount">{trans.amount} $</span>
                            </li>
                        ))
                    )}
                    <button onClick={() => setShowList(false)} className="close-btn">Hide</button>
                </ul>
            )}

            {/* Popup */}
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
};