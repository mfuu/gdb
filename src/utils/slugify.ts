import { slug as slugger } from 'github-slugger';

function slugify(str: string): string;
function slugify(str: string[]): string[];

function slugify(str: string | string[]) {
  if (Array.isArray(str)) {
    return str.map(str => slugger(str));
  }

  return slugger(str);
}

export default slugify;
