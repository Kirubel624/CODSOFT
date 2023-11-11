const nodemailer = require("nodemailer");

// Create a new email notification
exports.sendEmail = async (req, res) => {
  try {
    const { from, to, subject, message } = req.body;

    // Create a Nodemailer transporter with your email service provider's settings
    const transporter = nodemailer.createTransport({
      service: "YourEmailServiceProvider",
      auth: {
        user: "your@email.com",
        pass: "yourpassword",
      },
    });

    // Define email options
    const mailOptions = {
      from,
      to,
      subject,
      text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Unable to send email notification." });
      } else {
        // Email sent successfully, save it to the database
        const newEmail = new Email({
          from,
          to,
          subject,
          message,
          status: "sent",
        });

        newEmail.save((err) => {
          if (err) {
            console.error(err);
          }
        });

        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to send email notification." });
  }
};
