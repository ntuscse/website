export interface GeneralResp {
    status: number;
    message: string;
    data?: any;
}

export class StatusCodeError extends Error {
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