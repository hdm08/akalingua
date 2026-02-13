import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Star, CheckCircle, ArrowRight, Filter, Globe, MapPin } from "lucide-react";

interface TeacherProfile {
  id: string;
  user_id: string;
  display_name: string;
  bio: string;
  languages: string[];
  hourly_rate: number;
  experience_years: number;
  rating: number;
  review_count: number;
  verified: boolean;
  city: string;
  country: string;
  teaching_style: string;
}

const MOCK_TEACHERS: TeacherProfile[] = [
  {
    id: "1", user_id: "1", display_name: "María García", bio: "Native Spanish speaker with 10+ years of teaching experience.",
    languages: ["Spanish", "English"], hourly_rate: 35, experience_years: 10, rating: 5.0, review_count: 120,
    verified: true, city: "Madrid", country: "Spain", teaching_style: "Conversational",
  },
  {
    id: "2", user_id: "2", display_name: "Yuki Tanaka", bio: "Certified Japanese teacher specializing in JLPT preparation.",
    languages: ["Japanese", "English"], hourly_rate: 40, experience_years: 8, rating: 4.9, review_count: 78,
    verified: true, city: "Tokyo", country: "Japan", teaching_style: "Structured",
  },
  {
    id: "3", user_id: "3", display_name: "Pierre Dubois", bio: "French language and culture specialist. Alliance Française certified.",
    languages: ["French", "English"], hourly_rate: 30, experience_years: 6, rating: 4.8, review_count: 45,
    verified: true, city: "Paris", country: "France", teaching_style: "Immersive",
  },
  {
    id: "4", user_id: "4", display_name: "Li Wei", bio: "Mandarin Chinese teacher for all levels. HSK exam preparation expert.",
    languages: ["Mandarin", "English"], hourly_rate: 28, experience_years: 5, rating: 4.7, review_count: 32,
    verified: true, city: "Beijing", country: "China", teaching_style: "Academic",
  },
  {
    id: "5", user_id: "5", display_name: "Anna Schmidt", bio: "German teacher with a passion for making grammar fun and accessible.",
    languages: ["German", "English"], hourly_rate: 32, experience_years: 7, rating: 4.6, review_count: 28,
    verified: false, city: "Berlin", country: "Germany", teaching_style: "Interactive",
  },
  {
    id: "6", user_id: "6", display_name: "Luca Rossi", bio: "Italian language and culture enthusiast. Focus on conversational fluency.",
    languages: ["Italian", "English"], hourly_rate: 25, experience_years: 4, rating: 4.5, review_count: 19,
    verified: true, city: "Rome", country: "Italy", teaching_style: "Casual",
  },
];

const FindTeacher = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [teachers, setTeachers] = useState<TeacherProfile[]>(MOCK_TEACHERS);
  const [languageFilter, setLanguageFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const allLanguages = ["All", ...new Set(MOCK_TEACHERS.flatMap((t) => t.languages))];

  const filtered = teachers
    .filter((t) => {
      const matchesSearch = t.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLang = languageFilter === "All" || t.languages.includes(languageFilter);
      return matchesSearch && matchesLang;
    })
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : b.review_count - a.review_count);

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="bg-hero text-hero-foreground py-12">
          <div className="container mx-auto px-6">
            <h1 className="font-display text-3xl md:text-4xl font-bold">Find a Teacher</h1>
            <p className="text-hero-foreground/70 mt-2">Browse verified professional language teachers worldwide</p>

            <div className="mt-6 flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for teachers..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-0 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                Search <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-background rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-foreground" />
                  <h3 className="font-display font-semibold text-foreground">Filters</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Language</h4>
                    <div className="space-y-2">
                      {allLanguages.map((lang) => (
                        <label key={lang} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="language"
                            checked={languageFilter === lang}
                            onChange={() => setLanguageFilter(lang)}
                            className="accent-primary"
                          />
                          <span className="text-sm text-foreground">{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                  Showing {filtered.length} of {teachers.length} results
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="reviews">Sort by Reviews</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((teacher) => (
                  <div key={teacher.id} className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg font-semibold text-foreground">{teacher.display_name}</h3>
                          {teacher.verified && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              <CheckCircle className="h-3 w-3" /> Verified
                            </span>
                          )}
                          {teacher.rating >= 4.9 && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                              Top Rated
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {teacher.city}, {teacher.country}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-3">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="text-sm font-semibold text-foreground">{teacher.rating}</span>
                      <span className="text-sm text-muted-foreground">({teacher.review_count} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {teacher.languages.map((lang) => (
                        <span key={lang} className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                          {lang}
                        </span>
                      ))}
                      <span className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                        {teacher.teaching_style}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{teacher.bio}</p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="font-display font-bold text-foreground">€{teacher.hourly_rate}<span className="text-xs text-muted-foreground font-normal">/hr</span></span>
                      <button className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                        View Profile <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindTeacher;
