// src/pages/Dashboard.tsx
import { useEffect, useState, useCallback } from "react";
import { DashboardHeader } from "../components/DashboardComponent/DashboardHeader/DashboardHeader";
import { DashboardNotification } from "../components/DashboardComponent/DashboardNotifocations/DashboardNotification";
import type { Notification } from "../components/sharedComponents/interfaces/Notification";
import { RecentTransactions } from "../components/DashboardComponent/RecentTransictions/RecentTransictions";
import WithdrawalModal from "../components/DashboardComponent/WithdrawalModal/WithdrawalModal";
import AiChat from "../components/DashboardComponent/AiChat/AiChat";

export default function Dashboard() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [showNotifications, setShowNotifications] = useState(false); 

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
            setLoading(false);
        }
    }, []);

    const handleMarkAsRead = async (id: number) => {
        const token = localStorage.getItem("token");
        await fetch(`http://127.0.0.1:8000/api/notifications/${id}/read`, {
            method: "POST",
            headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` }
        });
        fetchNotifications();
    };

    const handleMarkAllAsRead = async () => {
            const token = localStorage.getItem("token");
            await fetch("http://127.0.0.1:8000/api/notifications/mark-all-read", {
                method: "POST",
                headers: { "Accept": "application/json", "Authorization": `Bearer ${token}` }
            });
        fetchNotifications();
    };

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/notifications/${id}`, {
                method: "DELETE", 
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
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

    return (
        <div className="dashboard-wrapper">
            <DashboardHeader 
                onToggleNotifications={() => setShowNotifications(!showNotifications)} 
                unreadCount={unreadCount}
            />
            
            {showNotifications && (
                <DashboardNotification 
                    notifications={notifications}
                    unreadCount={unreadCount}
                    loading={loading}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onDelete={handleDelete}
                />

                
            )}
            <section>
                <RecentTransactions />
                <WithdrawalModal/>
                <AiChat/>
            </section>
            
        </div>
    );
}