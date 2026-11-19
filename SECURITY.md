# Security policy

## Reporting a vulnerability

Please report security problems privately to **onedone-support@stardawnai.com** with
"SECURITY" in the subject. Do not open a public issue for a vulnerability. We answer
within five working days and tell you what we will do and when.

Problems in the shop CLIs themselves (`rewe-pp-cli`, `edeka-pp-cli`) can also be reported
to the [Printing Press library](https://github.com/mvanhorn/printing-press-library), where
their source lives.

## What these plugins do on your computer

- The plugins contain only instructions (skills), manifests and icons. No scripts, no
  background services, no hooks, no telemetry.
- The install steps in the skills download the CLI binary from the Printing Press library's
  GitHub release over HTTPS and refuse to install it unless its SHA-256 matches the
  release's `checksums.txt`.
- You log in to the shop yourself in a browser window with a fresh temporary profile. The
  CLI reads the resulting cookies over a DevTools port bound to 127.0.0.1 only, stores them
  in a session file in your user profile, and deletes the temporary browser profile.
- Your password is never seen, typed or stored by the plugins or the CLIs.
- Orders are only placed after you confirm the total and pickup slot; the CLIs refuse to
  order without an explicit `--confirm`.
- Data goes only to the shop you use (www.rewe.de or `<market>.edeka.shop`) and to GitHub
  for the binary download.

## Supported versions

Only the latest version on the `main` branch and the latest CLI release are supported.
