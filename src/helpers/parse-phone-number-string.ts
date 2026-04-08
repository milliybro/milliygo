import { parsePhoneNumberWithError } from 'libphonenumber-js'

export const parsePhoneNumberString = (phoneString: string) => {
  if (!phoneString) return undefined

  try {
    const formattedString = phoneString.startsWith('+') ? phoneString : `+${phoneString}`
    const parsed = parsePhoneNumberWithError(formattedString)
    return {
      countryCode: Number(parsed.countryCallingCode),
      phoneNumber: parsed.nationalNumber,
      isoCode: parsed.country?.toUpperCase(),
    }
  } catch (error) {
    console.error(error, phoneString)
    return undefined
  }
}
