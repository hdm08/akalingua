import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Users, Target, Heart, Lightbulb, ShieldCheck } from "lucide-react";

const values = [
  { icon: Target, title: "Student-First", description: "Everything we build starts with the learner. Your goals drive how we match teachers to you." },
  { icon: ShieldCheck, title: "Quality & Trust", description: "Every teacher on our platform is verified. We maintain high standards so you can learn with confidence." },
  { icon: Lightbulb, title: "Innovation", description: "Our unique bidding system flips traditional language learning — you define the lesson, teachers compete to teach." },
  { icon: Heart, title: "Accessibility", description: "Language learning should be available to everyone, everywhere. We connect students with teachers across the globe." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-hero text-hero-foreground py-16 lg:py-24">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">About Us</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold mt-3">The Smartest Way to Learn a Language</h1>
            <p className="text-hero-foreground/70 mt-4 text-lg">Akalingua connects language learners with verified, passionate teachers using a unique reverse-bidding model. You post what you need — teachers bid to teach you.</p>
          </div>
        </div>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Our Mission</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">Making Language Learning Personal</h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Traditional language platforms give you a list of teachers and hope you find the right one. Akalingua flips that. Post your lesson requirements — language, level, budget, schedule — and let qualified teachers come to you with personalized bids.
                </p>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  Whether it's one-on-one tutoring, group sessions, or exam preparation, Akalingua ensures you find the perfect teacher at the right price.
                </p>
              </div>
              <div className="bg-muted rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-primary mx-auto" />
                  <h3 className="font-display text-xl font-bold text-foreground mt-4">50+ Languages</h3>
                  <p className="text-sm text-muted-foreground mt-2">Teachers from every corner of the world</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Our Values</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">What Drives Us</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((v) => (
                <div key={v.title} className="bg-background rounded-xl border border-border p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 text-center max-w-2xl">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">The Team</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-3">Built by Language Lovers</h2>
            <p className="text-muted-foreground mt-4">
              Akalingua was created by a team of language enthusiasts and tech innovators who believed there was a better way to connect students and teachers. Based in Dublin, Ireland, we're on a mission to make language learning smarter and more accessible for everyone.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Join our growing community of 1,000+ learners and teachers</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
