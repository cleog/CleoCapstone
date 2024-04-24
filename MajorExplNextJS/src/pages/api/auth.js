// Code citation: based on this example from Vercel - https://github.com/vercel/examples/blob/main/edge-middleware/basic-auth-password/pages/api/auth.ts
export default function handler(_, res) {

    res.setHeader('WWW-authenticate', 'Basic realm="Secure Area"')
    res.statusCode = 401
    res.end(`Auth Required.`)
  }