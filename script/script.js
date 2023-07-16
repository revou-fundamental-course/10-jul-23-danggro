function hitungBMI() {
  const jenisKelamin = document.getElementsByName("jenis-kelamin");
  let beratBadan = document.getElementById("berat-badan");
  let usia = document.getElementById("usia");
  let tinggiBadan = document.getElementById("tinggi-badan");
  let valueBMI = document.getElementById("value-bmi");
  let textSaran = document.getElementById("text-saran");
  const imageMale = document.getElementById("img-bmi-display-male");
  const imageFemale = document.getElementById("img-bmi-display-female");
  const headerBMI = document.getElementById("header-bmi");
  const formBMI = document.getElementById("form-bmi");
  const fiturBMI = document.getElementById("fitur");
  const resultBMI = document.getElementById("bmi-result");

  for (let i = 0; i < jenisKelamin.length; i++) {
    if (jenisKelamin[i].checked) {
      if (jenisKelamin[i].value == "laki-laki") {
        imageMale.style.display = "flex";
      } else {
        imageFemale.style.display = "flex";
      }
    }
  }

  let dataTextSaran = {};
  let result = (beratBadan.value / (tinggiBadan.value / 100) ** 2).toFixed(1);

  beratBadan.value = "";
  usia.value = "";
  tinggiBadan.value = "";
  valueBMI.innerHTML = result;

  fetch("../assets/text-saran.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dataTextSaran = data;
      if (result < 18.5)
        return kekuranganBeratBadan(valueBMI, textSaran, dataTextSaran);
      if (result >= 18.5 && result < 25)
        return normal(valueBMI, textSaran, dataTextSaran);
      if (result >= 25 && result < 30)
        return kelebihanBeratBadan(valueBMI, textSaran, dataTextSaran);
      if (result >= 30) return obesitas(valueBMI, textSaran, dataTextSaran);
    });

  headerBMI.style.transform = "translateX(-170%)";
  formBMI.style.transform = "translateX(-170%)";
  fiturBMI.style.transform = "translateX(-170%)";
  resultBMI.style.transform = "translateX(0%)";
  return result;
}

function kekuranganBeratBadan(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementsByClassName("kekurangan-bb");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--underweight)";
  textSaran.innerHTML = dataTextSaran["kekurangan-bb"];
}

function normal(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementsByClassName("normal");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--normal)";
  textSaran.innerHTML = dataTextSaran["normal"];
}

function kelebihanBeratBadan(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementsByClassName("kelebihan-bb");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--overweight)";
  textSaran.innerHTML = dataTextSaran["kelebihan-bb"];
}

function obesitas(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementsByClassName("obesitas");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--obesite)";
  textSaran.innerHTML = dataTextSaran["obesitas"];
}

function kembali() {
  const containerImage = document.getElementsByClassName(
    "img-bmi-display-item"
  );
  const imageMale = document.getElementById("img-bmi-display-male");
  const imageFemale = document.getElementById("img-bmi-display-female");
  const headerBMI = document.getElementById("header-bmi");
  const formBMI = document.getElementById("form-bmi");
  const fiturBMI = document.getElementById("fitur");
  const resultBMI = document.getElementById("bmi-result");
  setTimeout(() => {
    imageMale.style.display = "none";
    imageFemale.style.display = "none";
    for (let i = 0; i < containerImage.length; i++) {
      containerImage[i].style.opacity = "30%";
    }
  }, 600);
  headerBMI.style.transform = "translateX(0%)";
  formBMI.style.transform = "translateX(0%)";
  fiturBMI.style.transform = "translateX(0%)";
  resultBMI.style.transform = "translateX(100%)";
}
