export interface DoctorProfile {
  name: string;
  title: string;
  specialty: string;
  subSpecialty: string;
  experienceYears: number;
  boardCertification: string;
  academicRole: string;
  bio: string[];
  motto: string;
  clinicAddress: string;
  phoneLandline: string;
  phoneMobile: string;
  email: string;
  instagram: string;
  whatsappNumber: string;
  neshanMapUrl: string;
  googleMapUrl: string;
  logoUrl?: string;
  doctorPhotoUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  image: string;
  slug: string;
  highlights: string[];
}

export interface ProcedureArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  readTime: string;
  heroImage: string;
  imageCaption?: string;
  summary: string;
  sections: {
    title: string;
    paragraphs?: string[];
    listItems?: {
      title?: string;
      desc: string;
    }[];
    steps?: {
      stepNum: number;
      title: string;
      desc: string;
    }[];
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'implant' | 'jaw' | 'sinus' | 'clinic';
  categoryLabel: string;
  type: 'before-after' | 'single';
  beforeUrl?: string;
  afterUrl?: string;
  imageUrl?: string;
  description?: string;
}

export interface ReviewItem {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface AppointmentFormData {
  fullName: string;
  phoneNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface AppointmentRecord extends AppointmentFormData {
  id: string;
  referenceCode: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  adminNotes?: string;
}

export interface SiteSettings {
  announcement?: {
    enabled: boolean;
    text: string;
    type: 'info' | 'warning' | 'gold';
  };
  siteTitle: string;
  metaDescription: string;
}
