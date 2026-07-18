#!/usr/bin/env python3
"""Validate local references and document structure for the static site."""

from __future__ import annotations

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

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        element_id = values.get("id")
        if element_id:
            self.ids.append(element_id)

        for attribute in ("href", "src", "poster"):
            value = values.get(attribute)
            if value:
                self.references.append((attribute, value.strip()))


def validate() -> list[str]:
    errors: list[str] = []
    parser = SiteParser()
    parser.feed(ENTRYPOINT.read_text(encoding="utf-8"))
    parser.close()

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

        if parsed.fragment and parsed.fragment not in seen:
            errors.append(f"missing fragment target: {reference}")

    return errors


if __name__ == "__main__":
    failures = validate()
    if failures:
        for failure in failures:
            print(f"ERROR: {failure}")
        raise SystemExit(1)
    print("Site validation passed")
