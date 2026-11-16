import type {NextConfig} from 'next';
import legacyEvents from './src/data/legacy/events.json';

// URLs of the previous apsad.net (Angular) site, so old links and search results land on the new pages.
const legacyRedirects = [
  { source: '/news', destination: '/journal' },
  { source: '/events', destination: '/journal' },
  { source: '/event/:id', destination: '/events/:id' },
  { source: '/content/aboutUs', destination: '/about/record#association' },
  { source: '/content/history', destination: '/about/record#aims' },
  { source: '/content/restoration', destination: '/work/restoration' },
  { source: '/content/plans', destination: '/work/plans-and-studies' },
  { source: '/content/awareness', destination: '/work/awareness' },
  { source: '/content/actions', destination: '/work/actions-and-campaigns' },
  { source: '/content/development', destination: '/work/development' },
  { source: '/content/press', destination: '/journal#press' },
  { source: '/content/:rest*', destination: '/about' },
  { source: '/members/:rest*', destination: '/about#team' },
  { source: '/znmccregistration', destination: '/work/zaki-nassif-museum#music-school' },
  { source: '/znmregistration.aspx', destination: '/work/zaki-nassif-museum#music-school' },
  // The older ASP.NET site: Event.aspx?id=NN, mapped through each event's original id.
  ...legacyEvents
    .filter((event) => event.legacyId)
    .map((event) => ({
      source: '/Event.aspx',
      has: [{ type: 'query' as const, key: 'id', value: String(event.legacyId) }],
      destination: `/events/${event.id}`,
    })),
  { source: '/Event.aspx', destination: '/journal' },
  { source: '/News.aspx', destination: '/journal' },
];

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return legacyRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
};

export default nextConfig;
