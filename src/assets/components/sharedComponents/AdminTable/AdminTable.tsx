import "./AdminTable.css";

interface AdminTableProps {
    requests: any[];
    onAccept: (id: number) => void;
    onReject: (id: number) => void;
    onShow: (request: any) => void; 
}

export default function AdminTable({ requests, onAccept, onReject, onShow }: AdminTableProps) {
    return (
        <div className="table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length > 0 ? (
                        requests.map((req) => (
                            <tr key={req.id}>
                                <td>{req.id}</td>
                                <td>{req.full_name}</td>
                                <td>{req.email}</td>
                                <td>${req.deposit_amount}</td>
                                <td>
                                    <span className={`badge ${req.status}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    {/* زر الـ Show */}
                                    <button 
                                        className="btn-show" 
                                        onClick={() => onShow(req)}
                                    >
                                        Show
                                    </button>

                                    {/* زر الـ Accept */}
                                    <button 
                                        className="btn-accept" 
                                        onClick={() => onAccept(req.id)}
                                        disabled={req.status !== "pending"}
                                    >
                                        Accept
                                    </button>
                                    
                                    {/* زر الـ Reject */}
                                    <button 
                                        className="btn-reject" 
                                        onClick={() => onReject(req.id)}
                                        disabled={req.status === "rejected"}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                                No requests found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}