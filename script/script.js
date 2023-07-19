// Function saat button Hitung BMI diklik
function hitungBMI() {
  // Define variabel kontainer input Jenis Kelamin,
  const jenisKelamin = document.getElementsByName("jenis-kelamin");
  const containerBeratBadan = document.getElementById("container-bb");
  const containerUsia = document.getElementById("container-usia");
  const containerTinggiBadan = document.getElementById("container-tb");

  // Define variabel Berat Badan, Usia, dan Tinggi Badan
  let beratBadan = document.getElementById("berat-badan");
  let usia = document.getElementById("usia");
  let tinggiBadan = document.getElementById("tinggi-badan");

  //Define variabel element hasil perhitungan
  let valueBMI = document.getElementById("value-bmi");

  //Define variabel element text saran
  let textSaran = document.getElementById("text-saran");

  //Define variabel kontainer element image laki-laki dan perempuan pada BMI display
  const imageMale = document.getElementById("img-bmi-display-male");
  const imageFemale = document.getElementById("img-bmi-display-female");

  //Define variabel kontainer element page home dan bmi display
  const resultBMI = document.getElementById("container-result");
  const containerHome = document.getElementById("container-home");

  //Define variabel kontainer element bubble
  const bubble = document.getElementById("bubble");

  //Define variabel kontainer element identitas image, gender, dan age
  const imageIdentity = document.getElementById("image-identity");
  const genderIdentity = document.getElementById("gender-identity");
  const ageIdentity = document.getElementById("age-identity");

  //Validasi apakah pengisian input sudah sesuai
  if (!beratBadan.value || !usia.value || !tinggiBadan.value) {
    if (beratBadan.value == "") {
      validation(containerBeratBadan);
    }
    if (usia.value == "") {
      validation(containerUsia);
    }
    if (tinggiBadan.value == "") {
      validation(containerTinggiBadan);
    }
  } else {
    //Perulangan untuk mendapatkan value jenis kelamin
    for (let i = 0; i < jenisKelamin.length; i++) {
      //Kondisi saat input terpilih
      if (jenisKelamin[i].checked) {
        //Kondisi memilih laki-laki atau perempuan
        if (jenisKelamin[i].value == "Laki-laki") {
          //Menampilkan image dan keterangan
          imageMale.style.display = "flex";
          genderIdentity.innerHTML = jenisKelamin[i].value;

          //Menampilkan image jenis kelamin pada identity BMI display
          imageIdentity.setAttribute("src", "assets/avatar-gender/male.png");
        } else {
          //Menampilkan image dan keterangan
          imageFemale.style.display = "flex";
          genderIdentity.innerHTML = jenisKelamin[i].value;

          //Menampilkan image jenis kelamin pada identity BMI display
          imageIdentity.setAttribute("src", "assets/avatar-gender/female.png");
        }
      }
    }

    //Perhitungan nilai BMI
    let result = (beratBadan.value / (tinggiBadan.value / 100) ** 2).toFixed(1);

    //Reset value input pada form
    beratBadan.value = "";
    usia.value = "";
    tinggiBadan.value = "";

    //Mengganti nilai usia identitas pada BMI display
    ageIdentity.innerHTML = usia.value + " tahun";

    //Mengganti nilai BMI identitas pada BMI display
    valueBMI.innerHTML = result;

    //Mengganti nilai bubble pada range
    bubble.innerHTML = result;

    //Kondisi apabila bubble mendekati akhir dari range
    if (result > 37.1) {
      bubble.style.right = `0`;
    } else {
      bubble.style.left = `calc((${result}/40)*100%)`;
    }

    //Pengambilan data di dalam file text-saran.json
    fetch(
      "https://revou-fundamental-course.github.io/10-jul-23-danggro/assets/text-saran.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Menggeser tampilan ke BMI display
        containerHome.style.transform = "translateX(-100%)";
        resultBMI.style.transform = "translateX(0%)";

        //Menggeser tampilan sampai paling atas
        window.scrollTo(0, 0);

        //Kondisi nilai BMI yang sesuai dengan range BMI
        if (result < 18.5)
          return display(valueBMI, textSaran, data["kekurangan-bb"], bubble);
        if (result >= 18.5 && result < 25)
          return display(valueBMI, textSaran, data["normal"], bubble);
        if (result >= 25 && result < 30)
          return display(valueBMI, textSaran, data["kelebihan-bb"], bubble);
        if (result >= 30)
          return display(valueBMI, textSaran, data["obesitas"], bubble);
      });
  }
}

//Fungsi sesuai dengan hasil nilai BMI
function display(valueBMI, textSaran, data, bubble) {
  console.log(data.color);
  //Define variabel kontainer image dan keterangan pada hasil BMI display
  const containerImage = document.getElementsByClassName(data.elementID);

  //Mengubah warna element nilai BMI
  valueBMI.style.color = `var(--${data.color})`;

  //Mengubah opacity variabel menjadi 100%
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";

  //Mengisi text saran sesuai dengan nilai BMI
  textSaran.innerHTML = data["text-saran"];

  //Mengubah warna bubble sesuai dengan nilai BMI
  bubble.style.backgroundColor = `var(--${data.color})`;
  bubble.style.setProperty("--colorAfter", `var(--${data.color})`);
}

//Fungsi saat button kembali diklik
function kembali() {
  //define variabel container setiap image dan keterangan
  const containerImage = document.getElementsByClassName(
    "img-bmi-display-item"
  );

  //Define variabel kontainer laki-laki dan perempuan pada BMI display
  const imageMale = document.getElementById("img-bmi-display-male");
  const imageFemale = document.getElementById("img-bmi-display-female");

  //Define variabel kontainer page home dan result BMI
  const resultBMI = document.getElementById("container-result");
  const containerHome = document.getElementById("container-home");

  //Define variabel element text saran
  let textSaran = document.getElementById("text-saran");

  //Menggeser tampilan sampai paling atas
  window.scrollTo(0, 0);

  //Memberikan delay 600ms agar hasil BMI tidak langusng tereset
  setTimeout(() => {
    imageMale.style.display = "none";
    imageFemale.style.display = "none";
    textSaran.innerHTML = "";

    //Mengembalikan opacity image dan keterangan menjadi 30%
    for (let i = 0; i < containerImage.length; i++) {
      containerImage[i].style.opacity = "30%";
    }
  }, 600);

  //Menggeser kembali home page
  containerHome.style.transform = "translateX(0%)";
  resultBMI.style.transform = "translateX(100%)";
}

//Fungsi validasi apakah pengisian input sudah benar
function validation(container) {
  container.style.setProperty("--afterOpacity", 100);
  if (window.matchMedia("(max-width: 480px)"))
    return container.style.setProperty("--afterBottom", "13%");
  if (window.matchMedia("(max-width: 768px)"))
    return container.style.setProperty("--afterBottom", "12%");
  container.style.setProperty("--afterBottom", "17%");
}

//Fungsi validasi untuk menghilangkan peringatan pada saat input sudah benar
function removeValidation(event) {
  if (event.target.value) {
    event.target.parentElement.parentElement.style.setProperty(
      "--afterOpacity",
      0
    );
    event.target.parentElement.parentElement.style.setProperty(
      "--afterBottom",
      "0%"
    );
  }
}

//Fungsi validasi pada input maksimal 3 character
function maxLengthValidation(event) {
  //Kondisi true apabila character di dalam input tidak lebih dari maxlength input.
  if (event.target.value.length > event.target.maxLength) {
    //Value input akan selalu dislicing tidak lebih dair maxlength input.
    event.target.value = event.target.value.slice(0, event.target.maxLength);
  }
}

//Fungsi validasi pada input hanya bisa mengetikkan angka
function onlyNumberValidation(event) {
  //Kondisi apabila key yang ditekan adalah angka bila bukan angka maka akan menghasilkan NaN dan kondisi true maka return false. Kondisi juga key yang ditekan bukan spasi
  if (
    isNaN(String.fromCharCode(event.keyCode)) ||
    ["Space"].includes(arguments[0].code)
  )
    return false;
}
