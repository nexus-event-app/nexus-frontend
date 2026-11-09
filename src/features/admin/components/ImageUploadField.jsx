import { useId, useRef, useState } from 'react'
import { getErrorMessage } from '@/shared/api/ApiError'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import { useToast } from '@/shared/hooks/useToast'
import { uploadService } from '../services/uploadService'

const MAX_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export default function ImageUploadField({ label, value, onChange, error, hint }) {
  const inputId = useId()
  const errorId = useId()
  const toast = useToast()
  const [uploading, setUploading] = useState(false)
  const uploadedFileName = useRef(null)

  const discardUploaded = async () => {
    const fileName = uploadedFileName.current
    uploadedFileName.current = null
    if (!fileName) return
    try {
      await uploadService.deleteImage(fileName)
    } catch {
      return
    }
  }

  const handleFile = async (event) => {
    const input = event.target
    const file = input.files?.[0]
    input.value = ''
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Formato no admitido. Usa JPG, PNG, WebP o GIF.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error('La imagen no puede superar los 5 MB.')
      return
    }

    setUploading(true)
    try {
      await discardUploaded()
      const { imageUrl, fileName } = await uploadService.uploadImage(file)
      uploadedFileName.current = fileName
      onChange(imageUrl)
    } catch (uploadError) {
      toast.error(getErrorMessage(uploadError))
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    await discardUploaded()
    onChange('')
  }

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-ink">{label}</p>
      {value && (
        <img
          src={value}
          alt="Vista previa de la imagen seleccionada"
          width="640"
          height="360"
          decoding="async"
          className="mb-3 aspect-[16/9] w-full max-w-md rounded-control border border-slate-200 object-cover"
        />
      )}
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={inputId}
          className="btn btn-secondary cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600 has-[:focus-visible]:ring-offset-2"
        >
          <Icon name="photo" />
          {uploading ? 'Subiendo…' : value ? 'Cambiar imagen' : 'Subir imagen'}
          <input
            id={inputId}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleFile}
            disabled={uploading}
            aria-describedby={error ? errorId : undefined}
            className="sr-only"
          />
        </label>
        {value && (
          <Button variant="ghost" onClick={handleRemove} disabled={uploading}>
            Quitar imagen
          </Button>
        )}
      </div>
      <p className="mt-1.5 text-sm text-ink-muted">JPG, PNG, WebP o GIF de hasta 5 MB.{hint && ` ${hint}`}</p>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
