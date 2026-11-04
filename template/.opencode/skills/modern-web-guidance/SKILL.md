---
name: modern-web-guidance
description: Best practices for frontend engineering across Astro, Next.js, SolidJS, and React. Covers component architecture, Tailwind CSS, Core Web Vitals (LCP, CLS), and SEO metadata.
---

# Modern Web Development Guidance

Guidelines and architectural standards for web frontends across the studio's web applications and landing pages.

## 1. Stack Principles
- **Static Site Generation (SSG) First**: Prefer static generation (Astro, static Next.js export) for content and catalogs (`fdejobsboard.com`, `freeinference.dev`). Hydrate only interactive components.
- **Styling**: Tailwind CSS with designated design tokens. Never mix inline hardcoded hex colors when design tokens exist.
- **Palette Standard**: Happy Hues #17:
  - Background: Cream `#fef6e4`
  - Headline/Text: Navy `#001858`
  - Accent/Primary: Pink `#f582ae`
  - Secondary/Highlight: Teal `#8bd3dd`

---

## 2. Core Web Vitals & Performance
- **Zero Cumulative Layout Shift (CLS)**: Always specify `width` and `height` attributes or aspect-ratio on images, icons, and embeds. Reserve space for dynamic elements.
- **Fast Largest Contentful Paint (LCP)**: Preload primary web fonts and hero images. Avoid heavy client-side JS bundles blocking initial paint.
- **Table Virtualization & Pagination**: For catalogs >100 rows, use client-side virtual scrolling or fast static pagination to prevent DOM thrashing.

---

## 3. SEO & Answer Engine Optimization (AEO)
- **JSON-LD Structured Data**: Every entity (Job, Article, Product, Organization) must render valid schema markup:
  - Job listings: `JobPosting` schema with `title`, `hiringOrganization`, `jobLocation`, `datePosted`.
  - Tools/Products: `SoftwareApplication` or `Product`.
- **Machine Surfaces**: Maintain `/llms.txt`, `/robots.txt`, and XML sitemaps covering all canonical paths.
- **Social Sharing**: Always supply Open Graph (`og:image`, `og:title`, `og:description`) and Twitter card tags with absolute URLs.
