import { Globe, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Aka<span className="text-primary">lingua</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/find-teacher" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find a Teacher</Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          {user && role === "teacher" && (
            <Link to="/teacher/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <button onClick={handleSignOut} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 flex items-center gap-1">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Login</Link>
              <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          <Link to="/find-teacher" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Find a Teacher</Link>
          <Link to="/about" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Contact</Link>
          {user && role === "teacher" && (
            <Link to="/teacher/dashboard" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Dashboard</Link>
          )}
          <div className="pt-3 border-t border-border space-y-2">
            {user ? (
              <button onClick={() => { handleSignOut(); setOpen(false); }} className="w-full text-sm font-medium text-muted-foreground py-2 flex items-center justify-center gap-1">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            ) : (
              <>
                <Link to="/login" className="block w-full text-sm font-medium text-muted-foreground py-2 text-center" onClick={() => setOpen(false)}>Login</Link>
                <Link to="/register" className="block w-full text-sm font-medium bg-primary text-primary-foreground py-2.5 rounded-lg text-center" onClick={() => setOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
