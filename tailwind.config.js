/** @type {import('tailwindcss').Config} */

module.exports = {
 content: ["./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {
   fontFamily: {
    montserrat: ["var(--font-montserrat)"],
   },
   colors: {
    "tw-gray": "#8C8A93",
    "tw-gray-10": "#101211",
    "tw-white": "#FDFFFC",
    "tw-black": "#020402",
    "tw-primary": "#faca94",
    "tw-secondary": "#eea212",
    "tw-tertiary": "#d22ac2",
    linkedin: "#0a66c2",
    twitter: "#1d9bf0",
    github: "#171515",
    "tw-spotify": "#1DB954",
    gmail: "#db4437",
    instagram: "#F77737",
   },
  },
 },
 plugins: [],
};
