import { ChartType } from './dashboard.model';

/**
 * Best Selling
 */
 const BestSelling = [
  {
      image: "assets/images/products/img-1.png",
      pName: 'Branded T-Shirts',
      date: '24 Apr 2021',
      price: '29.00',
      orders: '62',
      stock: '510',
      amount: '1,798',
  },
  {
    image: "assets/images/products/img-2.png",
    pName: 'Bentwood Chair',
    date: '19 Mar 2021',
    price: '85.20',
    orders: '35',
    stock: 'Out of stock',
    amount: '2982',
  },
  {
    image: "assets/images/products/img-3.png",
    pName: 'Borosil Paper Cup',
    date: '01 Mar 2021',
    price: '14.00',
    orders: '80',
    stock: '749',
    amount: '1120',
  },
  {
    image: "assets/images/products/img-4.png",
    pName: 'One Seater Sofa',
    date: '11 Feb 2021',
    price: '127.50',
    orders: '56',
    stock: 'Out of stock',
    amount: '7140',
  },
  {
    image: "assets/images/products/img-5.png",
    pName: 'Stillbird Helmet',
    date: '17 Jan 2021',
    price: '54',
    orders: '74',
    stock: '805',
    amount: '3996',
  }
];

/**
 * Top Selleing
 */
 const TopSelling = [
    {
        image: "assets/images/companies/img-1.png",
        pName: 'iTest Factory',
        subtitle: 'Oliver Tyler',
        type: 'Bags and Wallets',
        stock: '8547',
        amount: '541200',
        percentage: '32',
    },
    {
      image: "assets/images/companies/img-2.png",
      pName: 'Digitech Galaxy',
      subtitle: 'John Roberts',
      type: 'Watches',
      stock: '895',
      amount: '75030',
      percentage: '79',
    },
    {
      image: "assets/images/companies/img-3.png",
      pName: 'Nesta Technologies',
      subtitle: 'Harley Fuller',
      type: 'Bike Accessories',
      stock: '3470',
      amount: '45600',
      percentage: '90',
    },
    {
      image: "assets/images/companies/img-4.png",
      pName: 'Zoetic Fashion',
      subtitle: 'James Bowen',
      type: 'Clothes',
      stock: '5488',
      amount: '29456',
      percentage: '40',
    },
    {
      image: "assets/images/companies/img-5.png",
      pName: 'Meta4Systems',
      subtitle: 'Zoe Dennis',
      type: 'Furniture',
      stock: '4100',
      amount: '11260',
      percentage: '57',
    }
];

/**
 * Recent Selleing
 */
 const RecentSelling = [
    {
        id: "D2112",
        image: "assets/images/users/avatar-1.jpg",
        customer: 'Abidjan',
        product: '405556',
        amount: '3.509.000',
        vendor: '20.000',
        average: "61",
        status: 'Haut',
        rating: '5.0',
        
    },
    {
        id: "D2111",
        image: "assets/images/users/avatar-2.jpg",
        customer: 'Centre',
        product: '296110',
        amount: '1.491.000',
        vendor: '13.000',
        average: "61",
        status: 'Moyen',
        rating: '4.5',
    },
    {
        id: "D2109",
        image: "assets/images/users/avatar-3.jpg",
        customer: 'Ouest',
        product: '250000',
        amount: '2.415.000',
        vendor: '11.000',
        average: "89",
        status: 'Haut',
        rating: '4.9'
        
    },    
    {
        id: "D2108",
        image: "assets/images/users/avatar-4.jpg",
        customer: 'Nord',
        product: '354477',
        amount: '1.997.000',
        vendor: '9.000',
        average: "47",
        status: 'Bas',
        rating: '4.3',
        
    },   
    {
        id: "D2107",
        image: "assets/images/users/avatar-6.jpg",
        customer: 'Est',
        product: '150000',
        amount: '2.300.000',
        vendor: '10.000',
        average: "161",
        status: 'Haut',
        rating: '4.7',
        
    } 
];

/**
 * Stat Counder Data
 */
 const statData = [{
      title: 'SUIVI ABONNES',
      value: 'Chargement ...',
      icon: 'bx-user-circle',
      persantage: '16.24',
      profit: 'up',
      link: {
        text: 'voir plus',
        url: '/abonne'
      }
    }, {
        title: 'SUIVI ENERGIE',
        value: 'Chargement ...',
        icon: 'bx bxs-bolt-circle',
        persantage: '3.57',
        profit: 'down',
        link: {
          text: 'voir plus',
          url: '/energie'
        }
    }, {
        title: 'SUIVI REVENUS',
        value: 'Chargement ...',
        icon: 'bx-dollar-circle',
        persantage: '29.08',
        profit: 'up',
        link: {
          text: 'voir plus',
          url: '/revenu'
        }    
      }, {
        title: 'SUIVI SOLLICITATION',
        value: 'Chargement ...',
        icon: 'bx bx-support',
        persantage: '24.00',
        profit: 'equal',
        link: {
          text: 'voir plus',
          url: '/sollicitation'
        }    }
];
  

export {BestSelling, TopSelling, RecentSelling, statData };
