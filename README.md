¡Claro! Con base en los archivos de la aplicación de Malla Interactiva, puedo crear un archivo `README.md` completo para tu repositorio de GitHub.

Este README incluirá una descripción del proyecto, sus características principales, la estructura de la malla de la carrera de Ingeniería Civil en Computación e Informática (ICCI) que está configurada, e instrucciones sobre cómo configurar el entorno local.

##🌟 Malla Interactiva - ICCI 2018 🌟Visualiza, planifica y gestiona tu avance en el plan de estudios de la carrera de **Ingeniería Civil en Computación e Informática (ICCI)**, Plan 2018, de la Universidad Técnica Federico Santa María (USM).

Esta aplicación web permite a los estudiantes interactuar con la malla curricular, marcando ramos aprobados, reprobados o pendientes, y obteniendo estadísticas de avance en tiempo real.

###✨ Características Principales* **Visualización Interactiva:** Muestra el plan de estudios por semestre con bloques de ramos dinámicos.
* **Gestión de Avance:** Permite marcar cada asignatura con uno de tres estados mediante clics:
* **✅ Aprobado (Verde):** Completa el requisito.
* **❌ Reprobado (Rojo):** Permite planificar una toma de ramo futura.
* **⚠️ En Curso/Pendiente (Amarillo):** Ramos que se planean tomar o se están cursando.


* **Validación de Prerrequisitos:** Muestra una capa gris sobre los ramos que aún tienen prerrequisitos sin cumplir (solo se consideran aprobados los ramos en estado **Verde**).
* **Contador de Créditos:** Muestra el total de créditos aprobados y un contador de créditos en estado **Amarillo**, alertando si se supera el límite de **30 créditos** (USM) / **50 créditos** (SCT) en curso.
* **Soporte SCT/USM:** Permite alternar la visualización de los créditos entre el sistema USM y el Sistema de Créditos Transferibles (SCT).
* **Guardado Local:** Guarda tu progreso automáticamente en el navegador (`localStorage`).
* **Carga y Descarga de Estado:** Permite exportar (`.json`) el estado de avance de la malla para compartir o hacer copias de seguridad.
* **Descarga como Imagen:** Genera una imagen (JPG/PNG) de la malla actual, incluyendo un pie de página con estadísticas.
* **Visualizador de Dependencias:** Al pasar el ratón sobre un ramo, resalta sus **prerrequisitos** (Rojo) y los ramos que **desbloquea** (Verde).

###⚙️ Estructura de la Malla (ICCI 2018)La malla está organizada por categorías, las cuales tienen asignados colores específicos (definidos en `colors_ICCI_2018.json`):

| Abreviatura | Color (HEX) | Descripción |
| --- | --- | --- |
| **CB** | `#FCC8AF` | Ciencias Básicas |
| **CI** | `#F26431` | Ciencias de la Ingeniería |
| **IAP** | `#B2B3B7` | Ingeniería Aplicada |
| **CSH** | `#DCDDDF` | Ciencias Sociales y Humanidades |

El plan de estudios (definido en `data_ICCI_2018.json`) tiene una duración nominal de **11 semestres**.

* **Total de Créditos USM:** 310
* **Total de Créditos SCT:** 517 (aproximadamente, conversión 5/3)

###🚀 Instalación y Uso LocalPara ejecutar la aplicación en tu máquina local, solo necesitas un servidor web simple, como el módulo `http.server` de Python.

####Requisitos* Python 3 (o cualquier servidor web simple).

####Pasos para la Ejecución1. **Clonar el Repositorio** (o descargar los archivos).
2. **Abrir la Terminal** en la carpeta donde se encuentran los archivos.
3. **Ejecutar el Servidor HTTP:**
```bash
python -m http.server 8000

```


4. **Abrir en el Navegador:**
Abre tu navegador y navega a:
```
http://localhost:8000

```


Para ver la malla ICCI 2018 por defecto, puedes usar el siguiente enlace:
```
http://localhost:8000/?m=ICCI_2018

```



###🛠️ Tecnología* **D3.js (v5):** Para la representación visual y la manipulación de SVG de la malla.
* **Bootstrap 4:** Para el diseño responsivo de la interfaz (cabecera, pie de página, estadísticas).
* **JavaScript (ES6):** Para la lógica de la aplicación (gestión de estados, prerrequisitos, créditos).
* **jQuery:** Para el manejo del DOM y la interfaz de usuario.

###📝 Créditos* **Autor/Desarrollador:** (Basado en la URL en `footer.html` y `min1.js`) booterman98 (GitHub)
* **Última Actualización del Código:** 19-11-2025 (Según `footer.html`)
