// clean-public-after.js
const rimraf = require('rimraf');
const path = require('path');

// Lista de carpetas a eliminar después del build
const foldersToDeleteAfterBuild = [
  'out/media',
  // Agrega más carpetas según sea necesario
];

// Eliminar carpetas después del build
foldersToDeleteAfterBuild.forEach(folder => {
  rimraf.sync(path.resolve(__dirname, folder));
  console.log(`Deleted after build: ${folder}`);
});