// MUNDO ALMENDRO - COBACH PLANTEL 240

const enlaceProyecto =
  "https://carlosvazquezvazquez22-cmyk.github.io/-rbol-de-almendro-malabar-/";

const contenedorQR = document.getElementById("codigoQR");
const logoQR = document.getElementById("logoQR");
const botonDescarga = document.getElementById("descargarQR");
const estadoQR = document.getElementById("estadoQR");

let qrListo = false;

// Generar el código QR
if (typeof QRCode !== "undefined") {
  new QRCode(contenedorQR, {
    text: enlaceProyecto,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  qrListo = true;
  estadoQR.textContent =
    "QR generado. Comprueba que abra la página publicada.";
} else {
  estadoQR.textContent =
    "No se pudo cargar el generador QR. Revisa tu conexión a internet.";
  botonDescarga.disabled = true;
}

// Avisar si falta el logotipo
logoQR.addEventListener("error", function () {
  estadoQR.textContent =
    "El QR está generado, pero falta cobach.png. Agrega el logotipo oficial para cumplir los requisitos.";
});

// Descargar el QR como JPG
botonDescarga.addEventListener("click", function () {
  const qrCanvas = contenedorQR.querySelector("canvas");

  if (!qrListo || !qrCanvas) {
    estadoQR.textContent =
      "El QR todavía no está listo. Recarga la página e inténtalo de nuevo.";
    return;
  }

  if (!logoQR.complete || logoQR.naturalWidth === 0) {
    estadoQR.textContent =
      "Primero agrega el logotipo oficial como cobach.png.";
    return;
  }

  const margen = 24;
  const salida = document.createElement("canvas");
  const contexto = salida.getContext("2d");

  salida.width = qrCanvas.width + margen * 2;
  salida.height = qrCanvas.height + margen * 2;

  contexto.fillStyle = "#ffffff";
  contexto.fillRect(0, 0, salida.width, salida.height);
  contexto.drawImage(qrCanvas, margen, margen);

  // Colocar el logotipo en el centro del QR
  const tamanoLogo = 48;
  const x = (salida.width - tamanoLogo) / 2;
  const y = (salida.height - tamanoLogo) / 2;

  contexto.fillStyle = "#ffffff";
  contexto.fillRect(x - 5, y - 5, tamanoLogo + 10, tamanoLogo + 10);
  contexto.drawImage(logoQR, x, y, tamanoLogo, tamanoLogo);

  const enlace = document.createElement("a");
  enlace.download = "Almendro_Malabar.jpg";
  enlace.href = salida.toDataURL("image/jpeg", 1.0);
  enlace.click();

  estadoQR.textContent =
    "Se solicitó la descarga de Almendro_Malabar.jpg.";
});