import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="flex items-center gap-2">
          <Globe className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Aka<span className="text-primary">lingua</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#why-choose" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Why Akalingua
          </a>
          <a href="#paths" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Get Started
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            Login
          </button>
          <button className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          <a href="#how-it-works" className="block text-sm font-medium text-muted-foreground">How It Works</a>
          <a href="#why-choose" className="block text-sm font-medium text-muted-foreground">Why Akalingua</a>
          <a href="#paths" className="block text-sm font-medium text-muted-foreground">Get Started</a>
          <div className="pt-3 border-t border-border space-y-2">
            <button className="w-full text-sm font-medium text-muted-foreground py-2">Login</button>
            <button className="w-full text-sm font-medium bg-primary text-primary-foreground py-2.5 rounded-lg">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
