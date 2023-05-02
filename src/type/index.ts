export interface IInitialStateBus {
  busesData: IBusData[] | undefined;
  targetServiceData: ITargetService | null;
  pickupId: (number | undefined)[];
  totalPrice: number;
}

export interface IBusData {
  id: number;
  to: string;
  from: string;
  companyName: string;
  departure: string;
  date: string;
  price: number;
  seatsData: number[];
}

export interface IUserData {
  id?: number;
  firstName: string;
  lastName: string;
  tc: string;
  birthDate: string;
  gender: string;
  email: string;
  password: string;
}
export interface ITargetService {
  go: IBusData[];
  return?: IBusData[];
}
export interface IPaymentFormValues {
  cardNumber: string;
  expiryDate: Date;
  cvv: string;
}
export interface IPropSearchTicket {
  turkishCities: string[];
  formatDate: (date: Date) => string;
}
