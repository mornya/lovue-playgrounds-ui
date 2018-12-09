export default () => {
  // Initialize Facebook API
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: Configure.social.facebook.appId,
      version: 'v3.1',
      autoLogAppEvents: true,
      cookie: true,
      status: true,
      xfbml: true,
    })
    window.FB.AppEvents.logPageView()
  }

  // Initialize Google API
  window.___gcfg = {
    lang: navigator.language,
    parsetags: 'onload',
  }
}
