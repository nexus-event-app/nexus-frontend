import { useId, useRef, useState } from 'react'
import { getErrorMessage } from '@/shared/api/ApiError'
import Avatar from '@/shared/components/Avatar'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { profileService } from '../services/profileService'
import { resizeToSquareJpeg } from '../utils/resizeImage'

/** Fotos de hasta 20 MB (las del móvil pesan mucho); se reducen en el navegador antes de subirlas. */
const MAX_FILE_BYTES = 20 * 1024 * 1024

/** Foto de perfil: se sube o se quita al momento, sin esperar a guardar el resto del formulario. */
export default function AvatarField({ name, avatarUrl, onChange }) {
  const { t } = useI18n()
  const toast = useToast()
  const inputId = useId()
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error(t('profile.edit.photoNotImage'))
      return
    }
    if (file.size > MAX_FILE_BYTES) {
      toast.error(t('profile.edit.photoTooLarge'))
      return
    }
    setBusy(true)
    try {
      let resized
      try {
        resized = await resizeToSquareJpeg(file)
      } catch {
        toast.error(t('profile.edit.photoUnreadable'))
        return
      }
      setPreview(resized.preview)
      onChange(await profileService.uploadAvatar(resized.blob))
      toast.success(t('profile.edit.photoSaved'))
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setPreview(null)
      setBusy(false)
    }
  }

  const handleRemove = async () => {
    setBusy(true)
    try {
      onChange(await profileService.removeAvatar())
      toast.info(t('profile.edit.photoRemoved'))
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setBusy(false)
    }
  }

  return (
    <fieldset className="flex flex-col items-start gap-4 sm:flex-row sm:items-center" aria-busy={busy}>
      <legend className="mb-3 text-sm font-semibold text-ink">{t('profile.edit.photo')}</legend>
      <Avatar name={name} src={preview ?? avatarUrl} size="xl" className={busy ? 'opacity-60' : undefined} />
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
          <Button variant="secondary" size="sm" loading={busy} onClick={() => inputRef.current?.click()}>
            <Icon name="camera" className="h-4 w-4" />
            {avatarUrl ? t('profile.edit.photoChange') : t('profile.edit.photoUpload')}
          </Button>
          {avatarUrl && (
            <Button variant="ghost" size="sm" disabled={busy} onClick={handleRemove}>
              <Icon name="trash" className="h-4 w-4" />
              {t('profile.edit.photoRemove')}
            </Button>
          )}
        </div>
        <p className="max-w-sm text-sm text-ink-muted">{t('profile.edit.photoHint')}</p>
      </div>
    </fieldset>
  )
}
