#!/usr/bin/env python3
"""Validate local references and document structure for the static site."""

from __future__ import annotations

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
ENTRYPOINT = ROOT / "index.html"


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.references: list[tuple[str, str]] = []
        self.tags: Counter[str] = Counter()
        self.elements: list[tuple[str, dict[str, str | None]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        self.tags[tag] += 1
        self.elements.append((tag, values))
        element_id = values.get("id")
        if element_id:
            self.ids.append(element_id)

        for attribute in ("href", "src", "poster"):
            value = values.get(attribute)
            if value:
                self.references.append((attribute, value.strip()))


def validate() -> list[str]:
    errors: list[str] = []
    source = ENTRYPOINT.read_text(encoding="utf-8")
    parser = SiteParser()
    parser.feed(source)
    parser.close()

    if parser.tags["h1"] != 1:
        errors.append(f"expected exactly one h1, found {parser.tags['h1']}")

    required_sections = {"top", "how", "outputs", "demo", "apps", "research"}
    missing_sections = required_sections.difference(parser.ids)
    for section_id in sorted(missing_sections):
        errors.append(f"missing required section: #{section_id}")

    seen: set[str] = set()
    duplicates: set[str] = set()
    for element_id in parser.ids:
        if element_id in seen:
            duplicates.add(element_id)
        seen.add(element_id)
    for element_id in sorted(duplicates):
        errors.append(f"duplicate id: #{element_id}")

    for attribute, reference in parser.references:
        if reference == "#":
            errors.append(f"placeholder {attribute}: {reference}")
            continue

        parsed = urlsplit(reference)
        if parsed.scheme or parsed.netloc or reference.startswith(("mailto:", "tel:", "data:")):
            continue

        if parsed.path:
            local_path = (ROOT / unquote(parsed.path.lstrip("/"))).resolve()
            try:
                local_path.relative_to(ROOT)
            except ValueError:
                errors.append(f"reference escapes site root: {reference}")
                continue
            if not local_path.exists():
                errors.append(f"missing local asset: {reference}")
            elif local_path.suffix.lower() == ".mp4" and local_path.stat().st_size < 100_000:
                errors.append(f"video asset is unexpectedly small: {reference}")
            elif local_path.suffix.lower() in {".png", ".webp"} and local_path.stat().st_size < 1_000:
                errors.append(f"image asset is unexpectedly small: {reference}")

        if parsed.fragment and parsed.fragment not in seen:
            errors.append(f"missing fragment target: {reference}")

    for tag, attributes in parser.elements:
        if tag == "img" and "alt" not in attributes:
            errors.append(f"image is missing alt text: {attributes.get('src', '<unknown>')}")
        if tag == "iframe" and not attributes.get("title"):
            errors.append(f"iframe is missing a title: {attributes.get('data-src', '<unknown>')}")
        if tag == "video":
            for required_attribute in ("controls", "playsinline", "poster"):
                if required_attribute not in attributes:
                    errors.append(f"video is missing {required_attribute}: {attributes}")
        if tag == "a" and attributes.get("target") == "_blank":
            rel = set((attributes.get("rel") or "").split())
            if not {"noopener", "noreferrer"}.issubset(rel):
                errors.append(f"external new-tab link is missing rel protection: {attributes.get('href')}")

    required_copy = (
        "146,459",
        "2017–2025",
        "Swift",
        "Kotlin",
        "Python",
        "vayuchat-iphone-60s.mp4",
        "vayuchat-android-60s.mp4",
        "vayuchat-workflow.svg",
        "vayuchat-hosted-answer.webp",
        "VayuChat-Android-v0.6-alpha4.apk",
    )
    for expected in required_copy:
        if expected not in source:
            errors.append(f"missing release-critical content: {expected}")

    if "testflight.apple.com" in source.lower():
        errors.append(
            "TestFlight URL found: run the iOS public-release gate and update this guard "
            "in the same reviewed change only after it prints SHARING READY"
        )

    if not (ROOT / "static/images/vayuchat-hero-og.webp").exists():
        errors.append("missing social preview: static/images/vayuchat-hero-og.webp")

    return errors


if __name__ == "__main__":
    failures = validate()
    if failures:
        for failure in failures:
            print(f"ERROR: {failure}")
        raise SystemExit(1)
    print("Site validation passed")
