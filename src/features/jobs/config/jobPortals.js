/**
 * Portales de empleo de España con búsquedas ya filtradas por tecnología y perfiles junior.
 * Las direcciones se han comprobado a mano; si un portal cambia su formato, basta con actualizar su `url`.
 * La descripción de cada uno está en las traducciones: jobs.portals.<id>.
 */
export const JOB_PORTALS = [
  {
    id: 'infojobs',
    name: 'InfoJobs',
    url: 'https://www.infojobs.net/jobsearch/search-results/list.xhtml?keyword=desarrollador%20junior',
  },
  { id: 'tecnoempleo', name: 'Tecnoempleo', url: 'https://www.tecnoempleo.com/ofertas-trabajo/?te=junior' },
  {
    id: 'linkedin',
    name: 'LinkedIn Empleos',
    url: 'https://www.linkedin.com/jobs/search/?keywords=desarrollador&location=Espa%C3%B1a&f_E=1%2C2',
  },
  { id: 'indeed', name: 'Indeed', url: 'https://es.indeed.com/jobs?q=desarrollador+junior&l=Espa%C3%B1a' },
  { id: 'adzuna', name: 'Adzuna', url: 'https://www.adzuna.es/search?q=desarrollador%20junior' },
  { id: 'primerempleo', name: 'Primer Empleo', url: 'https://www.primerempleo.com/ofertas/empleo-informatica' },
  {
    id: 'welcometothejungle',
    name: 'Welcome to the Jungle',
    url: 'https://www.welcometothejungle.com/es/jobs?query=developer%20junior',
  },
  { id: 'manfred', name: 'Manfred', url: 'https://www.getmanfred.com/ofertas-empleo' },
]
