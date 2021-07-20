const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// setup OAUth2
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function sendMail(name, email, subject, content) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        let emailOptions = {
            from: {
                name: name,
                email: email
            },
            to: process.env.EMAIL,
            subject: subject,
            text: content
        }

        const result = await transporter.sendMail(emailOptions)

        return result
    }
    catch(err) {
        console.error(err)
    }
}

module.exports = sendMail;