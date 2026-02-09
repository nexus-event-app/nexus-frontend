import React, { useState } from 'react';
import uploadService from '../../services/uploadService';

function ImageUpload({ imageUrl, onImageChange, onImageRemove }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(imageUrl || null);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen no debe superar 5MB');
            return;
        }

        try {
            setUploading(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            const response = await uploadService.uploadNewsImage(file);
            onImageChange(response.imageUrl, response.fileName);

        } catch (error) {
            console.error('Error al subir imagen:', error);
            alert('Error al subir la imagen');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onImageRemove();
    };

    return (
        <section className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 sm:text-base">
                Imagen destacada
            </label>

            {preview ? (
                <section className="space-y-3">
                    <figure className="relative m-0">
                        <img
                            src={preview}
                            alt="Preview"
                            className="object-cover w-full h-48 border border-gray-300 rounded-lg sm:h-64"
                        />
                    </figure>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="px-4 py-2 text-sm font-medium text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Eliminar imagen
                    </button>
                </section>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 transition border-2 border-gray-300 border-dashed rounded-lg cursor-pointer sm:h-64 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                    <section className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <svg
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click para subir</span> o arrastra una imagen
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                    </section>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={uploading}
                        aria-label="Subir imagen"
                    />
                </label>
            )}

            {uploading && (
                <p className="text-sm text-gray-600">Subiendo imagen...</p>
            )}
        </section>
    );
}

export default ImageUpload;
