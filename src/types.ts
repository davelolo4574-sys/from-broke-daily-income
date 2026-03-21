export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  features: string[];
  ctaText: string;
  status: 'active' | 'draft';
  createdAt: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  category: string;
  status: 'published' | 'draft';
  createdAt: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  productId: string;
  amount: number;
  status: 'verifying' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
}

export interface SiteConfig {
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
}
