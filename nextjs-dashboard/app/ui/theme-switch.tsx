'use client'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeSwitcherSkeleton } from './skeletons';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <ThemeSwitcherSkeleton />
  )

  if (resolvedTheme === 'dark') {
    return <FontAwesomeIcon icon={faSun} onClick={() => setTheme('light')} size='2xl' />
  }

  if (resolvedTheme === 'light') {
    return <FontAwesomeIcon icon={faMoon} onClick={() => setTheme('dark')} size='2xl' />
  }

}