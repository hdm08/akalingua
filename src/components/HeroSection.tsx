import { CheckCircle, Search, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
  const { user, role } = useAuth();

  return (
    <section className="bg-hero text-hero-foreground pt-32 pb-20 lg:pb-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight">
              Flip the Script on Language Learning at{" "}
              <span className="text-primary">Akalingua</span>
            </h1>
            <p className="mt-6 text-lg text-hero-foreground/70 leading-relaxed">
              You define the lesson. Teachers bid for the job. You choose the winner. The smartest way to find a language teacher.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-hero-foreground/80">Verified Teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-hero-foreground/80">Instant Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-hero-foreground/80">Secure & Reliable</span>
              </div>
            </div>
          </div>

          {/* Right — Path Cards */}
          <div className="space-y-4" id="paths">
            <h2 className="font-display text-2xl font-semibold">Choose Your Path</h2>
            <p className="text-hero-foreground/60 text-sm">Two ways to find the perfect language teacher</p>

            {/* Path A */}
            <div className="bg-background text-foreground rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Path A</span>
                    <span className="text-xs text-muted-foreground">• Directory</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">Find a Specific Teacher</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Browse verified teachers, view profiles with reviews, and send a direct lesson request.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    <span className="font-semibold text-foreground">Best for:</span> Specific language needs, repeat sessions, preferred teaching style
                  </p>
                  <Link to="/find-teacher" className="mt-4 w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Search Directory <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Path B */}
            <div className="bg-background text-foreground rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Path B</span>
                    <span className="text-xs text-muted-foreground">• Broadcast</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">Post a Lesson Request</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Post your lesson details and we'll notify matching teachers. Review bids and shortlist the best.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    <span className="font-semibold text-foreground">Best for:</span> Group lessons, one-off sessions, getting the best price
                  </p>
                  <Link to="/post-lesson" className="mt-4 w-full border border-primary text-primary py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
                    Post Your Lesson <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {!user && (
              <>
                <Link to="/register" className="block w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity text-center">
                  Create Account
                </Link>
                <p className="text-center text-sm text-hero-foreground/50">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
