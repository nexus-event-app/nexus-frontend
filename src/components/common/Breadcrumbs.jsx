    import React from 'react';
    import { Link } from 'react-router-dom';

    function Breadcrumbs({ items }) {
    return (
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-gray-600">
            {items.map((item, index) => (
            <React.Fragment key={index}>
                {index > 0 && <li aria-hidden="true">/</li>}
                <li>
                {item.href ? (
                    <Link to={item.href} className="transition hover:text-indigo-600">
                    {item.label}
                    </Link>
                ) : (
                    <span className="text-gray-900 line-clamp-1">{item.label}</span>
                )}
                </li>
            </React.Fragment>
            ))}
        </ol>
        </nav>
    );
    }

    export default Breadcrumbs;