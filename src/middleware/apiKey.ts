// middleware/apiKey.ts
import { createMiddleware } from 'hono/factory'
import type { ProxyConfig } from '../proxy/types'

export const apiKeyMiddleware = (config: ProxyConfig) => createMiddleware(async (c, next) => {
  const apiKey = c.req.header('x-api-key')

  if (!apiKey) {
    return c.json({ error: 'Missing x-api-key header' }, 401)
  }
  const validApiKey = config.apiKey

  if (validApiKey && apiKey !== validApiKey) {
    return c.json({ error: 'Invalid API key' }, 403)
  }

  await next()
})