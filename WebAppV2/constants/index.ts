import { SuggestionData } from "@/components/CustomInputDropdown"
import { lengthValidator } from "@/components/Form/validators"
export const PROJECTS = [
  {
    title: 'Arbswap',
    date: 'OCTOBER 2023',
    image: '/projects/arbswap.jpeg'
  },
  {
    title: 'Nexbridge',
    date: 'OCTOBER 2023',
    image: '/projects/nexbridge.jpeg'
  }
]


export const CREW = [
  {
    name: 'Dogukan Ali Gundogan',
    profileImage: '/team/dogukan.jpeg',
    job: 'Co-Founder ',
    icon1: '/img/fa-twitter.svg',
    icon2: '/img/fa-facebook-square.svg',
    icon3: '/img/fa-instagram.svg'
  },
  {
    name: 'Cem Denizsel',
    profileImage: '/team/cem.JPG',
    job: 'Co-Founder',
    icon1: '/img/fa-twitter.svg',
    icon2: '/img/fa-facebook-square.svg',
    icon3: '/img/fa-instagram.svg'
  },
  {
    name: 'Bersu Varol',
    profileImage: '/team/bersu.jpeg',
    job: 'UI Designer',
    icon1: '/img/fa-twitter.svg',
    icon2: '/img/fa-facebook-square.svg',
    icon3: '/img/fa-instagram.svg'
  },
]


export const FooterSocials = [
  {
    svg: '/img/Facebook.svg'
  },
  { svg: '/img/Twitter.svg' },
  { svg: '/img/Instagram.svg' },
  { svg: '/img/Linkedin.svg' },
  { svg: '/img/YouTube.svg' }
]

export const OfferListing = [
  {
    id: 1,
    seller: {
      name: 'Seller1',
      star: 2.3
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '823.4567 SOL',
    price: '$712,31'
  },
  {
    id: 2,
    seller: {
      name: 'Seller2',
      star: 4.9
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'DECLINED'
    },
    amount: '421.7891 SOL',
    price: '$1566,42'
  },
  {
    id: 3,
    seller: {
      name: 'Seller3',
      star: 3.7
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '987.6543 SOL',
    price: '$899,18'
  },
  {
    id: 4,
    seller: {
      name: 'Seller4',
      star: 1.5
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '123.4567 SOL',
    price: '$432,56'
  },
  {
    id: 5,
    seller: {
      name: 'Seller5',
      star: 4.2
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'DECLINED'
    },
    amount: '567.8901 SOL',
    price: '$789,23'
  },
  {
    id: 6,
    seller: {
      name: 'Seller6',
      star: 2.8
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '234.5678 SOL',
    price: '$1234,56'
  },
  {
    id: 7,
    seller: {
      name: 'Seller7',
      star: 4.0
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'DECLINED'
    },
    amount: '876.5432 SOL',
    price: '$165,42'
  },
  {
    id: 8,
    seller: {
      name: 'Seller8',
      star: 1.9
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '345.6789 SOL',
    price: '$1098,76'
  },
  {
    id: 9,
    seller: {
      name: 'Seller9',
      star: 3.5
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'DECLINED'
    },
    amount: '901.2345 SOL',
    price: '$543,21'
  },
  {
    id: 10,
    seller: {
      name: 'Seller10',
      star: 4.7
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '678.9012 SOL',
    price: '$76,54'
  }
] as const

export const links = [
  {
    id: 1,
    link: 'About Us',
    href: 'about'
  },
  {
    id: 2,
    link: 'Our Team',
    href: 'team'
  },
  {
    id: 3,
    link: 'Contact',
    href: 'contact'
  },
  {
    id: 4,
    link: 'Solana',
    href: 'solana'
  },
  {
    id: 5,
    link: 'Near',
    href: 'near'
  },
  {
    id: 6,
    link: 'Join Us',
    href: 'join'
  }
]

export const packages = [
  {
    title: 'STARTER',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Limited access',
      'Starter support'
    ],
    price: '9.50'
  },
  {
    title: 'MEDIUM',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      'Priority support'
    ],
    price: '19.50'
  },
  {
    title: 'PRO',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Premium support'
    ],
    price: '29.50'
  }
]

export const arbswapNavbarLinks = [
  {
    id: 3,
    link: 'Support',
    href: 'arbswap/support'
  },
  {
    id: 4,
    link: 'NexBridge',
    href: 'nexbridge'
  }
] as const

type FormFieldConfig = {
  type: 'textfield' | 'checkbox' | 'select' | 'button'; // Add more types as needed
  tooltip: string;
  key: string;
  isPassword?: boolean;
  name: string;
  value?: string;
  placeholder: string;
  label: string;
  validator: (value: string) => string | false;
  options?: SuggestionData[]; // For select type
};

export type ArbswapModalButtonType = {
  text: string;
  form: FormFieldConfig[];
}

export const arbswapModalButtons:ArbswapModalButtonType[] = [
  {
    text: 'Login',
    form:[
      {
        type: 'textfield',
        tooltip: 'Enter your email.',
        key: 'email',
        name: 'email',
        value: '',
        placeholder: '',
        label: 'Email',
        validator: (v) => lengthValidator(v, 5, 20, 'Email'),
      },
      {
        type: 'textfield',
        tooltip: 'Enter your password.',
        key: 'password',
        name: 'password',
        isPassword: true,
        value: '',
        placeholder: '',
        label: 'Password',
        validator: (v) => lengthValidator(v, 5, 20, 'Email'),
      },
    ]
  },
  {
    text: 'Register',
    form:[
      {
        type: 'textfield',
        tooltip: 'Enter your email.',
        key: 'email',
        name: 'email',
        value: '',
        placeholder: '',
        label: 'Email',
        validator: (v) => lengthValidator(v, 5, 20, 'Email'),
      },
      {
        type: 'textfield',
        tooltip: 'Enter your password.',
        key: 'password',
        name: 'password',
        isPassword: true,
        value: '',
        placeholder: '',
        label: 'Password',
        validator: (v) => lengthValidator(v, 5, 20, 'Email'),
      },
      {
        type: 'textfield',
        tooltip: 'Confirm your password.',
        key: 'password',
        name: 'password',
        isPassword: true,
        value: '',
        placeholder: '',
        label: 'Password',
        validator: (v) => lengthValidator(v, 5, 20, 'Password'),
      },
    ]
  }
]
