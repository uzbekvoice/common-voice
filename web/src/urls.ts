const PROFILE = '/profile';
const DASHBOARD = '/dashboard';
const DEMO = '/demo';

export default Object.freeze({
  ROOT: '',

  RECORD: '/record', // old, here for redirect purposes
  SPEAK: '/speak',
  LISTEN: '/listen',

  PROFILE,
  PROFILE_INFO: PROFILE + '/info',
  PROFILE_AVATAR: PROFILE + '/avatar',
  PROFILE_SETTINGS: PROFILE + '/settings',
  PROFILE_DELETE: PROFILE + '/delete',
  PROFILE_DOWNLOAD: PROFILE + '/download',

  DASHBOARD,
  STATS: '/stats',
  PROFILE_GOALS: PROFILE + '/goals', // old, here for redirect purposes
  GOALS: '/goals',
  AWARDS: '/awards',
  CHALLENGE: '/challenge',

  DATA: '/data', // old, here for redirect purposes
  DATASETS: '/datasets',

  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  CHALLENGE_TERMS: '/challenge-terms',
  ABOUT: '/about',
  CRITERIA: '/criteria',

  LANGUAGES: '/languages',
  LANGUAGE_REQUEST: '/language/request',
  LANGUAGE_REQUEST_SUCCESS: '/language/request/success',

  DEMO,
  INTRO: DEMO,
  DEMO_SPEAK: DEMO + '/speak',
  DEMO_LISTEN: DEMO + '/listen',
  DEMO_ACCOUNT: DEMO + '/create-profile',
  DEMO_CONTRIBUTE: DEMO + '/contribute',
  TARGET_SEGMENT_INFO:
    'https://discourse.mozilla.org/t/help-create-common-voices-first-target-segment/59587',
  TARGET_SEGMENT_INFO_ES:
    'https://discourse.mozilla.org/t/ayuda-a-crear-el-primer-objetivo-segmentado-de-common-voice/60472/',

  HTTP_ROOT: 'https://common.uzbekvoice.ai',
  STAGING_ROOT: 'https://commonvoice.allizom.org',
  GITHUB_ROOT: 'https://github.com/mozilla/common-voice',

  S3_BUCKET: 'https://cdn.common.uzbekvoice.ai',
  S3_CDN: 'https://cdn.common.uzbekvoice.ai',
});
