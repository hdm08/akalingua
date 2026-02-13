import { Search, Send, ArrowRight, ListChecks, UserCheck, MessageSquare } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Two Simple Ways to Get Started
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Find a Teacher */}
          <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Find a Teacher</h3>
            <p className="text-sm text-muted-foreground mt-2">Search our directory of verified language teachers</p>

            <div className="mt-8 space-y-5">
              {[
                { step: "1", icon: Search, text: "Browse teachers by language and specialty" },
                { step: "2", icon: UserCheck, text: "View detailed profiles with ratings and verification" },
                { step: "3", icon: MessageSquare, text: "Send a direct lesson request to your chosen teacher" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <p className="text-sm text-foreground pt-1">{item.text}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 text-sm font-medium text-primary flex items-center gap-2 hover:gap-3 transition-all">
              Browse Teachers <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Post a Lesson */}
          <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Post a Lesson</h3>
            <p className="text-sm text-muted-foreground mt-2">Broadcast to multiple matching teachers</p>

            <div className="mt-8 space-y-5">
              {[
                { step: "1", icon: Send, text: "Post your lesson details and requirements" },
                { step: "2", icon: ListChecks, text: "We match you with relevant teachers automatically" },
                { step: "3", icon: UserCheck, text: "Review bids and shortlist the best teachers" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <p className="text-sm text-foreground pt-1">{item.text}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 text-sm font-medium text-primary flex items-center gap-2 hover:gap-3 transition-all">
              Post Your Lesson <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
