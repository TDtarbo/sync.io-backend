import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: process.env.TRANSPORTER_SERVICE,
  host: process.env.TRANSPORTER_HOST,
  port: process.env.TRANSPORTER_PORT,
  secure: true,
  auth: {
    user: process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASS,
  },
});

const getContent = (token) => {
  return {
    subject: "SYNC.IO login",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      /* Global styles */
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }

      table {
        width: 100%;
        border-spacing: 0;
      }

      /* Container for the email */
      .email-container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid #c8c8c8;
      }

      /* Heading */
      h1 {
        font-size: 24px;
        color: #333333;
        margin-bottom: 10px;
        text-align: center;
      }

      /* Paragraph */
      p {
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
        text-align: center;
      }

      hr {
        color: #f5f5f5;
      }

      /* Button */
      .btn {
        display: inline-block;
        width: 200px;
        background-color: #4f46e5;
        font-size: 18px;
        text-decoration: none;
        border-radius: 4px;
        text-align: center;
        transition: background-color 0.3s;
        margin-bottom: 20px;
        font-weight: bold;
      }

      .btn:hover {
        background-color: #6366f1;
      }

      /* Center the button by setting the parent container to align its content */
      .center-btn {
        text-align: center;
        margin-bottom: 30px;
      }

      /* Responsive design */
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          padding: 15px;
        }

        h1 {
          font-size: 20px;
        }

        .btn {
          padding: 12px 25px;
          font-size: 16px;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="email-container">
      <tr>
        <td>
          <h1
            style="
              font-size: 28px;
              color: #333;
              text-align: center;
              font-weight: bold;
              margin-bottom: 15px;
            "
          >
            SYNC IO
          </h1>
          <hr>
          <p
            style="
              font-size: 16px;
              color: #555;
              text-align: center;
              line-height: 1.5;
              margin-bottom: 60px;
            "
          >
            We're excited to have you with us!  <br> Click the button below to log in
            and get started:
          </p>

          <!-- Center the button inside the <td> -->
          <div class="center-btn">
            <a
              href="${process.env.FRONT_END}/sign_in_process/${token}"
              class="btn"
            >
              <p style="color: #ffffff; line-height: 0.5; font-size: 20px">
                Login
              </p>
            </a>
          </div>

          <p
            style="
              font-size: 14px;
              color: #777;
              text-align: center;
              font-style: italic;
            "
          >
            Please note: This link will expire in 10 minutes.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
};

const sendVerificationEmail = async (to, token) => {

  const content = getContent(token);

  const mailOptions = {
    from: {
      name: "SYNC.IO Team",
      address: process.env.TRANSPORTER_USER,
    },
    to,
    subject: content.subject,
    html: content.html,
  };

  try {
    
    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error(`Send verification email error: \n${error}`);
    throw new Error("Send verification email error");
    
  }
};

export { sendVerificationEmail };
