import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Briefcase, Inbox, UserCircle, LogOut, Star, Clock, MapPin, ArrowRight, Languages, BookOpen, DollarSign } from "lucide-react";
import { toast } from "sonner";

const MOCK_JOBS = [
  { id: "1", title: "Spanish Conversation Practice", language: "Spanish", lesson_type: "one-on-one", budget_min: 20, budget_max: 35, preferred_schedule: "Weekday evenings", status: "open", created_at: "2026-02-12T10:00:00Z", description: "Looking for a native Spanish speaker for weekly conversation practice. Intermediate level." },
  { id: "2", title: "Japanese JLPT N3 Prep", language: "Japanese", lesson_type: "one-on-one", budget_min: 30, budget_max: 50, preferred_schedule: "Weekends", status: "open", created_at: "2026-02-11T14:00:00Z", description: "Need help preparing for JLPT N3 exam. Focus on grammar and reading comprehension." },
  { id: "3", title: "French for Business", language: "French", lesson_type: "group", budget_min: 25, budget_max: 40, preferred_schedule: "Mon/Wed/Fri mornings", status: "open", created_at: "2026-02-10T09:00:00Z", description: "Group of 3 professionals need business French lessons for upcoming Paris meeting." },
  { id: "4", title: "Mandarin Beginner Course", language: "Mandarin", lesson_type: "one-on-one", budget_min: 15, budget_max: 30, preferred_schedule: "Flexible", status: "open", created_at: "2026-02-09T16:00:00Z", description: "Complete beginner looking to start learning Mandarin from scratch." },
];

const MOCK_DIRECT = [
  { id: "1", student_name: "James Wilson", language: "Spanish", lesson_type: "one-on-one", budget: 30, message: "I saw your profile and would love to have weekly Spanish conversation lessons.", status: "pending", created_at: "2026-02-12T08:00:00Z" },
  { id: "2", student_name: "Emily Chen", language: "Spanish", lesson_type: "group", budget: 40, message: "Looking for a teacher for our team of 4. Can you do group sessions?", status: "pending", created_at: "2026-02-11T11:00:00Z" },
];

type Tab = "jobs" | "direct" | "profile";

const TeacherDashboard = () => {
  const { user, role, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("jobs");

  // Profile state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState("");
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
  }, [user, role, loading]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("teacher_profiles" as any)
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      const d = data as any;
      setDisplayName(d.display_name || "");
      setBio(d.bio || "");
      setLanguages((d.languages || []).join(", "));
      setHourlyRate(String(d.hourly_rate || ""));
      setExperienceYears(String(d.experience_years || ""));
      setCity(d.city || "");
      setCountry(d.country || "");
      setTeachingStyle(d.teaching_style || "");
      setAvailability(d.availability || "");
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    setProfileLoading(true);
    const { error } = await supabase
      .from("teacher_profiles" as any)
      .update({
        display_name: displayName,
        bio,
        languages: languages.split(",").map((l) => l.trim()).filter(Boolean),
        hourly_rate: parseFloat(hourlyRate) || 0,
        experience_years: parseInt(experienceYears) || 0,
        city,
        country,
        teaching_style: teachingStyle,
        availability,
      } as any)
      .eq("user_id", user.id);

    if (error) toast.error("Failed to save profile");
    else toast.success("Profile updated!");
    setProfileLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

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
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <button onClick={() => { signOut(); navigate("/"); }} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Teacher Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your teaching profile, view job opportunities, and respond to requests</p>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 bg-background rounded-xl border border-border p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
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
              <h2 className="font-display text-lg font-semibold text-foreground">Open Lesson Requests</h2>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{MOCK_JOBS.length} jobs available</span>
            </div>
            {MOCK_JOBS.map((job) => (
              <div key={job.id} className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
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
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full uppercase">{job.status}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{job.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="font-display font-bold text-foreground flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> €{job.budget_min} - €{job.budget_max}<span className="text-xs text-muted-foreground font-normal">/lesson</span>
                  </span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
                    Submit Quote <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Direct Requests */}
        {activeTab === "direct" && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Direct Lesson Requests</h2>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{MOCK_DIRECT.length} requests</span>
            </div>
            {MOCK_DIRECT.map((req) => (
              <div key={req.id} className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{req.student_name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                        <Languages className="h-3 w-3" /> {req.language}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                        <BookOpen className="h-3 w-3" /> {req.lesson_type}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full uppercase">{req.status}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">"{req.message}"</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="font-display font-bold text-foreground">€{req.budget}<span className="text-xs text-muted-foreground font-normal">/lesson</span></span>
                  <div className="flex gap-2">
                    <button className="border border-destructive text-destructive px-4 py-2 rounded-lg text-sm font-medium hover:bg-destructive/5 transition-colors">Decline</button>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
                      Accept <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Profile */}
        {activeTab === "profile" && (
          <div className="mt-6 max-w-2xl">
            <h2 className="font-display text-lg font-semibold text-foreground mb-6">Edit Your Profile</h2>
            <div className="bg-background rounded-xl border border-border p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Display Name</label>
                  <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Hourly Rate (€)</label>
                  <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Languages (comma-separated)</label>
                <input value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="Spanish, English, French" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                  <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Experience (years)</label>
                  <input type="number" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Teaching Style</label>
                  <input value={teachingStyle} onChange={(e) => setTeachingStyle(e.target.value)} placeholder="Conversational, Structured, etc." className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Availability</label>
                  <input value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Weekdays 9-5, Weekends" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
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
