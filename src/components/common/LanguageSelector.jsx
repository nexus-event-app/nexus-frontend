import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'es', name: 'ES', flag: '' },
        { code: 'ca', name: 'CA', flag: '' },
        { code: 'en', name: 'EN', flag: '' }
    
    ];

    return (
        <section className="flex gap-1">
            {languages.map(({ code, name, flag }) => (
                <button
                    key={code}
                    onClick={() => i18n.changeLanguage(code)}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition ${
                        i18n.language === code
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label={`Cambiar idioma a ${name}`}
                >
                    <span className="mr-1">{flag}</span>
                    {name}
                </button>
            ))}
        </section>
    );
}

export default LanguageSelector;