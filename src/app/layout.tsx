import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: 'Deva Sarees | Tradition in every Thread',
  description:
    'Artisanal handloom saree atelier featuring pure Kanchipuram silk, soft silk, and bridal heirlooms directly from master weavers.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Deva Sarees | Tradition in every Thread',
    description:
      'Artisanal handloom saree atelier featuring pure Kanchipuram silk, soft silk, and bridal heirlooms directly from master weavers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function strip(el) {
                  if (!el || el.nodeType !== 1) return;
                  if (el.hasAttribute && el.hasAttribute('fdprocessedid')) {
                    el.removeAttribute('fdprocessedid');
                  }
                  var children = el.querySelectorAll ? el.querySelectorAll('[fdprocessedid]') : [];
                  for (var i = 0; i < children.length; i++) {
                    children[i].removeAttribute('fdprocessedid');
                  }
                }
                var observer = new MutationObserver(function(mutations) {
                  for (var i = 0; i < mutations.length; i++) {
                    var m = mutations[i];
                    if (m.type === 'attributes' && m.attributeName === 'fdprocessedid') {
                      strip(m.target);
                    } else if (m.type === 'childList') {
                      for (var j = 0; j < m.addedNodes.length; j++) {
                        strip(m.addedNodes[j]);
                      }
                    }
                  }
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  childList: true,
                  subtree: true,
                  attributeFilter: ['fdprocessedid']
                });
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    strip(document.documentElement);
                  });
                } else {
                  strip(document.documentElement);
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#fbf9f4] text-[#1b1c19] antialiased selection:bg-[#ffd9dd] selection:text-[#400013]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
