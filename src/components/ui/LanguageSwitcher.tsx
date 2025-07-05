"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'EN', fullName: 'English' },
  { code: 'fr', name: 'FR', fullName: 'Français' },
  { code: 'ar', name: 'AR', fullName: 'العربية' },
];

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function LanguageSwitcher({ 
  variant = 'light', 
  className 
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <div className={cn("flex items-center space-x-1 rounded-lg p-1", className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded transition-all duration-200",
            locale === lang.code
              ? variant === 'light'
                ? "bg-primary-600 text-white"
                : "bg-white text-primary-600"
              : variant === 'light'
                ? "text-neutral-600 hover:text-primary-600 hover:bg-white/10"
                : "text-white/70 hover:text-white hover:bg-white/10"
          )}
          title={lang.fullName}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
