import { parsePhoneNumberWithError } from 'libphonenumber-js'

export const formatDisplayNumber = (phoneString: string) => {
  try {
    const formattedPhoneString = phoneString.startsWith('+') ? phoneString : `+${phoneString}`
    const parsed = parsePhoneNumberWithError(formattedPhoneString)
    return parsed.formatInternational()
  } catch (error) {
    return phoneString // Fallback to raw string
  }
}
