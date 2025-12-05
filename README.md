# VayuChat Project Website

A clean, minimal 1-pager for **VayuBench** and **VayuChat** - the first executable benchmark and deployment system for LLMs in air quality analytics.

Built with plain HTML/CSS using the [NERFIES](https://nerfies.github.io/) template approach.

## About

Air pollution causes over **1.6 million premature deaths annually in India**. VayuBench and VayuChat bridge the gap between environmental data and actionable insights:

- **VayuBench**: 5,000 natural language queries with verified Python code
- **VayuChat**: Production LLM-powered assistant for policymakers and citizens

## Quick Start

### Preview Locally

Simply open `index.html` in your browser:

```bash
open index.html
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Deploy to GitHub Pages

1. Create a new GitHub repository

2. Push the code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vayuchat.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: **GitHub Actions**
   - Done! Your site will be live at `https://YOUR_USERNAME.github.io/vayuchat/`

## Project Structure

```
vayuchat/
├── index.html                      # Main page
├── static/
│   ├── css/
│   │   ├── bulma.min.css          # Bulma framework
│   │   ├── index.css              # Custom styles
│   │   └── ...
│   ├── js/
│   │   ├── index.js               # Custom scripts
│   │   └── ...
│   └── images/
│       ├── query_prop.png         # Query distribution chart
│       ├── vb_interface.png       # Interface screenshot
│       └── favicon.svg            # Site icon
├── .github/workflows/
│   └── publish.yml                # GitHub Actions deployment
└── README.md                      # This file
```

## Customization

### Update Links

Edit `index.html` and replace placeholder `#` links:

```html
<!-- Find these lines and update: -->
<a href="#" class="external-link button...">arXiv</a>
<a href="#" class="external-link button...">Paper</a>
<a href="#" class="external-link button...">Code</a>
<a href="#" class="external-link button...">Demo</a>
```

### Add Content

The HTML is straightforward - each section is clearly marked:

- Hero section with title and authors
- Abstract
- Query Distribution figure
- VayuChat Interface figure
- Key Results
- Impact statement
- BibTeX citation
- Footer

### Styling

Edit `static/css/index.css` for custom styling. The site uses:
- **Bulma** for layout/components
- **Google Fonts** (Google Sans, Noto Sans, Castoro)
- **Font Awesome** for icons
- **Academicons** for academic icons

## Tech Stack

- Pure HTML/CSS/JavaScript
- [Bulma CSS](https://bulma.io/) - Minimal CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- GitHub Actions - Auto-deployment

## Features

- ✅ Clean, academic design
- ✅ Fully responsive
- ✅ Fast loading (no heavy frameworks)
- ✅ Accessible
- ✅ Easy to customize
- ✅ Auto-deploys on push

## Citation

```bibtex
@inproceedings{acharya2025vayubench,
  title={VayuBench and VayuChat: Executable Benchmarking and Deployment of LLMs for Multi-Dataset Air Quality Analytics},
  author={Acharya, Vedant and Pisharodi, Abhay and Pasi, Ratnesh and Mondal, Rishabh and Batra, Nipun},
  booktitle={CODS 2025},
  year={2025}
}
```

## Credits

- Website template inspired by [NERFIES](https://nerfies.github.io/)
- [Sustainability Lab](https://sustainability-lab.github.io/) at IIT Gandhinagar

## License

[Add your license here]

---

**Together for Cleaner Air** 🌬️
