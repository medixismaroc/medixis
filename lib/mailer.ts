import nodemailer from 'nodemailer'

/**
 * Transport SMTP vers la messagerie du client (à configurer).
 * Toutes les valeurs viennent de l'environnement : rien de sensible dans le dépôt,
 * qui est public. Elles se règlent dans cPanel → Setup Node.js App.
 */
export function getTransport() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !user || !pass) {
    throw new Error('Configuration SMTP incomplète (SMTP_HOST, SMTP_USER, SMTP_PASSWORD).')
  }

  const port = Number(process.env.SMTP_PORT ?? 465)

  return nodemailer.createTransport({
    host,
    port,
    // 465 = SSL implicite ; 587 et 25 = STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  })
}

export const MAIL_FROM = process.env.CONTACT_FROM ?? process.env.SMTP_USER ?? ''
export const MAIL_TO = process.env.CONTACT_TO ?? process.env.SMTP_USER ?? ''
