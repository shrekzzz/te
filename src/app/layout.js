import './globals.css';

export const metadata = {
  title: "Wanderer — A Traveller's Soul | Portfolio",
  description: "From the peaks of Nepal to the ghats of Banaras, from Vrindavan's devotion to Char Dham's spiritual journey — a life lived on the road.",
  keywords: 'travel, Nepal, Kathmandu, Char Dham, Vrindavan, Banaras, Ayodhya, motorcycle rides, adventure, portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
