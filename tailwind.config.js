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
    "tw-white": "#FAF9F6",
    "tw-black": "#020402",
    "tw-primary": "#faca94",
    "tw-secondary": "#eea212",
    "tw-spotify": "#1DB954",
   },
  },
 },
 plugins: [require("@headlessui/tailwindcss")],
};
