export const getBaseUrl = () => {
  const paths = import.meta.env.BASE_URL.split("/");
  if (paths.length <= 1) {
    return "";
  }

  return `/${paths[1]}`;
};
