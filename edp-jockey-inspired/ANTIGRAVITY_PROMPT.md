# Antigravity build instruction: EDP inspired by Jockey

Reference: https://jockey.stuudio.xyz/

Build a production-quality, responsive React + Vite environmental data platform marketing homepage. Carefully inspect the reference website in the browser at desktop (1440x900), tablet (768px), and mobile (390px) before changing the project. Match the reference's visual hierarchy, whitespace, typography scale, cinematic section transitions, ambient graphics, UI-demo panels, sticky/staggered scroll storytelling, and interaction quality, while using original EDP content, logo, and illustrations rather than copying proprietary brand assets.

The code supplied in this project is a functional original React starting point. Preserve and improve its layout and GSAP animations. Compare screenshots section-by-section and correct the most obvious mismatches in vertical spacing, font weights, line breaks, colors, graphics, and movement. The live reference may use special effects that are not visible through text extraction; verify them visually before implementing them.

Stack: React 18, Vite, CSS, GSAP/ScrollTrigger, lucide-react. Avoid heavy UI frameworks. Add Lenis only if it meaningfully improves scroll smoothing, and integrate its RAF with GSAP carefully. Use 60fps transform/opacity animations, respect prefers-reduced-motion, and avoid layout shift and horizontal overflow.

Sections in this exact order: 1. fixed responsive translucent navigation; 2. cinematic dark hero with a large editorial headline and animated environmental globe; 3. Environmental Glance with immersive visualization and metric cards; 4. Datasets interactive split panel with four selectable domains; 5. Smart Applications showcase with three animated editorial cards; 6. Data Integration split-screen with interactive tabs and realistic application mockup; 7. Latest Updates editorial grid; 8. FAQ accordion; 9. large typographic footer CTA.

Motion requirements: elegant load stagger on hero; slow ambient globe orbit; scroll parallax on hero artwork; section-reveal stagger; reversible hover micro-interactions on cards/links; progressive indicator motion; interactive dataset preview updates; active integration tabs; FAQ accordion; smooth anchor navigation; accessible mobile menu. Use GSAP ScrollTrigger and ensure cleanup in React effects.

Brand direction: near-black green #0A1B1E, deep forest #173B36, mint #D5EAD9, paper #F4F5F0, muted green #648778. Typography: Manrope for headings, DM Sans for text, Georgia italic for editorial accent. Intentional negative space; square-ish restrained cards; sharp minimal navigation; subtle hairline borders. Do not turn the site into a generic dashboard or use gradients everywhere. Content must emphasize environmental datasets, environmental glance, maps, geospatial information, smart applications and updates.

Important: Do not claim to be reproducing the original site's proprietary source code. Use the reference as visual and interaction guidance. Ask for actual branding, source images, approved data and API keys only if the user wants production integrations; otherwise build complete working UI with realistic mock content.

Acceptance tests: `npm install`, `npm run dev`, `npm run build` must work; all buttons must act; responsive 390/768/1440; no browser console errors; keyboard navigable; no horizontal scrolling; reduced-motion accessible; verify screenshots against reference site and iterate at least twice.
