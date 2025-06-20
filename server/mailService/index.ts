"use server"

import nodemailer from "nodemailer"

const Type = {
  WELCOME: "WELCOME",
  STOCK: "STOCK_UPDATE",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD: "THRESHOLD_MET",
}

export const setEmailBody = async (
  product: { productTitle: string; url: string },
  type: keyof typeof Type
) => {
  const snippedTitle =
    product.productTitle?.length > 20
      ? product.productTitle.substring(0, 20) + "..."
      : product.productTitle

  let mailSubject = ""
  let body = ""
  const THRESHOLD = 30

  switch (type) {
    case Type.WELCOME:
      mailSubject = `Welcome to Price Findrr!`
      body = `
        <div>
          <h2>Welcome to Price Findrr!</h2>
          <p>We're excited to have you track the price of the "${snippedTitle}" product.</p>
          <p>Here is the original product URL:</p>
          <p><a href="${product.url}" target="_blank">${product.url}</a></p>
          <p>Thank you for choosing PriceFindrr!</p>
        </div>
      `
      break
    case Type.STOCK:
      mailSubject = `Stock Update for "${snippedTitle}"`
      body = `
        <div>
          <h2>Stock Update for "${snippedTitle}"</h2>
          <p>The "${snippedTitle}" product is back in stock!</p>
          <p>Here is the original product URL:</p>
          <p><a href="${product.url}" target="_blank">${product.url}</a></p>
        </div>
      `
      break
    case Type.LOWEST_PRICE:
      mailSubject = `Lowest Price for "${snippedTitle}"`
      body = `
        <div>
          <h2>Lowest Price Alert!</h2>
          <p>The "${snippedTitle}" product is now at its lowest price!</p>
          <p><a href="${product.url}" target="_blank">${product.url}</a></p>
        </div>
      `
      break
    case Type.THRESHOLD:
      mailSubject = `Discount Alert for "${snippedTitle}"`
      body = `
        <div>
          <h2>Big Discount Detected!</h2>
          <p>The "${snippedTitle}" product has dropped more than ${THRESHOLD}%!</p>
          <p><a href="${product.url}" target="_blank">${product.url}</a></p>
        </div>
      `
      break
    default:
      throw new Error("Invalid email type.")
  }

  return { mailSubject, body }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export const sendEmail = async (
  emailContent: { mailSubject: string; body: string },
  email: string[]
) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: emailContent.mailSubject,
    html: emailContent.body,
  }

  console.log("📧 Sending email to:", email)
  console.log("📨 Subject:", emailContent.mailSubject)

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Email failed:", err)
        reject(err)
      } else {
        console.log("✅ Email sent:", info.response)
        resolve(info)
      }
    })
  })
}

// New: server action to be called by your frontend
export const setEmail = async (id: string, email: string) => {
  const emailContent = await setEmailBody(
    {
      productTitle: id,
      url: `https://yourdomain.com/product/${id}`, // change domain accordingly
    },
    "WELCOME"
  )

  await sendEmail(emailContent, [email])
}
