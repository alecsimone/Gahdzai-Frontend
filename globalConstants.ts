export const home =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://gahdzai.com";
export const homeNoHTTP =
  process.env.NODE_ENV === "development" ? "localhost:3000" : "gahdzai.com";
// export const endpoint =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000/api/graphql"
//     : "https://playground.ouryou.org";
