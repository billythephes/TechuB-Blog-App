
const nodeMailer = require('nodemailer')
const emailConfig = require('../configs/config.email')



const sendMail = (to, subject, htmlContent) => {
  // Khởi tạo một transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
  const transporter = nodeMailer.createTransport({
    host: emailConfig.mail_host,
    port: emailConfig.mail_port,
    secure: false, //dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: emailConfig.username,
      pass: emailConfig.password
    }
  })

  const message = {
    from: "TechHub" + "<" + emailConfig.username + ">",
    to: to,
    subject: subject,
    html: htmlContent
  }

  return transporter.sendMail(message)
}

module.exports = {
  sendMail
}