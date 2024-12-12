import { Outlet } from 'react-router-dom';
import { BreadcrumbProvider } from '@/hooks/contexts/bread-crumb-context';

const RootLayout = () => {
  return (
    <BreadcrumbProvider>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </BreadcrumbProvider>
  );
};

export default RootLayout;