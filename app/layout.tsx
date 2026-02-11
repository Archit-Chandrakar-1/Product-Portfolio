// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import Script from 'next/script';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Archit Chandrakar - Portfolio',
//   description: 'Professional portfolio of Archit Chandrakar - Web Developer & Designer',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-black`}>
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-37853KTGH9"
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-37853KTGH9');
//           `}
//         </Script>
//         {children}
//       </body>
//     </html>
//   );
// }
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import ScreenProtection from '@/components/ui/screen-protection'; // 1. Import the protection component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Archit Chandrakar - Portfolio',
  description: 'Professional portfolio of Archit Chandrakar - Web Developer & Designer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 2. Added 'select-none' to disable text selection/highlighting globally */}
      <body className={`${inter.className} bg-black select-none`}>
        
        {/* 3. Mount the protection logic (Disable Right Click, Keyboard Shortcuts) */}
        <ScreenProtection />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-37853KTGH9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-37853KTGH9');
          `}
        </Script>
        
        {children}
      </body>
    </html>
  );
}