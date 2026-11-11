import { describe, expect, it } from 'vitest'
import messages from '@/shared/i18n/messages'
import { findLearningPath, LEARNING_PATHS, RESOURCES_REVIEWED_AT } from './learningPaths'

// Mismo formato que valida el backend (LearningProgressServiceImpl): si no, el progreso no se podría guardar.
const ID = /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/

describe('rutas de aprendizaje', () => {
  it('tienen identificadores válidos y sin repetir', () => {
    const ids = LEARNING_PATHS.map((path) => path.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const path of LEARNING_PATHS) {
      expect(path.id).toMatch(ID)
      const stepIds = path.steps.map((step) => step.id)
      expect(new Set(stepIds).size).toBe(stepIds.length)
      stepIds.forEach((id) => expect(id).toMatch(ID))
    }
  })

  it.each(['es', 'ca', 'en'])('tienen todos sus textos en «%s»', (lang) => {
    const learning = messages[lang].learning
    for (const path of LEARNING_PATHS) {
      for (const field of ['name', 'tagline', 'audience', 'duration', 'description']) {
        expect(learning.paths[path.id]?.[field], `${path.id}.${field}`).toBeTruthy()
      }
      for (const step of path.steps) {
        for (const field of ['title', 'text', 'project']) {
          expect(learning.steps[path.id]?.[step.id]?.[field], `${path.id}.${step.id}.${field}`).toBeTruthy()
        }
      }
    }
  })

  it('solo enlazan a recursos https con nombre, autoría e idioma', () => {
    for (const path of LEARNING_PATHS) {
      for (const step of path.steps) {
        expect(step.resources.length, `${path.id}.${step.id}`).toBeGreaterThan(0)
        for (const resource of step.resources) {
          expect(new URL(resource.url).protocol).toBe('https:')
          expect(resource.name).toBeTruthy()
          expect(resource.provider).toBeTruthy()
          expect(['es', 'en']).toContain(resource.lang)
        }
      }
    }
  })

  it('indican cuándo se revisaron los enlaces', () => {
    expect(Number.isNaN(new Date(RESOURCES_REVIEWED_AT).getTime())).toBe(false)
  })

  it('se encuentran por su dirección traducida o por su identificador', () => {
    expect(findLearningPath('data', 'en')?.id).toBe('datos')
    expect(findLearningPath('dades', 'ca')?.id).toBe('datos')
    expect(findLearningPath('datos', 'en')?.id).toBe('datos')
    expect(findLearningPath('frontend', 'es')?.id).toBe('frontend')
    expect(findLearningPath('no-existe', 'es')).toBeNull()
  })
})
