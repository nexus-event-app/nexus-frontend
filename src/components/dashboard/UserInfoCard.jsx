import React from 'react';

function UserInfoCard({ user }) {
    return (
        <section className="p-6 mt-8 border border-blue-100 bg-blue-50 rounded-xl">
            <h2 className="mb-3 text-lg font-bold text-gray-900">
                Tu Información
            </h2>
            <dl className="space-y-2">
                <dt className="text-sm text-gray-600">Email:</dt>
                <dd className="font-medium text-gray-900">{user?.email}</dd>
                <dt className="text-sm text-gray-600">Rol:</dt>
                <dd className="font-medium text-gray-900">{user?.role}</dd>
                <dt className="text-sm text-gray-600">Cuenta creada:</dt>
                <dd className="font-medium text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                </dd>
            </dl>
        </section>
    );
}

export default UserInfoCard;