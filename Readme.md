version olarak bunlari kullandim.
react-native: 0.71.7 
expo: ~48.0.15 
----------------
Kullandimgim Dependencies
react-navigation/native-stack: ^6.9.12
reduxjs/toolkit: ^1.9.5
react-redux": ^8.0.5
formik: ^2.2.9
---------------------

Projeyi baslatmak icin yarn install diyerek baslatilabilir.
date picker paketi ios'to duzgun calismiyor olabilir. ios cihazim yoktu test edemedim.

Projenin baslangic sayfasi Login kismi burada 
async storage kayitli kullanici var onun datasinida userData.Json dosyasindan aliniyor.

Uygulamayi ilk actiginizda bir defa login demeniz yeterli.
Karsinizda searchTicket sayfasi karsiliyor. 
Bu sayfada iki secenek mevcut bir sadece gidis ve gidis donus olarak bu karari switch seciyoruz.
Otobus bilgilerini Data.json dosyasindan cekiyor.
Uygun arama varsa "Choose Service" butonu cikiyor. 
Eger yoksa kirmizi yazida bir uyari cikiyor.       'Denemeke icin ornek olarak zonguldak istanbuk 16.05.2023 secebilirsninz'

Bir sonraki sayfa "BusServiceListScreen" bu sayfada secilen kriterlere gore seferler listeleniyor.
Sefer sadece bir gidis sectiyseniz bir secim yapmaniz yeterli eger gidis gelis ise iki secenek secmelisiniz.

Bir sonraki sayfa "ServiceDataScreen" bir otobus oturma duzeni karsiliyor. Burada oturma duzeni 2+1.
3 katlarinda cinsiyet farketmeden secebiliyorsunuz.
3 ile bolumunden 2 ve 1 olanlari yaninizdaki koltukta kisiye bakiliyor.
Eger ikili koltukda ikisi bos ise bir popup aciliyor ve oradan secmeniz bekleniyor.
Secimlerden vazgecmek istiyorsaniz ustune basmaniz yeterli.
Toplam 10 secme hakkiniz bulunmakta. 
En asagida secilen koltuklari ve toplam ucreti gorebilirsiniz.
Payment butonuna basip odeme adimina gecebilir.
Odeme bilgilerini yazdiktan sonra bir spinner cikiyor. 
Bu 2 sn suruyor ve karsiniza sucsess ekrani cikiyor.






