# PowerTracker Pro 🏋️‍♂️

Una aplicación web moderna y progresiva para la gestión integral de competencias de Powerlifting. Registra atletas, controla todos los intentos válidos o nulos de los levantamientos, y calcula automáticamente clasificaciones y force scores como *Goodlift* y *Wilks2*.

🔗 **¡Prueba la aplicación online!** [https://chimerical-chimera-c4edaf.netlify.app/](https://chimerical-chimera-c4edaf.netlify.app/)

## ✨ Características Principales

- **Gestión de Competidores:** Añade atletas especificando nombre, género, modalidad de equipamiento (Raw/Equipado), edad y peso corporal.
- **Categorización Automática:** La categoría del competidor (ej. Sub-Junior, Open, Master) se asigna automáticamente basada en la franja de edad, con posibilidad de sobreescribirla manualmente.
- **Registro de Intentos:** Anotación de los intentos en tiempo real para las 3 modalidades de competencias oficiales: Sentadilla, Press de Banca y Peso Muerto. Se registran indicando de forma sencilla el peso levantado y si el movimiento fue válido (✔) o nulo (✘).
- **Cálculo de Máximos y Totales:** Calcula instantáneamente el mejor intento legítimo de cada modalidad y el "Total" definitivo (en kg) obtenido por el atleta.
- **Métricas de Fuerza Relativas (Scores):** 
  - **Puntos GL (Goodlift):** Integra la fórmula oficial de la IPF (2020) para evaluar la marca del atleta tomando en consideración coeficientes diferentes por peso, género y modalidad (equipado vs raw).
  - **Puntos Wilks2:** Calcula el clásico coeficiente actualizado al polinomio versión 2020.
- **Ranking Global:** Una tabla general separada de la vista de registro que lista de manera descendiente a todos los competidores evaluándolos por puestos e incluye ordenamientos en tiempo real por Total, Puntos GL o Puntos Wilks.
- **Guardado Inteligente:** Persistencia de datos local en el navegador (Local Storage). La información se guarda automáticamente y no se pierde al recargar.

## 🛠️ Tecnologías

PowerTrack está desarrollada buscando rendimiento y facilidad de uso:

- **Framework:** React + TypeScript para la base lógica robusta.
- **Builder:** Vite (recarga rápida y alta velocidad).
- **Diseño UI:** Vanilla CSS puro con variables y componentes inspirados en "Glassmorphism" y Modo Oscuro, proporcionando un aspecto moderno y Premium.
- **Iconografía:** `lucide-react` para iconos minimalistas.

## 🚀 Cómo ejecutar localmente esta app (Desarrollo)

Si deseas descargar el código fuente y correr o modificar esta aplicación en tu propia computadora, sigue las siguientes instrucciones.

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 16.0.0 o superior recomendada). Al instalar Node, también se instalará la herramienta de paquetes `npm`.

### 2. Instalación

1. Clona el repositorio desde GitHub a tu carpeta local usando tu terminal o un entorno de desarrollo integrado (IDE):
```bash
git clone https://github.com/claudiobustos1/app-power-tracker.git
```

2. Entra a la carpeta de la aplicación:
```bash
cd app-power-tracker
```

3. Instala todas las dependencias necesarias. Esto solo se hace la primera vez tras clonar el repositorio:
```bash
npm install
```

### 3. Ejecutar 

Arranca el servidor de desarrollo local ejecutando el siguiente comando:
```bash
npm run dev
```

Te debería aparecer un mensaje similar a:  
`➜  Local:   http://localhost:5173/`

¡Abre tu navegador de internet, pega ese enlace y la aplicación aparecerá en la pantalla!

---
> Desarrollado por **bustosClaudio.dev**
