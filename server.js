// ==========================================
// AYUSH PORTFOLIO SERVER
// Express + Nodemailer + Gmail
// ==========================================

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));


// ==========================================
// EMAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

// Verify transporter
transporter.verify((error, success) => {

    if (error) {
        console.log("❌ Email Configuration Error:");
        console.log(error);
    }

    else {
        console.log("✅ Email Server Ready");
    }

});


// ==========================================
// ROUTES
// ==========================================

// Homepage Route
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


// Contact Form Route
app.post("/send-email", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        // ==================================
        // EMAIL TO YOU
        // ==================================

        const ownerMail = {

            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            subject: `📩 New Portfolio Contact — ${name}`,

            html: `
                <h2>New Portfolio Contact Form</h2>

                <hr>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Message:</strong></p>

                <div style="
                    background:#f5f5f5;
                    padding:15px;
                    border-radius:8px;
                ">
                    ${message}
                </div>
            `
        };

        // ==================================
        // THANK YOU EMAIL TO USER
        // ==================================

        const userMail = {

            from: `"Ayush Bhajman Patra" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "Thank You For Your Valuable Feedback",

            html: `
                <h2>Hello ${name},</h2>

                <p>
                    Thank you for your valuable feedback/message.
                </p>

                <p>
                    Your message has been received successfully.
                </p>

                <p>
                    I appreciate your time and I will get back to you soon.
                </p>

                <br>

                <p>Best Regards,</p>

                <h3>Ayush Bhajman Patra</h3>
            `
        };

        // Send emails
        await transporter.sendMail(ownerMail);

        await transporter.sendMail(userMail);

        res.status(200).json({

            success: true,
            message: "Emails sent successfully"

        });

    }

    catch (error) {

        console.log("❌ Email Sending Error:");
        console.log(error);

        res.status(500).json({

            success: false,
            message: "Email sending failed"

        });

    }

});


// ==========================================
// SERVER START
// ==========================================

app.listen(PORT, () => {

    console.log(`
==========================================
🚀 Server Running Successfully
🌐 URL: http://localhost:${PORT}
==========================================
`);

});