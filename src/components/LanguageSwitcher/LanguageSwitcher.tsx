import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);

    // Update document language attribute for SEO
    document.documentElement.lang = newLang;

    // Update meta tags
    updateMetaTags(newLang);
  };

  const updateMetaTags = (lang: string) => {
    if (lang === 'en') {
      document.title = 'ShareMD - Free Online Markdown Editor | Real-time Preview';

      const description = document.querySelector('meta[name="description"]');
      if (description) {
        description.setAttribute('content',
          'ShareMD is a powerful online Markdown editor with real-time preview, sync scrolling, and one-click image export. Completely free, no registration required, supports GitHub Flavored Markdown.'
        );
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', 'ShareMD - Free Online Markdown Editor');
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content',
          'Powerful online Markdown editor with real-time preview, sync scrolling, and one-click image export. Completely free, no registration required.'
        );
      }
    } else {
      document.title = 'ShareMD - 免费在线 Markdown 编辑器 | 实时预览 | 一键生成长图';

      const description = document.querySelector('meta[name="description"]');
      if (description) {
        description.setAttribute('content',
          'ShareMD 是一款功能强大的在线 Markdown 编辑器，支持实时预览、双向同步滚动、一键生成长图。完全免费，无需注册，支持 GitHub Flavored Markdown。'
        );
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', 'ShareMD - 免费在线 Markdown 编辑器');
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content',
          '功能强大的在线 Markdown 编辑器，支持实时预览、同步滚动、一键生成长图。完全免费，无需注册。'
        );
      }
    }
  };

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      title={t('language.switch')}
      aria-label={t('language.switch')}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span>{i18n.language === 'en' ? 'EN' : '中'}</span>
    </button>
  );
}
