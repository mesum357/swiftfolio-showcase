import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import clientsData from '@/data/clients.json';

export default function Clients() {
  const { ref, isVisible } = useScrollReveal();
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  return (
    <section
      id="clients"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted By
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proud to have partnered with amazing companies across various industries
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {clientsData.map((client) => (
            <div
              key={client.name}
              className="relative group"
              onMouseEnter={() => setHoveredClient(client.name)}
              onMouseLeave={() => setHoveredClient(null)}
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg aspect-square flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-cover rounded-lg opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Hover Details */}
              {hoveredClient === client.name && (
                <div className="absolute inset-0 bg-card/95 backdrop-blur-md rounded-xl p-4 border border-primary/50 z-10 flex flex-col justify-center animate-scale-in">
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    {client.name}
                  </h3>
                  <p className="text-xs text-primary mb-2">{client.industry}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {client.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
