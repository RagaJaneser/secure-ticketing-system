import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get("/tickets");
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("/tickets", form);
      setSuccess("Ticket created successfully!");
      setForm({ title: "", description: "", priority: "Medium" });
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket");
    } finally {
      setSubmitting(false);
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

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold">🎫 SecureDesk</span>
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
        {/* Create Ticket Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white fw-bold fs-5">
            ➕ Create New Ticket
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && (
              <div className="alert alert-success py-2">{success}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Brief issue title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Describe your issue in detail..."
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Priority</label>
                <select
                  name="priority"
                  className="form-select"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary fw-semibold"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Ticket"}
              </button>
            </form>
          </div>
        </div>

        {/* Tickets List */}
        <div className="card shadow-sm">
          <div className="card-header bg-white fw-bold fs-5">📋 My Tickets</div>
          <div className="card-body">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status" />
              </div>
            ) : tickets.length === 0 ? (
              <p className="text-muted text-center py-3">
                No tickets yet. Create your first one above!
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket._id}>
                        <td className="fw-semibold">{ticket.title}</td>
                        <td
                          className="text-muted"
                          style={{ maxWidth: "200px" }}
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
