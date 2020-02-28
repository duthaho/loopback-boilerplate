export const emailDs = {
  name: 'emailDs',
  connector: 'mail',
  transports: [
    {
      type: 'SMTP',
      host: process.env.MANDRILL_HOST,
      secure: false,
      port: 587,
      ignoreTLS: true,
      debug: true,
      auth: {
        apiKey: process.env.MANDRILL_API_KEY,
      },
    },
  ],
};
