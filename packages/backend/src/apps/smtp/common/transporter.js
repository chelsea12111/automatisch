import * as nodemailer from 'nodemailer';

interface IAuthData {
  host: string;
  port: number;
  useTls: boolean;
  username: string;
  password: string;
}

interface ITransporter {
  (authData: IAuthData): nodemailer.Transporter;
}

const transporter: ITransporter = (authData) => {
  return nodemailer.createTransport({
    host: authData.host,
    port: authData.port,
    secure: authData.useTls,
    auth: {
      user: authData.username,
      pass: authData.password,
    },
  });
};

export default transporter;
