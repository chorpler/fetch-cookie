// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const fetchCookie = require('fetch-cookie');

if (typeof fetchCookie !== 'function') {
  throw new Error('Not good');
}
