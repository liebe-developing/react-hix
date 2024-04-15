export default function isValidURL(url) {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/;
  return regex.test(url);
}
