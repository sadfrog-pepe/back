import { getMaxListeners } from "process";

export const ERROR_MESSAGE = {
    FAIL_TO_CREATE_USER: { code: 400, message: "회원가입에 실패했어요!" },
    FAIL_TO_FIND_EMAIL: { code: 401, message: "등록된 이메일이 아닙니다." },
    FAIL_TO_LOGIN: {
        code: 400,
        message: "이메일에 맞는 비밀번호가 아닙니다.",
    },
};
