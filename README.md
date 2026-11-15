```text
████████╗██╗  ██╗███████╗███╗   ███╗███████╗███████╗
╚══██╔══╝██║  ██║██╔════╝████╗ ████║██╔════╝██╔════╝
   ██║   ███████║█████╗  ██╔████╔██║█████╗  ███████╗
   ██║   ██╔══██║██╔══╝  ██║╚██╔╝██║██╔══╝  ╚════██║
   ██║   ██║  ██║███████╗██║ ╚═╝ ██║███████╗███████║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝╚══════╝

                Claude mods and iTerm2 color schemes
```

themes is a personal collection of looks: mods that theme the Claude desktop and mobile apps, and color schemes for iTerm2. Each section below shows how to load one.

- [Load a Claude theme](#load-a-claude-theme)
- [Load an iTerm2 color scheme](#load-an-iterm2-color-scheme)
- [Add a Claude theme](#add-a-claude-theme)

## Load a Claude theme

| Theme | Look |
| --- | --- |
| [monokai-sleek](claude/monokai-sleek) | The original Monokai palette, flat, in dark and light mode |

A theme is a Claude Code mod. Only the Claude desktop and mobile apps paint it. Terminals and editors draw no look, so the mod loads there and changes nothing.

### From this repository

In the desktop app:

1. Click + next to the prompt box.
2. Click Plugins, then Add marketplace.
3. Enter `jamesonstone/themes`.
4. Click Add plugin, then pick the theme.

At the prompt of a terminal session, with Claude Code 2.1.275 or later:

```
/plugin install monokai-sleek --marketplace jamesonstone/themes
```

From a shell:

```bash
claude plugin install monokai-sleek --marketplace jamesonstone/themes
```

A mod installed at the user scope from a terminal also loads in the sessions the desktop app starts on that machine.

The theme sets its colors when a session starts. If the colors do not change, start a new session.

### From a local clone

Use this to try a theme before it is published, or to work on one.

1. Clone the repository:

```bash
git clone https://github.com/jamesonstone/themes.git
```

2. Name the theme's folder in the `env` block of `~/.claude/settings.json`. Use the absolute path:

```json
{
  "env": {
    "CLAUDE_CODE_PLUGIN_DIRS": "/absolute/path/to/themes/claude/monokai-sleek"
  }
}
```

3. Start a new session in the desktop app.

`claude --plugin-dir claude/monokai-sleek` loads the mod for one terminal session. Use it to confirm that the mod loads; a terminal does not paint the look.

### One theme at a time

A session has one theme. If two theme mods are on, the one that sets its colors last wins. Turn the others off:

```bash
claude plugin disable monokai-sleek
```

```bash
claude plugin uninstall monokai-sleek
```

## Load an iTerm2 color scheme

The schemes are `.itermcolors` files in [`itermcolors/`](itermcolors).

1. Clone the repository, or download the files you want.
2. In iTerm2, open Settings (Preferences in older versions), then Profiles.
3. Select a profile, then open the Colors tab.
4. Open the Color Presets menu and choose Import.
5. Select one or more `.itermcolors` files and click Open.
6. Open the Color Presets menu again and choose the scheme. It applies to the selected profile.

You can also open a file directly. iTerm2 adds it to the presets, and you then choose it in step 6:

```bash
open itermcolors/dracula.itermcolors
```

Schemes in this repository: Nord, Seti, atom, atomonelight, ayu, bright_lights, broadcast, chester, clrs, cobalt-neon, cyberpunk, dracula, duotone_colors, elementry, flat-luc, flat, galaxy, hipster-green, japanesque, liquid_carbon, material, misterioso, molokai, monokai_remastered, monokai_soda, monokai_vivid, neutron, obsidian, oceanic, parasio-dark, primary, red_sands, snazzy, spacegray, synthwave, tomorrow-night-burns, tomorrow-night-eighties, ubuntu, ultra-violet, whildcherry, whimsy.

## Add a Claude theme

1. Put the mod in `claude/<name>/`.
2. List it in `.claude-plugin/marketplace.json` with `"source": "./claude/<name>"`.
3. Add a row to the table in [Load a Claude theme](#load-a-claude-theme).
4. Check the marketplace, then the mod and its hooks module, then its tests:

```bash
claude plugin validate .
```

```bash
claude plugin validate claude/<name>
```

```bash
claude plugin test claude/<name>
```

## Maintainers

Maintained by [jamesonstone](https://github.com/jamesonstone).
