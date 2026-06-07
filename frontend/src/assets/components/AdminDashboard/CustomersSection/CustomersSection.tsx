import { useEffect, useState, useCallback } from "react";
import type { User } from "../../sharedComponents/interfaces/staticsInterface";
import "../AdminDashboard.css";

const API = "http://127.0.0.1:8000/api";
const getToken = () => localStorage.getItem("admin_token") || localStorage.getItem("token");
const authHeaders = () => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
});

// ─── Popup ────────────────────────────────────────────────────────────────────
function Popup({ type, message, onClose }: {
    type: "success" | "error";
    message: string;
    onClose: () => void;
}) {
    return (
        <div className="mh-popup-overlay">
            <div className={`mh-popup-card ${type}`}>
                <div className="popup-icon">{type === "success" ? "✓" : "✕"}</div>
                <h3>{type === "success" ? "Operation Successful" : "Action Stopped"}</h3>
                <p>{message}</p>
                <button className="btn-close-popup" onClick={onClose}>Confirm & Close</button>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CustomersSection() {
    const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
    const [customers, setCustomers] = useState<User[]>([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState("");
    const [popup, setPopup]         = useState<{ show: boolean; type: "success" | "error"; message: string }>({
        show: false, type: "success", message: "",
    });

    // ── Fetch ─────────────────────────────────────────────────────────────────
    const fetchCustomers = useCallback(async (status: "active" | "inactive") => {
        setLoading(true);
        setError("");
        try {
            const endpoint = status === "active"
                ? `${API}/admin/customers/active`
                : `${API}/admin/customers/unActive`;

            const res = await fetch(endpoint, { headers: authHeaders() });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setCustomers(Array.isArray(json.customers) ? json.customers : Array.isArray(json.data) ? json.data : json);
        } catch (e) {
            console.log(e);
            setError("Failed to load customers.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchCustomers(activeTab);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    // ── Deactivate ────────────────────────────────────────────────────────────
    const handleDeactivate = async (id: number) => {
        if (!confirm("Deactivate this customer?")) return;
        try {
            const res = await fetch(`${API}/admin/customers/${id}/deactivate`, {
                method: "PATCH",
                headers: authHeaders(),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.message || "Failed to deactivate.");
            setPopup({ show: true, type: "success", message: json.message || "Customer deactivated." });
            fetchCustomers(activeTab);
        } catch (e) {
            setPopup({ show: true, type: "error", message: (e as Error).message });
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="ad-section">

            {/* ── Sub Tabs ── */}
            <div className="ad-tab-row">
                <button
                    className={`ad-tab-btn ${activeTab === "active" ? "active" : ""}`}
                    onClick={() => setActiveTab("active")}
                >
                    ✅ Active Customers
                </button>
                <button
                    className={`ad-tab-btn ${activeTab === "inactive" ? "active" : ""}`}
                    onClick={() => setActiveTab("inactive")}
                >
                    ⏸️ Inactive Customers
                </button>
            </div>

            {/* ── States ── */}
            {loading && <div className="ad-loading">Loading customers…</div>}
            {error   && <div className="ad-error">{error}</div>}

            {/* ── Table ── */}
            {!loading && !error && (
                <table className="ad-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Joined</th>
                            {activeTab === "active" && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={activeTab === "active" ? 6 : 5} className="ad-empty">
                                    No {activeTab} customers found.
                                </td>
                            </tr>
                        ) : (
                            customers.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.email_verified_at ? "✅" : "❌"}</td>
                                    <td>{new Date(c.created_at).toLocaleDateString()}</td>
                                    {activeTab === "active" && (
                                        <td>
                                            <button
                                                className="ad-btn-warn"
                                                onClick={() => handleDeactivate(c.id)}
                                            >
                                                Deactivate
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {popup.show && (
                <Popup
                    type={popup.type}
                    message={popup.message}
                    onClose={() => setPopup(p => ({ ...p, show: false }))}
                />
            )}
        </div>
    );
}