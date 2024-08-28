import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb.tsx'; 
import { useTranslation } from 'react-i18next';

const BreadcrumbSection: React.FC = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    {
      title: (
        <Link to="/">
          <img
            src="/images/bg-cgv-bread-home.png"
            alt="Home"
          />
        </Link>
      ),
    },
    {
      title: <span className="text-black">{t('breadcrumbs.movies')}</span>,
    },
    {
      title: (
        <span className="underline font-bold">
          {t('breadcrumbs.now_showing')}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-[#f1f0e5] border-b-[#cacac0] border-2">
      <div className="container center py-2 pl-40">
        <Breadcrumb items={breadcrumbItems} separator=">" />
      </div>
    </div>
  );
};

export default BreadcrumbSection;
