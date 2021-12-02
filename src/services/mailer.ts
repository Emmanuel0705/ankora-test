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

  sendSuccessEmail(recipient: string, documentId: string) {
    const subject = 'Ankora - Document Uploaded';
    const htmlBody = `
    <center>
    <h1>Hey! Your Document has been uploaded</h1>
        <p>Use this domuent ID ( ${documentId} ) to query your data </p>
        </center>
        `;
    this.send(recipient, subject, htmlBody);
  }
}

export default Mailer;
