import type { ThemeSetArgs } from 'claude-code'
import { expect, test } from 'claude-code/testing'

import { checkColors } from './make-colors.js'

test('session start sets a flat Monokai palette for both modes, once', async ($, on) => {
  const looks: ThemeSetArgs[] = []

  on('theme.set', (_, e) => {
    looks.push(e)

    return { value: { isDrawn: true, requestId: 'theme' } }
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  expect(looks.length).toBe(1)

  const look = looks[0]

  expect(look?.backdrop).toBe(undefined)
  expect(look?.overrideColorScheme).toBe(undefined)
  expect(look?.colors?.codeTheme).toEqual({ dark: 'monokai' })

  expect(look?.colors?.inputs.dark).toMatchObject({
    'gray-900': '#272822',
    'gray-850': '#1e1f1c',
    'gray-830': '#1e1f1c',
    'gray-800': '#1e1f1c',
    'gray-50': '#f8f8f2',
    'gray-0': '#f8f8f2',
    'gray-200': '#cfcfc2',
    'gray-400': '#928e79',
    'role-accent-fill': '#f92672',
    'role-accent-300': '#66d9ef',
    'role-success-400': '#a6e22e',
    'role-success-fill': '#a6e22e',
    'role-warning-300': '#e6db74',
    'role-warning-fill': '#e6db74',
    'role-danger-300': '#fd971f',
    'role-danger-fill': '#fd971f',
    'role-pro-300': '#ae81ff',
    'role-pro-fill': '#ae81ff',
    'text-git-added': '#a6e22e',
    'text-git-removed': '#f92672',
  })

  expect(look?.colors?.inputs.light).toMatchObject({
    'gray-20': '#fafaf8',
    'gray-10': '#fcfcfb',
    'gray-0': '#fefefd',
    'gray-900': '#272822',
    'gray-600': '#49483e',
    'gray-400': '#75715e',
    'role-accent-fill': '#c20053',
    'role-accent-600': '#006b7b',
    'role-success-600': '#4b6b00',
    'role-warning-600': '#6b6200',
    'role-warning-fill': '#c6bb53',
    'role-danger-600': '#915200',
    'role-pro-600': '#7646bf',
  })
})

test('desktop paints the palette: every token is known and no text is under 3:1', async ($, on) => {
  let look: ThemeSetArgs | undefined

  on('theme.set', (_, e) => {
    look = e

    return { value: { isDrawn: true, requestId: 'theme' } }
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  // a contrast note under the design system's bar still paints; a refusal or any shape problem does not
  const blocking = checkColors(look?.colors).filter(
    line => line.startsWith("Desktop won't paint") || !/; it needs [\d.]+:1/.test(line),
  )

  expect(blocking).toEqual([])
})

test('a session with no surface to draw the look still starts', async ($, on) => {
  on('theme.set', () => ({ value: { isDrawn: false, reason: 'no client draws themes' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  const started = await $.session.start({ cwd: '/work', surface: 'terminal', isInteractive: true })

  expect(started).toMatchObject({ cwd: '/work' })
})
