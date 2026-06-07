import { useEffect, useState } from "react";
import type { Statistics } from "../../sharedComponents/interfaces/staticsInterface";
import "../AdminDashboard.css";

const API = "http://127.0.0.1:8000/api";
const getToken = () => localStorage.getItem("admin_token") || localStorage.getItem("token");

export default function StatisticsSection() {
    const [stats, setStats] = useState<Statistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API}/admin/statistics`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setStats(json.statistics);
            } catch (e) {
                console.log(e);
                setError("Failed to load statistics.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div className="ad-loading">Loading statistics…</div>;
    if (error)   return <div className="ad-error">{error}</div>;
    if (!stats)  return null;

    const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const maxTx  = Math.max(...stats.monthly_transactions.map(d => d.total), 1);
    const maxReg = Math.max(...stats.monthly_registrations.map(d => d.total), 1);

    return (
        <div className="ad-section">

            {/* ── KPI Cards ── */}
            <div className="ad-stat-grid">
                {[
                    { label: "Total Users",        value: stats.total_users,        icon: "👥" },
                    { label: "Total Customers",    value: stats.total_customers,    icon: "🏦" },
                    { label: "Active Customers",   value: stats.active_customers,   icon: "✅" },
                    { label: "Inactive Customers", value: stats.unactive_customers, icon: "⏸️" },
                    { label: "Total Employees",    value: stats.total_employees,    icon: "💼" },
                    { label: "Total Transactions", value: stats.total_transactions, icon: "💳" },
                ].map(card => (
                    <div key={card.label} className="ad-stat-card">
                        <span className="ad-stat-icon">{card.icon}</span>
                        <div>
                            <div className="ad-stat-value">{card.value}</div>
                            <div className="ad-stat-label">{card.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Charts ── */}
            <div className="ad-charts-row">
                {[
                    { title: "Monthly Transactions",  data: stats.monthly_transactions,  max: maxTx  },
                    { title: "Monthly Registrations", data: stats.monthly_registrations, max: maxReg },
                ].map(chart => (
                    <div key={chart.title} className="ad-chart-card">
                        <h3 className="ad-chart-title">{chart.title}</h3>
                        <div className="ad-bars">
                            {chart.data.map((d, i) => (
                                <div key={i} className="ad-bar-col">
                                    <span className="ad-bar-value">{d.total}</span>
                                    <div
                                        className="ad-bar"
                                        style={{ height: `${Math.max(Math.round((d.total / chart.max) * 140), 6)}px` }}
                                        title={`${d.total}`}
                                    />
                                    <span className="ad-bar-label">{MONTHS[d.month - 1]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Recent Users ── */}
            <div className="ad-recent-card">
                <h3 className="ad-section-subtitle">Recent Registrations</h3>
                <table className="ad-mini-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.recent_users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span className={`ad-badge role-${u.role}`}>{u.role}</span>
                                </td>
                                <td>{new Date(u.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}