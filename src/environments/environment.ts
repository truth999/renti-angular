export const environment = {
  production: false,
  apiBase: 'http://192.168.1.9:8080/api/v1/',
  uploadApiBase: 'http://192.168.1.9:8080/api/v1/upload/',
  uploadBase: 'https://storage.googleapis.com/renti-dev/',
  facebook: {
    appId: '1052481898283144',
    version: 'v3.3'
  },
  instagram: {
    clientId: 'f2a158ca89c04216ab4753cbf8d4162b',
    redirectUri: 'https://renti-dev.renti.hu/app/my-profile'
  },
  mqtt: {
    hostname: 'renti-dev.renti.hu',
    port: 1884,
    path: '/',
    protocol: 'wss'
  }
};
