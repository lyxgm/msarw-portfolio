# MSARW Redesign — Design Ground Truth

## Reference Spec

This is a redesign/translation of the uploaded MSARW portfolio. The existing **Tools** and **Skills** pills are the ground truth for the new visual system and must be carried throughout the website.

The defining visual language is a low-key, deep-ocean interface: near-black blue-green foundations, cyan-to-electric-blue diagonal color movement, translucent glass surfaces, bright ivory type, thin white borders, rounded pill geometry, inset highlights, soft drop shadows, and restrained hover brightness. The UI should feel like a premium creative technology portfolio: precise, atmospheric, tactile, and slightly cinematic rather than glossy or playful.

## Chosen Direction: Deep-Ocean Instrument Panel

### Design Movement
Contemporary **neo-brutalist editorial interface** softened by glassmorphism and cinematic post-production styling. Content is arranged like a working creative system rather than a conventional centered marketing page.

### Core Principles
1. **Pill language everywhere:** major actions, tags, filters, service labels, and selected states use the same rounded, tactile geometry established by Tools and Skills.
2. **Low-key depth:** use nearly black blue-green fields, layered translucency, thin borders, and inset light to create depth without heavy decoration.
3. **Diagonal energy:** repeat the cyan/blue diagonal shimmer as a controlled signature, never as a generic gradient background.
4. **Editorial rhythm:** pair compact uppercase mono labels with larger expressive display headlines and generous vertical pauses.

### Color Philosophy
The interface begins in near-black (#020204) to make the cyan-blue accent feel like instrument light in a dark studio. Deep teal (#021e2e) and blue-green (#003d48) provide depth; electric cyan (#1592C8) and blue (#2687FD) mark action and progress. Ivory text remains slightly softened rather than pure white, preserving the cinematic tone.

### Layout Paradigm
Use a vertical narrative spine with asymmetric section openings, wide edge-to-edge moments, and horizontally scrolling or offset content where appropriate. Avoid a repeated centered-card grid. The tools/skills pill field should act as a recurring visual anchor between narrative sections.

### Signature Elements
- Tactile pill controls with a diagonal light sweep, translucent surface, 1px white border, inset top highlight, and soft shadow.
- Tiny uppercase mono section eyebrows in pale cyan.
- Thin timeline-like rules and small cyan markers that echo an editing interface.

### Interaction Philosophy
Interactions should feel like physical controls: a short press scale-down, a quick brightness lift, and a precise border response. Hover states should never recompose the layout. Focus states use a crisp cyan ring for keyboard users.

### Animation
Use short 160–260ms ease-out transitions for pills, links, and cards. Entrance motion should be subtle: opacity plus a 10–18px vertical shift, staggered by 40–70ms. Reserve larger movement for hero transitions and horizontal work reels. Respect reduced-motion preferences.

### Typography System
Use Space Grotesk for display and interface headings, Inter for readable body copy, and SF Pro Rounded for compact mono-style metadata and timeline labels. Headlines use strong weight contrast; eyebrows remain 11–12px with 0.2em tracking; body copy stays relaxed at 1.6–1.8 line-height.

### Brand Essence
A cinematic creative technology portfolio for clients who want sharper digital experiences, distinguished by a tactile tool-driven visual language. Personality: **precise, atmospheric, assured**.

### Brand Voice
Headlines should be concise, observant, and slightly technical. CTAs should sound like invitations into a working process, not generic conversion copy.

Example lines:
- “Make the interface carry more weight.”
- “See the system behind the surface.”

### Wordmark & Logo
Use a compact geometric **MSARW monogram** built from four offset cyan-blue bars inside a rounded square, suggesting layers of a timeline or stacked tool panels. The mark should work without text and remain legible at favicon size.

### Signature Brand Color
**Signal Cyan — #1592C8**, used as the ownable highlight that bridges teal depth and electric-blue action.

## Implementation Reminder
Every edited CSS, component, and page file must begin with a short comment naming the Deep-Ocean Instrument Panel direction and the relevant styling rules for that file.
