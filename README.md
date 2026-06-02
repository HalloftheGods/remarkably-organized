[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/youmeos)

# Remarkably Organized Planner

🔗 **Live:** [planner.mycompassconsulting.com](https://planner.mycompassconsulting.com/)

A highly-customizable web app for generating premium hyperlinked PDF planners designed specifically for e-ink tablets like the reMarkable, Boox, Supernote, and Kindle Scribe.

![Remarkably Organized Planner](./static/remarkably-organized-cover-photo.jpg)

Use the built-in design panel to tweak your planner's content, layout, and visual aesthetic. The PDF preview is generated live in your browser!

## 🌟 Key Features

*   **Premium Theming:** Choose from curated design aesthetics (like *Midnight Nerd*, *Pastel Dreams*, or *Classic E-Ink*). Customize fonts, text colors, grid line colors, and background shading.
*   **1-Click Presets:** Instantly load highly-optimized configurations tailored for different lifestyles:
    *   *Software Engineer:* Agile Sprint boards & daily standup notes.
    *   *Health & Fitness:* Weekly meal planners & dedicated workout logs.
    *   *Academic:* 24-hour schedules starting in August for students/teachers.
    *   *Bullet Journal:* Pure dot-grid layouts with extensive custom collections.
    *   *ADHD Focus:* Clutter-free layouts with extra-large fonts.
*   **Modular Collections:** Add up to 5 custom notebook sections to the back of your planner with features like auto-generated index pages and specialized templates (Finance Trackers, Meeting Minutes, Agile Boards, etc.).
*   **Shareable Configurations:** Your entire planner configuration is encoded directly into the URL! Once you design your perfect planner, just copy the link to save it or share it with others.
*   **Live Analytics:** See real-time community usage stats (total visitors, planners created, PDFs exported, and total time spent designing) right on the landing page!

## Exporting to PDF

To export your custom planner, use Chrome's built-in print-to-pdf functionality (`Ctrl/Cmd + P`). 
**CRITICAL:** Make sure **"Background Graphics"** is enabled in the print settings so your themes and background colors render correctly.

If you generate a massive planner (e.g., 900+ pages), Chrome may require a moment to process the PDF.

![Remarkably Organized Print Instructions](./static/remarkably-organized-print-instructions.jpg)

## Development

The web app is built using **SvelteKit** and **Vite**. 

Install dependencies using `pnpm`:
```bash
pnpm i
pnpm run dev
```

This will launch the dev server at `localhost:5173` with automatic Hot Module Replacement (HMR).

To build for production:
```bash
pnpm run build
```
