import bidangMiliter from "./data.js";

const container = document.getElementById("militerList");

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

  // Jabatan opsional
  if (jabatan) {
    const jab = document.createElement("p");
    jab.textContent = jabatan.toUpperCase();
    jab.className = "jabatan";
    info.appendChild(jab);
  }

  // Nama
  const name = document.createElement("h3");
  name.textContent = person.nama;

  // NIP / NRP
  const id = document.createElement("p");
  if (person.nip) {
    id.textContent = `NIP: ${person.nip}`;
  } else if (person.nrp) {
    id.textContent = `NRP: ${person.nrp}`;
  }

  // Pangkat
  const pangkat = document.createElement("p");
  if (person.pangkat) {
    pangkat.textContent = `Pangkat: ${person.pangkat}`;
  }

  info.appendChild(name);
  if (id.textContent) info.appendChild(id); // hanya tampil kalau ada
  if (pangkat.textContent) info.appendChild(pangkat);

  div.appendChild(img);
  div.appendChild(info);

  return div;
}



// Fungsi render section
function renderSection(title, items, jabatanKey = null) {
  const section = document.createElement("div");
  section.className = "section";
  section.innerHTML = `<h2>${title}</h2>`;

  items.forEach((item) => {
    const jabatan = jabatanKey ? item[jabatanKey] : null;
    section.appendChild(createCard(item, jabatan));

    // Render staf bila ada
    if (item.staf) {
      item.staf.forEach((staf) => {
        section.appendChild(createCard(staf, "Staf"));
      });
    }
  });

  container.appendChild(section);
}

// Render semua
renderSection("Asisten", [bidangMiliter.asisten], "jabatan");
renderSection("Seksi", bidangMiliter.seksi, "jabatan");
renderSection("Jaksa Fungsional", bidangMiliter.jaksaFungsional, "jabatan");

// Scroll otomatis halus
let scrollDirection = "down"; // arah awal scroll

function autoScroll() {
  if (scrollDirection === "down") {
    container.scrollBy(0, 1);
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      scrollDirection = "up"; // ganti arah kalau sudah sampai bawah
    }
  } else {
    container.scrollBy(0, -1);
    if (container.scrollTop <= 0) {
      scrollDirection = "down"; // ganti arah kalau sudah sampai atas
    }
  }
}

setInterval(autoScroll, 30); // semakin kecil semakin cepat

