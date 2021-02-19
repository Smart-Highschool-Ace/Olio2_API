import * as nodemailer from "nodemailer";

// .env파일에서 정보 가져오기
const TransporterUser = process.env.NODEMAILER_USER;
const TransporterPass = process.env.NODEMAILER_PASS;

const transporter: nodemailer.Transporter = nodemailer.createTransport({
    //이메일 transporter 정보
    service: "gmail",
    auth: {
        user: TransporterUser,
        pass: TransporterPass,
    },
});

export const emailAuth: Function = async (receiver: string) => {
    const authCode: number = genearteAuthCode(); //인증 번호 생성

    const mailOptions: nodemailer.SendMailOptions = {
        //메일 정보 설정
        from: `Olio development ${TransporterUser}`,
        to: `${receiver}`,
        subject: "Olio 포트폴리오 사이트 - 이메일 인증 요청 메일",
        text: `Olio 이메일 인증 요청 메일입니다.`,
        html: `<b>안녕하세요 ${receiver}님, Olio 포트폴리오 사이트 입니다.</b></br>
                <b>아래 코드를 복사하여 본인 인증코드란에 입력하시기 바랍니다. </b></br>
                <h2>인증번호: ${authCode}</h2>`,
    };

    await transporter //메일 보내기
        .sendMail(mailOptions)
        .then((info) => info.messageId)
        .catch((err) => {
            console.log(err);
        });
};

// 6자리 인증 번호 생성
const genearteAuthCode: Function = () => {
    let authCode = Math.floor(Math.random() * 1000000) + 100000;
    if (authCode > 1000000) {
        authCode -= 100000;
    }
    return authCode;
};
