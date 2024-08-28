import React from 'react';
import { BreadcrumbSection } from '../../components/Breadcrumb.tsx'; 
import { comingSoonBreadcrumbItems } from '../../constants/breadcrumbItems.tsx'; 
import { useTranslation } from 'react-i18next';

const ComingSoonBreadcrumb: React.FC = () => {
  const { t } = useTranslation();

  const breadcrumbItems = comingSoonBreadcrumbItems.map((item) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey) : item.title, 
  }));

  return <BreadcrumbSection items={breadcrumbItems} separator=">" />;
};

export default ComingSoonBreadcrumb;
