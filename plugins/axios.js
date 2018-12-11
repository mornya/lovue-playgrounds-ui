import { getWebToken } from '~/utils/AccessToken'

export default ({ $axios/*, redirect*/ }) => {
  // Adds header: `Content-Type: application/json;charset=UTF-8 to default requests
  $axios.setHeader('Content-Type', 'application/json;charset=UTF-8')
  // Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', ['post'])
  // Adds header: Authorization
  $axios.onRequest(config => {
    const accessToken = getWebToken()
    config.headers = {
      common: {
        authorization: accessToken ? `Bearer ${accessToken}` : null,
      },
    }
  })

  // 개발환경에서만 적용
  if (process.env.NODE_ENV === 'development') {
    const consoleResultStyle = {
      SUCCESS: 'color:green;font-weight:bold',
      INVALID: 'color:orange;font-weight:bold',
      PROBLEM: 'color:red;font-weight:bold',
      CANCELLED: 'color:lightgray;font-weight:bold',
    }

    $axios.onRequest(config => {
      // Do something before request is sent
      const reqOpt = { data: config.data, params: config.params, body: config.body }
      console.log(`[API-REQ] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, reqOpt)
    })

    $axios.onRequestError(error => {
      // Do something with request error
      //if (axios.isCancel(error)) {
      //  console.log(`[API-REQ] %cCANCELLED`, consoleResultStyle.CANCELLED, error)
      //} else {
        console.log(`[API-REQ] %cINVALID`, consoleResultStyle.INVALID, error)
      //}
    })

    $axios.onResponse(response => {
      // Do something with response data
      console.log(`[API-RES] %cSUCCESS`, consoleResultStyle.SUCCESS, response.config.method.toUpperCase(), response.config.url, response.data)
    })

    $axios.onResponseError(error => {
      // Do something with response error
      //if (axios.isCancel(error)) {
      //  console.log(`[API-RES] %cCANCELLED`, consoleResultStyle.CANCELLED, error)
      //} else {
        console.log(`[API-RES] %cPROBLEM`, consoleResultStyle.PROBLEM, error)
      //}
    })

    $axios.onError(error => {
      //const code = parseInt(error.response && error.response.status)
      //if (code === 400) {
      //  redirect('/400')
      //} else if(error.code === 500) {
      //  redirect('/500')
      //}
    })
  }
}
