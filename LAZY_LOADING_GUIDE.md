# Image Lazy-Loading Implementation Guide

This guide explains how to implement lazy-loading for images in your EJS templates.

## Quick Summary

Lazy-loading delays image loading until they're about to appear in the viewport. This significantly improves initial page load time.

---

## Method 1: Native HTML Lazy-Loading (Easiest)

The `loading="lazy"` attribute tells browsers to delay loading images until they're needed.

### Usage

```html
<!-- Regular image loading (eager) -->
<img src="/images/hero.jpg" alt="Hero Image">

<!-- Lazy-loaded image -->
<img src="/images/destination.jpg" alt="Destination" loading="lazy">
```

### Browser Support
- ✅ Chrome 76+
- ✅ Firefox 75+
- ✅ Safari 15.1+
- ❌ IE (fallback to eager loading)

### Pros
- Super simple
- No JavaScript required
- Native browser implementation

### Cons
- No fallback for older browsers
- Limited control over loading behavior

---

## Method 2: JavaScript IntersectionObserver (Recommended)

This method uses the JavaScript IntersectionObserver API for fine-grained control and better performance.

### Step 1: Update Your HTML

Use `data-src` instead of `src` for images you want to lazy-load:

```html
<!-- Image to be lazy-loaded -->
<img 
  data-src="/images/destination.jpg" 
  alt="Beautiful Destination"
  class="lazy-image"
  src="/images/placeholder.jpg"
/>

<!-- Or with low-quality placeholder -->
<img 
  data-src="/images/destination.jpg" 
  alt="Beautiful Destination"
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E"
/>
```

### Step 2: JavaScript Implementation

The lazy-loading script is already included in `boilerplate.ejs`:

```javascript
// Lazy loading images with IntersectionObserver
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' }); // Start loading 50px before viewport
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
```

### Step 3: CSS for Loading Animation

Add to `public/css/styles.css`:

```css
/* Lazy loading image styles */
img[data-src] {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    min-height: 200px; /* Adjust to your image height */
}

img.loaded {
    animation: fadeIn 0.3s ease-in;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

### Browser Support
- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 16+
- ⚠️ IE 11 (with polyfill)

---

## Method 3: Responsive Images with WebP

For best performance, serve modern formats (WebP) to modern browsers and fallback to JPEG/PNG for older browsers.

### HTML Implementation

```html
<!-- Responsive image with WebP -->
<picture>
    <!-- Modern browsers get WebP (smaller file size) -->
    <source srcset="/images/optimized/destination.webp" type="image/webp" data-src="/images/optimized/destination.webp">
    
    <!-- Fallback to JPEG for older browsers -->
    <img 
        src="/images/optimized/destination_optimized.jpg"
        alt="Beautiful Destination"
        loading="lazy"
    />
</picture>

<!-- Or for lazy-loading with picture -->
<picture>
    <source data-src="/images/optimized/destination.webp" type="image/webp">
    <img 
        data-src="/images/optimized/destination_optimized.jpg" 
        alt="Beautiful Destination"
    />
</picture>
```

### JavaScript for Picture Elements

```javascript
// Update the lazy-loading script to handle picture elements
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const picture = img.closest('picture');
                
                if (picture) {
                    // Load all sources in picture element
                    picture.querySelectorAll('[data-src]').forEach(source => {
                        source.src = source.dataset.src;
                    });
                }
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    document.querySelectorAll('img[data-src], picture source[data-src]').forEach(element => {
        const img = element.tagName === 'IMG' ? element : element.querySelector('img');
        if (img) imageObserver.observe(img);
    });
}
```

---

## Implementation Examples

### Example 1: Homepage Hero Image

```html
<!-- boilerplate.ejs or page template -->
<div class="hero-section">
    <img 
        data-src="/images/india-hero.jpg"
        alt="Discover India"
        class="hero-image"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23f0f0f0' width='1920' height='1080'/%3E%3C/svg%3E"
    />
</div>
```

### Example 2: Destination Grid

```html
<!-- destinations.ejs -->
<div class="destinations-grid">
    <% destinations.forEach(destination => { %>
        <div class="destination-card">
            <img 
                data-src="<%= destination.imageUrl %>" 
                alt="<%= destination.name %>"
                loading="lazy"
            />
            <h3><%= destination.name %></h3>
        </div>
    <% }); %>
</div>
```

### Example 3: Blog Images

```html
<!-- blog.ejs -->
<article>
    <h1><%= blog.title %></h1>
    
    <img 
        data-src="<%= blog.imageUrl %>"
        alt="<%= blog.title %>"
        class="article-image"
    />
    
    <div class="article-content">
        <%-blog.content %>
    </div>
</article>
```

---

## Performance Tips

### 1. Use Responsive Images

```html
<img 
    data-src="/images/destination.jpg"
    alt="Destination"
    srcset="/images/destination-small.jpg 480w, /images/destination-medium.jpg 1024w, /images/destination-large.jpg 1920w"
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 2. Set Image Dimensions

```html
<!-- Prevents layout shift when image loads -->
<img 
    data-src="/images/destination.jpg"
    alt="Destination"
    width="400"
    height="300"
    style="aspect-ratio: 4/3;"
/>
```

### 3. Use Placeholder Strategies

**Solid Color**:
```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E" />
```

**Blurred Placeholder**:
```html
<img src="data:image/jpeg;base64,/9j/4AAQ..." style="filter: blur(10px); transition: filter 0.3s;" />
```

### 4. Monitor Performance

Use Google Lighthouse to measure:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

---

## Checklist

- [ ] Identify all images on the site
- [ ] Replace `src` with `data-src` for below-fold images
- [ ] Add `loading="lazy"` to images
- [ ] Optimize images (run `npm run optimize-images`)
- [ ] Test in different browsers
- [ ] Measure performance with Lighthouse
- [ ] Update deployment to use optimized images

---

## Common Issues

### Images Not Loading

**Problem**: Images still have `src` instead of `data-src`
**Solution**: Check HTML and ensure `data-src` is used

**Problem**: IntersectionObserver not supported
**Solution**: Add polyfill or use native `loading="lazy"`

### Layout Shift

**Problem**: Page layout jumps when images load
**Solution**: Set explicit `width` and `height` attributes

### Slow Loading with Large Images

**Problem**: Images still load slowly
**Solution**: Compress images with `npm run optimize-images`

---

## Further Reading

- [MDN: Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [Web.dev: Image Optimization](https://web.dev/image-optimization/)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
