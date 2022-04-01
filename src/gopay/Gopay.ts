import constant from 'utils/constant';
import { Auth, IAuth } from './Auth';

type IGopay = IAuth;

export class Gopay extends Auth {
  constructor(config?: IGopay) {
    super(config as IGopay);
  }

  public async getProfile() {
    const url = `${constant.API_URL}/gojek/v2/customer`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async getPaylaterProfile() {
    const url = `${constant.API_URL}/paylater/v1/user/profile`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async goClubMembership() {
    const url = `${constant.API_URL}/goclub/v1/membership`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async getTransactionHistories(page = 1, limit = 20) {
    const url = `${constant.API_CUSTOMER}/v1/users/transaction-history?page=${page}&limit=${limit}`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async getBalance() {
    const url = `${constant.API_CUSTOMER}/v1/payment-options/balances`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async kycStatus() {
    const url = `${constant.API_CUSTOMER}/v1/users/kyc/status`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async isGopay(phoneNumber: string): Promise<any> {
    const url = `${constant.API_CUSTOMER}/v1/users/p2p-profile?phone_number=${encodeURI(phoneNumber)}`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async getQRid(phoneNumber: string) {
    const res = await this.isGopay(phoneNumber);
    return res ? res['qr_id'] : null;
  }

  public async transfer(targetPhoneNumber: string, amount: number, pin: number) {
    const url = `${constant.API_CUSTOMER}/v1/funds/transfer`;
    const payeeId = await this.getQRid(targetPhoneNumber);
    const payload = {
      amount: {
        currency: 'IDR',
        value: amount
      },
      description: '',
      metadata: {
        post_visibility: 'NO_SOCIAL',
        theme_id: 'THEME_CLASSIC'
      },
      payee: {
        id: payeeId,
        id_type: 'GOPAY_QR_ID'
      }
    };

    return await this.request(url, {
      withGopayHeaders: true,
      headers: {
        pin: pin.toString()
      },
      body: JSON.stringify(payload)
    });
  }

  public async getBanks() {
    const url = `${constant.API_CUSTOMER}/v1/banks?type=transfer&show_withdrawal_block_status=false`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }

  public async targetBankDetail(requestId: string) {
    const url = `${constant.API_CUSTOMER}//v1/withdrawals/detail?request_id=${requestId}`;
    return await this.request(url, {
      withGopayHeaders: true
    });
  }
}
