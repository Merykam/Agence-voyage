const transport=require('../config/nodemailerConfig').transport

const sendMail = async(email, token) => {
    const info = await transport.sendMail({
        from: '"AlloMedia 👻" <AllomMedia@gmail.com>', 
        to: email,
        subject: "Verify Email", 
        html: `<a href="/api/auth/activate/${token}">click here to verify</a>`, 
      });

}

module.exports={
    sendMail
}