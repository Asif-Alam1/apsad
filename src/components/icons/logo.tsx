import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Heritage Hub Logo"
      {...props}
    >
      <path
        d="M4 21V10.08C4 9.54794 4.22031 9.04798 4.61108 8.69C4.95263 8.37433 5.3883 8.17101 5.84973 8.1076L11.5 7.25M12.5 7.25L18.1503 8.1076C18.6117 8.17101 19.0474 8.37433 19.3889 8.69C19.7797 9.04798 20 9.54794 20 10.08V21M4 21H7M20 21H17M4 21H20M8 21V11M12 21V8M16 21V11M3 21H21M12 3L3.78791 7.06888M12 3L20.2121 7.06888"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
