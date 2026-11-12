import urllib.request
import json
import sys

def check_pagespeed(strategy="mobile"):
    url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://ibrahimslim.online&strategy={strategy}"
    print(f"Fetching Google PageSpeed Insights for strategy={strategy}...")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            lighthouse = data.get("lighthouseResult", {})
            categories = lighthouse.get("categories", {})
            perf = categories.get("performance", {}).get("score", 0) * 100
            print(f"\n==========================================")
            print(f"🎯 {strategy.upper()} PERFORMANCE SCORE: {perf:.0f} / 100")
            print(f"==========================================")
            audits = lighthouse.get("audits", {})
            metrics = [
                "first-contentful-paint",
                "largest-contentful-paint",
                "total-blocking-time",
                "cumulative-layout-shift",
                "speed-index",
                "interactive",
            ]
            for m in metrics:
                item = audits.get(m, {})
                print(f"{m:28}: {item.get('displayValue', 'N/A')} (score: {item.get('score')})")

            print("\n--- DIAGNOSTICS & FAILED AUDITS ---")
            for k, v in audits.items():
                score = v.get("score")
                if score is not None and score < 0.8:
                    title = v.get("title", k)
                    display = v.get("displayValue", "")
                    print(f"\n❌ [{score:.2f}] {title} {f'({display})' if display else ''}")
                    details = v.get("details", {})
                    items = details.get("items", [])
                    for it in items[:4]:
                        val = it.get("url") or it.get("node", {}).get("snippet") or str(it)[:150]
                        print(f"   -> {val}")

    except Exception as e:
        print(f"Error fetching PageSpeed: {e}")

if __name__ == "__main__":
    strategy = sys.argv[1] if len(sys.argv) > 1 else "mobile"
    check_pagespeed(strategy)
