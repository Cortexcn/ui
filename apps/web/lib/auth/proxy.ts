/**
 * Public stand-in for the sign-in step of the proxy. Sign-in runs on a
 * private backend, so the public repository runs the proxy as is.
 */
export function withAuth<Proxy>(proxy: Proxy): Proxy {
  return proxy;
}
