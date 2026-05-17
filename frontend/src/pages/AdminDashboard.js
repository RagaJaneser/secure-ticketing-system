import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get("/tickets/all");
      setTickets(data);
    } catch (err) {
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId, status) => {
    setUpdating(ticketId);
    try {
      await axios.put(`/tickets/${ticketId}`, { status });
      setTickets(
        tickets.map((t) => (t._id === ticketId ? { ...t, status } : t)),
      );
    } catch (err) {
      setError("Failed to update ticket");
    } finally {
      setUpdating("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getBadgeColor = (status) => {
    if (status === "Open") return "danger";
    if (status === "In Progress") return "warning";
    if (status === "Resolved") return "success";
  };

  const getPriorityBadge = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    if (priority === "Low") return "success";
  };

  const totalOpen = tickets.filter((t) => t.status === "Open").length;
  const totalInProgress = tickets.filter(
    (t) => t.status === "In Progress",
  ).length;
  const totalResolved = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">🛡️ SecureDesk Admin</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white">👋 {user?.name}</span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-4">
        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center py-3">
              <div className="fs-1 fw-bold text-danger">{totalOpen}</div>
              <div className="text-muted fw-semibold">Open Tickets</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center py-3">
              <div className="fs-1 fw-bold text-warning">{totalInProgress}</div>
              <div className="text-muted fw-semibold">In Progress</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center py-3">
              <div className="fs-1 fw-bold text-success">{totalResolved}</div>
              <div className="text-muted fw-semibold">Resolved</div>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="card shadow-sm">
          <div className="card-header bg-white fw-bold fs-5">
            📋 All Tickets
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger py-2">{error}</div>}

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-dark" role="status" />
              </div>
            ) : tickets.length === 0 ? (
              <p className="text-muted text-center py-3">No tickets found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>User</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket._id}>
                        <td>
                          <div className="fw-semibold">{ticket.user?.name}</div>
                          <div className="text-muted small">
                            {ticket.user?.email}
                          </div>
                        </td>
                        <td className="fw-semibold">{ticket.title}</td>
                        <td
                          className="text-muted"
                          style={{ maxWidth: "180px" }}
                        >
                          {ticket.description}
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getPriorityBadge(ticket.priority)}`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getBadgeColor(ticket.status)}`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="text-muted">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={ticket.status}
                            disabled={updating === ticket._id}
                            onChange={(e) =>
                              handleStatusChange(ticket._id, e.target.value)
                            }
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
