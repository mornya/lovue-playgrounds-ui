const ServerInfo = {
  development: {
    isProduction: false,
    api: {
      timeout: 10000,
    },
    servers: {
      local: 'http://localhost:3000',
      service: 'http://localhost:4500',
      serviceSSL: 'https://localhost:4430',
      API: '/api',
    },
    // 멀티미디어 업로드 파일크기 제한 (limit은 MB단위)
    multimedia: {
      image: { label: 'Image', mime: 'image/*', limit: 5/* 2097152 */ },
      video: { label: 'Video', mime: 'video/mp4,video/x-m4v,video/*', limit: 100/* 104857600 */ },
      audio: { label: 'Audio', mime: 'audio/*', limit: 20/* 10485760 */ },
    },
    social: {
      facebook: {
        appId: '993428870699043',
        clientId: '',
        clientSecret: '',
        scope: ['public_profile', 'email', 'user_friends'],
      },
      google: {
        clientId: '',
        clientSecret: '',
        scope: 'https://www.googleapis.com/auth/adwords',
      },
    },
  },
  production: {
    isProduction: true,
    api: {
      timeout: 5000,
    },
    servers: {
      local: 'https://lovue-playgrounds-ui.herokuapp.com',
      service: 'https://lovue-playgrounds-service.herokuapp.com',
      serviceSSL: 'https://lovue-playgrounds-service.herokuapp.com',
      API: 'https://lovue-playgrounds-service.herokuapp.com',
    },
    // 멀티미디어 업로드 파일크기 제한 (limit은 MB단위)
    multimedia: {
      image: { label: 'Image', mime: 'image/*', limit: 2/* 2097152 */ },
      video: { label: 'Video', mime: 'video/mp4,video/x-m4v,video/*', limit: 100/* 104857600 */ },
      audio: { label: 'Audio', mime: 'audio/*', limit: 10/* 10485760 */ },
    },
    social: {
      facebook: {
        appId: '993428870699043',
        clientId: '',
        clientSecret: '',
        scope: ['public_profile', 'email', 'user_friends'],
      },
      google: {
        clientId: '',
        clientSecret: '',
        scope: 'https://www.googleapis.com/auth/adwords',
      },
    },
  },
}

export default ServerInfo[process.env.NODE_ENV] || ServerInfo['development']
