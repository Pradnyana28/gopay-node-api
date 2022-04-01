import { v4 as uuid } from 'uuid';

export function serializePhoneNumber(phoneNumber: string, areaCode = '+62') {
  return phoneNumber.replace(areaCode, '').trim();
}

export function generateIdKey() {
  return uuid();
}
