const nodemailer = require('nodemailer');
const { Expo } = require('expo-server-sdk');
const Token =require('../models/Token');

const sendEmail = async (req, res, next) => {

    try {
        let { userMail, message } = req.body;
        const eMailer = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'correoastronet@gmail.com',
                pass: 'irwqfscsrmeoampf',
            }
        });
        var emailsOption = {
            from: "correoastronet@gmail.com",
            to: userMail,
            subject: "Astronet update",
            text: message,
        }
        eMailer.sendMail(emailsOption, (error, info) => {
            if (error) {
                res.status(404).send(error.message);
            } else {
                res.status(200).send("email sent successfully")
            }
        })
    } catch (error) {
        return next(error);
    };
};
const expo = new Expo();

const putToken = async (req, res, next) => {
    try {
        const {token} = req.body;
        console.log(token)
        // chequeo no repetir token
        const exists = await Token.find({token})
        console.log(exists)
        if (exists.length > 0) return res.status(200).json({message:'token already exists'})
        const tokens = new Token({token});
        let savedtoken= await tokens.save();
        return res.status(200).json(savedtoken)
        } catch (error) {
        return next(error);
    };
};

const pushToken = async (req, res, next) => {
    try {
        const getTokens = await Token.find({},{"_id": 0,"__v":0});
        let pushTokens = getTokens.map((t)=>t.token)
        const {body}=req.body
        // Create the messages that you want to send to clents
        let messages = [];
        for (let pushToken of pushTokens) {
            // Check that all your push tokens appear to be valid Expo push tokens
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }
            // Construct a message
            const message = {
                to: pushToken,
                sound: 'default',
                title:'Astronet News',
                body
            }
            messages.push(message)
        }
        // Batching nofications
        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }
    catch (err) {
        console.log(err);
}
}

module.exports = { sendEmail, pushToken,putToken,expo }