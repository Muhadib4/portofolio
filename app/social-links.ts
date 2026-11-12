export const socialLinks = [
  { platform: 'YouTube', href: 'https://www.youtube.com/@Muhadiib', handle: '@Muhadiib' },
  { platform: 'Instagram', href: 'https://www.instagram.com/mhdyb._/', handle: '@mhdyb._' },
  { platform: 'GitHub', href: 'https://github.com/Muhadib4', handle: '@Muhadib4' },
  {
    platform: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhadiib-dwi-taajuddiin-trisno',
    handle: ''
  },
  { platform: 'TikTok', href: 'https://www.tiktok.com/@mhdyb', handle: '@mhdyb' }
] as const;

export type SocialPlatform = (typeof socialLinks)[number]['platform'];
