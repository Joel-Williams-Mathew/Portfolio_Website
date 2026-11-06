#!/usr/bin/env python3
"""Read a hits.sh badge SVG and print its count as a GitHub Actions output."""
import re
import sys


def parse(svg: str):
    """Return the visit count as a string, or None if it cannot be found."""
    # preferred: <title>hits: 75</title>
    m = re.search(r"<title>[^<]*?([0-9][0-9,]*)</title>", svg)
    if m:
        return m.group(1).replace(",", "")

    # fallback: any <text> node containing only digits
    nums = re.findall(r">\s*([0-9][0-9,]*)\s*</text>", svg)
    if nums:
        return nums[-1].replace(",", "")

    return None


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: parse_views.py <badge.svg>", file=sys.stderr)
        return 2

    with open(sys.argv[1], encoding="utf-8", errors="replace") as fh:
        svg = fh.read()

    print(f"svg length: {len(svg)}", file=sys.stderr)

    count = parse(svg)
    if count is None:
        print("could not parse a count from the badge", file=sys.stderr)
        print("count=")
    else:
        print(f"parsed count: {count}", file=sys.stderr)
        print(f"count={count}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
