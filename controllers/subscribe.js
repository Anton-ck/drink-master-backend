import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import sendEmail from "../helpers/sendEmail.js";

const subscribeUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user.subscription) {
    throw HttpError(409, "This email is already in use in subscription");
  }

  const subscribeEmail = {
    to: email,
    subject: "Subscribe email",
    html: `<h3>Congratulations! You have successfully subscribed to the newsletter to your e-mail ${email}!</h3>`,
  };

  await sendEmail(subscribeEmail);

  user.subscription = true;

  const result = await User.findOneAndUpdate({ email }, user, { new: true });

  res.json({
    message: "subscription email sent",
  });
}

export default {
  subscribeUser: ctrlWrapper(subscribeUser),
};