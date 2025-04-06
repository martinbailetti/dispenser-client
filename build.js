const fs = require("fs"); // Módulo para trabajar con el sistema de archivos
const path = require("path"); // Módulo para trabajar con rutas de archivos

// Ruta del archivo JSON que quieres leer (modifica esta ruta según la ubicación de tu archivo)
const versionFilePath = path.join(__dirname, "./public/version.json");

try {
  // 1. Leer el archivo JSON como una cadena de texto
  const versionFileContent = fs.readFileSync(versionFilePath, "utf8");

  // 2. Parsear la cadena JSON a un objeto de JavaScript
  const versionData = JSON.parse(versionFileContent);

  // 3. Incrementar el valor de la propiedad 'version'
  const segments = versionData.version.split(".");
  segments[2] = parseInt(segments[2]) + 1;
  versionData.version = segments.join(".");
  // 4. Convertir el objeto actualizado a una cadena JSON con formato
  const updatedVersionFileContent = JSON.stringify(versionData, null, 2); // 'null, 2' para formatear el JSON

  // 5. Escribir el contenido actualizado de nuevo en el archivo
  fs.writeFileSync(versionFilePath, updatedVersionFileContent);

  console.log(`Versión actualizada a: ${versionData.version}`);
} catch (error) {
  console.error("Error leyendo o escribiendo el archivo version.json:", error);
}
