import fs from 'fs';
import path from 'path';
import {
  doctorProfile as defaultProfile,
  clinicHours as defaultHours,
  servicesData as defaultServices,
  procedureArticles as defaultArticles,
  galleryItems as defaultGallery,
  reviewsData as defaultReviews,
  faqsData as defaultFaqs,
} from '../src/data/doctorData';
import { DoctorProfile, ServiceItem, ProcedureArticle, GalleryItem, ReviewItem, FaqItem } from '../src/types';

export interface AppointmentRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  phoneNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
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

export interface DbData {
  doctorProfile: DoctorProfile;
  clinicHours: typeof defaultHours;
  services: ServiceItem[];
  articles: ProcedureArticle[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  faqs: FaqItem[];
  appointments: AppointmentRecord[];
  settings: SiteSettings;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

const initialDb: DbData = {
  doctorProfile: { ...defaultProfile },
  clinicHours: [...defaultHours],
  services: [...defaultServices],
  articles: [...defaultArticles],
  gallery: [...defaultGallery],
  reviews: [...defaultReviews],
  faqs: [...defaultFaqs],
  appointments: [
    {
      id: 'apt-sample-1',
      referenceCode: 'SH-84920',
      fullName: 'مریم رضایی',
      phoneNumber: '09121234567',
      service: 'ایمپلنت دیجیتال',
      preferredDate: '۱۴۰۳/۰۶/۲۰',
      preferredTime: 'عصر (۱۶ الی ۱۸)',
      notes: 'مشاوره جهت کاشت دو واحد ایمپلنت فک بالا',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      adminNotes: 'تماس گرفته شد و ساعت ۱۷:۰۰ هماهنگ شد.'
    },
    {
      id: 'apt-sample-2',
      referenceCode: 'SH-51209',
      fullName: 'امیرحسین کاظمی',
      phoneNumber: '09359876543',
      service: 'جراحی فک و صورت',
      preferredDate: '۱۴۰۳/۰۶/۲۵',
      preferredTime: 'عصر (۱۸ الی ۲۰)',
      notes: 'معاینه ارتوگناتیک',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ],
  settings: {
    announcement: {
      enabled: false,
      text: 'مطب در روزهای پنجشنبه و جمعه پذیرای بیماران با هماهنگی قبلی می‌باشد.',
      type: 'gold'
    },
    siteTitle: 'مطب دکتر اکبر شهیدی پیام',
    metaDescription: 'متخصص جراحی دهان، فک و صورت و ایمپلنتولوژیست'
  }
};

class Store {
  private data: DbData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DbData {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        return {
          ...initialDb,
          ...parsed,
          doctorProfile: { ...initialDb.doctorProfile, ...(parsed.doctorProfile || {}) }
        };
      }
    } catch (err) {
      console.error('Failed to read db.json, using default seed data:', err);
    }
    this.saveData(initialDb);
    return initialDb;
  }

  private saveData(dataToSave: DbData) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save to db.json:', err);
    }
  }

  public getData(): DbData {
    return this.data;
  }

  public updateData(updater: (current: DbData) => void): DbData {
    updater(this.data);
    this.saveData(this.data);
    return this.data;
  }
}

export const dbStore = new Store();
