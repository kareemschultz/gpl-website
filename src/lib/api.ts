import { createORPCClient } from '@orpc/client'
import { getBaseUrl } from './utils'
export const client = createORPCClient({
baseUrl: `${getBaseUrl()}/api`,
headers: {
'Content-Type': 'application/json',
},
})
export type APIClient = typeof client

