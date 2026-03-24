# Khair Ul Wara - Portfolio Website

A fully dynamic, creative, non-static single-page portfolio designed specifically for a Biomedical Engineer & AI Innovator.

## Folder Structure
```text
portfolio-khair/
├── index.html        (Main HTML file)
├── css/
│   └── style.css     (Custom styling & animations)
├── js/
│   └── script.js     (Canvas particles, GSAP logic, Bio-Signal Widget)
└── assets/           (Create this folder yourself)
    ├── cv/
    │   └── Khair_Ul_Wara_CV.pdf    (Place your CV here)
    └── images/
        ├── gallery/                (Award ceremony, lab working photos)
        └── projects/               (Project prototype photos)
```

## Adding Your Images & CV
1. **CV:** Replace `assets/cv/Khair_Ul_Wara_CV.pdf` with your actual PDF. Ensure the file name matches or update the href inside `index.html`.
2. **Project Images:** Place your project images inside `assets/images/projects/` and name them:
   - `iot-patient.jpg`
   - `glucose.jpg`
   - `robotic-arm.jpg`
   - `upec.jpg`
   - `eeg-stroke.jpg`
   - `ultrasound.jpg`
   *(If you use `.png`, update the URL paths in `index.html` inline styles).*
3. **Gallery Images:** Place your gallery images inside `assets/images/gallery/` and name them exactly as referenced in HTML (e.g., `lab-work.jpg`, `poster.jpg`, `award.jpg`).
4. **Transcript:** Place your transcript image inside `assets/images/` named `transcript.png`.

## Deploying to GitHub Pages (Step by Step)
1. **Create a Repository:** Log in to GitHub and create a new repository called `yourusername.github.io` (or just `portfolio`).
2. **Upload Files:** Upload all the files in this folder (`index.html`, `css/`, `js/`, `assets/`) directly into that repository. You can drag and drop them inside the browser.
3. **Commit:** Click "Commit changes".
4. **Enable Pages:** If you named your repo `yourusername.github.io`, it will deploy automatically. If you named it something else (like `portfolio`), go to your repository **Settings > Pages**. Under "Build and deployment" Source, select strictly "Deploy from a branch", pick `main` (or root), and click Save.
5. **View Your Site:** Wait 1-2 minutes. Your site is now live at `https://yourusername.github.io/` or `https://yourusername.github.io/portfolio/`.

## Technologies Used
- HTML5, Vanilla JavaScript
- Tailwind CSS (via CDN)
- GSAP & ScrollTrigger (via CDN)
- FontAwesome Icons (via CDN)
- HTML5 Canvas for dynamic backgrounds and real-time Bio-Signal widget
