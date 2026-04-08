export default function obfuscateEmail(email: string): string {
  if (!email) return ''
  if (email?.includes('@')) {
    const [username, domain] = email.split('@')

    const obfuscatedUsername =
      username?.length <= 1
        ? username
        : username.length <= 4
          ? username.substring(0, 1) +
            '*'.repeat(username.length - 2) +
            username.substring(username.length - 1)
          : username.substring(0, 2) +
            '*'.repeat(username.length - 4) +
            username.substring(username.length - 2)

    const obfuscatedEmail = `${obfuscatedUsername}@${domain}`

    return obfuscatedEmail
  }
  return email
}
