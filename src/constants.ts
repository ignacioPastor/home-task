
export class Constants {

    public static PRODUCTION = false;

    public static SERVER_IP = Constants.PRODUCTION ? "http://my-server-IP:3005/api" : 'http://192.168.0.16:3005/api';
}
