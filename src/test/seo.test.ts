import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { describe, expect, it } from 'vitest';
import { routeTree } from '@/routeTree.gen';
import { services } from '@/lib/catalogue';
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML } from '@/lib/sitemap';

describe('SEO sitemap', () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it('includes public pages and excludes API and sitemap routes', () => {
    const paths = sitemapStaticPaths(router);
    expect(paths).toHaveLength(6);
    for (const path of ['/', '/contact', '/offices', '/our-story', '/why-us']) expect(paths).toContain(path);
    expect(paths.some(path => path.replace(/\/$/, '') === '/services')).toBe(true);
    expect(paths).not.toContain('/api/chat');
    expect(paths).not.toContain('/sitemap.xml');
  });

  it('resolves every catalogue service to a public sitemap path', () => {
    for (const service of services) {
      const location = router.buildLocation({ to: '/services/$slug', params: { slug: service.slug }, search: () => ({}), hash: '' });
      expect(sitemapPathForLocation(router, location, '/services/$slug')).toBe(`/services/${service.slug}`);
    }
  });

  it('uses the public origin, deduplicates paths, and omits invented lastmod', () => {
    const xml = sitemapXML('https://alohatax.in', [{ path: '/' }, { path: '/' }]);
    expect(xml).toContain('<loc>https://alohatax.in/</loc>');
    expect(xml.match(/<url>/g)).toHaveLength(1);
    expect(xml).not.toContain('lastmod');
    expect(() => sitemapXML('https://alohatax.in', [{ path: '//other.example' }])).toThrow();
  });
});