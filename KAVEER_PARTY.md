# Kaveer's Monster Party — guestbook runbook

A birthday guestbook for Kaveer's 5th. Kids build a monster / unicorn / princess /
cartoon-of-themselves on the laptop, add a message, and it joins the slideshow
on the TV.

| Screen | URL | Where |
| --- | --- | --- |
| Creator (kids + a parent) | `https://stickywicketlabs.com/kaveer` | Laptop (webcam for "Me!") |
| Slideshow | `https://stickywicketlabs.com/kaveer/tv` | TV browser, full screen (F11) |

The home page has a new "Kaveer's Monster Party" card that opens the creator.

## Deploy (Replit)

1. Pull this branch into the Replit workspace (or merge the PR to `main` and pull).
2. **Secrets → add `OPENROUTER_API_KEY`.** Copy the value from the UglyToCEO
   Repl's `OPENROUTER_API_KEY_U2C` secret. (`OPENROUTER_API_KEY_U2C` is also
   accepted as a name, so you can paste it under either.)
3. Publish / redeploy. No database migration is needed: the `party_monsters`
   table is created automatically on first use. If the database is ever
   unreachable the app falls back to an in-memory list so the party keeps going.
4. Open `/kaveer` on the laptop and click through once to confirm a picture
   comes back (about 10–20 s). Open `/kaveer/tv` on the TV.

If the creator shows a pink "Picture-making is not set up yet" banner, the
secret is missing on the deployment.

## How it works

- `POST /api/monsters/generate` builds a prompt from the picks (creature, color,
  hair style + color, up to 3 accessories, optional webcam photo) and asks
  OpenRouter for an image with `google/gemini-2.5-flash-image`, falling back to
  `google/gemini-3.1-flash-image-preview`. 90 s timeout per model.
- `POST /api/monsters` saves `{ name, message, creature, image }`.
- `GET /api/monsters` lists metadata; `GET /api/monsters/:id/image` serves the
  picture with long cache headers so the TV never re-downloads.
- The TV polls every 6 s, jumps straight to a newly added monster with a
  "New friend!" badge, then rotates every 9 s. Thumbnails of everyone bob along
  the bottom above the "Happy 5th Birthday, Kaveer!" banner.
- Webcam photos are shrunk to 640 px in the browser and sent only to generate
  the cartoon. The photo itself is never stored; only the cartoon is saved.

## Removing a monster

```
curl -X DELETE https://stickywicketlabs.com/api/monsters/<id>
```

IDs are visible in `GET /api/monsters`.
