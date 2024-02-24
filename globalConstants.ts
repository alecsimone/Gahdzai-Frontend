const currentLocalIP = '192.168.1.119';
export const home =
  process.env.NODE_ENV === 'development'
    ? `http://${currentLocalIP}:3000`
    : 'https://gahdzai.com';
export const homeNoHTTP =
  process.env.NODE_ENV === 'development'
    ? `${currentLocalIP}:3000`
    : 'gahdzai.com';
// export const devEndpoint = 'http://localhost:5000/graphql/';
export const devEndpoint = `http://${currentLocalIP}:5000/graphql/`;
export const prodEndpoint = 'https://api.gahdzai.com';
export const endpoint =
  process.env.NODE_ENV === 'development' ? devEndpoint : prodEndpoint;
