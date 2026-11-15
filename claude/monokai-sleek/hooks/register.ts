import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

type Mode = 'dark' | 'light'

type Palette = {
  page: string
  panel: string
  text: string
  dim: string
  muted: string
  pink: string
  green: string
  yellow: string
  orange: string
  cyan: string
  purple: string
  warningFill: string
  tint: number
}

const DARK: Palette = {
  page: '#272822',
  panel: '#1e1f1c',
  text: '#f8f8f2',
  dim: '#cfcfc2',
  // #75715e lifted to 4.5:1 on the page: desktop drops a palette whose muted text is under 3:1 on hover fills
  muted: '#928e79',
  pink: '#f92672',
  green: '#a6e22e',
  yellow: '#e6db74',
  orange: '#fd971f',
  cyan: '#66d9ef',
  purple: '#ae81ff',
  warningFill: '#e6db74',
  tint: 0.16,
}

// same hues, darkened to 4.5:1 on the page and on the app's tinted chips
const LIGHT: Palette = {
  page: '#fafaf8',
  panel: '#fefefd',
  text: '#272822',
  dim: '#49483e',
  muted: '#75715e',
  pink: '#c20053',
  green: '#4b6b00',
  yellow: '#6b6200',
  orange: '#915200',
  cyan: '#006b7b',
  purple: '#7646bf',
  warningFill: '#c6bb53',
  tint: 0.1,
}

// ramp stops the design system reads for a role's tinted ground, its border and its text
const STOPS = {
  dark: { ground: 800, edge: 700, ink: 300, selected: 850 },
  light: { ground: 100, edge: 250, ink: 600, selected: 50 },
} as const

const FILL = 400
const HOVER = 350

const mix = (from: string, to: string, amount: number): string =>
  '#' +
  [1, 3, 5]
    .map(i => {
      const a = parseInt(from.slice(i, i + 2), 16)
      const b = parseInt(to.slice(i, i + 2), 16)

      return Math.round(a + (b - a) * amount)
        .toString(16)
        .padStart(2, '0')
    })
    .join('')

function roles(p: Palette, mode: Mode) {
  const at = STOPS[mode]
  const base = mode === 'dark' ? p.panel : p.page

  // dark success text is read from the fill stop, so a role's dark fill has to match its text
  const role = (text: string, fill = text) => ({
    seed: text,
    fillShade: FILL,
    stops: {
      [at.ink]: text,
      [at.ground]: mix(base, text, p.tint),
      [at.edge]: mix(base, text, 0.4),
      [FILL]: fill,
      [HOVER]: mix(fill, p.text, 0.14),
    } as Record<number, string>,
  })

  // one accent role serves both: fills, selection and focus are pink, links and accent text are cyan
  const accent = role(p.cyan, p.pink)
  accent.stops[at.selected] = mix(p.page, p.pink, p.tint * 0.6)

  if (mode === 'dark') {
    // the focus ring's halo
    accent.stops[600] = mix(p.panel, p.pink, 0.5)
  }

  return {
    accent,
    danger: role(p.orange),
    success: role(p.green),
    warning: role(p.yellow, p.warningFill),
    pro: role(p.purple),
  }
}

const git = (p: Palette) => ({
  added: p.green,
  removed: p.pink,
  modified: p.yellow,
  merged: p.purple,
  closed: p.pink,
  conflicting: p.orange,
  draft: p.dim,
})

const { theme } = makeColors({
  label: 'Monokai Sleek',
  codeTheme: { dark: 'monokai' },
  dark: {
    gray: {
      anchors: {
        'surface-0': DARK.page,
        'text-primary': DARK.text,
        'text-secondary': DARK.dim,
        'text-muted': DARK.muted,
      },
      // anchors can't place a surface darker than the page, and would run the top of the ramp past the text color
      stops: {
        0: DARK.text,
        10: DARK.text,
        20: DARK.text,
        30: DARK.text,
        40: DARK.text,
        800: DARK.panel,
        830: DARK.panel,
        850: DARK.panel,
      },
    },
    roles: roles(DARK, 'dark'),
    git: git(DARK),
  },
  light: {
    gray: {
      anchors: {
        'surface-0': LIGHT.page,
        'surface-2': LIGHT.panel,
        'text-primary': LIGHT.text,
        'text-secondary': LIGHT.dim,
        'text-muted': LIGHT.muted,
      },
    },
    roles: roles(LIGHT, 'light'),
    git: git(LIGHT),
  },
})

const LOOK: ThemeSetArgs = { colors: theme }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.log(`monokai-sleek: ${set.reason}`, { to: 'debug' })
    }

    return next(e)
  })
}
