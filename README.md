This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

1.  npx create-next-app@latest
2.  npm run dev
3.  http://localhost:3000
4.  npm install --save-dev prettier
5.  npm run format (Formatea todo el código)
6.  Crea archivo .prettierrc para configurar el formateo y añadir a package.json en scripts: "format": "prettier --write ."
7.  Crea archivo .editorconfig para configurar el formateo del proyecto en distintos editores
8.  npm run lint Para probar que el código no tenga errores
9.  npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
10. npm install next@latest (mejor que Babel)
11. Crear archivo jest.config.js https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
12. Crear archivo jest.setup.js
13. Añadir a package.json en scripts: "test": "jest --watch"
14. npm i --save-dev @types/jest
15. npm i --save uid
16. npm i --save lodash
17. npm i --save-dev @types/lodash
18. Crear o modificar archivo next.config.js https://github.com/i18next/next-i18next?tab=readme-ov-file
19. npm i sass
20. npm install --save-dev ts-jest para entender la sintaxis de los alias de módulos (como @/)
21. npm install redux-mock-store
22. npm i --save-dev @types/redux-mock-store
23. npm install --save-dev next-router-mock
    //////////////////
    Para LIMPIAR

# Limpiar el caché de npm

npm cache clean --force

# Eliminar la carpeta node_modules y el archivo package-lock.json

Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstalar las dependencias

npm install
