# 🤖 Claude Code Directory

**The curated, searchable directory of CLAUDE.md files, slash commands, subagents and MCP servers for Claude Code.**

Live at: **https://claudecodedir.com** (deploy via GitHub Pages — see below)

Built by the community, for the community. 100% free. Not affiliated with Anthropic.

## ✨ Features
- **60+ entries** — CLAUDE.md templates, commands, agents and MCP servers
- **Search & filter** — instant, client-side, zero backend
- **Copy-paste workflows** — every entry ships with install instructions + content
- **Open source** — anyone can add entries via pull request

## 🚀 Add your entry (30 seconds)
1. Open [`js/data.js`](js/data.js)
2. Append an object to the `DATA` array:

```js
{
  id: "md-my-rules",
  type: "claude-md",            // claude-md | command | agent | mcp
  title: "My Rules",
  desc: "One-line description.",
  tags: ["tag1", "tag2"],
  featured: false,               // true = paid sponsored slot (see sponsor.html)
  source: "Your name / repo",
  link: "https://your-link",
  preview: `# The content people copy
...`,
  install: "How to install/use it"
}
```

3. Open a PR. Keep it clean, keep it real.

## 📝 Rules of the directory
- **Real only** — entries must exist and work. No vaporware.
- **No paid placement in organic listings** — featured (★) slots are clearly marked.
- **Small previews** — full content lives in the entry's own repo.

## 📄 Guides
SEO content lives in [`/guides`](guides/index.html): CLAUDE.md writing, custom commands, MCP servers, subagents.

## 💰 Business model (for transparency)
- **Featured listings** — $49/mo for a starred slot (see [sponsor.html](sponsor.html))
- **Category sponsor** — $149/mo banner + spotlight post
- **Founding sponsor** — $499/mo hero logo + newsletter feature (1 slot)
- All organic entries remain free forever.

## 🛠 Deploy (GitHub Pages, free)
1. Push this folder to a new GitHub repo.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → branch `main` → root.
3. Done. URL: `https://<user>.github.io/<repo>/`.
4. Optional: point a custom domain (`claudecodedir.com`) in Pages settings.

## 🧡 Credits
Inspired by [cursor.directory](https://cursor.directory) and built with the Starter Story playbook: find a hot niche, launch fast, open-source everything.
