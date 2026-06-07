import { useEffect, useState, useCallback } from "react";
import type { Employee } from "../../sharedComponents/interfaces/staticsInterface";
import "../AdminDashboard.css";

const API = "http://127.0.0.1:8000/api";
const getToken = () => localStorage.getItem("admin_token") || localStorage.getItem("token");
const authHeaders = () => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
});

// ─── Confirm Popup ────────────────────────────────────────────────────────────
function ConfirmPopup({ onConfirm, onCancel }: {
    onConfirm: () => void;
    onCancel: () => void;
}) {
    return (
        <div className="mh-popup-overlay">
            <div className="mh-popup-card">
                <div className="popup-icon">🗑️</div>
                <h3>Delete Employee</h3>
                <p>Are you sure you want to delete this employee?</p>
                <div className="ad-modal-actions" style={{ justifyContent: "center" }}>
                    <button className="ad-btn-delete" onClick={onConfirm}>Yes, Delete</button>
                    <button className="ad-btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

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

// ─── Add Modal ────────────────────────────────────────────────────────────────
function AddModal({ onSave, onClose }: {
    onSave: (data: { name: string; email: string; password: string; password_confirmation: string }) => void;
    onClose: () => void;
}) {
    const [form, setForm] = useState({
        name: "", email: "", password: "", password_confirmation: ""
    });

    const fields: { key: keyof typeof form; label: string; type: string }[] = [
        { key: "name",                  label: "Name",           type: "text"     },
        { key: "email",                 label: "Email",          type: "email"    },
        { key: "password",              label: "Password",       type: "password" },
        { key: "password_confirmation", label: "Confirm Password", type: "password" },
    ];

    return (
        <div className="mh-popup-overlay">
            <div className="ad-modal">
                <h3>Add New Employee</h3>
                {fields.map(f => (
                    <label key={f.key}>{f.label}
                        <input
                            type={f.type}
                            value={form[f.key]}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        />
                    </label>
                ))}
                <div className="ad-modal-actions">
                    <button className="ad-btn-add" onClick={() => onSave(form)}>Add</button>
                    <button className="ad-btn-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ employee, onSave, onClose }: {
    employee: Employee;
    onSave: (id: number, data: { name: string; email: string }) => void;
    onClose: () => void;
}) {
    const [form, setForm] = useState({ name: employee.name, email: employee.email });

    return (
        <div className="mh-popup-overlay">
            <div className="ad-modal">
                <h3>Edit Employee — {employee.name}</h3>
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
                    <button className="ad-btn-edit" onClick={() => onSave(employee.id, form)}>Save</button>
                    <button className="ad-btn-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EmployeesSection() {
    const [employees, setEmployees]   = useState<Employee[]>([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState("");
    const [showAdd, setShowAdd]       = useState(false);
    const [editEmp, setEditEmp]       = useState<Employee | null>(null);
    const [confirmId, setConfirmId]   = useState<number | null>(null);
    const [popup, setPopup]           = useState<{ show: boolean; type: "success" | "error"; message: string }>({
        show: false, type: "success", message: "",
    });

    // ── Fetch ─────────────────────────────────────────────────────────────────
    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/admin/employees`, { headers: authHeaders() });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setEmployees(
                Array.isArray(json.employees?.employees) ? json.employees.employees :
                Array.isArray(json.employees)            ? json.employees :
                Array.isArray(json.data)                 ? json.data :
                []
            );
        } catch (e) {
            console.log(e);
            setError("Failed to load employees.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchEmployees();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Add ───────────────────────────────────────────────────────────────────
    const handleAdd = async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
        try {
            const res = await fetch(`${API}/admin/employees`, {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify(data),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.message || "Failed to add employee.");
            setPopup({ show: true, type: "success", message: json.message || "Employee added." });
            setShowAdd(false);
            fetchEmployees();
        } catch (e) {
            setPopup({ show: true, type: "error", message: (e as Error).message });
        }
    };

    // ── Edit ──────────────────────────────────────────────────────────────────
    const handleEditSave = async (id: number, data: { name: string; email: string }) => {
        try {
            const res = await fetch(`${API}/admin/employees/${id}`, {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify(data),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.message || "Update failed.");
            setPopup({ show: true, type: "success", message: json.message || "Employee updated." });
            setEditEmp(null);
            fetchEmployees();
        } catch (e) {
            setPopup({ show: true, type: "error", message: (e as Error).message });
        }
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const handleDelete = (id: number) => {
        setConfirmId(id);
    };

    const confirmDelete = async () => {
        if (confirmId === null) return;
        try {
            const res = await fetch(`${API}/admin/employees/${confirmId}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.message || "Delete failed.");
            setPopup({ show: true, type: "success", message: json.message || "Employee deleted." });
            fetchEmployees();
        } catch (e) {
            setPopup({ show: true, type: "error", message: (e as Error).message });
        } finally {
            setConfirmId(null);
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    if (loading) return <div className="ad-loading">Loading employees…</div>;
    if (error)   return <div className="ad-error">{error}</div>;

    return (
        <div className="ad-section">
            <div className="ad-section-header">
                <h2 className="ad-section-title">Employees</h2>
                <button className="ad-btn-add" onClick={() => setShowAdd(true)}>+ Add Employee</button>
            </div>

            <table className="ad-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="ad-empty">No employees found.</td>
                        </tr>
                    ) : (
                        employees.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <span className="ad-badge role-employee">{emp.role}</span>
                                </td>
                                <td>{new Date(emp.created_at).toLocaleDateString()}</td>
                                <td className="ad-actions">
                                    <button className="ad-btn-edit"   onClick={() => setEditEmp(emp)}>Edit</button>
                                    <button className="ad-btn-delete" onClick={() => handleDelete(emp.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showAdd && (
                <AddModal
                    onSave={handleAdd}
                    onClose={() => setShowAdd(false)}
                />
            )}

            {editEmp && (
                <EditModal
                    employee={editEmp}
                    onSave={handleEditSave}
                    onClose={() => setEditEmp(null)}
                />
            )}

            {confirmId !== null && (
                <ConfirmPopup
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmId(null)}
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