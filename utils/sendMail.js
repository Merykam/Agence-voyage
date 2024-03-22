const transport=require('../config/nodemailerConfig').transport

const sendMail = async(email, token) => {
    const info = await transport.sendMail({
        from: '"Wonderwave 👻" <Wonderwave@gmail.com>', 
        to: email,
        subject: "Verify Email", 
        // html: `<a href="/api/auth/activate/${token}">click here to verify</a>`, 
        html: `<p>Cliquez sur le lien suivant pour verifier votre email :</p><p><a href="http://localhost:5173/verify/${token}">Click here to verify your email</a></p>`
      });

}

module.exports={
    sendMail
}