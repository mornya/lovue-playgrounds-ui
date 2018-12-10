/**
 * Base64 UTF-8 encoding / decoding library.
 *
 * @see https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
 */
const Base64 = {
  encodeUTF8: (str) => {
    return window
      .btoa(encodeURIComponent(str)
        .replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))))
  },
  decodeUTF8: (str) => {
    return decodeURIComponent(Array.prototype.map.call(
      atob(str),
      (c) => ('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)),
    ).join(''))
  },
}

export default Base64
