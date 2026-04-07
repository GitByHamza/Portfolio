import { Moon, Sun } from 'lucide-react';
import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { cn } from '../lib/utils'
const ThemeToggle = ({ className }) => {
 const [isDarkMode, isSetDarkMode] = useState(() => {
  return localStorage.getItem("Theme") !== "Light";
 });

 useEffect(() => {
  if (localStorage.getItem("Theme") === "Light") {
   document.documentElement.classList.remove("dark")
   isSetDarkMode(false)
  }
  else {
   document.documentElement.classList.add("dark")
   if (!localStorage.getItem("Theme")) {
    localStorage.setItem("Theme", "Dark")
   }
   isSetDarkMode(true)
  }
 }, [])

 const toggleDarkMode = () => {
  if (isDarkMode) {
   document.documentElement.classList.remove("dark")
   localStorage.setItem("Theme", "Light")
   isSetDarkMode(false)
  } else {
   document.documentElement.classList.add("dark")
   localStorage.setItem("Theme", "Dark")
   isSetDarkMode(true)
  }
 }
 return (
  <button onClick={toggleDarkMode} className={cn("z-50 rounded-full transition-colors duration-300 focus:outline-hidden", className)}>
   {
    isDarkMode ? <Sun className='h-6 w-6 text-yellow-300' />
     : <Moon className='h-6 w-6 text-blue-300' />
   }
  </button>
 )
}

export default ThemeToggle
