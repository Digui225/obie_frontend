import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'Accueil',
    link: '/dashboard',
    icon: 'ri-home-3-line',
  },
  {
    id: 3,
    label: "Les Domaines d'affaires",
    icon: 'bx bx-briefcase',
  },

        {
          id: 4,
          label: 'Suivi abonné',
          link: '/abonne',
          icon: 'bx bx-user-circle',
          className: 'suivi-item' // Ajoute cette ligne
        

        },
        {
          id: 5,
          label: 'Suivi énergie',
          link: '/energie',
          icon: 'ri-flashlight-line',
          className: 'suivi-item' // Ajoute cette ligne


        },  
        {
          id: 6,
          label: 'Suivi revenus',
          link: '/revenu',
          icon: 'bx bx-dollar-circle',
          className: 'suivi-item' // Ajoute cette ligne


        },
        {
          id: 7,
          label: 'Suivi sollicitations',
          link: '/sollicitation',
          icon: 'ri-customer-service-2-fill',
          className: 'suivi-item' // Ajoute cette ligne

        
        },
      {
    id: 4,
    label: "Creation de graphes",
    link: 'creation',
    icon: 'bx bx-scatter-chart',
  },
  
]
  
