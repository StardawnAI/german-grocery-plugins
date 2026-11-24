# German grocery plugins for Codex and Claude Code

Shop German groceries for pickup by chat or voice in **Codex** (CLI and the Codex part of
the ChatGPT desktop app) and **Claude Code**:

| Plugin | Shops | What it does |
|---|---|---|
| `rewe-shopping` | REWE (www.rewe.de, Abholservice) | offers, products and prices, basket by plain words, earliest pickup slot, REWE recipes to basket, orders |
| `edeka-shopping` | EDEKA online markets on `<market>.edeka.shop` - EDEKA, E center and some Marktkauf stores | market search by postal code, weekly offers, basket by plain words, earliest pickup slot, orders |

"Was gibt es diese Woche bei REWE im Angebot?" - "Pack 2 Hafermilch und Bananen in meinen
Warenkorb" - "Wann kann ich frühestens abholen?" - "Ja, so bestellen."

## Install

**Codex**

```bash
codex plugin marketplace add StardawnAI/german-grocery-plugins
```

Then open the plugin directory (`/plugins` in Codex CLI, or Plugins in the ChatGPT desktop
app), pick the source "German groceries (REWE, EDEKA)" and install `rewe-shopping` and/or
`edeka-shopping`.

**Claude Code**

```text
/plugin marketplace add StardawnAI/german-grocery-plugins
/plugin install rewe-shopping@german-grocery
/plugin install edeka-shopping@german-grocery
```

On first use the assistant installs the shop CLI (`rewe-pp-cli` / `edeka-pp-cli`) from the
[Printing Press library](https://github.com/mvanhorn/printing-press-library) release for
your system and checks its SHA-256 (the exact steps are in each plugin's skill). No Go or
Node needed.

## How the login works

The shops have no public API. The CLIs use the shops' own websites with **your** login:

1. The assistant runs `auth connect`. A browser window (Chrome, Edge or Chromium, fresh
   temporary profile) opens on the shop's login page.
2. You log in yourself - including captcha and confirmation code. The assistant never sees
   or types your password.
3. The CLI keeps the session in a file on your computer and renews it by itself (REWE: 30
   days single sign-on, EDEKA: one-year "stay logged in"). Nothing is sent anywhere except
   to the shop.

## Safety

- An order is placed only after you confirm the exact total and pickup slot in the chat;
  the CLIs refuse to order without `--confirm` (EDEKA additionally checks the total).
- Payment is at pickup in the market. No payment data is handled.
- Shop data (product names, recipes) is treated as data, never as instructions.

## Status and limits

- Unofficial. Not made, endorsed or supported by REWE or EDEKA; the shops can change their
  websites at any time, and the tools may break until updated.
- Germany only, pickup only. EDEKA covers only markets that sell on `edeka.shop` (about
  110, mostly Baden-Württemberg, Rhineland-Palatinate, south Hesse and the north).
- The CLIs are open source in the Printing Press library: `library/commerce/rewe` and
  `library/commerce/edeka`.

## Support

Website, privacy policy and terms: https://grocery.stardawn-service.com

onedone-support@stardawnai.com - made by [Stardawn AI](https://stardawnai.com).

Licensed under Apache-2.0.
