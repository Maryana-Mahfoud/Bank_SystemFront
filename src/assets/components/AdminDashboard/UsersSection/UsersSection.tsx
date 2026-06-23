import { useEffect, useState, useCallback } from "react";
import type { User } from "../../sharedComponents/interfaces/staticsInterface";
import "../AdminDashboard.css";

/// ─── API & Auth ─────────────────────────────────────────────────────────────
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

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ user, onSave, onClose }: {
    user: User;
    onSave: (id: number, data: { name: string; email: string }) => void;
    onClose: () => void;
}) {
    const [form, setForm] = useState({ name: user.name, email: user.email });

    return (
        <div className="mh-popup-overlay">
            <div className="ad-modal">
                <h3>Edit User — {user.name}</h3>
                <label>Name
                    <input
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    />
                </label>
                <label>Email
                    <input
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    />
                </label>
                <div className="ad-modal-actions">
                    <button className="ad-btn-edit" onClick={() => onSave(user.id, form)}>Save</button>
                    <button className="ad-btn-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UsersSection() {
    const [users, setUsers]       = useState<User[]>([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState("");
    const [editUser, setEditUser] = useState<User | null>(null);
    const [popup, setPopup]       = useState<{ show: boolean; type: "success" | "error"; message: string }>({
        show: false, type: "success", message: "",
    });

    // ── Fetch ─────────────────────────────────────────────────────────────────
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/admin/users`, { headers: authHeaders() });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setUsers(
                Array.isArray(json.users) ? json.users :
                Array.isArray(json.data)  ? json.data  :
                []
            );
        } catch (e) {
            console.log(e);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Delete ────────────────────────────────────────────────────────────────
    const handleDelete = async (id: number) => {
        if (!confirm("Delete this user?")) return;
        try {
            const res = await fetch(`${API}/admin/users/${id}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.message || "Delete failed");
            setPopup({ show: true, type: "success", message: json.message || "User deleted." });
            fetchUsers();
        } catch (e) {
            setPopup({ show: true, type: "error", message: (e as Error).message });
        }
    };

    // ── Edit Save ─────────────────────────────────────────────────────────────
    const handleEditSave = async (id: number, data: { name: string; email: string }) => {
        try {
            const res = await fetch(`${API}/admin/users/${id}`, {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify(data),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.message || "Update failed");
            setPopup({ show: true, type: "success", message: json.message || "User updated." });
            setEditUser(null);
            fetchUsers();
        } catch (e) {
            setPopup({ show: true, type: "error", message: (e as Error).message });
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    if (loading) return <div className="ad-loading">Loading users…</div>;
    if (error)   return <div className="ad-error">{error}</div>;

    return (
        <div className="ad-section">
            <div className="ad-section-header">
                <h2 className="ad-section-title">All Users</h2>
            </div>

            <table className="ad-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Verified</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="ad-empty">No users found.</td>
                        </tr>
                    ) : (
                        users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span className={`ad-badge role-${u.role}`}>{u.role}</span>
                                </td>
                                <td>{u.email_verified_at ? "✅" : "❌"}</td>
                                <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                <td className="ad-actions">
                                    <button className="ad-btn-edit"   onClick={() => setEditUser(u)}>Edit</button>
                                    <button className="ad-btn-delete" onClick={() => handleDelete(u.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {editUser && (
                <EditModal
                    user={editUser}
                    onSave={handleEditSave}
                    onClose={() => setEditUser(null)}
                />
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