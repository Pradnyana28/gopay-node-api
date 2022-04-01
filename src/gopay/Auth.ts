import {serializePhoneNumber} from "utils/common";
import constant from "utils/constant";
import { IRequest, Request } from "./Request";

export type IAuth = IRequest

export class Auth extends Request {
  constructor(config: IAuth) {
    super(config);
  }

  public async login(phoneNumber: string): Promise<void> {
    const url = `${constant.API_GOID}/goid/login/request`;
    const payload = {
      'client_id': constant.CLIENT_ID,
      'client_secret': constant.CLIENT_SECRET,
      'country_code': '+62',
      'magic_link_ref': null,
      'phone_number': serializePhoneNumber(phoneNumber)
    };

    await this.request(url, {
      withGopayHeaders: true,
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  public async getToken(otpToken: string, otpCode: string): Promise<void> {
    const url = `${constant.API_GOID}/goid/token`;
    const payload = {
      'client_id': constant.CLIENT_ID,
      'client_secret': constant.CLIENT_SECRET,
      'data': {
        'otp_token': otpToken,
        'otp': otpCode
      },
      'grant_type': 'otp'
    };

    await this.request(url, {
      withGopayHeaders: true,
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
}
