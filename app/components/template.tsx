import { useTranslation } from 'react-i18next';

export type TemplateProps = {
  prop?: any;
}

export default function Template({
  prop,
}: TemplateProps) {
  const { t } = useTranslation();

  return (
    <div />
  );
}
