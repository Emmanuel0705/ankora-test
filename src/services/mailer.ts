import nodemailer from 'nodemailer';

class Mailer {
  user: string;
  name: string;
  transport: any;

  constructor() {
    this.user = process.env.EMAIL_USER;
    this.name = process.env.EMAIL_NAME;

    this.transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  send(recipient: string, subject: string, htmlBody: string) {
    const message = {
      from: `${this.name}<${this.user}>`,
      to: recipient,
      subject,
      html: htmlBody,
    };
    this.transport.sendMail(message, (err: any, info: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }

  sendRequestEmail(recipient: string, passCode: number) {
    const subject = 'Request To View your Profile';
    const htmlBody = `
    <h1>
    <center>
    Hey! you have a pending request to view your Kyc by and admin 
        <p>Use this Passcode <b> ( ${passCode} ) <b> to query your data </p>
        </center>

        </h1>
        `;
    this.send(recipient, subject, htmlBody);
  }
}

export default Mailer;
