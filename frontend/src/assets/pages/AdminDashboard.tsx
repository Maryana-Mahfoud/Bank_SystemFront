import { useEffect, useState, useCallback } from "react";
import type { AccountRequest } from "../components/sharedComponents/interfaces/Admin";
import AdminTable from "../components/sharedComponents/AdminTable/AdminTable";
import "../components/sharedComponents/AdminTable/AdminTable.css";
import { DashboardHeader } from "../components/DashboardComponent/DashboardHeader/DashboardHeader";
import { DashboardNotification } from "../components/DashboardComponent/DashboardNotifocations/DashboardNotification";
import type { Notification } from "../components/sharedComponents/interfaces/Notification";

export default function AdminDashboard() {
    const [requests, setRequests] = useState<AccountRequest[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loadingNotif, setLoadingNotif] = useState<boolean>(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [popup, setPopup] = useState({ 
        show: false, 
        type: "success" as "success" | "error", 
        message: "" 
    });

    const fetchNotifications = useCallback(async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/notifications/all", {
                headers: { 
                    "Accept": "application/json", 
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json();
            setNotifications(result.notifications || []);
            setUnreadCount(result.unread_count || 0);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoadingNotif(false);
        }
    }, []);

    const handleMarkAsRead = async (id: number) => {
        //fetch to mark as read, then refresh notifications
        const token = localStorage.getItem("token");
        await fetch(`http://127.0.0.1:8000/api/notifications/${id}/read`, {
            method: "POST",
            headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` }
        });
        fetchNotifications();
    };
    // Mark all as read
    const handleMarkAllAsRead = async () => {
        const token = localStorage.getItem("token");
        await fetch("http://127.0.0.1:8000/api/notifications/read-all", {
            method: "POST",
            headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` }
        });
        fetchNotifications();
    };
// Delete notification
    const handleDeleteNotification = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/notifications/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
            });
            if (!response.ok) throw new Error("Failed to delete");
            fetchNotifications();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNotifications();
    }, []);

    const triggerRefresh = async () => {
        try {
            
            const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/account/requests", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            //fetch can succeed but return an error status, so we check response.ok before parsing JSON
            if (!response.ok) throw new Error(`Server status: ${response.status}`);
            const result = await response.json();
            setRequests(Array.isArray(result.data) ? result.data : result); 
        } catch (error) {
            console.error("Refresh error", error);
        }
    };
// Initial data load for account requests
    useEffect(() => {
        let isMounted = true;
        const loadInitialData = async () => {
            try {
                const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
                const response = await fetch("http://127.0.0.1:8000/api/account/requests", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error(`Server status: ${response.status}`);
                const result = await response.json();
                if (isMounted) setRequests(Array.isArray(result.data) ? result.data : result);
            } catch (error) {
                console.error("Fetch error", error);
            }
        };
        loadInitialData();
        return () => { isMounted = false; };
    }, []);
// Handle accept and reject actions with improved error handling and user feedback
    const handleAccept = async (id: number) => {
        try {
            const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:8000/api/account/${id}/accept`, {
                method: "POST",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.message || "Failed to accept the request.");
            setPopup({ 
                show: true, 
                type: "success", 
                message: `${result.message || "Request approved successfully"}. Verification Code: ${result.data?.verification_code || 'N/A'}` 
            });
            triggerRefresh();
        } catch (error: unknown) {
            console.error(error);
            setPopup({ show: true, type: "error", message: (error as Error).message || "Connection error during acceptance." });
        }
    };
// Similar structure for handleReject with specific error handling for validation errors 
// and network issues
    const handleReject = async (id: number) => {
        try {
            const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:8000/api/account/${id}/reject`, {
                method: "POST",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json().catch(() => ({ message: "Server error occurred." }));
            if (response.status === 422) {
                setPopup({ show: true, type: "error", message: result.message });
            } else if (response.ok) {
                setPopup({ show: true, type: "success", message: result.message || "Request has been rejected successfully." });
                triggerRefresh();
            } else {
                throw new Error(result.message || "Failed to reject request.");
            }
        } catch (error: unknown) {
            console.error(error);
            setPopup({ show: true, type: "error", message: (error as Error).message || "Network error during rejection." });
        }
    };

    return (
        <div className="admin-dashboard-wrapper">
            <DashboardHeader 
                onToggleNotifications={() => setShowNotifications(!showNotifications)} 
                unreadCount={unreadCount}
            />
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

            <header className="admin-header">
                <h1>Bank Account Requests Management</h1>
                <p>Monitor and process incoming banking applications</p>
            </header>

            <AdminTable 
                requests={requests} 
                onAccept={handleAccept} 
                onReject={handleReject} 
            />

            {popup.show && (
                <div className="mh-popup-overlay">
                    <div className={`mh-popup-card ${popup.type}`}>
                        <div className="popup-icon">
                            {popup.type === "success" ? "✓" : "✕"}
                        </div>
                        <h3>{popup.type === "success" ? "Operation Successful" : "Action Stopped"}</h3>
                        <p>{popup.message}</p>
                        <button 
                            className="btn-close-popup"
                            onClick={() => setPopup(prev => ({ ...prev, show: false }))}
                        >
                            Confirm & Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}