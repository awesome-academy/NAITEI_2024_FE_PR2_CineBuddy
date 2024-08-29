import React from 'react';
import { BreadcrumbSection } from '../../components/Breadcrumb.tsx';
import { nowShowingBreadcrumbItems } from '../../constants/breadcrumbItems.tsx';
import { useTranslation } from 'react-i18next';

const NowShowingBreadcrumb: React.FC = () => {
  const { t } = useTranslation();

  const breadcrumbItems = nowShowingBreadcrumbItems.map((item) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey) : item.title,
  }));

  return <BreadcrumbSection items={breadcrumbItems} separator=">" />;
};

export default NowShowingBreadcrumb;
