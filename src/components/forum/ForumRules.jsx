        import React from 'react';

        function ForumRules() {
        return (
            <article className="mt-8 mb-8 overflow-hidden transition-all duration-300 border-2 border-indigo-200 rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 hover:shadow-lg">
            <header className="px-6 py-4 text-white bg-gradient-to-br from-[#4F46E5] via-[#3E54A3] to-[#3E54A3] sm:px-8">
                <h2 className="text-xl font-bold text-center sm:text-2xl">
                📋 Normas de la Comunidad
                </h2>
            </header>

            <section className="px-6 py-6 sm:px-8">
                <p className="mb-6 text-base leading-relaxed text-center text-gray-700 sm:text-lg">
                Este es un espacio de aprendizaje y colaboración para profesionales tech.
                Para mantener un ambiente constructivo, por favor respeta estas normas:
                </p>

                <ul className="space-y-3 text-sm text-gray-700 sm:text-base" role="list">
                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white rounded-full bg-gradient-to-br from-green-500 to-emerald-600" aria-hidden="true">
                    ✓
                    </span>
                    <p>
                    <strong className="font-semibold text-gray-900">Respeto absoluto:</strong> Tolerancia cero con faltas de respeto, insultos, discriminación o acoso de cualquier tipo.
                    </p>
                </li>

                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-cyan-600" aria-hidden="true">
                    💻
                    </span>
                    <p>
                    <strong className="font-semibold text-gray-900">Contenido tecnológico:</strong> Las discusiones deben estar relacionadas con desarrollo, programación, herramientas tech o experiencias profesionales en el sector.
                    </p>
                </li>

                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white rounded-full bg-gradient-to-br from-purple-500 to-pink-600" aria-hidden="true">
                    🤝
                    </span>
                    <p>
                    <strong className="font-semibold text-gray-900">Ayuda constructiva:</strong> Sé amable al dar feedback. Todos estamos aprendiendo. Ofrece soluciones, no solo críticas.
                    </p>
                </li>

                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white rounded-full bg-gradient-to-br from-orange-500 to-red-600" aria-hidden="true">
                    🚫
                    </span>
                    <p>
                    <strong className="font-semibold text-gray-900">Prohibido:</strong> Spam, autopromoción excesiva, contenido ilegal, plagio de código, o compartir información confidencial de empresas.
                    </p>
                </li>

                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white rounded-full bg-gradient-to-br from-yellow-500 to-amber-600" aria-hidden="true">
                    ⚡
                    </span>
                    <p>
                    <strong className="font-semibold text-gray-900">Buenas prácticas:</strong> Usa títulos descriptivos, categoriza correctamente tu discusión, busca antes de preguntar y comparte código con formato adecuado.
                    </p>
                </li>
                </ul>

                <footer className="pt-6 mt-6 text-center border-t border-indigo-100">
                <p className="text-sm font-medium text-[#4F46E5]">
                    💡 Recuerda: Somos una comunidad de aprendizaje. Tu participación ayuda a crecer a otros juniors como tú.
                </p>
                </footer>
            </section>
            </article>
        );
        }

        export default ForumRules;