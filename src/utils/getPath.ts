function ensureLeadingSlash(path: string) {
  return path.replace(/^([^/])/, '/$1');
}

function getPath(path: string) {
  path = ensureLeadingSlash(path);
  const baseUrl = import.meta.env.BASE_URL;

  return ensureLeadingSlash(`${baseUrl}${path}`);
}

export default getPath;
