# 🎬 MSARW — Cinematic Portfolio

A modern portfolio website designed for a **film editor and colorist** to professionally showcase work, services, and client testimonials.

## ✨ Features

* Cinematic homepage
* Portfolio gallery with video support
* Services section
* Client testimonials
* FAQ section
* Smooth animations
* Fully responsive for desktop and mobile

## 📝 Editing the Website

All website content can be updated without touching the code.

Simply edit the files inside the **`content`** folder:

* `site.json` – Personal information and social links
* `projects.json` – Portfolio projects
* `services.json` – Services offered
* `process.json` – Workflow
* `testimonials.json` – Client reviews
* `faq.json` – Frequently asked questions
* `toolset.json` – Software and tools

## 🎥 Adding Videos

1. Upload your video to the **`public/videos`** folder.
2. Update the matching project inside **`content/projects.json`** with the video filename.

If no video is added, the project will automatically display its cover image.

## 🖼 Replacing Images

Replace the placeholder images with your own by updating the image paths in:

* `content/site.json`
* `content/projects.json`

Store your images in:

```text
public/images/
```

## 🚀 Publishing

The website is ready to deploy on platforms like **Vercel** with no additional setup required.

---

Built with ❤️ for creative professionals.
lyxgm 2026