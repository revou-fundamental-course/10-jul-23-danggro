function hitungBMI() {
  const jenisKelamin = document.getElementsByName("jenis-kelamin");

  const containerBeratBadan = document.getElementById("container-bb");
  const containerUsia = document.getElementById("container-usia");
  const containerTinggiBadan = document.getElementById("container-tb");

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

  const resultBMI = document.getElementById("container-result");

  const bubble = document.getElementById("bubble");

  const containerHome = document.getElementById("container-home");

  const imageIdentity = document.getElementById("image-identity");
  const genderIdentity = document.getElementById("gender-identity");
  const ageIdentity = document.getElementById("age-identity");

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
    for (let i = 0; i < jenisKelamin.length; i++) {
      if (jenisKelamin[i].checked) {
        if (jenisKelamin[i].value == "Laki-laki") {
          imageMale.style.display = "flex";
          genderIdentity.innerHTML = jenisKelamin[i].value;
          imageIdentity.setAttribute("src", "assets/avatar-gender/male.png");
        } else {
          imageFemale.style.display = "flex";
          genderIdentity.innerHTML = jenisKelamin[i].value;
          imageIdentity.setAttribute("src", "assets/avatar-gender/female.png");
        }
      }
    }

    let result = (beratBadan.value / (tinggiBadan.value / 100) ** 2).toFixed(1);
    ageIdentity.innerHTML = usia.value + " tahun";
    beratBadan.value = "";
    usia.value = "";
    tinggiBadan.value = "";
    valueBMI.innerHTML = result;

    bubble.innerHTML = result;
    if (result > 37.1) {
      bubble.style.right = `0`;
    } else {
      bubble.style.left = `calc((${result}/40)*100%)`;
    }

    fetch(
      "https://revou-fundamental-course.github.io/10-jul-23-danggro/assets/text-saran.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (result < 18.5)
          return kekuranganBeratBadan(valueBMI, textSaran, data, bubble);
        if (result >= 18.5 && result < 25)
          return normal(valueBMI, textSaran, data, bubble);
        if (result >= 25 && result < 30)
          return kelebihanBeratBadan(valueBMI, textSaran, data, bubble);
        if (result >= 30) return obesitas(valueBMI, textSaran, data, bubble);
      });

    containerHome.style.transform = "translateX(-100%)";
    resultBMI.style.transform = "translateX(0%)";

    return result;
  }
}

function kekuranganBeratBadan(valueBMI, textSaran, dataTextSaran, bubble) {
  const containerImage = document.getElementsByClassName("kekurangan-bb");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--underweight)";
  textSaran.innerHTML = dataTextSaran["kekurangan-bb"];
  bubble.style.backgroundColor = "var(--underweight)";
  bubble.style.setProperty("--colorAfter", "var(--underweight)");
}

function normal(valueBMI, textSaran, dataTextSaran, bubble) {
  const containerImage = document.getElementsByClassName("normal");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--normal)";
  textSaran.innerHTML = dataTextSaran["normal"];
  bubble.style.backgroundColor = "var(--normal)";
  bubble.style.setProperty("--colorAfter", "var(--normal)");
}

function kelebihanBeratBadan(valueBMI, textSaran, dataTextSaran, bubble) {
  const containerImage = document.getElementsByClassName("kelebihan-bb");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--overweight)";
  textSaran.innerHTML = dataTextSaran["kelebihan-bb"];
  bubble.style.backgroundColor = "var(--overweight)";
  bubble.style.setProperty("--colorAfter", "var(--overweight)");
}

function obesitas(valueBMI, textSaran, dataTextSaran, bubble) {
  const containerImage = document.getElementsByClassName("obesitas");
  containerImage[0].style.opacity = "100%";
  containerImage[1].style.opacity = "100%";
  valueBMI.style.color = "var(--obesite)";
  textSaran.innerHTML = dataTextSaran["obesitas"];
  bubble.style.backgroundColor = "var(--obesite)";
  bubble.style.setProperty("--colorAfter", "var(--obesite)");
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
  const resultBMI = document.getElementById("container-result");
  let textSaran = document.getElementById("text-saran");
  const containerHome = document.getElementById("container-home");

  window.scrollTo(0, 0);
  setTimeout(() => {
    imageMale.style.display = "none";
    imageFemale.style.display = "none";
    textSaran.innerHTML = "";
    for (let i = 0; i < containerImage.length; i++) {
      containerImage[i].style.opacity = "30%";
    }
  }, 600);
  containerHome.style.transform = "translateX(0%)";
  resultBMI.style.transform = "translateX(100%)";
}

function validation(container) {
  container.style.setProperty("--afterOpacity", 100);
  if (window.matchMedia("(max-width: 480px)"))
    return container.style.setProperty("--afterBottom", "13%");
  if (window.matchMedia("(max-width: 768px)"))
    return container.style.setProperty("--afterBottom", "12%");
  container.style.setProperty("--afterBottom", "17%");
}

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

function maxLengthValidation(event) {
  if (event.target.value.length > event.target.maxLength) {
    event.target.value = event.target.value.slice(0, event.target.maxLength);
  }
}

function onlyNumberValidation(event) {
  if (
    isNaN(String.fromCharCode(event.keyCode)) ||
    ["Space"].includes(arguments[0].code)
  )
    return false;
}
