import nodemailer from 'nodemailer';
import ejs from "ejs";
import path from "path";

export const sendEmail = async (user, emailFlag, obj) => {

    const transporter = await nodemailer.createTransport({
        // host: String(process.env.EMAIL_HOST),
        // port: Number(process.env.EMAIL_PORT),
        service: "gmail",
        auth: {
            // user: process.env.EMAIL_USERNAME,
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
            // pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user,
        // subject: "subject",
        // text: "content"
    };

    if (emailFlag == "Login") {
        const { name, otp } = obj;
        const propose = "Account Login code"
        ejs.renderFile(path.join(__dirname, "../Views") + "/otp.ejs",
            { name, otp, propose },
            (err, data) => {
                if (err) console.log("Error :", err);
                mailOptions.subject = "Email Verification";
                mailOptions.html = data;
            }
        )
    }

    if (emailFlag == "Verification") {
        const { name, otp } = obj;
        const propose = "Account verification code"
        ejs.renderFile(path.join(__dirname, "../Views") + "/otp.ejs",
            { name, otp, propose },
            (err, data) => {
                if (err) console.log("Error :", err);
                mailOptions.subject = "Email Verification";
                mailOptions.html = data;
            }
        )
    }

    const nodeMailerRes = await transporter.sendMail(mailOptions);

    if (nodeMailerRes) {
        return {
            flag: true,
            message: nodeMailerRes.response
        }
    }
    return { flag: false }

}