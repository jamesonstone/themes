# monokai-sleek

A Claude Code mod that paints the desktop and mobile apps in the original Monokai palette. Flat: no backdrop, gradient, or animation.

## Install

```
/plugin install monokai-sleek --marketplace jamesonstone/themes
```

The [repository README](../../README.md#load-a-claude-theme) has the desktop app steps, the shell line, and how to load it from a local clone.

## Palette

| | Dark | Light |
| --- | --- | --- |
| Page | `#272822` | `#fafaf8` |
| Cards | `#1e1f1c` | `#fcfcfb` |
| Panels, menus | `#1e1f1c` | `#fefefd` |
| Text | `#f8f8f2` | `#272822` |
| Secondary text | `#cfcfc2` | `#49483e` |
| Muted text | `#928e79` | `#75715e` |
| Pink: accent fills, selection, focus | `#f92672` | `#c20053` |
| Green: success | `#a6e22e` | `#4b6b00` |
| Yellow: warnings | `#e6db74` | `#6b6200` |
| Orange: errors | `#fd971f` | `#915200` |
| Cyan: links, accent text | `#66d9ef` | `#006b7b` |
| Purple: numbers, constants | `#ae81ff` | `#7646bf` |

Light accents keep the Monokai hues, darkened to 4.5:1 or better on the page and on the app's tinted chips.

## Where the app sets the rules

- **Muted text in dark mode is `#928e79`, not `#75715e`.** The desktop app drops a whole palette whose muted text is under 3:1 on hover and field fills, and `#75715e` is 2.2:1 there. The lowest value it accepts is about `#8c8874`.
- **Borders are derived.** The app draws them as the text color at 10% over the surface: `#3c3d37` on the page and `#343531` on panels in dark mode.
- **Pink and cyan share one accent role.** Fills, toggles, selection and the focus ring are pink. Links and accent text are cyan. Neutral primary buttons take the text color (`#f8f8f2` in dark mode, `#272822` in light mode), because that color also drives every border.
- **Code blocks** ask for the app's `monokai` code theme in dark mode. Where the app does not offer it, and always in light mode, the app colors code from the roles: keywords from the accent, strings green, literals purple, names orange, variables yellow.

## Develop

Everything is in `hooks/register.ts`. `hooks/make-colors.js` is the design system's generator, copied unchanged.

From this folder:

```bash
claude plugin validate .
```

```bash
claude plugin test .
```

```bash
claude --plugin-dir .
```

`tsc -p .` type-checks the mod once Claude Code has loaded it from this folder. The load writes the types that `tsconfig.json` extends to `.claude-plugin/types/`, which Git ignores.
