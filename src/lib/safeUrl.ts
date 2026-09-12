const allowedProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:'])

export function safeExternalUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value, window.location.origin)
    return allowedProtocols.has(url.protocol) ? value : undefined
  } catch {
    return undefined
  }
}
