// XOR-obfuscated bytes for the contact address, never stored as plaintext in the bundle
const KEY = 0x5a
const ENCODED = [57, 53, 52, 46, 59, 57, 46, 26, 41, 51, 63, 59, 116, 62, 63, 44]

export function decodeEmail(): string {
  return String.fromCharCode(...ENCODED.map((b) => b ^ KEY))
}

export function openMail(subject: string, body: string) {
  const s = encodeURIComponent(subject)
  const b = encodeURIComponent(body)
  window.location.href = `mailto:${decodeEmail()}?subject=${s}&body=${b}`
}
