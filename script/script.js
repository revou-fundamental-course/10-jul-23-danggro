function hitungBMI() {
  let beratBadan = document.getElementById("berat-badan");
  let usia = document.getElementById("usia");
  let tinggiBadan = document.getElementById("tinggi-badan");
  let valueBMI = document.getElementById("value-bmi");
  let textSaran = document.getElementById("text-saran");
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
  console.log(result);

  return result;
}

function kekuranganBeratBadan(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementById("kekurangan-bb");
  containerImage.style.opacity = "100%";
  valueBMI.style.color = "var(--underweight)";
  textSaran.innerHTML = dataTextSaran["kekurangan-bb"];
}

function normal(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementById("normal");
  containerImage.style.opacity = "100%";
  valueBMI.style.color = "var(--normal)";
  textSaran.innerHTML = dataTextSaran["normal"];
}

function kelebihanBeratBadan(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementById("kelebihan-bb");
  containerImage.style.opacity = "100%";
  valueBMI.style.color = "var(--overweight)";
  textSaran.innerHTML = dataTextSaran["kelebihan-bb"];
}

function obesitas(valueBMI, textSaran, dataTextSaran) {
  const containerImage = document.getElementById("obesitas");
  containerImage.style.opacity = "100%";
  valueBMI.style.color = "var(--obesite)";
  textSaran.innerHTML = dataTextSaran["obesitas"];
}

function kembali() {}
