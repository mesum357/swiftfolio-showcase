import { ArrowRight, Code2, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-bg.jpg';
import profileImage from '@/assets/mesum.jpg';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-primary font-medium text-sm tracking-wider uppercase">
                Full Stack Developer
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Building Digital
                <br />
                <span className="text-primary">Experiences</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Crafting elegant solutions with modern technologies. Specialized in React, Node.js, and cloud architecture.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                View Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                Get in Touch
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">50+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">30+ Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">3+ Years</span>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              {/* Glassmorphic Card */}
              <div className="relative glass rounded-2xl p-10 shadow-2xl max-w-xl">
                <div className="space-y-8">
                  {/* Profile Image */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full border-4 border-card flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Mesum Abbas</h3>
                    <p className="text-base text-muted-foreground">Full Stack Developer</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">3+</p>
                      <p className="text-sm text-muted-foreground">Years Exp</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">50+</p>
                      <p className="text-sm text-muted-foreground">Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">98%</p>
                      <p className="text-sm text-muted-foreground">Success</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
