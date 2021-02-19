import * as nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

// .env파일에서 정보 가져오기
const TransporterUser: string = process.env.NODEMAILER_USER;
const TransporterPass: string = process.env.NODEMAILER_PASS;

const transporter: nodemailer.Transporter = nodemailer.createTransport({
    //이메일 transporter 정보
    service: "gmail",
    auth: {
        user: TransporterUser,
        pass: TransporterPass,
    },
});

export const sendAuthCode: Function = async (receiver: string) => {
    //사용자의 이메일주소
    // 6자리 인증 번호 생성
    let auth_code: any = Math.floor(Math.random() * 1000000) + 100000;
    if (auth_code > 1000000) {
        auth_code -= 100000;
    }
    auth_code = auth_code.toString();
    const mailOptions: nodemailer.SendMailOptions = {
        //메일 정보 설정
        from: `Olio development ${TransporterUser}`,
        to: `${receiver}`,
        subject: "Olio 포트폴리오 사이트 - 이메일 인증 요청 메일",
        text: `Olio 이메일 인증 요청 메일입니다.`,
        html: `<b>안녕하세요 ${receiver}님, Olio 포트폴리오 사이트 입니다.</b></br>
                <b>아래 코드를 복사하여 본인 인증코드란에 입력하시기 바랍니다. </b></br>
                <h2>인증번호: ${auth_code}</h2>`,
    };

    await transporter //메일 보내기
        .sendMail(mailOptions)
        .then(() => addAuthInfo(receiver, auth_code))
        .catch((err) => {
            throw new Error(err);
        });
};
// 인증정보 DB에 추가
const addAuthInfo: Function = async (user: string, auth_code: string) => {
    const prisma = new PrismaClient();
    await prisma.emailAuth.create({
        data: {
            email: user,
            auth_code: auth_code,
        },
    });
};

//인증 코드 확인
export const checkAuthCode: Function = async (
    user: string,
    auth_code: string
) => {
    const prisma = new PrismaClient();
    const auth_info = await prisma.emailAuth.findFirst({
        // 인증번호 존재 확인
        where: {
            email: user,
            auth_code: auth_code,
        },
        select: {
            id: true,
        },
    });
    if (auth_info) {
        //인증 확인되면 삭제
        deleteAuthCode(auth_info.id);
        return true;
    } else {
        false;
    }
};

//인증코드 정보 삭제
export const deleteAuthCode: Function = async (id: number) => {
    const prisma = new PrismaClient();
    await prisma.emailAuth.delete({
        where: {
            id: id,
        },
    });
};
