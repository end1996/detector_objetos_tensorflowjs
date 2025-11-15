# Detector de Objetos con TensorFlow.js

Aplicación web que permite detectar objetos en tiempo real utilizando la cámara del dispositivo, implementada con React, TypeScript y TensorFlow.js.

## 🚀 Características

- Detección de objetos en tiempo real utilizando el modelo COCO-SSD
- Interfaz de usuario intuitiva que muestra las detecciones directamente sobre el video
- Visualización de etiquetas y puntuaciones de confianza
- Soporte para WebGL para aceleración por hardware

## 🛠️ Tecnologías utilizadas

- **Frontend**:
  - React 19
  - TypeScript
  - Vite (como bundler y servidor de desarrollo)
  - TensorFlow.js
  - Modelo COCO-SSD para detección de objetos

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd detector-objetos
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## 🚦 Uso

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador y navega a `http://localhost:5173`

3. Acepta los permisos de la cámara cuando se te solicite

4. La aplicación comenzará a detectar objetos en tiempo real

## 🏗️ Estructura del proyecto

```
src/
├── components/
│   └── ObjectDetection.tsx  # Componente principal de detección de objetos
├── App.tsx                  # Componente raíz de la aplicación
├── main.tsx                 # Punto de entrada de la aplicación
└── App.css                  # Estilos globales
```

## 📊 Modelo utilizado

La aplicación utiliza el modelo pre-entrenado **COCO-SSD** (Common Objects in Context - Single Shot MultiBox Detection) que puede detectar hasta 80 clases diferentes de objetos cotidianos.

## 🧠 Cómo funciona

1. La aplicación accede a la cámara del dispositivo usando la API de WebRTC
2. Los frames del video se pasan al modelo COCO-SSD para la detección de objetos
3. El modelo devuelve las coordenadas de los objetos detectados junto con sus etiquetas y puntuaciones de confianza
4. Se dibujan cuadros delimitadores y etiquetas sobre el video en tiempo real

## ⚙️ Configuración avanzada

### Variables de entorno

No se requieren variables de entorno para la configuración básica.

### Construcción para producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Esto generará archivos optimizados en la carpeta `dist/` que pueden ser desplegados en cualquier servidor web estático.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📧 Contacto

[Enmanuel Nava] - [end1996@gmail.com]

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
