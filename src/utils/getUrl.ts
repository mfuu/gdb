import getPath from './getPath';

function getUrl(path: string) {
  const site = import.meta.env.SITE;

  return `${site}${getPath(path)}`;
}

export default getUrl;
