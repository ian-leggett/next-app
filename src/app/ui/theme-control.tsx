'use client'

import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

function getTheme(): string | null {
  return document.documentElement.getAttribute('data-theme')
}

function subscribeToNothing() {
  return () => {}
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.cookie = `theme=${theme}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`
}

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export default function ThemeControl() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => null)
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  )

  return (
    <div
      role="group"
      aria-label="Theme"
      data-hydrated={hydrated ? 'true' : 'false'}
      className="flex gap-1 text-sm"
    >
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
          className="rounded border border-zinc-400 px-2 py-1 aria-pressed:bg-zinc-800 aria-pressed:text-white dark:aria-pressed:bg-zinc-200 dark:aria-pressed:text-black"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
