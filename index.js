const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 3001;

// Configure Nodemailer with your email service's SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    //user: "badrishchoubeystar@gmail.com",
    user: "deepika.zybeaktech@gmail.com",
    //pass: "ewkhzkpxzjkcvhzn",
    pass: "mgvuhmattipfyzdu",
  },
});

app.use(express.json());

// POST endpoint to send an email
app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "deepika.zybeaktech@gmail.com",
    to: to.join(","),
    subject: subject,
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5990"><span>Action Require: Request Notification</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${to},</span><div style="padding:1.5rem 0"><span>You have received a ticket from, Please kindly take an action</span><div style="padding:1.5rem 0"><span>more information about ticket: ${text}</span></div></div><a style="width:200px;padding:10px 15px;background-color:#4c649b;color:#fff;text-decoration:none;font-weight:600" href="#">To see more about ticket, click below</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0">Elauch helps you connect and share with the people in your life.</span></div></div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Email not sent", error: error.message });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.json({ message: "Email sent successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
