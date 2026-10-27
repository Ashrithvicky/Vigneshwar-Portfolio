export function resolveExternalUrl(value, hostname, minimumPathSegments = 1) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === hostname && !url.username && !url.password && !url.port && url.pathname.split('/').filter(Boolean).length >= minimumPathSegments ? url.href : null
  } catch {
    return null
  }
}