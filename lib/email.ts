import { Resend } from 'resend'

export async function sendMagicLink(email: string, name: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/portal/auth/${token}`

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_placeholder')) {
    console.log(`\n🔗 MAGIC LINK for ${email}:\n${url}\n`)
    return { success: true, dev: true }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Catapult Capital <onboarding@resend.dev>',
    to: email,
    subject: 'Your Catapult Capital secure login link',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px">
        <img src="${process.env.NEXT_PUBLIC_APP_URL}/assets/catapult-logo-horizontal.png" height="28" style="margin-bottom:32px"/>
        <h2 style="font-size:22px;font-weight:500;margin:0 0 12px">Hello, ${name}</h2>
        <p style="color:#555;line-height:1.6;margin:0 0 28px">
          Click the button below to securely access your Catapult Capital investor portal.
          This link expires in 15 minutes and can only be used once.
        </p>
        <a href="${url}" style="display:inline-block;background:#134480;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600">
          Access investor portal
        </a>
        <p style="color:#999;font-size:12px;margin-top:32px">
          If you didn't request this, you can safely ignore this email.<br/>
          Catapult Capital · 665 3rd St Suite 150, San Francisco CA 94107
        </p>
      </div>
    `
  })
  return { success: true }
}
