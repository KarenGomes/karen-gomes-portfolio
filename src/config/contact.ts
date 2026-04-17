export function getContactConfig() {
  return {
    linkedinProfileUrl: import.meta.env.VITE_LINKEDIN_PROFILE_URL?.trim() ?? '',
    hcaptchaSiteKey: import.meta.env.VITE_HCAPTCHA_SITEKEY?.trim() ?? '',
    web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? '',
  }
}
