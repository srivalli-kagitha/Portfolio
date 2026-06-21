import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import "./admin.css";

function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await getContacts();
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
      setMsg("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContact(id);
      setMsg("Message deleted successfully!");
      loadMessages();
    } catch (err) {
      console.error(err);
      setMsg("Failed to delete message.");
    }
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="dashboard-content">
      <h2>Contact Messages</h2>
      <p className="subtitle">View and manage messages sent by visitors through your contact form.</p>

      {msg && <div className="toast-message">{msg}</div>}

      <div className="messages-container">
        {messages.map((message) => (
          <div className="message-card" key={message.id}>
            <div className="message-header">
              <div>
                <h3>{message.name}</h3>
                <span className="email-badge">{message.email}</span>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(message.id)}>
                Delete Message
              </button>
            </div>
            <div className="message-body">
              <p>{message.message}</p>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <p style={{ textAlign: "center", color: "#888", width: "100%", padding: "50px 0" }}>
            No contact messages received yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default MessagesAdmin;
