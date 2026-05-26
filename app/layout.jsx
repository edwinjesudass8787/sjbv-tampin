import './globals.css';

export const metadata = {
  title: 'Church of St. John Marie Vianney, Tampin',
  description: 'Official website for Church of St. John Marie Vianney, Tampin.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
