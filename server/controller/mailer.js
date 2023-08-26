import nodeMailer from 'nodemailer'
import mailGen from 'mailgen'

// configration for trnasport object
const nodeConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'michelle.willms@ethereal.email',
        pass: '7CHxpMXRVGBHtuYqDX'//ethernal password 
    }
}

// creating transpoter
const transporter = nodeMailer.createTransport(nodeConfig);


// generating mail
let mailGenerator = new mailGen({
    theme : "default" ,
    product : {
        name : "mailGen",
        link : "http://mailgen.js/"
    }
});

export const registerMail =  (req , res ) => {
      const { username , useremail , text , subject } = req.body

      try {
          const email  = {
                body : {
                  name : username ,
                  intro : text || "Welcome to our web page , we'are excited to you on board",
                  outro : "Need help or have any question ? Just reply to this email , we'd love to help you. "
                }
          }
      
          var emailBody = mailGenerator.generate(email)
          let message = {
              from : "michelle.willms@ethereal.email",
              to : useremail ,
              subject : subject || "Signup successfully...!",
              html : emailBody
          }
        //   const info = await 
           transporter.sendMail(message).then(() =>{
            return res.status(200).send("otp sent to your mail ")
        }).catch(err => {return res.status(500).send({ err}) }  )
          
        //   console.log(info);
        //   next()

      } catch (error) {
        console.log(error);
       return res.status(500).send({error : "Mailer file rror"})
      }

}