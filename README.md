# themes

A collection of themes: Claude Code mods and iTerm2 color schemes.

## Claude themes

Mods that paint the Claude desktop and mobile apps. Terminals and editors draw no look, so the mods do nothing there.

| Theme | Look |
| --- | --- |
| [monokai-sleek](claude/monokai-sleek) | The original Monokai palette, flat, in dark and light mode |

### Install

In the desktop app: click + next to the prompt box, then Plugins, Add marketplace with `jamesonstone/themes`, then Add plugin.

At the prompt of a terminal session, with Claude Code 2.1.275 or later:

```
/plugin install monokai-sleek --marketplace jamesonstone/themes
```

From a shell:

```bash
claude plugin install monokai-sleek --marketplace jamesonstone/themes
```

A mod installed at the user scope from a terminal also loads in the sessions the desktop app starts on that machine.

### Add a theme

1. Put the mod in `claude/<name>/`.
2. List it in `.claude-plugin/marketplace.json` with `"source": "./claude/<name>"`.
3. Check the marketplace, then the mod and its hooks module, then its tests:

```bash
claude plugin validate .
```

```bash
claude plugin validate claude/<name>
```

```bash
claude plugin test claude/<name>
```

## iTerm2 themes

`itermcolors/` holds `.itermcolors` files. In iTerm2, open Settings, Profiles, Colors, then Color Presets and Import.
