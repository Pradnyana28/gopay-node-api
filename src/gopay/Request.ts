import constant from "utils/constant";
import fetch, { RequestInit } from 'node-fetch';

export interface IRequest {
  authToken?: string;
  idKey?: string;
}

interface IRequestInit extends RequestInit {
  withGopayHeaders: boolean;
}

export class Request {
  private uniqueId = 'A78354AB-9578-4FF5-B899-4BA6BA16488E';
  private sessionId = 'A23194EB-8C6F-45B7-8A80-2606BA847DD8';

  constructor(private config: IRequest) { }

  protected async request(url: string, requestInit?: IRequestInit) {
    const fetchConfig: RequestInit = {
      ...requestInit,
      headers: requestInit?.withGopayHeaders ? {
        'x-session-id': this.sessionId,
        'x-unique-id': this.uniqueId,
        'Authorization': this.config.authToken ? `Bearer ${this.config.authToken}` : undefined as unknown as string,
        'Idempotency-Key': this.config.idKey as string,
        'x-appid': constant.APP_ID,
        'x-phonemodel': constant.PHONE_MODEL,
        'user-agent': constant.USER_AGENT,
        'x-phonemake': constant.PHONE_MAKE,
        'x-deviceos': constant.DEVICE_OS,
        'x-platform': constant.PLATFORM,
        'x-appversion': constant.APP_VERSION,
        'Gojek-Country-Code': constant.GOJEK_COUNTRY_CODE,
        'accept': '*/*',
        'content-type': 'application/json',
        'x-user-type': 'customer',
        ...(requestInit?.headers ?? null)
      } : undefined
    };

    const response = await fetch(url, fetchConfig);
    const responseJson = await response.json();
    return responseJson;
  }
}
