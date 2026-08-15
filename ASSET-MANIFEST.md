# Self-Contained Asset Manifest

All runtime storage-hosted image references used by the redesigned site have been downloaded into `client/public/assets/` and the source now references local `/assets/...` paths.

| Local asset | Purpose | Source |
|---|---|---|
| `msarw-lettermark-isolated.png` | Navbar and loading-screen wordmark | MSARW storage asset |
| `msarw-logo.webp` | Social preview image | MSARW storage asset |
| `msarw-neon-favicon.png` | Favicon and Apple touch icon | User-provided MSARW neon icon, optimized to 512×512 for packaging |
| `msarw-custom-arrow.png` | Custom directional arrow | MSARW storage asset |
| `msarw-pointer-28.png` | Default pointer cursor | MSARW storage asset |
| `msarw-selector-28.png` | Interactive selector cursor | MSARW storage asset |
| `msarw-ocean-reference.png` | Hero, backdrop, and contact visual field | MSARW storage asset |
| `project-aurora.jpg` | Selected-work thumbnail | Previously referenced Picsum URL |
| `project-night-market.jpg` | Selected-work thumbnail | Previously referenced Picsum URL |
| `project-signal.jpg` | Selected-work thumbnail | Previously referenced Picsum URL |
| `project-preview-flower.mp4` | Selected-work hover/full-video preview | Previously referenced MDN sample URL, locally bundled and compressed for packaging |
| `fonts/inter-*.ttf` | Body typography | Google Fonts Inter files |
| `fonts/space-grotesk-*.ttf` | Display typography | Google Fonts Space Grotesk files |

The user-provided `msarw-neon-favicon.png` is now the favicon used by the project. The provided `chrome_P2xnWYpgmO.gif` appears to be a browser screenshot/reference capture rather than a runtime website asset, so it is not wired into the page. The original `msarw-contact-texture` endpoint returned an image-generation failure placeholder rather than a usable visual asset. The site therefore uses the bundled ocean reference as the contact-section background fallback instead of packaging that invalid placeholder.

The source project did not contain original project footage; its selected-work data referenced a shared sample video URL for all three cards. That sample video has been downloaded locally as `project-preview-flower.mp4`. Replace it with the actual project videos if you have them.
