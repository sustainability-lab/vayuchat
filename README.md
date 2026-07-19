# VayuChat project website

The public product and research page for **VayuChat**, hosted at
[sustainability-lab.github.io/vayuchat](https://sustainability-lab.github.io/vayuchat/).

The page leads with the working system and brings its deployment surfaces and
research evidence together:

- the live [VayuChat Hugging Face Space](https://huggingface.co/spaces/SustainabilityLabIITGN/VayuChat);
- the [browser-local WebGPU prototype](https://nipunbatra.github.io/vayuchat-webllm/);
- the official [demo video](https://www.youtube.com/watch?v=d6rklL05cs4);
- the iOS beta release status and downloadable Android alpha;
- a real native-app screen and the one-minute offline demonstration;
- the primary VayuBench paper with its [code](https://github.com/sustainability-lab/VayuBench),
  [public dataset](https://huggingface.co/datasets/SustainabilityLabIITGN/VayuBench),
  related work, and citation metadata.

Native app links are published only after their release gates and public
artifacts are verified. The site currently lists iOS build 15 as under Apple
beta review without linking to TestFlight. The Android link serves the exact
tested v0.6 build 15 alpha-4 APK from a GitHub prerelease.

## Stack

The site remains deliberately small: semantic HTML, custom CSS, and a small
dependency-free JavaScript file. It has no build step or runtime framework.
The interface uses a real VayuChat screen rather than decorative product
mockups or generated plot imagery.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Link and content checks

Before publishing, verify that the public demo, code, data, video, paper PDF,
and DOI links still resolve. Do not add a TestFlight URL or QR code unless the
iOS repository's public release verification prints `SHARING READY`.

Run the dependency-free structural check before committing:

```bash
python3 scripts/validate_site.py
```

It checks duplicate IDs, local assets, internal fragments, and placeholder
links without hardcoding the site's current sections or external services.

## Deployment

The workflow in `.github/workflows/publish.yml` validates every pull request.
Only pushes to `main` (or an explicit manual dispatch) can enter the protected
GitHub Pages deployment environment.

## Primary citation

V. Acharya, A. Pisharodi, R. Pasi, R. Mondal, and N. Batra, “VayuBench and
VayuChat: Executable Benchmarking and Deployment of LLMs for Multi-Dataset Air
Quality Analytics,” in *13th ACM IKDD International Conference on Data Science
(CODS 2025)*, 2025. DOI: [10.1145/3799830.3799884](https://doi.org/10.1145/3799830.3799884).
