# 🚀 NestJS Backend Auth

---

## 🛠️ Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura las variables de entorno:
    - Copia el archivo `.env.template` y renómalo como `.env`:
      ```bash
      cp .env.template .env
      ```
    - Rellena los valores necesarios en el archivo `.env` según tu entorno.

3. Inicia el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```

---

## 🔑 Variables de Entorno

El archivo `.env` debe incluir las siguientes variables para que el proyecto funcione correctamente:

- `MONGO_URI` → URI de conexión a la base de datos MongoDB.
- `JWT_SECRET` → Clave secreta para firmar tokens JWT.

Ejemplo de `.env.template`:

```plaintext
MONGO_URI=mongodb://localhost:27017/nest-backend
JWT_SECRET=tu-clave-secreta
```

---

## 📦 Dependencias Relevantes

Estas son algunas de las dependencias más importantes utilizadas en este proyecto:

- **@nestjs/core**: Framework principal para la aplicación.
- **@nestjs/mongoose**: Integración de NestJS con MongoDB mediante Mongoose.
- **@nestjs/jwt**: Herramienta para manejar autenticación con JSON Web Tokens.
- **bcryptjs**: Para hashear contraseñas.
- **class-validator** y **class-transformer**: Validación y transformación de datos en DTOs.
- **mongoose**: ODM para MongoDB.

---

## 🧪 Scripts Disponibles

Aquí tienes los scripts más importantes que puedes usar:

- `npm run start` → Inicia la aplicación en modo producción.
- `npm run start:dev` → Inicia la aplicación en modo desarrollo con recarga en caliente.
- `npm run build` → Compila el proyecto en la carpeta `dist`.
- `npm run test` → Ejecuta las pruebas unitarias.
- `npm run lint` → Revisa y corrige problemas de estilo de código.

---

## 🧑‍💻 Autor

**☭ Manu el Mago Comunista ☭**  
📧 comunismo@manu.com

¡Gracias por explorar este proyecto! Si tienes sugerencias o mejoras, no dudes en contribuir. 🤝
