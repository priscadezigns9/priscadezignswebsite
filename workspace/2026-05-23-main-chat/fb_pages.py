"""Facebook page share URLs for all empire brands."""

FB_PAGES = {
    "dreaming-anime":    "https://www.facebook.com/share/1Ev6SXPRY8/",
    "couture-gallery":   "https://www.facebook.com/share/1HhPv1i8Eg/",
    "the-watch-list":    "https://www.facebook.com/share/1EQErwog4f/",
    "atelier-gaming":    "https://www.facebook.com/share/1BnFhpQxsu/",
    "prisca-dezigns":    "https://www.facebook.com/share/1BTKzytaAx/",
    "tech-scout":        "https://www.facebook.com/share/1H9wFKPZaU/",
    "nehneh":            "https://www.facebook.com/share/1BWZkieFXy/",
    "essence-elite":     "https://www.facebook.com/share/1aPe27Sw5i/",
    "the-autodrome":     "https://www.facebook.com/share/18wwHcJ34u/",
    "the-escapist":      "https://www.facebook.com/share/17czU23Djr/",
    "paw-vault":         "https://www.facebook.com/share/17SDJiZEXd/",
    "sole-prestige":     "https://www.facebook.com/share/1XxTYMcGHK/",
    "peak-fit":          "https://www.facebook.com/share/1CqPx1cbiH/",
    "glow-protocol":     "https://www.facebook.com/share/1BiqhWvewP/",
    "quiet-luxury":      "https://www.facebook.com/share/18xhPpb6JH/",
    "verdant-co":        "https://www.facebook.com/share/18RWYpjFtd/",
}

if __name__ == "__main__":
    for brand, url in FB_PAGES.items():
        print(f"{brand}: {url}")
