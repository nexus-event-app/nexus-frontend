export function isExpired(job) {
  return Boolean(job.expiresAt) && new Date(job.expiresAt).getTime() < Date.now()
}

export function postedAt(job) {
  return job.publishedAt || job.createdAt
}
