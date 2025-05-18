import Image from 'next/image';
import type { ImgHTMLAttributes } from 'react';

export function Logo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      src="/logo.png" // This path assumes 'logo.jpeg' is directly in your 'public' folder
      alt="APSAD Logo" // It's good practice to keep descriptive alt text    // You can set the desired height
      {...props}       // This allows passing other standard img attributes like style, className, etc.
     width={50}
     height={50}
    />
  );
}