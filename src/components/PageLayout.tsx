import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { SeoPage } from '@/data/seo';

export default function PageLayout({
  children,
  wide = false,
  breadcrumbs,
}: {
  children: React.ReactNode;
  wide?: boolean;
  breadcrumbs?: SeoPage['breadcrumbs'];
}) {
  return (
    <div className="page-container">
      <Header />
      <main id="main" tabIndex={-1} className={`page-main${wide ? ' page-main--hero' : ''}`}>
        {breadcrumbs && breadcrumbs.length > 1 ? (
          <nav aria-label="Breadcrumb" className="seo-breadcrumb">
            <ol>
              {breadcrumbs.map((crumb, index) => {
                const last = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.path}>
                    {last ? (
                      <span aria-current="page">{crumb.name}</span>
                    ) : (
                      <Link to={crumb.path}>{crumb.name}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        {children}
      </main>
      <Footer />
    </div>
  );
}
