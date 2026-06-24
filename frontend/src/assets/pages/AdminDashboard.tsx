import { useEffect, useState, useCallback } from "react";
import type { AccountRequest } from "../components/sharedComponents/interfaces/Admin";
import type { Notification } from "../components/sharedComponents/interfaces/Notification";
import AdminTable from "../components/sharedComponents/AdminTable/AdminTable";
import { DashboardHeader } from "../components/DashboardComponent/DashboardHeader/DashboardHeader";
import { DashboardNotification } from "../components/DashboardComponent/DashboardNotifocations/DashboardNotification";
import StatisticsSection from "../components/AdminDashboard/StatisticsSection/StatisticsSection";
import UsersSection from "../components/AdminDashboard/UsersSection/UsersSection";
import CustomersSection from "../components/AdminDashboard/CustomersSection/CustomersSection";
import EmployeesSection from "../components/AdminDashboard/EmployeesSection/EmployeesSection";
import "../components/sharedComponents/AdminTable/AdminTable.css";

const API = "http://127.0.0.1:8000/api";
const getToken = () => localStorage.getItem("admin_token") || localStorage.getItem("token");
const authHeaders = () => ({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`,
});

type ActiveTab = "statistics" | "users" | "customers" | "employees";
const TABS: { key: ActiveTab; label: string; icon: string }[] = [
    { key: "statistics", label: "Statistics", icon: "📊" },
    { key: "users",      label: "Users",      icon: "👥" },
    { key: "customers",  label: "Customers",  icon: "🏦" },
    { key: "employees",  label: "Employees",  icon: "💼" },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("statistics");
    const [requests, setRequests] = useState<AccountRequest[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loadingNotif, setLoadingNotif] = useState<boolean>(true);
    const [showNotifications, setShowNotifications] = useState(false);
    
    const [selectedRequest, setSelectedRequest] = useState<AccountRequest | null>(null);
    
    const [popup, setPopup] = useState({
        show: false,
        type: "success" as "success" | "error",
        message: "",
    });

    // ── Notifications Logic ──
    const fetchNotifications = useCallback(async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${API}/notifications/all`, {
                headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
            });
            const result = await res.json();
            setNotifications(result.notifications || []);
            setUnreadCount(result.unread_count || 0);
        } catch (error) { console.error("Failed to fetch notifications", error); }
        finally { setLoadingNotif(false); }
    }, []);

    useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

    const handleMarkAsRead = async (id: number) => {
        const token = localStorage.getItem("token");
        await fetch(`${API}/notifications/${id}/read`, {
            method: "POST",
            headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        fetchNotifications();
    };

    const handleMarkAllAsRead = async () => {
        const token = localStorage.getItem("token");
        await fetch(`${API}/notifications/mark-all-read`, {
            method: "POST",
            headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        fetchNotifications();
    };

    const handleDeleteNotification = async (id: number) => {
        const token = localStorage.getItem("token");
        await fetch(`${API}/notifications/${id}`, {
            method: "DELETE",
            headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` },
        });
        fetchNotifications();
    };

    // ── Account Requests Logic ──
    const fetchRequests = useCallback(async () => {
        try {
            const res = await fetch(`${API}/account/requests`, { headers: authHeaders() });
            const result = await res.json();
            setRequests(Array.isArray(result.data) ? result.data : result);
        } catch (error) { console.error("Fetch requests error", error); }
    }, []);

    useEffect(() => { fetchRequests(); }, [fetchRequests]);

    const handleAccept = async (id: number) => {
        try {
            const res = await fetch(`${API}/account/${id}/accept`, { method: "POST", headers: authHeaders() });
            const result = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(result.message || "Failed to accept.");
            setPopup({ show: true, type: "success", message: "Approved successfully" });
            fetchRequests();
        } catch (error: unknown) { 
            const errorMessage = error instanceof Error ? error.message : "Failed to accept.";  
            setPopup({ show: true, type: "error", message: errorMessage }); }
    };

    const handleReject = async (id: number) => {
        try {
            const res = await fetch(`${API}/account/${id}/reject`, { method: "POST", headers: authHeaders() });
            const result = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(result.message || "Failed to reject.");
            setPopup({ show: true, type: "success", message: "Rejected successfully" });
            fetchRequests();
        } catch (error: unknown) { 
            const errorMessage = error instanceof Error ? error.message : "Failed to reject.";
            setPopup({ show: true, type: "error", message: errorMessage }); }
    };

    // الدالة الجديدة لعرض التفاصيل
    const handleShow = (request: AccountRequest) => {
        setSelectedRequest(request);
    };

    return (
        <div className="admin-dashboard-wrapper">
            <DashboardHeader onToggleNotifications={() => setShowNotifications(!showNotifications)} unreadCount={unreadCount} />
            
            {showNotifications && (
                <DashboardNotification 
                    notifications={notifications} 
                    unreadCount={unreadCount} 
                    loading={loadingNotif} 
                    onMarkAsRead={handleMarkAsRead} 
                    onMarkAllAsRead={handleMarkAllAsRead} 
                    onDelete={handleDeleteNotification} 
                />
            )}

            <div className="ad-nav">
                {TABS.map(t => (
                    <button
                        key={t.key}
                        className={`ad-nav-btn ${activeTab === t.key ? "active" : ""}`}
                        onClick={() => setActiveTab(t.key)}
                    >
                        <span>{t.icon}</span>
                        {t.label}
                    </button>
                ))}
            </div>

            <header className="admin-header">
                <h1>Bank Account Requests Management</h1>
                <p>Monitor and process incoming banking applications</p>
            </header>

            <main className="ad-content">
                {activeTab === "statistics" && (
                    <>
                        <AdminTable 
                            requests={requests} 
                            onAccept={handleAccept} 
                            onReject={handleReject} 
                            onShow={handleShow} 
                        />
                        <StatisticsSection />
                    </>
                )}
                {activeTab === "users"     && <UsersSection />}
                {activeTab === "customers" && <CustomersSection />}
                {activeTab === "employees" && <EmployeesSection />}
            </main>

            {/* نافذة عرض تفاصيل المستخدم */}
            {selectedRequest && (
                <div className="mh-popup-overlay">
                    <div className="mh-popup-card">
                        <h3>Customer Details</h3>
                        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                            <p><strong>Name:</strong> {selectedRequest.full_name}</p>
                            <p><strong>Email:</strong> {selectedRequest.email}</p>
                            <p><strong>Deposit Amount:</strong> {selectedRequest.  deposit_amount}</p>
                            
                        </div>
                        <button className="btn-close-popup" onClick={() => setSelectedRequest(null)}>Close</button>
                    </div>
                </div>
            )}

            {popup.show && (
                <div className="mh-popup-overlay">
                    <div className={`mh-popup-card ${popup.type}`}>
                        <div className="popup-icon">{popup.type === "success" ? "✓" : "✕"}</div>
                        <h3>{popup.type === "success" ? "Operation Successful" : "Action Stopped"}</h3>
                        <p>{popup.message}</p>
                        <button className="btn-close-popup" onClick={() => setPopup(p => ({ ...p, show: false }))}>
                            Confirm & Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}