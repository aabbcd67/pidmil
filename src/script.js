import bidangMiliter from "./data.js";

const container = document.getElementById("militerList");

// Fungsi buat card personel
// Fungsi buat card pegawai
function createCard(person, jabatan = null) {
  const div = document.createElement("div");
  div.className = "card";

  // Foto
  const img = document.createElement("img");
  img.src = person.foto;
  img.alt = person.nama;

  // Info
  const info = document.createElement("div");
  info.className = "info";

  // Nama
  const name = document.createElement("h3");
  name.textContent = person.nama;

  // NIP
  const nip = document.createElement("p");
  if (person.nip) nip.textContent = `NIP: ${person.nip}`;

  // Pangkat
  const pangkat = document.createElement("p");
  pangkat.textContent = `Pangkat: ${person.pangkat}`;

  // Jabatan opsional
  if (jabatan) {
    const jab = document.createElement("p");
    jab.textContent = `Jabatan: ${jabatan}`;
    info.appendChild(jab);
  }

  info.appendChild(name);
  info.appendChild(nip);
  info.appendChild(pangkat);

  div.appendChild(img);
  div.appendChild(info);

  return div;
}


// Render Asisten
const asistenSection = document.createElement("div");
asistenSection.className = "section";
asistenSection.innerHTML = `<h2>Asisten</h2>`;
asistenSection.appendChild(
  createCard(bidangMiliter.asisten, bidangMiliter.asisten.jabatan)
);
container.appendChild(asistenSection);

// Render Seksi
const seksiSection = document.createElement("div");
seksiSection.className = "section";
seksiSection.innerHTML = `<h2>Seksi</h2>`;
bidangMiliter.seksi.forEach((kasi) => {
  seksiSection.appendChild(createCard(kasi, kasi.jabatan));
  kasi.staf.forEach((staf) => {
    seksiSection.appendChild(createCard(staf, "Staf"));
  });
});
container.appendChild(seksiSection);

// Render Jaksa Fungsional
const jaksaSection = document.createElement("div");
jaksaSection.className = "section";
jaksaSection.innerHTML = `<h2>Jaksa Fungsional</h2>`;
bidangMiliter.jaksaFungsional.forEach((jaksa) => {
  jaksaSection.appendChild(createCard(jaksa, "Jaksa Fungsional"));
});
container.appendChild(jaksaSection);

// Scroll otomatis
function autoScroll() {
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    container.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    container.scrollBy(0, 1);
  }
}
setInterval(autoScroll, 50);
