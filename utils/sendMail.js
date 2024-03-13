const transport=require('../config/nodemailerConfig').transport

const sendMail = async(email, token) => {
    const info = await transport.sendMail({
        from: '"Wonderwave 👻" <Wonderwave@gmail.com>', 
        to: email,
        subject: "Verify Email", 
        html: `<a href="/api/auth/activate/${token}">click here to verify</a>`, 
      });

}

module.exports={
    sendMail
}