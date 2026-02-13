import { ShieldCheck, MapPin, Zap, Star, Users, Clock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "All teachers are verified with qualifications, certifications, and reviews. Your learning quality is our priority.",
  },
  {
    icon: MapPin,
    title: "Smart Matching",
    description: "Our intelligent system matches you with teachers based on language, level, and availability. Find the perfect fit instantly.",
  },
  {
    icon: Zap,
    title: "Fast & Easy",
    description: "Post a lesson request or find a teacher in minutes. Simple interface, quick responses, and seamless communication.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Review ratings and feedback from other students. Only the best teachers thrive on our platform.",
  },
  {
    icon: Users,
    title: "Any Language, Any Level",
    description: "From Mandarin to Portuguese, beginner to advanced. Our diverse teacher network covers every language and skill level.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Learn on your own terms. Book lessons that fit your schedule with teachers across every timezone.",
  },
];

const WhyChooseSection = () => {
  return (
    <section id="why-choose" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Why Akalingua</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Why Choose Akalingua?
          </h2>
          <p className="text-muted-foreground mt-4">
            Everything you need to find a great language teacher or grow your teaching business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
