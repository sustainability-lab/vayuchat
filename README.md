# VayuChat project website

The public project page for **VayuBench** and **VayuChat**, hosted at
[sustainability-lab.github.io/vayuchat](https://sustainability-lab.github.io/vayuchat/).

The page brings the research and current deployment surfaces together:

- the live [VayuChat Hugging Face Space](https://huggingface.co/spaces/SustainabilityLabIITGN/VayuChat);
- the [browser-local WebGPU prototype](https://nipunbatra.github.io/vayuchat-webllm/);
- the official [demo video](https://www.youtube.com/watch?v=d6rklL05cs4);
- the iOS colleague beta and Android private alpha status;
- the [VayuBench code](https://github.com/sustainability-lab/VayuBench),
  [public dataset](https://huggingface.co/datasets/SustainabilityLabIITGN/VayuBench),
  papers, and citation metadata.

Native app links are intentionally not published until their release gates and
public artifacts are verified. The site labels those builds as pilots instead
of exposing private repositories or stale install links.

## Stack

The site remains deliberately small: plain HTML, CSS, and JavaScript with the
existing local Bulma stylesheet. It adds no build-time framework or package
dependencies.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Link and content checks

Before publishing, verify that the public demo, code, data, video, paper PDF,
and DOI links still resolve. Do not add a TestFlight URL or QR code unless the
iOS repository's public release verification prints `SHARING READY`.

## Deployment

The workflow in `.github/workflows/publish.yml` deploys the repository root to
GitHub Pages on pushes to `main`. Pull requests run the same Pages packaging
path without changing the source stack.

## Primary citation

V. Acharya, A. Pisharodi, R. Pasi, R. Mondal, and N. Batra, “VayuBench and
VayuChat: Executable Benchmarking and Deployment of LLMs for Multi-Dataset Air
Quality Analytics,” in *13th ACM IKDD International Conference on Data Science
(CODS 2025)*, 2025. DOI: [10.1145/3799830.3799884](https://doi.org/10.1145/3799830.3799884).
