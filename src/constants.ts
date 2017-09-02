
export class Constants {

    public static PRODUCTION = false;

    public static SERVER_IP = Constants.PRODUCTION ? "http://my-server-IP:3005/api" : 'http://192.168.0.206:3005/api';

    public static MODE_EDIT = {
        FORGOT_PASSWORD: 'forgot_password',
        FP_ASK_CODE: 'fp_askCode',
        CHANGE_PASSWORD: 'change_password',
        CHANGE_PASSWORD_CONFIRM_PASS: 'change_password_previously_confirm_old'
    }
}
