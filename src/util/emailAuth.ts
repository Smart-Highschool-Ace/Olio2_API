import * as nodemailer from "nodemailer";

const TransporterUser = process.env.NODEMAILER_USER;
const TransporterPass = process.env.NODEMAILER_PASS;

const transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: TransporterUser, //env 파일
        pass: TransporterPass,
    },
});

export const emailAuth: Function = async (receiver: string) => {
    const authCode: number = genearteAuthCode();

    const mailOptions: nodemailer.SendMailOptions = {
        from: `Olio development ${TransporterUser}`,
        to: `${receiver}`,
        subject: "Olio 포트폴리오 사이트 - 이메일 인증 요청 메일",
        text: `Olio 이메일 인증 요청 메일입니다.`,
        html: `<b>안녕하세요 ${receiver}님, Olio 포트폴리오 사이트 입니다.</b></br>
                <b>아래 코드를 복사하여 본인 인증코드란에 입력하시기 바랍니다. </b></br>
                <h2>인증번호: ${authCode}</h2>`,
    };

    await transporter
        .sendMail(mailOptions)
        .then((info) => info.messageId)
        .catch((err) => {
            console.log(err);
        });
};

const genearteAuthCode: Function = () => {
    let authCode = Math.floor(Math.random() * 1000000) + 100000;
    if (authCode > 1000000) {
        authCode -= 100000;
    }
    return authCode;
};
