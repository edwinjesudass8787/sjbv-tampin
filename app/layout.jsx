import './globals.css';
import AnnouncementTicker from './components/AnnouncementTicker';

export const metadata = {
  title: 'Church of St. John Marie Vianney, Tampin',
  description: 'Official website for Church of St. John Marie Vianney, Tampin.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <AnnouncementTicker />
      </body>
    </html>
  );
}
