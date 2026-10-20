import { describe, expect, it } from 'vitest';
import { services } from '@/lib/catalogue';

describe('Service packages', () => {
  it('has distinct, progressively detailed scopes for all services', () => {
    expect(services).toHaveLength(26);
    expect(new Set(services.map(service => service.slug)).size).toBe(26);
    for (const service of services) {
      expect(service.packages.basic.features).toHaveLength(3);
      expect(service.packages.standard.features).toHaveLength(4);
      expect(service.packages.premium.features).toHaveLength(5);
      expect(service.packages.standard.features).toEqual(expect.arrayContaining(service.packages.basic.features));
      expect(service.packages.premium.features).toEqual(expect.arrayContaining(service.packages.standard.features));
      for (const price of Object.values(service.pricing)) expect(price).toMatch(/^₹/);
    }
    expect(new Set(services.map(service => service.packages.basic.features.join('|'))).size).toBe(26);
  });

  it('labels revised fees as suggested, preserves billing periods and increases each tier', () => {
    expect(services.every(service => service.suggestedPricing)).toBe(true);
    expect(services.find(service => service.name === 'GST Registration')?.pricing).toEqual({ basic: '₹499', standard: '₹1,499', premium: '₹2,999' });
    expect(services.find(service => service.name === 'Statutory Audit')?.pricing.premium).toBe('₹39,999+');
    for (const service of services) {
      const amounts = Object.values(service.pricing).map(price => Number(price.replace(/[^0-9]/g, '')));
      expect(amounts[1]).toBeGreaterThan(amounts[0] ?? 0);
      expect(amounts[2]).toBeGreaterThan(amounts[1] ?? 0);
      const suffix = ['GST Return Filing', 'Bookkeeping & Accounting', 'Payroll Management', 'Virtual CFO'].includes(service.name) ? '/month' : service.name === 'TDS Return Filing' ? '/qtr' : service.name === 'Annual MCA Compliance' ? '/year' : '';
      if (suffix) for (const price of Object.values(service.pricing)) expect(price.endsWith(suffix)).toBe(true);
    }
    expect(services.find(service => service.name === 'Proprietorship')?.category).toBe('Start a business');
  });
});