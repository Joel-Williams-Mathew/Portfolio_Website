#!/usr/bin/env python3
"""Write views.json from a numeric count."""
import json
import sys
from datetime import datetime, timezone


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: write_views.py <count>", file=sys.stderr)
        return 2

    raw = sys.argv[1].strip().replace(",", "")
    try:
        count = int(raw)
    except ValueError:
        print(f"not a number: {raw!r}", file=sys.stderr)
        return 1

    payload = {
        "views": count,
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }

    with open("views.json", "w", encoding="utf-8") as fh:
        json.dump(payload, fh)
        fh.write("\n")

    print(f"wrote views.json -> {count}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
