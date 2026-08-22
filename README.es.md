# [Tu Nombre] — sitio web académico personal

Sitio estático (HTML/CSS/JS plano — sin paso de compilación, sin framework)
para una página de perfil, docencia e investigación. Está pensado para
crecer: agregas un curso, le agregas clases, y tanto la navegación como el
contenido se mantienen consistentes porque todas las páginas comparten el
mismo `assets/css/style.css` y `assets/js/main.js`.

## 1. Lo primero que hay que editar

Busca en cada archivo el texto entre `[corchetes]` y reemplázalo con tu
propia información. Los principales:

- `index.html` — tu nombre, foto (`assets/img/portrait.jpg`), biografía,
  etiquetas de investigación, línea de tiempo de educación, enlaces de
  correo/CV/GitHub/Scholar.
- `research.html` — declaración de investigación, papers, charlas.
- `courses.html` — la lista de cursos que dictas.
- El `<footer>` de cada página — correo y enlaces sociales (se repite en
  cada archivo porque no hay motor de plantillas; una vez que tengas los
  enlaces definitivos, un buscar-y-reemplazar en todos los archivos es lo
  más rápido).

## 2. Estructura del proyecto

```
index.html               Página de inicio / perfil
research.html            Página de investigación (papers, charlas)
courses.html             Índice de todos los cursos ("Teaching")
courses/
  real-analysis/          Una carpeta por curso
    index.html             Resumen del curso + lista de clases
    lectures/
      lecture-01.html       Un archivo por clase
templates/
  course-template.html    Plantilla en blanco — cópiala al iniciar un curso nuevo
  lecture-template.html   Plantilla en blanco — cópiala al iniciar una clase nueva
assets/
  css/style.css           Todo el estilo — un solo archivo compartido
  js/main.js              Modo oscuro, menú móvil, tabla de contenido con
                           scrollspy, pestañas, botones "copiar LaTeX",
                           botón volver arriba
  img/                    Foto, CV, etc.
.nojekyll                 Le dice a GitHub Pages que sirva los archivos tal cual
```

`courses/real-analysis/` es un ejemplo completo y funcional (un curso, una
clase) — consérvalo como referencia, o bórralo cuando ya tengas cursos
reales.

## 3. Cómo agregar un curso nuevo

1. Duplica la carpeta `courses/real-analysis/` (o copia
   `templates/course-template.html`) hacia
   `courses/<slug-del-curso>/index.html`. Usa un slug corto y apto para
   URL: minúsculas, guiones en vez de espacios (`topologia-i`, no
   `Topología I`).
2. Edita el título, el periodo académico y la descripción.
3. Ve a `courses.html` y copia el bloque comentado `<a class="card ...>`
   dentro de la sección "Current", completando el enlace y los detalles.

## 4. Cómo agregar una clase nueva a un curso

Esta es la parte que harás constantemente, así que aquí está el flujo
exacto:

1. **Tú me envías el LaTeX.** Pegas el código fuente `.tex` (o la parte que
   corresponda) en el chat.
2. **Yo lo convierto a HTML** siguiendo `templates/lecture-template.html`:
   los encabezados de sección se vuelven `<h2>`,
   `\begin{theorem}...\end{theorem}` se vuelve un
   `<div class="math-box math-box--theorem">`,
   `\begin{proof}...\end{proof}` se vuelve un `<details class="proof">`
   colegible, y así sucesivamente. Lo importante: **la matemática en sí no
   se reescribe** — se envuelve en `\( ... \)` o `\[ ... \]` y MathJax la
   renderiza en vivo, así que las ecuaciones se ven exactamente como en tu
   fuente LaTeX.
3. **Tú me dices dónde va** (por ejemplo, "esta es la clase 4 de Topología
   I") y yo la guardo como
   `courses/<slug-del-curso>/lectures/lecture-NN.html`, la agrego a la
   lista de clases de ese curso, y la enlazo desde el pie de la clase
   anterior ("Next").

Si en algún momento quieres armar una tú mismo a mano, copia
`templates/lecture-template.html` y sigue los comentarios internos — cada
componente (caja de teorema, caja de definición, prueba colegible,
pestañas para definiciones alternativas, ecuación numerada con botón de
copiar) está demostrado con contenido real en
`courses/real-analysis/lectures/lecture-01.html`.

### Bloques de contenido disponibles

| Qué | Markup |
|---|---|
| Teorema / Lema / Proposición / Corolario | `<div class="math-box math-box--theorem">` |
| Definición | `<div class="math-box math-box--definition">` |
| Ejemplo | `<div class="math-box math-box--example">` |
| Observación (Remark) | `<div class="math-box math-box--remark">` |
| Prueba colegible | `<details class="proof"><summary>Proof</summary>...` |
| Ecuación numerada | `<div class="eq-block">` con `<span class="eq-block__num">` |
| Comparación en pestañas (ej. dos definiciones equivalentes) | `<div class="tabs">` — ver lecture-01.html |

## 5. Previsualizar en local

Como son archivos planos, muchas veces basta con hacer doble clic en
`index.html`. Si alguna vez una página se ve sin estilos o las matemáticas
no cargan, abre un pequeño servidor local en su lugar (evita restricciones
del navegador con file://):

```bash
cd math-website
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 6. Desplegar en GitHub Pages, paso a paso

1. **Crea una cuenta de GitHub** si no tienes: https://github.com/join
2. **Crea un repositorio nuevo.**
   - Haz clic en el ícono **+** (arriba a la derecha) → **New repository**.
   - Ponle el nombre que quieras — por ejemplo `personal-website` — o, si
     quieres que el sitio quede directamente en
     `https://<tu-usuario>.github.io` (sin subcarpeta), nómbralo
     exactamente `<tu-usuario>.github.io`.
   - Márcalo como **Public**, no lo inicialices con un README (ya tienes
     uno), y haz clic en **Create repository**.
3. **Sube el sitio.** El camino más fácil si aún no usas git:
   - En la página del nuevo repo, haz clic en **uploading an existing
     file**.
   - Arrastra el *contenido* de la carpeta `math-website` (no la carpeta en
     sí) a la ventana del navegador, y luego **Commit changes**.
   - El cargador de GitHub a veces aplana la estructura de carpetas en
     interfaces antiguas — si el arrastrar-y-soltar no conserva las
     subcarpetas, usa git en su lugar (abajo), que siempre las conserva.
4. **O súbelo con git (recomendado, y necesario para actualizaciones
   futuras):**
   ```bash
   cd math-website
   git init
   git add .
   git commit -m "Sitio inicial"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<nombre-repo>.git
   git push -u origin main
   ```
5. **Activa GitHub Pages.**
   - En el repositorio, ve a **Settings → Pages**.
   - En **Build and deployment → Source**, elige **Deploy from a branch**.
   - En **Branch**, elige `main` y la carpeta `/ (root)`, luego **Save**.
6. **Espera alrededor de un minuto**, y refresca esa misma pantalla de
   Settings → Pages. GitHub mostrará la URL en vivo:
   - `https://<tu-usuario>.github.io/` si nombraste el repositorio
     `<tu-usuario>.github.io`, o
   - `https://<tu-usuario>.github.io/<nombre-repo>/` en cualquier otro
     caso.
7. **Publicar actualizaciones después** es simplemente:
   ```bash
   git add .
   git commit -m "Agregar clase 2"
   git push
   ```
   El sitio en vivo se reconstruye automáticamente en uno o dos minutos.

### Una nota sobre los enlaces si tu repo no es `<usuario>.github.io`

Todos los enlaces de este proyecto son **relativos** (`courses.html`,
`../../index.html`, etc.), no absolutos (`/courses.html`). Esto es
deliberado: significa que el sitio funciona correctamente sea que se sirva
desde la raíz del dominio o desde una subcarpeta como `/nombre-repo/`, sin
tener que reconfigurar nada. Mantén los enlaces nuevos relativos de la
misma forma y esto seguirá funcionando.

## 7. Próximos pasos opcionales

- Agrega una foto y un CV en PDF reales a `assets/img/`.
- Agrega un dominio propio en **Settings → Pages → Custom domain** si
  tienes uno.
- Agrega una imagen Open Graph / favicon para que los enlaces se vean mejor
  al compartirlos (pídemelo y agrego las etiquetas meta correspondientes).
