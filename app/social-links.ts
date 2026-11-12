export const socialLinks = [
  { platform: 'YouTube', href: 'https://www.youtube.com/@Muhadiib', handle: '@Muhadiib' },
  { platform: 'Instagram', href: 'https://www.instagram.com/mhdyb._/', handle: '@mhdyb._' },
  { platform: 'GitHub', href: 'https://github.com/Muhadib4', handle: '@Muhadib4' },
  {
    platform: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhadiib-dwi-taajuddiin-trisno',
    handle: ''
  },
  { platform: 'TikTok', href: 'https://www.tiktok.com/@mhdyb', handle: '@mhdyb' },
  {
    platform: 'Spotify',
    href: 'https://open.spotify.com/user/31yeisq3xtb66gzn4mwvrflb6vji',
    handle: ''
  },
  {
    platform: 'Discord',
    href: 'https://discord.com/users/747981930447765567',
    handle: ''
  }
] as const;

export type SocialPlatform = (typeof socialLinks)[number]['platform'];
