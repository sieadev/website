Paste a TikTok or YouTube link into a chat with an AI agent and it usually can't do much with it. It can't play the video, and the page behind the link is mostly a player and a login wall.

vid2llm turns the link into text the agent can read.

---

## The idea

Put a video URL behind `vid2llm.dev/` and you get back markdown: who posted the video, the description, the stats, and a timestamped transcript of what is said.

```
GET https://vid2llm.dev/v/https://www.tiktok.com/@scout2015/video/6718335390845095173
```

```markdown
# Scramble up ur name & I'll try to guess it

- **Platform:** TikTok
- **Author:** Scout, Suki & Stella (@scout2015)
- **Uploaded:** 2019-07-27
- **Duration:** 0:10
- **Views:** 159,400

## Description
...

## Transcript
[0:00] ...
```

It works with public videos from TikTok, YouTube, Instagram and X, up to 15 minutes long. Other public pages and direct video file links are tried too, as long as the site's `robots.txt` allows it.

---

## Paying without an account

There is no sign-up and no API key. vid2llm uses [x402](https://x402.org), a payment protocol built on the HTTP status code `402 Payment Required`:

1. The agent requests a video.
2. The server answers `402` with the exact price for that video.
3. The agent signs a USDC payment on Base and repeats the request.
4. The server returns the result and settles the payment.

A request is only charged when it succeeds. If the video is unavailable or too long, the payment is never settled.

---

## Price

The price depends on the video's length: $0.005 plus $0.005 per started minute.

| Video length | Price |
|---|---|
| 30 seconds | $0.01 |
| 3 minutes | $0.02 |
| 10 minutes | $0.055 |

`GET /quote/<video-url>` is free and returns the title, the length and the exact price before the agent pays anything.

---

## Use it from an agent

The MCP server is on npm as [`vid2llm-mcp`](https://www.npmjs.com/package/vid2llm-mcp) and listed in the MCP Registry as `dev.vid2llm/mcp`. It pays for the agent from a wallet you give it.

```bash
claude mcp add vid2llm -e VID2LLM_PRIVATE_KEY=0x... -- npx -y vid2llm-mcp
```

It adds two tools:

- `watch_video(url)` returns the video as markdown.
- `video_price(url)` is free and returns the video's length and what it would cost.

Use a dedicated wallet holding a few dollars of USDC on Base. `VID2LLM_MAX_PRICE` (default `$1`) caps what the server will sign for a single video.

---

## How it's built

- **Backend:** Python with FastAPI. `yt-dlp` fetches the metadata and the audio, and `faster-whisper` transcribes it locally on CPU.
- **Edge:** a Cloudflare Worker serves the landing page, rejects bad URLs and caches free quotes. The backend publishes no ports and is only reachable through a Cloudflare Tunnel.
- **Payments:** the x402 middleware, settling in USDC on Base.
- **Safety:** every outbound fetch goes through an egress guard that only connects to public addresses, so a link can't be used to reach the server's own network.
- **Caching:** results are kept for 7 days, so a repeat request for the same video is served without reprocessing.

Try it at [vid2llm.dev](https://vid2llm.dev).
