import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, Mail, MapPin, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import AuroraBackground from "@/components/AuroraBackground";

// Simple hardcoded admin password — move to env var for production
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "true");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground flex items-center justify-center">
      <AuroraBackground />
      <div className={`relative z-10 w-full max-w-md px-6 ${isShaking ? "animate-[shake_0.5s_ease]" : ""}`}>
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-pop to-primary opacity-30 blur-xl" />
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-1 w-full bg-gradient-to-r from-primary via-pop to-primary" />
          <div className="p-10 flex flex-col items-center gap-6">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-heading font-bold text-foreground mb-1">Admin Portal</h1>
              <p className="text-sm text-muted-foreground font-body">Enter the admin password to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Password"
                  required
                  autoFocus
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary font-body text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500 font-body text-center">{error}</p>
              )}

              <button
                type="submit"
                className="cosmic-button w-full font-body"
              >
                Enter Dashboard
              </button>
            </form>

            <a href="/" className="text-xs font-body text-muted-foreground hover:text-primary transition-colors">
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

const AdminDashboard = () => {
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem("admin_authed") === "true"
  );
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthed) fetchMessages();
  }, [isAuthed]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authed");
    setIsAuthed(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthed) {
    return <AdminLogin onLogin={() => setIsAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
      <AuroraBackground />

      {/* Admin Navbar */}
      <nav className="fixed w-full z-40 bg-background/80 backdrop-blur-md shadow-xs py-4 border-b border-border">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
              Admin Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="font-body text-sm hover:text-primary transition-colors">
              &larr; Back to Portfolio
            </a>
            <button
              onClick={handleLogout}
              className="font-body text-sm px-3 py-1.5 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-colors"
            >
              Logout
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold mb-2 text-glow">Message Hub</h1>
          <p className="text-muted-foreground font-body">Manage all incoming requests and messages from your portfolio.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center shadow-lg backdrop-blur-sm">
            <Mail className="mx-auto w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-body font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground font-body">When someone contacts you, their message will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-card border border-border rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 backdrop-blur-sm group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-heading font-bold text-lg">{msg.name}</h3>
                  <span className="flex items-center text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full font-body whitespace-nowrap">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(msg.created_at)}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm font-body text-foreground/80">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors break-all">
                      {msg.email}
                    </a>
                  </div>
                  {msg.country && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{msg.country}</span>
                    </div>
                  )}
                </div>

                <div className="bg-background/50 rounded-lg p-4 font-body text-sm border border-border/50 text-foreground/90 max-h-48 overflow-y-auto">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
