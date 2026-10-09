export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export const todayISO = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
