export interface GeneralResp {
    status: number;
    message: string;
    data?: any;
}

class StatusCodeError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export interface OauthcallbackResp {
    accessToken: string;
    refreshToken: string;
}

export default { StatusCodeError }