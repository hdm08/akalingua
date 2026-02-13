import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // or "@/context/AuthContext" depending on your path
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import {
  Globe,
  Briefcase,
  Inbox,
  UserCircle,
  LogOut,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  Languages,
  BookOpen,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

const MOCK_JOBS = [
  {
    id: "1",
    title: "Spanish Conversation Practice",
    language: "Spanish",
    lesson_type: "one-on-one",
    budget_min: 20,
    budget_max: 35,
    preferred_schedule: "Weekday evenings",
    status: "open",
    created_at: "2026-02-12T10:00:00Z",
    description:
      "Looking for a native Spanish speaker for weekly conversation practice. Intermediate level.",
  },
  // ... other mock jobs remain the same
];

const MOCK_DIRECT = [
  // ... mock direct requests remain the same
];

type Tab = "jobs" | "direct" | "profile";

const TeacherDashboard = () => {
  const { user, role, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("jobs");

  // Profile state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState(""); // comma-separated string for input
  const [hourlyRate, setHourlyRate] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [teachingStyle, setTeachingStyle] = useState("");
  const [availability, setAvailability] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || role !== "teacher")) {
      navigate("/login");
    }
  }, [user, role, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const profileRef = doc(db, "teacher_profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setLanguages(Array.isArray(data.languages) ? data.languages.join(", ") : "");
        setHourlyRate(data.hourly_rate ? String(data.hourly_rate) : "");
        setExperienceYears(data.experience_years ? String(data.experience_years) : "");
        setCity(data.city || "");
        setCountry(data.country || "");
        setTeachingStyle(data.teaching_style || "");
        setAvailability(data.availability || "");
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
      toast.error("Could not load your profile");
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    setProfileLoading(true);

    try {
      const profileRef = doc(db, "teacher_profiles", user.uid);

      const profileData = {
        display_name: displayName.trim(),
        bio: bio.trim(),
        languages: languages
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
        hourly_rate: parseFloat(hourlyRate) || 0,
        experience_years: parseInt(experienceYears) || 0,
        city: city.trim(),
        country: country.trim(),
        teaching_style: teachingStyle.trim(),
        availability: availability.trim(),
        updated_at: new Date().toISOString(),
      };

      // Use setDoc with merge to update (creates if not exists)
      await setDoc(profileRef, profileData, { merge: true });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  const tabs = [
    { id: "jobs" as Tab, label: "Job Feeds", icon: Briefcase },
    { id: "direct" as Tab, label: "Direct Requests", icon: Inbox },
    { id: "profile" as Tab, label: "Edit Profile", icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Nav */}
      <nav className="bg-background border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              Aka<span className="text-primary">lingua</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Teacher Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your teaching profile, view job opportunities, and respond to requests
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 bg-background rounded-xl border border-border p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Job Feeds */}
        {activeTab === "jobs" && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Open Lesson Requests
              </h2>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {MOCK_JOBS.length} jobs available
              </span>
            </div>
            {MOCK_JOBS.map((job) => (
              <div
                key={job.id}
                className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
              >
                {/* Job card content remains the same */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                        <Languages className="h-3 w-3" /> {job.language}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                        <BookOpen className="h-3 w-3" /> {job.lesson_type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                        <Clock className="h-3 w-3" /> {job.preferred_schedule}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full uppercase">
                    {job.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{job.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="font-display font-bold text-foreground flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> €{job.budget_min} - €
                    {job.budget_max}
                    <span className="text-xs text-muted-foreground font-normal">/lesson</span>
                  </span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
                    Submit Quote <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Direct Requests - remains unchanged for now */}
        {activeTab === "direct" && (
          <div className="mt-6 space-y-4">
            {/* ... your existing direct requests UI ... */}
          </div>
        )}

        {/* Edit Profile */}
        {activeTab === "profile" && (
          <div className="mt-6 max-w-2xl">
            <h2 className="font-display text-lg font-semibold text-foreground mb-6">
              Edit Your Profile
            </h2>
            <div className="bg-background rounded-xl border border-border p-6 space-y-5">
              {/* Form fields remain mostly the same */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Display Name
                  </label>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Hourly Rate (€)
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Bio, Languages, City/Country/Experience, Teaching Style, Availability - same as before */}
              {/* ... keep your existing inputs ... */}

              <button
                onClick={saveProfile}
                disabled={profileLoading}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {profileLoading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;