import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().min(3).required("Lütfen adınızı girin"),
  lastName: yup.string().min(3).required("Lütfen soyadınızı girin"),
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .required("Lütfen e-posta adresinizi girin"),
  password: yup
    .string()
    .required("Lütfen şifrenizi girin")
    .min(6, "Şifreniz en az 6 karakter uzunluğunda olmalıdır"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .required("Lütfen e-posta adresinizi girin"),
  password: yup
    .string()
    .required("Lütfen şifrenizi girin")
    .min(6, "Şifreniz en az 6 karakter uzunluğunda olmalıdır"),
});
export const onlyGoSchema = yup.object().shape({
  departureDate: yup.date().required("Tarih alanı zorunludur."),
  to: yup.string().min(3).required("zorunlu alan"),
  from: yup.string().min(3).required("zorunlu alan"),
});
export const roundTripSchema = yup.object().shape({
  departureDate: yup.date().required("Tarih alanı zorunludur."),
  returnDate: yup.date().required("Tarih alanı zorunludur."),
  to: yup.string().min(3).required("zorunlu alan"),
  from: yup.string().min(3).required("zorunlu alan"),
});

export const paymentSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(/^\d+$/, "Lütfen kart numarasını rakam olarak giriniz")
    .length(16, "Kart numarası 16 haneli olmalıdır")
    .required("Kart Numarası Zorunlu Alan"),

  expiryDate: yup
    .date()
    .min(new Date(), "Geçersiz Tarih")
    .required("Tarih Zorunlu Alan"),
  cvv: yup
    .string()
    .required("CVV Zorunlu Alan")
    .min(3, "CVV en az 3 haneli olmalıdır")
    .max(3, "CVV en fazla 3 haneli olmalıdır"),
});
