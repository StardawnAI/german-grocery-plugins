// Static pages for the German grocery plugins: overview, privacy policy and terms.
// Served by a Cloudflare Worker at grocery.stardawn-service.com.

const UPDATED = "2026-11-19";
const REPO = "https://github.com/StardawnAI/german-grocery-plugins";
const SUPPORT = "onedone-support@stardawnai.com";
const IMPRINT = "https://stardawnai.com/impressum";

const css = `
:root{--bg:#f7f7f5;--fg:#1d1d1b;--muted:#5c5c58;--card:#fff;--line:#e2e2dc;--accent:#0b6b4f}
@media (prefers-color-scheme:dark){:root{--bg:#121211;--fg:#ecece8;--muted:#a3a39c;--card:#1b1b19;--line:#2e2e2a;--accent:#4fc39a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:760px;margin:0 auto;padding:40px 20px 64px}
@media (max-width:480px){main{padding:24px 16px 48px}}
nav{display:flex;gap:18px;flex-wrap:wrap;margin-bottom:28px;font-size:15px}
a{color:var(--accent)}h1{font-size:28px;line-height:1.25;margin:0 0 8px}h2{font-size:19px;margin:28px 0 8px}
p,li{color:var(--fg)}.muted{color:var(--muted);font-size:14px}
code{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:1px 6px;font-size:14px;overflow-wrap:anywhere}
pre{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px;overflow-x:auto;font-size:14px}
`;

function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>${css}</style></head><body><main>
<nav><a href="/">Overview</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="${REPO}">GitHub</a></nav>
${body}
<p class="muted">Last updated ${UPDATED}. Provider: Stand4 GmbH (Stardawn AI), <a href="${IMPRINT}">imprint</a>. Contact: <a href="mailto:${SUPPORT}">${SUPPORT}</a>.</p>
</main></body></html>`;
}

const pages = {
  "/": page("German grocery plugins", `
<h1>German grocery plugins for Codex and Claude Code</h1>
<p>Shop REWE and EDEKA (including E center and some Marktkauf stores) for pickup by chat or voice,
from Codex and Claude Code. Offers, basket in plain words, earliest pickup slot, recipes to basket,
and an order only after you confirm total and slot.</p>
<h2>Install</h2>
<p>Codex:</p><pre>codex plugin marketplace add StardawnAI/german-grocery-plugins</pre>
<p>Claude Code:</p><pre>/plugin marketplace add StardawnAI/german-grocery-plugins
/plugin install rewe-shopping@german-grocery
/plugin install edeka-shopping@german-grocery</pre>
<p>The plugins are unofficial and not made or endorsed by REWE or EDEKA. Source and details:
<a href="${REPO}">${REPO}</a>.</p>`),

  "/privacy": page("Privacy policy - German grocery plugins", `
<h1>Privacy policy</h1>
<p>This policy covers the plugins <code>rewe-shopping</code> and <code>edeka-shopping</code> and the
command-line tools they install (<code>rewe-pp-cli</code>, <code>edeka-pp-cli</code>).</p>
<h2>Who is responsible</h2>
<p>Stand4 GmbH (Stardawn AI), Magirus-Deutz-Straße 12, 89077 Ulm, Germany. Details in the
<a href="${IMPRINT}">imprint</a>. Contact for privacy questions: <a href="mailto:${SUPPORT}">${SUPPORT}</a>.</p>
<h2>What we collect</h2>
<p>Nothing. The plugins and tools run entirely on your own computer. Stardawn AI operates no server
for them and receives no data from them: no account data, no shopping data, no usage statistics,
no telemetry.</p>
<h2>What happens on your computer</h2>
<ul>
<li>You log in to the shop yourself in a browser window. The tool stores the resulting session
cookies in a file in your user profile so it can act in your shop account. Your password is never
seen, typed or stored by the tools.</li>
<li>Basket, orders, offers and prices come from and go to the shop you use. Optional local caches
(for example price history) stay on your computer and can be switched off.</li>
<li>Your assistant (Codex or Claude) sees the tool results you ask for. How OpenAI or Anthropic
process conversations is governed by their own privacy policies.</li>
</ul>
<h2>Where data goes</h2>
<ul>
<li>To the shop you use (REWE: www.rewe.de; EDEKA: your market's <code>edeka.shop</code> site),
directly from your computer, under that shop's own privacy policy.</li>
<li>To GitHub when the install script downloads the tool binary (normal web request).</li>
</ul>
<h2>This website</h2>
<p>This page is served by Cloudflare, which processes technical connection data (such as IP address)
to deliver it. We set no cookies and use no analytics here.</p>
<h2>E-mail</h2>
<p>If you write to us, we use your message and address only to answer it and delete it when it is no
longer needed.</p>
<h2>Your rights</h2>
<p>Under the GDPR you have the right to access, correct, delete and restrict processing of your data,
to data portability, to object, and to complain to a supervisory authority. Since we hold no data from
the plugins, deleting the session file and uninstalling the plugin removes everything they stored.</p>`),

  "/terms": page("Terms of use - German grocery plugins", `
<h1>Terms of use</h1>
<h2>What this is</h2>
<p>Free, open-source plugins and tools (Apache License 2.0) that let your AI assistant use the REWE
and EDEKA online shops with your own account. They are unofficial and not made, endorsed or supported
by REWE or EDEKA.</p>
<h2>Your account and orders</h2>
<ul>
<li>You use your own shop account and are bound by the shop's terms. Orders placed through the tools
are your orders with the shop, at the shop's prices and conditions; payment is at pickup.</li>
<li>The tools place an order only after an explicit confirmation of total and pickup slot. Check the
preview before you confirm.</li>
</ul>
<h2>No warranty</h2>
<p>The software is provided "as is", without warranty of any kind, as stated in the Apache License
2.0. The shops can change their websites at any time, which can break the tools. Stand4 GmbH is
liable only for intent and gross negligence, and under mandatory law.</p>
<h2>Support</h2>
<p>Questions and problems: <a href="mailto:${SUPPORT}">${SUPPORT}</a> or
<a href="${REPO}/issues">GitHub issues</a>.</p>`),
};

export default {
  async fetch(request) {
    const path = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
    const html = pages[path];
    if (!html) {
      return new Response(page("Not found", "<h1>Not found</h1>"), { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
    }
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=3600",
        "x-content-type-options": "nosniff",
        "referrer-policy": "no-referrer",
        "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      },
    });
  },
};
