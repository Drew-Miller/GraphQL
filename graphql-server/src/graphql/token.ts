export function getTokenFromRequest(req: { headers: any }) {
  return req.headers.token ? req.headers.token[0] : "NO_TOKEN";
}
