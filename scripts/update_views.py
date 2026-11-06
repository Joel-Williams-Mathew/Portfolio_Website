#!/usr/bin/env python3
"""
Fetch the portfolio view count and write it to views.json.

The count comes from the hits.sh badge SVG, whose <title> contains the number.
Returns exit code 0 even when the count cannot be parsed, so a transient failure
never turns the workflow red - it simply leaves the previous value in place.
"""
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

BADGE_URL = (
    "https://hits.sh/joel-williams-mathew.github.io/Portfolio_Website.svg"
)
OUTPUT = "views.json"


def fetch(url: str, attempts: int = 3, timeout: int = 25) -> str:
    """Fetch the badge, retrying a couple of times."""
    last_error = None
    for attempt in range(1, attempts + 1):
        try:
            request = urllib.request.Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (compatible; portfolio-counter/1.0)",
                    "Cache-Control": "no-cache",
                },
            )
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return response.read().decode("utf-8", "replace")
        except Exception as exc:  # noqa: BLE001 - we want to retry any failure
            last_error = exc
            print(f"attempt {attempt}/{attempts} failed: {exc}", file=sys.stderr)
    raise RuntimeError(f"could not fetch badge: {last_error}")


def parse(svg: str):
    """Extract the visit count. Returns an int, or None."""
    match = re.search(r"<title>[^<]*?([0-9][0-9,]*)</title>", svg)
    if match:
        return int(match.group(1).replace(",", ""))

    found = re.findall(r">\s*([0-9][0-9,]*)\s*</text>", svg)
    if found:
        return int(found[-1].replace(",", ""))

    return None


def read_existing():
    try:
        with open(OUTPUT, encoding="utf-8") as handle:
            return json.load(handle)
    except Exception:  # noqa: BLE001
        return {}


def main() -> int:
    try:
        svg = fetch(BADGE_URL)
    except Exception as exc:  # noqa: BLE001
        print(f"fetch failed: {exc}", file=sys.stderr)
        return 0  # do not fail the workflow

    print(f"badge size: {len(svg)} bytes", file=sys.stderr)

    count = parse(svg)
    if count is None:
        print("could not parse a count - leaving views.json unchanged", file=sys.stderr)
        return 0

    existing = read_existing()
    if existing.get("views") == count:
        print(f"count unchanged at {count}", file=sys.stderr)
        return 0

    payload = {
        "views": count,
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    with open(OUTPUT, "w", encoding="utf-8") as handle:
        json.dump(payload, handle)
        handle.write("\n")

    print(f"wrote {OUTPUT} -> {count}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
