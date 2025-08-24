// Objek untuk menyimpan faktor konversi
const unitConversions = {
  // Faktor konversi panjang (dasar: meter)
  panjang: {
    meter: 1,
    kilometer: 1000,
    sentimeter: 0.01,
    milimeter: 0.001,
    inci: 0.0254,
    kaki: 0.3048,
    mil: 1609.34,
  },
  // Faktor konversi berat (dasar: kilogram)
  berat: {
    kilogram: 1,
    gram: 0.001,
    miligram: 0.000001,
    ton: 1000,
    pon: 0.453592,
    ons: 0.0283495,
  },
};

// Faktor konversi mata uang (dasar: IDR)
const currencyConversions = {
  IDR: {
    USD: 0.000064,
    EUR: 0.00006,
    JPY: 0.009,
    SGD: 0.000086,
    IDR: 1,
  },
  USD: {
    IDR: 15600,
    EUR: 0.93,
    JPY: 147.5,
    SGD: 1.34,
    USD: 1,
  },
  EUR: {
    IDR: 16750,
    USD: 1.07,
    JPY: 158.4,
    SGD: 1.44,
    EUR: 1,
  },
  JPY: {
    IDR: 106,
    USD: 0.0068,
    EUR: 0.0063,
    SGD: 0.0091,
    JPY: 1,
  },
  SGD: {
    IDR: 11500,
    USD: 0.74,
    EUR: 0.69,
    JPY: 109.8,
    SGD: 1,
  },
};

// Fungsi untuk mengonversi panjang
function convertPanjang() {
  const input = document.getElementById("panjang-input").value;
  const fromUnit = document.getElementById("panjang-select-from").value;
  const toUnit = document.getElementById("panjang-select-to").value;
  const resultElement = document.getElementById("panjang-result");

  if (input === "" || isNaN(input)) {
    resultElement.textContent = "Masukkan angka yang valid";
    return;
  }

  // Konversi ke satuan dasar (meter)
  const inMeters = input * unitConversions.panjang[fromUnit];
  // Konversi dari satuan dasar ke satuan tujuan
  const result = inMeters / unitConversions.panjang[toUnit];
  resultElement.textContent = `${result.toLocaleString()} ${toUnit}`;
}

// Fungsi untuk mengonversi berat
function convertBerat() {
  const input = document.getElementById("berat-input").value;
  const fromUnit = document.getElementById("berat-select-from").value;
  const toUnit = document.getElementById("berat-select-to").value;
  const resultElement = document.getElementById("berat-result");

  if (input === "" || isNaN(input)) {
    resultElement.textContent = "Masukkan angka yang valid";
    return;
  }

  // Konversi ke satuan dasar (kilogram)
  const inKg = input * unitConversions.berat[fromUnit];
  // Konversi dari satuan dasar ke satuan tujuan
  const result = inKg / unitConversions.berat[toUnit];
  resultElement.textContent = `${result.toLocaleString()} ${toUnit}`;
}

// Fungsi untuk mengonversi suhu
function convertSuhu() {
  const input = parseFloat(document.getElementById("suhu-input").value);
  const fromUnit = document.getElementById("suhu-select-from").value;
  const toUnit = document.getElementById("suhu-select-to").value;
  const resultElement = document.getElementById("suhu-result");

  if (isNaN(input)) {
    resultElement.textContent = "Masukkan angka yang valid";
    return;
  }

  let tempInCelsius;
  if (fromUnit === "celsius") {
    tempInCelsius = input;
  } else if (fromUnit === "fahrenheit") {
    tempInCelsius = (input - 32) * (5 / 9);
  } else if (fromUnit === "kelvin") {
    tempInCelsius = input - 273.15;
  }

  let result;
  if (toUnit === "celsius") {
    result = tempInCelsius;
  } else if (toUnit === "fahrenheit") {
    result = tempInCelsius * (9 / 5) + 32;
  } else if (toUnit === "kelvin") {
    result = tempInCelsius + 273.15;
  }
  resultElement.textContent = `${result.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })} ${toUnit}`;
}

// Fungsi untuk mengonversi mata uang
function convertMataUang() {
  const input = parseFloat(document.getElementById("currency-input").value);
  const fromCurrency = document.getElementById("currency-select-from").value;
  const toCurrency = document.getElementById("currency-select-to").value;
  const resultElement = document.getElementById("currency-result");

  if (isNaN(input)) {
    resultElement.textContent = "Masukkan angka yang valid";
    return;
  }

  const rate = currencyConversions[fromCurrency][toCurrency];
  const result = input * rate;
  resultElement.textContent = `${result.toLocaleString()} ${toCurrency}`;
}

// Menambahkan event listener ke semua input dan select
function addListeners() {
  document
    .getElementById("panjang-input")
    .addEventListener("input", convertPanjang);
  document
    .getElementById("panjang-select-from")
    .addEventListener("change", convertPanjang);
  document
    .getElementById("panjang-select-to")
    .addEventListener("change", convertPanjang);
  document
    .getElementById("berat-input")
    .addEventListener("input", convertBerat);
  document
    .getElementById("berat-select-from")
    .addEventListener("change", convertBerat);
  document
    .getElementById("berat-select-to")
    .addEventListener("change", convertBerat);
  document.getElementById("suhu-input").addEventListener("input", convertSuhu);
  document
    .getElementById("suhu-select-from")
    .addEventListener("change", convertSuhu);
  document
    .getElementById("suhu-select-to")
    .addEventListener("change", convertSuhu);
  document
    .getElementById("currency-input")
    .addEventListener("input", convertMataUang);
  document
    .getElementById("currency-select-from")
    .addEventListener("change", convertMataUang);
  document
    .getElementById("currency-select-to")
    .addEventListener("change", convertMataUang);
}

// Fungsi untuk menampilkan tab Konverter Fisika
function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.classList.remove("text-blue-600", "border-blue-600");
    btn.classList.add("text-gray-600", "border-transparent");
  });
  document
    .querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`)
    .classList.add("text-blue-600", "border-blue-600");
  document
    .querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`)
    .classList.remove("text-gray-600", "border-transparent");

  // Lakukan konversi awal saat tab ditampilkan
  if (tabId === "panjang") convertPanjang();
  else if (tabId === "berat") convertBerat();
  else if (tabId === "suhu") convertSuhu();
}

// Fungsi untuk menampilkan halaman utama
function showPage(pageId) {
  const sections = document.querySelectorAll(".page-section");
  sections.forEach((section) => (section.style.display = "none"));
  document.getElementById(pageId).style.display = "block";
  document.getElementById(pageId).classList.remove("hidden");

  // Mengatur gaya navigasi
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove(
      "text-green-500",
      "hover:text-blue-500",
      "hover:text-purple-500",
      "hover:text-pink-500"
    );
    link.classList.add("text-gray-500");
  });

  const activeLink = document.querySelector(`a[href="#${pageId}"]`);
  if (pageId === "home") {
    activeLink.classList.remove("text-gray-500");
    activeLink.classList.add("text-green-500");
  } else if (pageId === "fisika") {
    activeLink.classList.remove("text-gray-500");
    activeLink.classList.add("text-blue-500");
  } else if (pageId === "mata-uang") {
    activeLink.classList.remove("text-gray-500");
    activeLink.classList.add("text-purple-500");
  }
}

// Menampilkan halaman beranda saat halaman dimuat
window.onload = function () {
  showPage("home");
  showTab("panjang"); // Menampilkan tab panjang saat konverter fisika pertama kali dimuat
  addListeners(); // Menambahkan semua event listener
  convertMataUang(); // Lakukan konversi mata uang awal
};
