import type { Status } from '../types';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

type Toast = {
  status: NonNullable<Omit<Status, 'loading'>>;
  success?: string | null;
  error?: string | null;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export default function Toast({ status, success, error, setStatus }: Toast) {
  const bgColor = status === 'error' ? 'bg-red-600' : 'bg-tw-secondary';
  const color = status === 'error' ? 'text-tw-white' : 'text-tw-black';
  const message =
    status === 'error' ? error || 'Oh no.. an error..' : success || 'Success';

  useEffect(() => {
    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      setStatus(null);
    }, 5000);
    return () => timeout && clearTimeout(timeout);
  }, [status, setStatus]);

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{
        opacity: 1,
        decelerate: 2,
        speed: 1,
        x: 0,
      }}
      exit={{ x: '100%', speed: 1, opacity: 0 }}
      className={`fixed top-6 flex flex-wrap items-center text-center justify-center gap-2 rounded-md sm:right-6 ${bgColor} ${color} w-full max-w-[90%] sm:max-w-max p-2`}
    >
      <span>{message}</span>
    </motion.div>
  );
}
