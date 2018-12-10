import Base64 from './Base64'

/**
 * getWebToken
 * 웹토큰 얻어오기
 *
 * @return {string | null}
 */
export function getWebToken () {
  return window.localStorage.getItem('accessToken')
}

/**
 * saveWebToken
 * 웹토큰 저장
 */
export function saveWebToken (webToken) {
  window.localStorage.setItem('accessToken', webToken)
}

/**
 * removeWebToken
 * 클라이언트의 웹토큰 삭제 (logout)
 */
export function removeWebToken () {
  window.localStorage.removeItem('accessToken')
}

/**
 * parseWebToken
 * 웹토큰 디코딩
 *
 * @param webToken
 */
export function parseWebToken (webToken) {
  return webToken ? JSON.parse(Base64.decodeUTF8(webToken.split('.')[1])) : null
}

export function checkWebToken () {
  const webToken = getWebToken()
  if (!webToken) {
    // 웹토큰 유실시 이벤트만 발생시킴
    window.storageEventTrigger('remove', 'accessToken')
  }
}
