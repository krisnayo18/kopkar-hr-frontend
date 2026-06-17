export const hrEndpoints = {
  departments: {
    list: '/departments',
    detail: (id: string) => `/departments/${id}`,
  },
  employees: {
    list: '/employees',
    detail: (id: string) => `/employees/${id}`,
  },
  positions: {
    list: '/positions',
    detail: (id: string) => `/positions/${id}`,
  },
  contracts: {
    list: '/contracts',
    detail: (id: string) => `/contracts/${id}`,
  },
  inssurances: {
    list: '/inssurances',
    detail: (id: string) => `/insurances/${id}`,
  },
  assurances: {
    list: '/assurances',
    detail: (id: string) => `/assurances/${id}`,
  },
  disciplinaries: {
    list: '/disciplinaries',
    detail: (id: string) => `/disciplinaries/${id}`,
  },
  incidents: {
    list: '/incidents',
    detail: (id: string) => `/incidents/${id}`,
  },
  recruitments: {
    list: '/recruitments',
    detail: (id: string) => `/recruitments/${id}`,
  },
} as const;
