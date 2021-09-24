export default function (str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1): null
}