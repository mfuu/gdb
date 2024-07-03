export function getExcerpt(html: string, length = 500): string {
  const EXCERPT_REGEX = /([\n\r]|<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/g;
  const stripped = html
    .replace(EXCERPT_REGEX, " ")
    .split(" ")
    .filter(v => v != "")
    .join(" ");
  const separators = ["。", "，", ".", ",", "：", ":", ")", "）"];

  let output = "";
  let len = 0,
    i = 0;
  while (len < length && i < stripped.length) {
    output += stripped[i];
    len += stripped.codePointAt(i)! > 255 ? 2 : 1;
    i++;
  }

  let output_until = output.length;
  for (i = output.length; i > 0; i--) {
    if (separators.includes(output[i]!)) {
      output_until = i + 1;
      break;
    }
  }
  return output.substring(0, output_until);
}
