import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-hero text-hero-foreground">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold">
          Ready to Get Started?
        </h2>
        <p className="text-hero-foreground/70 mt-4 text-lg">
          Join the smartest way to find language teachers. Whether you're a student or a teacher, Akalingua has you covered.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            Create Account <ArrowRight className="h-4 w-4" />
          </button>
          <button className="border border-hero-foreground/20 text-hero-foreground px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-hero-foreground/5 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
