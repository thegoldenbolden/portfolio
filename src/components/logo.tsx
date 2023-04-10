"use client";
import { motion } from "framer-motion";

export default function Logo() {
 return (
  <>
   <svg
    width="41"
    height="52"
    viewBox="0 0 41 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
   >
    <motion.path
     initial={{ y: "100%", opacity: 0 }}
     animate={{ y: 0, opacity: 100, transition: { type: "tween" } }}
     d="M32 9.07375C32 9.00713 31.9433 8.97534 31.9099 9.02245L26.068 17.2553C25.3842 18.219 25 19.5261 25 20.889V44H9.77521C8.76927 44 7.80454 44.3842 7.09323 45.068L1.01657 50.9099C0.981796 50.9433 1.00526 51 1.05443 51H28.3593C28.3853 51 28.4112 50.9997 28.4371 50.9992C28.458 50.9997 28.479 51 28.5 51C28.7068 51 28.9093 50.9747 29.1062 50.9263C30.7586 50.5951 32 49.1869 32 47.5C32 47.2997 31.9825 47.1033 31.9489 46.9122C31.9825 46.6377 32 46.3555 32 46.0675V9.07375Z"
     fill="url(#flipped)"
    />
    <motion.path
     initial={{ y: "-100%", opacity: 0 }}
     animate={{ y: 0, opacity: 100, transition: { type: "tween" } }}
     d="M39.9456 1C39.9947 1 40.0182 1.05669 39.9834 1.09011L33.9068 6.93201C33.1955 7.61583 32.2307 8 31.2248 8H16V31.111C16 32.4739 15.6158 33.781 14.932 34.7447L9.09011 42.9776C9.05668 43.0247 9 42.9929 9 42.9263V5.9325C9 5.64451 9.01751 5.36228 9.05112 5.08781C9.0175 4.8967 9 4.70031 9 4.5C9 2.8131 10.2414 1.40494 11.8938 1.07372C12.0907 1.02526 12.2933 1 12.5 1C12.521 1 12.542 1.00026 12.5629 1.00078C12.5888 1.00026 12.6147 1 12.6407 1H39.9456Z"
     fill="url(#original)"
    />
    <defs>
     <linearGradient
      id="flipped"
      x1="6.55263"
      y1="-0.647059"
      x2="46.9442"
      y2="43.856"
      gradientUnits="userSpaceOnUse"
     >
      <stop stopColor="white" />
      <stop offset="1" stopColor="#eea212" />
     </linearGradient>
     <linearGradient
      id="original"
      x1="6.55263"
      y1="-0.647059"
      x2="46.9442"
      y2="43.856"
      gradientUnits="userSpaceOnUse"
     >
      <stop stopColor="white" />
      <stop offset="1" stopColor="#faca94" />
     </linearGradient>
    </defs>
   </svg>
  </>
 );
}
