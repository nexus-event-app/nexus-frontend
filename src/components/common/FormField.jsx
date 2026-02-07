import React from 'react';

function FormField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder = '',
    rows = 3,
    checked
}) {
    const baseInputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

    if (type === 'checkbox') {
        return (
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">
                    {label}
                </span>
            </label>
        );
    }

    if (type === 'textarea') {
        return (
            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    {label} {required && '*'}
                </span>
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={rows}
                    className={baseInputClass}
                    placeholder={placeholder}
                />
            </label>
        );
    }

    return (
        <label className="block">
            <span className="block mb-1 font-medium text-gray-700">
                {label} {required && '*'}
            </span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={baseInputClass}
                placeholder={placeholder}
            />
        </label>
    );
}

export default FormField;