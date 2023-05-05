'use client';

export default function FormatDate({ date }: { date: string }) {
  const datetime = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' });
  return <time>{datetime.format(new Date(date))}</time>;
}
