import { useState } from 'react';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/enquiry-form';
import { documentsFor, metadata, services } from '@/lib/catalogue';

const packages = [
  {
    name: 'Basic',
    priceKey: 'basic',
  },
  {
    name: 'Standard',
    priceKey: 'standard',
  },
  {
    name: 'Premium',
    priceKey: 'premium',
  },
] as const;

type PackageName = (typeof packages)[number]['name'];

export const Route = createFileRoute('/services/$slug')({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const service = services.find(item => item.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => metadata(loaderData?.service.name ?? 'Service unavailable', loaderData?.service.description ?? 'Find tax, accounting and compliance support with alohaTax.'),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const [plan, setPlan] = useState<PackageName | ''>('');
  const docs = documentsFor(service);
  const choose = (name: PackageName) => {
    setPlan(name);
    requestAnimationFrame(() => {
      const enquiry = document.getElementById('service-enquiry');
      enquiry?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      enquiry?.querySelector<HTMLInputElement>('input[name="Name"]')?.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <section className="page-banner">
        <div className="container-site">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span>{service.name}</span></div>
          <div className="eyebrow mt-7">{service.category}</div>
          <h1>{service.name}.<br /><span className="text-primary">Made simpler.</span></h1>
          <p>{service.description}</p>
          <Button variant="hero" className="hero-button mt-6" onClick={() => choose('Standard')}>Get started <ArrowRight /></Button>
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground ml-5"><ShieldCheck className="size-4" />Guided by our team</span>
        </div>
      </section>
      <div className="container-site service-tabs"><a href="#plans">Compare packages</a><a href="#documents">Documents</a><a href="#questions">Common questions</a></div>

      {service.name === 'GST LUT Filing' && <section className="section-space"><div className="container-site"><div className="eyebrow">Exports, explained simply</div><h2 className="section-title mt-3">What is LUT?</h2><p className="section-copy mt-4">LUT stands for Letter of Undertaking: a declaration filed by an eligible GST-registered business so it can make qualifying exports or SEZ supplies without paying IGST upfront. These are called zero-rated supplies—not a blanket exemption from GST rules.</p><ul className="mt-6 space-y-4 text-sm"><li><strong>Direct export of physical goods:</strong> goods shipped from India to a destination outside India, subject to export requirements.</li><li><strong>Export of services to foreign clients:</strong> for example, eligible software, design or consulting services. A foreign client alone is not enough: the place of supply, payment and other legal export conditions must be met.</li><li><strong>Supplies to Special Economic Zones (SEZ):</strong> qualifying goods or services supplied to an SEZ unit or developer for authorised operations.</li></ul><p className="section-copy mt-5">LUT is generally filed for each financial year. Export, payment and documentation conditions still apply; if they are not met, tax and interest may become payable. Our team checks whether your business qualifies before filing.</p></div></section>}

      <section className="section-space" id="plans">
        <div className="container-site">
          <div className="eyebrow">Choose the support that suits you</div>
          <h2 className="section-title mt-3">Three clear ways to get started.</h2>
          <p className="section-copy mt-3">Compare the preparation, review and consultation in each package. We’ll confirm the scope and final fee before you proceed.</p>
          <div className="pricing-grid">
            {packages.map((item, index) => (
              <article key={item.name} onClick={() => choose(item.name)} className={`pricing-card selectable-plan flex flex-col ${index === 1 ? 'featured' : ''} ${plan === item.name ? 'selected-plan' : ''}`}>
                {index === 1 && <span className="plan-tag">A LITTLE MORE GUIDANCE</span>}
                <h3><Button variant="ghost" className="plan-heading" aria-pressed={plan === item.name} onClick={event => { event.stopPropagation(); choose(item.name); }}>{item.name}{plan === item.name && <Check aria-hidden="true" />}</Button></h3>
                <p className="mt-2">{service.packages[item.priceKey].description}</p>
                <div className="price">{service.pricing[item.priceKey]}</div>
                <p className="price-note">{service.suggestedPricing ? 'Suggested service fee · subject to confirmation' : item.priceKey === 'premium' && service.name === 'Statutory Audit' ? 'Starting service fee' : 'Service fee · scope confirmed before payment'}</p>
                <h4 className="mt-5 text-sm font-semibold">Proposed package includes</h4>
                <ul className="plan-features flex-1">
                  {service.packages[item.priceKey].features.map(feature => <li key={feature}><Check />{feature}</li>)}
                </ul>
                <Button variant={index === 1 ? 'hero' : 'outline'} className="w-full h-11" aria-pressed={plan === item.name} onClick={event => { event.stopPropagation(); choose(item.name); }}>
                  {plan === item.name ? `Selected ${item.name}` : `Choose ${item.name}`}<ArrowRight />
                </Button>
              </article>
            ))}
          </div>
          <p className="legal-note">Package details are indicative and depend on your records and requirements. We’ll confirm final fees, scope and timelines before starting. Government fees, statutory charges and any applicable taxes are confirmed separately. Applications and responses do not guarantee approval or a particular outcome.</p>
        </div>
      </section>

      <section className="record-band" id="documents">
        <div className="container-site why-grid">
          <div><div className="eyebrow">We’ll help you get ready</div><h2 className="section-title mt-3">Your document checklist.</h2><p className="section-copy mt-4">You don’t have to know it all. Start with these documents; we’ll explain anything else your case needs.</p></div>
          <ul className="space-y-4">{docs.map(document => <li className="flex items-center gap-3 text-sm" key={document}><Check className="size-5 text-primary" />{document}</li>)}<li className="text-xs text-muted-foreground">Indicative checklist. Exact requirements depend on your business.</li></ul>
        </div>
      </section>

      <section className="section-space" id="questions">
        <div className="container-site"><div className="eyebrow">A little clarity</div><h2 className="section-title mt-3">Questions? Let’s make it easy.</h2>
          <div className="faq-list">
            {[[`How do I start ${service.name.toLowerCase()}?`, 'Choose a package and request a quote. Our team will confirm what you need, explain the scope and share your next steps.'], ['What if I don’t know which package to select?', 'That’s completely fine. Choose “Not sure yet” in your enquiry, or call us on 9956023205. We’ll help you decide.'], ['How long will it take?', 'The timeline depends on your documents, business details and the relevant authority. We will share an estimate after reviewing your requirements.'], ['Can I speak to someone in person?', 'Yes. Visit one of our seven offices in Delhi NCR, Monday to Saturday, 9am to 7pm. Please request an appointment before visiting.']].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="section-space office-preview" id="service-enquiry">
        <div className="container-site contact-grid">
          <div><div className="eyebrow">Your next step</div><h2 className="section-title mt-3">Let’s get your<br />{service.name.toLowerCase()}<br />underway.</h2><p className="section-copy mt-4">Share a few details. You don’t need to have every answer — that’s what we’re here for.</p><a className="text-link mt-6" href="tel:+919956023205">Call 9956023205 <ArrowRight className="size-4" /></a></div>
          <div>{plan && <p className="mb-4 text-sm font-semibold text-primary" role="status">Selected package: {plan} · {service.pricing[packages.find(item => item.name === plan)?.priceKey ?? 'basic']}</p>}<EnquiryForm service={service.name} plan={plan} /></div>
        </div>
      </section>
    </>
  );
}