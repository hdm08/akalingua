import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";
import { Globe, Mail, Lock, ArrowRight, User } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update display name (optional but nice)
      await updateProfile(user, { displayName: fullName });

      // 3. Store role in Firestore
      await setDoc(doc(db, "user_roles", user.uid), {
        role,
        createdAt: new Date().toISOString(),
      });

      // 4. If teacher → create teacher profile document
      if (role === "teacher") {
        await setDoc(doc(db, "teacher_profiles", user.uid), {
          user_id: user.uid,
          display_name: fullName,
          createdAt: new Date().toISOString(),
          // You can add more fields later: bio, subjects, etc.
        });
      }

      toast.success("Account created successfully!");

      // Redirect based on chosen role (since we just set it)
      if (role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      const message =
        error.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : error.code === "auth/weak-password"
          ? "Password is too weak."
          : error.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <nav className="bg-background border-b border-border">
        <div className="container mx-auto flex items-center h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              Aka<span className="text-primary">lingua</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-background rounded-2xl shadow-sm border border-border p-8">
          <h1 className="font-display text-2xl font-bold text-center text-foreground">
            Create your account
          </h1>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">I am a...</label>
              <div className="flex gap-4">
                <label
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    role === "student" ? "border-primary bg-secondary text-primary" : "border-input text-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                    className="sr-only"
                  />
                  Student
                </label>
                <label
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    role === "teacher" ? "border-primary bg-secondary text-primary" : "border-input text-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={() => setRole("teacher")}
                    className="sr-only"
                  />
                  Teacher
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;