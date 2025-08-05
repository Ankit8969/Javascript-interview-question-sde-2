HTML
```
<div class="spinner"></div>
```

CSS
```
.spinner{
  width: 50px;
  height: 50px;
  border: 16px solid #f3f3f3;
  border-top-color: blue;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
 from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```
