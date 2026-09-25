export interface NavDropdownItem {
  label: string;
  path: string;
  description: string;
  tag: string;
  tagColor: string;
  icon: string;
  iconColor: string;
  image?: string;
  badge?: string;
}

export interface NavDropdownConfig {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  headerIcon?: string;
  headerGradient?: string;
  footerText?: string;
  footerHighlight?: string;
  footerIcon?: string;
  columns?: 1 | 2;
  items: NavDropdownItem[];
  featuredCard?: {
    title: string;
    description: string;
    tag: string;
    path: string;
    image: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  isNewBadge?: boolean;
  dropdown?: NavDropdownConfig;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  {
    id: 'shop',
    label: 'Shop Weaves',
    path: '/shop',
    dropdown: {
      id: 'shop-dropdown',
      title: 'Artisanal Weave Categories',
      badge: '100% Authentic GI',
      headerIcon: 'palette',
      headerGradient: 'from-[#51071D] via-[#6B0D28] to-[#51071D]',
      footerText: 'Certified GI Pit-Loom Weaves',
      footerHighlight: 'Direct Salem Looms',
      footerIcon: 'verified',
      columns: 2,
      items: [
        {
          label: 'Shop All Sarees',
          path: '/shop',
          description: 'Complete 18+ heirloom catalogue',
          tag: 'All Weaves',
          tagColor: 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]',
          icon: 'auto_awesome_mosaic',
          iconColor: 'text-[#4338CA]',
        },
        {
          label: 'Kanchipuram Silk',
          path: '/shop?category=Kanchipuram%20Silk',
          description: 'Pure Mulberry silk & Korvai zari',
          tag: 'Pure Zari',
          tagColor: 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]',
          icon: 'diamond',
          iconColor: 'text-[#BE123C]',
        },
        {
          label: 'Soft Silk',
          path: '/shop?category=Soft%20Silk',
          description: 'Featherlight drape & pastel lustre',
          tag: 'Featherlight',
          tagColor: 'bg-[#FDF2F8] text-[#9D174D] border-[#FBCFE8]',
          icon: 'filter_vintage',
          iconColor: 'text-[#BE185D]',
        },
        {
          label: 'Bridal Pattu',
          path: '/shop?category=Bridal%20Pattu',
          description: 'Grand wedding heirlooms with gold brocade',
          tag: 'Muhurtham',
          tagColor: 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]',
          icon: 'workspace_premium',
          iconColor: 'text-[#B45309]',
        },
        {
          label: 'Traditional Cotton',
          path: '/shop?category=Traditional%20Cotton',
          description: 'Salem 80s count & Madurai Sungudi',
          tag: 'Breathable',
          tagColor: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
          icon: 'spa',
          iconColor: 'text-[#047857]',
        },
        {
          label: 'Organza & Tussar',
          path: '/shop?category=Organza%20Tussar',
          description: 'Ethereal tissue sheer & raw wild silks',
          tag: 'Modern Luxe',
          tagColor: 'bg-[#FFF7ED] text-[#9A3412] border-[#FED7AA]',
          icon: 'grain',
          iconColor: 'text-[#EA580C]',
        },
      ],
      featuredCard: {
        title: 'Master Weaver Series',
        description: 'Korvai interlocking handloom by Thiru S. Devarajan',
        tag: 'Heritage Cut',
        path: '/shop?category=Bridal%20Pattu',
        image: 'https://images.unsplash.com/photo-1610030469668-9655ecf36dfa?q=80&w=600&auto=format&fit=crop',
      },
    },
  },
  {
    id: 'collections',
    label: 'Curated Collections',
    path: '/shop?category=Bridal%20Pattu',
    dropdown: {
      id: 'collections-dropdown',
      title: 'Curated Celebratory Edits',
      badge: 'Bridal & Festive',
      headerIcon: 'auto_awesome',
      headerGradient: 'from-[#701026] via-[#851833] to-[#701026]',
      footerText: 'Bridal Muhurtham & Puja Special',
      footerHighlight: 'Gold Zari Brocades',
      footerIcon: 'stars',
      columns: 2,
      items: [
        {
          label: 'Wedding Trousseau',
          path: '/shop?category=Bridal%20Pattu',
          description: 'Grand bridal pattu with gold tissue & temple motifs',
          tag: 'Bridal Heirloom',
          tagColor: 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]',
          icon: 'favorite',
          iconColor: 'text-[#B45309]',
        },
        {
          label: 'Festive Celebrations',
          path: '/shop?category=Festive%20Edit',
          description: 'Celebratory weaves, dual-tones & rich contrasts',
          tag: 'Celebration',
          tagColor: 'bg-[#FFF7ED] text-[#9A3412] border-[#FED7AA]',
          icon: 'celebration',
          iconColor: 'text-[#C2410C]',
        },
        {
          label: 'Reception & Cocktail',
          path: '/shop?category=Organza%20Tussar',
          description: 'Pastel champagne tissue & airy sheer drapery',
          tag: 'Evening Glow',
          tagColor: 'bg-[#FDF2F8] text-[#9D174D] border-[#FBCFE8]',
          icon: 'local_bar',
          iconColor: 'text-[#9D174D]',
        },
        {
          label: 'Puja & Daily Grace',
          path: '/shop?category=Traditional%20Cotton',
          description: 'Pure 100s count Salem cotton & temple borders',
          tag: 'Natural Comfort',
          tagColor: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
          icon: 'temple_hindu',
          iconColor: 'text-[#047857]',
        },
      ],
      featuredCard: {
        title: 'Kalyana Vermillion',
        description: '4-Ply Pure Mulberry Silk with Gold Coin Buttas',
        tag: 'Muhurtham Pick',
        path: '/product/kalyana-vermillion-bridal-pattu',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
      },
    },
  },
  {
    id: 'new-arrivals',
    label: 'New Drops',
    path: '/shop?filter=new',
    isNewBadge: true,
  },
];
