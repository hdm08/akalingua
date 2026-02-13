import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // or "@/context/AuthContext"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const PostLesson = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [lessonType, setLessonType] = useState("one-on-one");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [schedule, setSchedule] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  // Only students should be able to post requests
  if (!user || role !== "student") {
    return (
      <div className="min-h-screen bg-muted">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Access Restricted
            </h2>
            <p className="text-muted-foreground mt-2">
              You need to be logged in as a **student** to post a lesson request.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm mt-6 hover:opacity-90 transition-opacity"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !language.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const lessonData = {
        student_id: user.uid,
        student_email: user.email || null,
        title: title.trim(),
        description: description.trim(),
        language: language.trim(),
        lesson_type: lessonType,
        budget_min: parseFloat(budgetMin) || 0,
        budget_max: parseFloat(budgetMax) || 0,
        preferred_schedule: schedule.trim(),
        status: "open",
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };

      // Add to Firestore collection "lesson_requests"
      await addDoc(collection(db, "lesson_requests"), lessonData);

      toast.success("Lesson request posted successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Error posting lesson request:", error);
      toast.error(error.message || "Failed to post lesson request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />

      <div className="pt-16">
        <div className="bg-hero text-hero-foreground py-12">
          <div className="container mx-auto px-6">
            <h1 className="font-display text-3xl font-bold">Post a Lesson Request</h1>
            <p className="text-hero-foreground/70 mt-2">
              Describe your lesson needs and let teachers come to you
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="bg-background rounded-xl border border-border p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Lesson Title <span className="text-destructive">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Spanish Conversation Practice"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe what you're looking for (level, goals, frequency...)"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Language <span className="text-destructive">*</span>
                </label>
                <input
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g. Spanish, Japanese, French"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Lesson Type
                </label>
                <select
                  value={lessonType}
                  onChange={(e) => setLessonType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="one-on-one">One-on-One</option>
                  <option value="group">Group</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Budget Min (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="20"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Budget Max (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Preferred Schedule
              </label>
              <input
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="e.g. Weekday evenings, Weekends only, Flexible"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Lesson Request"}{" "}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostLesson;