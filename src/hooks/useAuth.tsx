// src/context/AuthContext.tsx  (or wherever you keep it)
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";

type UserRole = "student" | "teacher" | null;

interface AuthContextType {
  user: FirebaseUser | null;
  role: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    try {
      const roleDocRef = doc(db, "user_roles", userId);
      const roleSnap = await getDoc(roleDocRef);

      if (roleSnap.exists()) {
        const data = roleSnap.data();
        const fetchedRole = data?.role;
        setRole(
          fetchedRole === "teacher" || fetchedRole === "student"
            ? fetchedRole
            : null
        );
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error("Failed to fetch user role:", err);
      setRole(null);
    }
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await fetchRole(currentUser.uid);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setRole(null);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};