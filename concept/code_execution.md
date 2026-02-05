# How browser execute the html code / file ?

### Example
```
<head>
  <link rel="stylesheet" href="a.css">
  <link rel="stylesheet" href="b.css">
  <link rel="stylesheet" href="c.css">
</head>
<body>
  <div id="app">Hello</div>

  <script src="main.js"></script>
</body>

```

### 🧠 High-level rule (remember this)
- HTML is parsed top → bottom
- CSS blocks rendering
- JS blocks parsing

### Step-by-step browser execution
- 1️⃣ Browser starts parsing HTML
    - Creates DOM
    - Goes line by line

- 2️⃣ Encounters first CSS <link>
    - ```<link rel="stylesheet" href="a.css">```


### What happens:
- Browser starts downloading a.css
- HTML parsing continues (CSS does NOT block parsing)
- Browser keeps discovering more tags

Same for:
```
b.css
c.css
```


### 🧠 ➡️ All CSS files download in parallel
---

### 3️⃣ Browser continues parsing ```<body>```
```
<div id="app">Hello</div>
```

- DOM node is created
- Still no painting happens yet

### Why? 👇
- 4️⃣ CSS is render-blocking
Browser must:
- Download all CSS
- Parse CSS
- Build CSSOM

### Only then:
```
DOM + CSSOM → Render Tree → Paint
```

### So:
- HTML parsing continues
- Visual rendering waits for CSS

### 5️⃣ Browser reaches ```<script src="main.js">```

***🚨 This is the big stop***

What happens:
- HTML parsing PAUSES
- Browser downloads main.js (if not cached)
- Browser executes main.js

### ONLY AFTER that → HTML parsing resumes
---

### JS is parser-blocking by default.

### 6️⃣ JavaScript waits for CSS

Important detail 🔥
- Before executing JS, browser ensures:
- All CSSOM is ready

Why?
- JS can access styles:
- ```getComputedStyle(...)```

- Executing JS without CSS would be incorrect
- So, JS execution waits for CSS downloads if not finished


## Where browser WAITS vs DOES NOT WAIT
### ❌ Browser does NOT wait

- HTML parsing for CSS download
- CSS download for other CSS files (parallel)

### ✅ Browser WAITS
- Painting → waits for all CSS
- HTML parsing → waits for JS
- JS execution → waits for CSS

### Why this design exists because ?
- CSS affects layout
- JS can read layout
- Layout must be correct before JS runs