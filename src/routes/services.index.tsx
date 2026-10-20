import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Search } from 'lucide-react';
import { groups, metadata, services } from '@/lib/catalogue';

export const Route = createFileRoute('/services/')({
  staticData: { sitemap: true },
  head: () => metadata('Our services', 'Explore alohaTax business registrations, GST, income tax, accounting and compliance services. Find the right support without the jargon.'),
  component: Services,
});

function Services() {
  const [query, setQuery] = useState('');
  const search = query.trim().toLowerCase();

  return (
    <>
      <section className="page-banner">
        <div className="container-site">
          <div className="eyebrow">From first steps to next chapters</div>
          <h1>A service for every stage.</h1>
          <p>Starting out, staying compliant, or planning ahead? Find what you need, and we’ll guide you through the rest.</p>
        </div>
      </section>
      <section className="section-space">
        <div className="container-site">
          <div className="finder">
            <Search className="size-5 mt-3 text-primary" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search services, e.g. GST registration" aria-label="Search services" />
          </div>
          {groups.map(group => {
            const categoryServices = services.filter(service => service.category === group.name && `${service.name} ${service.category}`.toLowerCase().includes(search));
            if (categoryServices.length === 0) return null;

            return (
              <section className="service-category" key={group.name}>
                <div className="service-category-heading">
                  <div className="eyebrow">{group.label}</div>
                  <h2>{group.name}</h2>
                </div>
                <div className="all-service-grid">
                  {categoryServices.map(service => (
                    <Link className="all-service-card" key={service.slug} to="/services/$slug" params={{ slug: service.slug }}>
                      <span className="eyebrow">{group.label}</span>
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <span className="text-link mt-5">View Basic, Standard &amp; Premium <ArrowUpRight className="size-4" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
          {services.filter(service => `${service.name} ${service.category}`.toLowerCase().includes(search)).length === 0 && (
            <p className="section-copy">No matching services. Try another search or contact our team.</p>
          )}
        </div>
      </section>
    </>
  );
}