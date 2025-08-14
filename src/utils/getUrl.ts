import getPath from './getPath';

function isFullUrl(url: string) {
  const REGEXP = /^(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?)/i;

  return REGEXP.test(url) && !url.startsWith('/');
}

function getUrl(path: string) {
  if (isFullUrl(path)) {
    return path;
  }

  const site = import.meta.env.SITE;

  return `${site}${getPath(path)}`;
}

export default getUrl;
