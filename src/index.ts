import { Gopay } from "gopay/Gopay";

export default async () => {
  const gopay = new Gopay();

  const login = await gopay.login('+6281237089638');
  console.log(login, 'login response');
};
