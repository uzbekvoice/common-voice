import { getConfig } from './config-helper';

const SOURCES = {
  'default-src': ["'none'"],
  'child-src': ["'self'", 'blob:'],
  'style-src': ["'self'", 'https://fonts.googleapis.com'],
  'img-src': [
    "'self'",
    'www.google-analytics.com',
    'www.gstatic.com',
    'https://www.gstatic.com',
    'https://*.amazonaws.com',
    'https://*.amazon.com',
    'https://gravatar.com',
    'https://*.allizom.org',
    'data:',
    'https://*.uzbekvoice.ai',
    'https://*.common.uzbekvoice.ai',
    'https://*.cdn.common.uzbekvoice.ai',
  ],
  'media-src': [
    "'self'",
    'data:',
    'blob:',
    'https://*.amazonaws.com',
    'https://*.amazon.com',
    'https://*.uzbekvoice.ai',
    'https://*.common.uzbekvoice.ai',
    'https://*.cdn.common.uzbekvoice.ai',
  ],
  'script-src': [
    "'self'",
    "'sha256-fIDn5zeMOTMBReM1WNoqqk2MBYTlHZDfCh+vsl1KomQ='",
    "'sha256-Hul+6x+TsK84TeEjS1fwBMfUYPvUBBsSivv6wIfKY9s='",
    'https://www.google-analytics.com',
    'https://pontoon.mozilla.org',
    'https://*.sentry.io',
  ],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': [
    "'self'",
    'blob:',
    'https://pontoon.mozilla.org/graphql',
    'https://*.amazonaws.com',
    'https://*.amazon.com',
    'https://www.gstatic.com',
    'https://www.google-analytics.com',
    'https://*.sentry.io',
    'https://basket.mozilla.org',
    'https://basket-dev.allizom.org',
    'https://rs.fullstory.com',
    'https://edge.fullstory.com',
    'https://*.uzbekvoice.ai',
    'https://*.common.uzbekvoice.ai',
    'https://*.cdn.common.uzbekvoice.ai',
  ],
};

function getCSPHeaderValue() {
  const { PROD, S3_LOCAL_DEVELOPMENT_ENDPOINT } = getConfig();

  /*
    default to production mode to make sure we
    don't risk setting development values
    if this function is used incorrectly
  */

  console.log('PROD', PROD);
  if (true) {
    // we allow unsafe-eval, unsafe-inline locally for certain webpack functionality
    SOURCES['style-src'].push("'unsafe-inline'");
    SOURCES['script-src'].push("'unsafe-eval'");

    // add s3proxy to allowed sources in development
    SOURCES['connect-src'].push(S3_LOCAL_DEVELOPMENT_ENDPOINT);
    SOURCES['media-src'].push(S3_LOCAL_DEVELOPMENT_ENDPOINT);
    SOURCES['img-src'].push(S3_LOCAL_DEVELOPMENT_ENDPOINT);
  }

  return Object.entries(SOURCES)
    .map(([type, values]) => `${type} ${values.join(' ')}`)
    .join(';');
}

export default getCSPHeaderValue;
