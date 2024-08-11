//

const container = document.querySelector(".container");
// console.log(container);

const count = document.getElementById("count");
// console.log(count);
const amount = document.getElementById("amount");
// console.log(amount);
const movieList = document.querySelector("#movie");
// console.log(movieList.value);
const infoText = document.querySelector(".infoText");
// console.log(infoText);
const seats = document.querySelectorAll(".seat:not(.reserved");
// console.log(seats);

// veritabanı fonksiyonu
const saveSeatsToDatabase = (seatIndex) => {
  //   console.log(seatIndex);

  // tarayıcı localStorage veritabanına kayıt için setItem kullanılır.
  // koltukların verisini kaydetme
  localStorage.setItem("seatsIndex", JSON.stringify(seatIndex));

  // film verisini kaydetme
  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

// veri tabanından veri çekme

const getSeatsFromDatabase = () => {
  // Veritabanındaki index bilgisini alıyoruz
  const dbSelectedSeatsIndex = JSON.parse(localStorage.getItem("seatsIndex"));
  // console.log(dbSelectedSeatsIndex);
  if (dbSelectedSeatsIndex !== null && dbSelectedSeatsIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeatsIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
      // if (dbSelectedSeatsIndex.includes(index)) {
      //   seat.classList.add("selected");
      // }
    });
  }
  const dbSelectedMovies = JSON.parse(localStorage.getItem("movieIndex"));
  if (dbSelectedMovies !== null) {
    movieList.selectedIndex = dbSelectedMovies;
  }
};
getSeatsFromDatabase();

// koltukların index verilerini tespit etme fonksiyonu
const createSeatsIndex = () => {
  //====== Veritabanı işlemleri =========//

  //Önce Tüm boş koltukların olduğu diziyi tanımlıyoruz.

  const allSeatArray = [];

  seats.forEach((seat) => {
    allSeatArray.push(seat);
  });
  //   console.log(allSeatArray);

  // seçili koltuklardan oluşacak diziyi tanımlıyoruz.

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");
  allSelectedSeats.forEach((selecctedSeat) => {
    allSelectedSeatsArray.push(selecctedSeat);
  });
  //   console.log(allSelectedSeatsArray);

  const selectedSeatsIndex = allSelectedSeatsArray.map((selecctedSeat) => {
    return allSeatArray.indexOf(selecctedSeat);
  });
  //   console.log(selectedSeatsIndex);
  saveSeatsToDatabase(selectedSeatsIndex);
};

// Hesaplama fonksiyonu
const calculateTotal = () => {
  createSeatsIndex();

  //====== Hesaplama işlemleri =========//
  // toplam seçili koltuk sayısı
  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //   console.log(selectedSeatsCount);

  //toplam seçili koltuk sayısını html gönderme
  count.innerText = selectedSeatsCount;
  //toplam fiyatı  html gönderme
  amount.innerText = selectedSeatsCount * movieList.value;

  // bilgi yazısının görünürlük kontrolü
  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};

calculateTotal();

// koltukların kapsayıcısı olan yapıdaki tıklama olayını dinliyoruz.
container.addEventListener("click", (mouseEvent) => {
  //tıklama eventiyle koltuk tespiti
  const clickedSeat = mouseEvent.target.offsetParent;
  //   console.log(clickedSeat);
  if (
    // seat class içersin
    clickedSeat.classList.contains("seat") &&
    // reserved içermesin
    !clickedSeat.classList.contains("reserved")
  ) {
    // koltuğa selected ekle çıkar işlemi
    clickedSeat.classList.toggle("selected");
  }

  // sürekli güncel tutmak için
  calculateTotal();
});

movieList.addEventListener("change", () => {
  // console.log(movieList.value);
  // sürekli güncel tutmak için
  calculateTotal();
});
