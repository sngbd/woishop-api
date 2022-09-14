const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { success } = require('../helpers/response');
const otpRepository = require('../repository/otpRepository');

const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

const sendOTP = async ({ id, email }, res) => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: 'Verify your email',
    html: `<p>Enter <b>${otp}</b> in the app 
    to verify your email address and complete the registration.</p>
    <p>This code expires in 1 hour.</p>`,
  };

  const saltRounds = 10;
  const hashedOTP = await bcrypt.hash(otp, saltRounds);

  await otpRepository.createOTP({
    user_id: id,
    expires_at: Date.now() + 3600000,
    otp: hashedOTP,
  });

  await transporter.sendMail(mailOptions);

  return success(
    res,
    'OTP for verification has been sent to email',
    { status: 'Pending', user_id: id, email },
  );
};

module.exports = { sendOTP };
