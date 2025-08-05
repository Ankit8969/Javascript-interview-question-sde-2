# Image Optimization for Frontend system desing
1. Image Compression
  - for image compression, we have different online tools to compress.
  - eg: compressor.io etc.
  - Always compress images before serving them to users.
  - There are two types of compression: lossless (preserves image quality) and lossy (trades off some quality for smaller file size).
  - Use tools like ImageOptim, TinyPNG, or even automated pipelines (like CI/CD) to compress images.

2. Progressive enhancement for image optimization
  - Progressive enhancement for image optimization is a strategy where you prioritize providing a basic, functional experience for all users, while enhancing that experience for users with more advanced browser capabilities and faster connections. This ensures that even users with slower networks or older devices get a usable experience, while those with better capabilities get a more enhanced and performant experience. In the context of images, it can involve several techniques that progressively improve the quality and delivery of images without compromising performance for low-end users.

## Use Responsive Images, ***picture***, ***srcset***
- picture Element: Use different image sources depending on the screen size, resolution, and type of device.
- srcset Attribute: Provide multiple image resolutions so that the browser can select the most appropriate one based on the user's device resolution and viewport size.

```
<picture>
  <source srcset="image-small.jpg" media="(max-width: 600px)">
  <source srcset="image-large.jpg" media="(min-width: 601px)">
  <img src="image-default.jpg" alt="description of the image">
</picture>

```

## Lazy Loading
- Lazy loading defers loading images that are not visible in the viewport, which enhances performance and reduces initial load time.
- Modern browsers support the loading="lazy" attribute to natively enable lazy loading.
```
<img src="large-image.jpg" alt="description" loading="lazy">
```

## Use Modern Image Formats (WebP, AVIF)
- Newer image formats like WebP and AVIF offer better compression and quality at smaller file sizes compared to traditional formats like JPEG and PNG.
- Use the <picture> element to serve modern formats to browsers that support them, with fallbacks for older browsers.

```
<picture>
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="description of the image">
</picture>

```

## Apply Adaptive Serving Based on Connection Speed
- Use the Network Information API to detect the user’s network speed and serve lower-resolution images to users with slower connections.

```
if (navigator.connection && navigator.connection.effectiveType === '2g') {
  // Load low-res images for 2G connections
  image.src = "low-res-image.jpg";
} else {
  image.src = "high-res-image.jpg";
}

```












