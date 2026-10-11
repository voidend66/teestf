import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { dbStore, AppointmentRecord } from './server/store';

const DEFAULT_API_KEY = process.env.ADMIN_API_KEY || 'dr-shahidi-key-2026';

function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const headerKey = req.headers['x-api-key'] || (req.headers.authorization?.replace(/^Bearer\s+/i, ''));
  if (headerKey && headerKey === DEFAULT_API_KEY) {
    return next();
  }
  // Allow development bypass if header is missing during initial local testing, or respond 401 with helpful instructions
  if (!headerKey) {
    res.status(401).json({
      success: false,
      message: 'کلید احراز هویت (x-api-key) ارسال نشده است.',
      help: 'در هدر درخواست خود کلید x-api-key: dr-shahidi-key-2026 یا مقدار متغیر ADMIN_API_KEY را ارسال نمایید.'
    });
    return;
  }
  res.status(403).json({
    success: false,
    message: 'کلید احراز هویت نامعتبر است.'
  });
}

async function startServer() {
  const app = express();
  // Support dynamic port configuration (e.g. PORT=8088 or container default 3000)
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Global Middlewares
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
  }));
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // ==========================================
  // 1. SYSTEM & HEALTH
  // ==========================================
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      site: 'Dr. Akbar Shahidi Peyam Website & API',
      version: '1.0.0'
    });
  });

  // ==========================================
  // 2. FULL SITE BUNDLE (For initial frontend hydration)
  // ==========================================
  app.get('/api/all', (req, res) => {
    const data = dbStore.getData();
    res.json({
      success: true,
      data: {
        doctorProfile: data.doctorProfile,
        clinicHours: data.clinicHours,
        services: data.services,
        articles: data.articles,
        gallery: data.gallery,
        reviews: data.reviews,
        faqs: data.faqs,
        settings: data.settings,
        stats: {
          totalArticles: data.articles.length,
          totalServices: data.services.length,
          totalGallery: data.gallery.length,
          totalReviews: data.reviews.length,
          totalAppointments: data.appointments.length
        }
      }
    });
  });

  // ==========================================
  // 3. STATS & OVERVIEW FOR ADMIN PANEL
  // ==========================================
  app.get('/api/stats', (req, res) => {
    const data = dbStore.getData();
    const pendingAppointments = data.appointments.filter(a => a.status === 'pending').length;
    const confirmedAppointments = data.appointments.filter(a => a.status === 'confirmed').length;

    res.json({
      success: true,
      data: {
        articlesCount: data.articles.length,
        servicesCount: data.services.length,
        galleryCount: data.gallery.length,
        reviewsCount: data.reviews.length,
        faqsCount: data.faqs.length,
        appointments: {
          total: data.appointments.length,
          pending: pendingAppointments,
          confirmed: confirmedAppointments
        }
      }
    });
  });

  // ==========================================
  // 4. DOCTOR PROFILE & CLINIC INFO
  // ==========================================
  app.get('/api/doctor', (req, res) => {
    res.json({ success: true, data: dbStore.getData().doctorProfile });
  });

  app.put('/api/doctor', requireApiKey, (req, res) => {
    const updates = req.body;
    const updated = dbStore.updateData(data => {
      data.doctorProfile = { ...data.doctorProfile, ...updates };
    });
    res.json({
      success: true,
      message: 'مشخصات و اطلاعات مطب دکتر با موفقیت به‌روزرسانی شد.',
      data: updated.doctorProfile
    });
  });

  // Clinic working hours
  app.get('/api/clinic-hours', (req, res) => {
    res.json({ success: true, data: dbStore.getData().clinicHours });
  });

  app.put('/api/clinic-hours', requireApiKey, (req, res) => {
    const newHours = req.body;
    if (!Array.isArray(newHours)) {
      res.status(400).json({ success: false, message: 'اطلاعات ساعات کاری باید آرایه‌ای از روزها و ساعت‌ها باشد.' });
      return;
    }
    const updated = dbStore.updateData(data => {
      data.clinicHours = newHours;
    });
    res.json({ success: true, message: 'ساعات کاری مطب به‌روزرسانی شد.', data: updated.clinicHours });
  });

  // ==========================================
  // 5. ARTICLES & BLOG MANAGEMENT
  // ==========================================
  app.get('/api/articles', (req, res) => {
    const { category, search } = req.query;
    let articles = dbStore.getData().articles;

    if (category && typeof category === 'string' && category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: articles.length, data: articles });
  });

  app.get('/api/articles/:idOrSlug', (req, res) => {
    const { idOrSlug } = req.params;
    const article = dbStore.getData().articles.find(a => a.id === idOrSlug || a.slug === idOrSlug);
    if (!article) {
      res.status(404).json({ success: false, message: 'مقاله مورد نظر یافت نشد.' });
      return;
    }
    res.json({ success: true, data: article });
  });

  app.post('/api/articles', requireApiKey, (req, res) => {
    const { title, summary, category, heroImage, sections, slug, readTime } = req.body;
    if (!title || !summary) {
      res.status(400).json({ success: false, message: 'عنوان و خلاصه مقاله الزامی است.' });
      return;
    }

    const newArticle = {
      id: req.body.id || `art-${Date.now()}`,
      slug: slug || `article-${Date.now()}`,
      title,
      category: category || 'جراحی و ایمپلنت',
      publishDate: req.body.publishDate || new Intl.DateTimeFormat('fa-IR').format(new Date()),
      readTime: readTime || '۴ دقیقه مطالعه',
      heroImage: heroImage || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      imageCaption: req.body.imageCaption || '',
      summary,
      sections: sections && Array.isArray(sections) ? sections : [
        {
          title: 'توضیحات تکمیلی',
          paragraphs: [summary]
        }
      ]
    };

    const updated = dbStore.updateData(data => {
      data.articles.unshift(newArticle);
    });

    res.status(201).json({
      success: true,
      message: 'مقاله جدید با موفقیت ایجاد شد.',
      data: newArticle
    });
  });

  app.put('/api/articles/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    let found = false;

    dbStore.updateData(data => {
      const idx = data.articles.findIndex(a => a.id === id || a.slug === id);
      if (idx !== -1) {
        data.articles[idx] = { ...data.articles[idx], ...updates };
        found = true;
      }
    });

    if (!found) {
      res.status(404).json({ success: false, message: 'مقاله برای ویرایش یافت نشد.' });
      return;
    }

    res.json({ success: true, message: 'مقاله با موفقیت ویرایش شد.' });
  });

  app.delete('/api/articles/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    let deleted = false;

    dbStore.updateData(data => {
      const initLen = data.articles.length;
      data.articles = data.articles.filter(a => a.id !== id && a.slug !== id);
      if (data.articles.length < initLen) {
        deleted = true;
      }
    });

    if (!deleted) {
      res.status(404).json({ success: false, message: 'مقاله برای حذف یافت نشد.' });
      return;
    }

    res.json({ success: true, message: 'مقاله با موفقیت حذف گردید.' });
  });

  // ==========================================
  // 6. SERVICES MANAGEMENT
  // ==========================================
  app.get('/api/services', (req, res) => {
    res.json({ success: true, data: dbStore.getData().services });
  });

  app.get('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const service = dbStore.getData().services.find(s => s.id === id || s.slug === id);
    if (!service) {
      res.status(404).json({ success: false, message: 'خدمت مورد نظر یافت نشد.' });
      return;
    }
    res.json({ success: true, data: service });
  });

  app.post('/api/services', requireApiKey, (req, res) => {
    const { title, shortDesc, highlights, image, slug, iconName } = req.body;
    if (!title || !shortDesc) {
      res.status(400).json({ success: false, message: 'عنوان و توضیح کوتاه خدمت الزامی است.' });
      return;
    }

    const newService = {
      id: req.body.id || `srv-${Date.now()}`,
      title,
      shortDesc,
      iconName: iconName || 'Sparkles',
      image: image || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
      slug: slug || `service-${Date.now()}`,
      highlights: Array.isArray(highlights) ? highlights : []
    };

    dbStore.updateData(data => {
      data.services.push(newService);
    });

    res.status(201).json({ success: true, message: 'خدمت جدید اضافه شد.', data: newService });
  });

  app.put('/api/services/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    let found = false;

    dbStore.updateData(data => {
      const idx = data.services.findIndex(s => s.id === id);
      if (idx !== -1) {
        data.services[idx] = { ...data.services[idx], ...req.body };
        found = true;
      }
    });

    if (!found) {
      res.status(404).json({ success: false, message: 'خدمت برای ویرایش یافت نشد.' });
      return;
    }
    res.json({ success: true, message: 'خدمت با موفقیت ویرایش شد.' });
  });

  app.delete('/api/services/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    let deleted = false;
    dbStore.updateData(data => {
      const initLen = data.services.length;
      data.services = data.services.filter(s => s.id !== id);
      if (data.services.length < initLen) deleted = true;
    });
    if (!deleted) {
      res.status(404).json({ success: false, message: 'خدمت برای حذف یافت نشد.' });
      return;
    }
    res.json({ success: true, message: 'خدمت با موفقیت حذف شد.' });
  });

  // ==========================================
  // 7. GALLERY & BEFORE-AFTER
  // ==========================================
  app.get('/api/gallery', (req, res) => {
    res.json({ success: true, data: dbStore.getData().gallery });
  });

  app.post('/api/gallery', requireApiKey, (req, res) => {
    const item = {
      id: req.body.id || `gal-${Date.now()}`,
      title: req.body.title || 'نمونه درمان بالینی',
      category: req.body.category || 'implant',
      categoryLabel: req.body.categoryLabel || 'ایمپلنت',
      type: req.body.type || (req.body.beforeUrl ? 'before-after' : 'single'),
      beforeUrl: req.body.beforeUrl,
      afterUrl: req.body.afterUrl,
      imageUrl: req.body.imageUrl,
      description: req.body.description || ''
    };

    dbStore.updateData(data => {
      data.gallery.unshift(item);
    });
    res.status(201).json({ success: true, message: 'آیتم جدید به گالری افزوده شد.', data: item });
  });

  app.delete('/api/gallery/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    dbStore.updateData(data => {
      data.gallery = data.gallery.filter(g => g.id !== id);
    });
    res.json({ success: true, message: 'آیتم گالری حذف شد.' });
  });

  // ==========================================
  // 8. PATIENT REVIEWS & TESTIMONIALS
  // ==========================================
  app.get('/api/reviews', (req, res) => {
    res.json({ success: true, data: dbStore.getData().reviews });
  });

  app.post('/api/reviews', (req, res) => {
    const { patientName, treatment, rating, comment } = req.body;
    if (!patientName || !comment) {
      res.status(400).json({ success: false, message: 'نام بیمار و متن دیدگاه الزامی است.' });
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      patientName,
      treatment: treatment || 'ایمپلنت دیجیتال',
      rating: Number(rating) || 5,
      comment,
      date: req.body.date || new Intl.DateTimeFormat('fa-IR').format(new Date()),
      verified: true
    };

    dbStore.updateData(data => {
      data.reviews.unshift(newReview);
    });

    res.status(201).json({ success: true, message: 'دیدگاه بیمار ثبت شد.', data: newReview });
  });

  app.delete('/api/reviews/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    dbStore.updateData(data => {
      data.reviews = data.reviews.filter(r => r.id !== id);
    });
    res.json({ success: true, message: 'دیدگاه حذف شد.' });
  });

  // ==========================================
  // 9. FAQS MANAGEMENT
  // ==========================================
  app.get('/api/faqs', (req, res) => {
    res.json({ success: true, data: dbStore.getData().faqs });
  });

  app.post('/api/faqs', requireApiKey, (req, res) => {
    const { question, answer, category } = req.body;
    if (!question || !answer) {
      res.status(400).json({ success: false, message: 'پرسش و پاسخ الزامی است.' });
      return;
    }

    const newFaq = {
      id: `faq-${Date.now()}`,
      question,
      answer,
      category: category || 'عمومی'
    };

    dbStore.updateData(data => {
      data.faqs.push(newFaq);
    });

    res.status(201).json({ success: true, message: 'سوال متداول جدید افزوده شد.', data: newFaq });
  });

  app.delete('/api/faqs/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    dbStore.updateData(data => {
      data.faqs = data.faqs.filter(f => f.id !== id);
    });
    res.json({ success: true, message: 'پرسش متداول حذف شد.' });
  });

  // ==========================================
  // 10. APPOINTMENT RESERVATIONS (PATIENTS & ADMIN)
  // ==========================================
  app.get('/api/appointments', requireApiKey, (req, res) => {
    const { status } = req.query;
    let list = dbStore.getData().appointments;
    if (status && typeof status === 'string' && status !== 'all') {
      list = list.filter(a => a.status === status);
    }
    res.json({ success: true, count: list.length, data: list });
  });

  app.post('/api/appointments', (req, res) => {
    const { fullName, phoneNumber, service, preferredDate, preferredTime, notes } = req.body;
    if (!fullName || !phoneNumber) {
      res.status(400).json({ success: false, message: 'نام و شماره تماس بیمار الزامی است.' });
      return;
    }

    const refNumber = Math.floor(10000 + Math.random() * 90000);
    const newAppointment: AppointmentRecord = {
      id: `apt-${Date.now()}`,
      referenceCode: `SH-${refNumber}`,
      fullName,
      phoneNumber,
      service: service || 'ایمپلنت دیجیتال',
      preferredDate: preferredDate || new Intl.DateTimeFormat('fa-IR').format(new Date()),
      preferredTime: preferredTime || 'عصر (۱۶ الی ۱۸)',
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    dbStore.updateData(data => {
      data.appointments.unshift(newAppointment);
    });

    res.status(201).json({
      success: true,
      message: 'درخواست نوبت با موفقیت ثبت شد و در پنل مدیریت قرار گرفت.',
      data: newAppointment
    });
  });

  app.patch('/api/appointments/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    let found = false;
    dbStore.updateData(data => {
      const item = data.appointments.find(a => a.id === id || a.referenceCode === id);
      if (item) {
        if (status) item.status = status;
        if (adminNotes !== undefined) item.adminNotes = adminNotes;
        found = true;
      }
    });

    if (!found) {
      res.status(404).json({ success: false, message: 'نوبت مورد نظر پیدا نشد.' });
      return;
    }

    res.json({ success: true, message: 'وضعیت نوبت به‌روزرسانی شد.' });
  });

  app.delete('/api/appointments/:id', requireApiKey, (req, res) => {
    const { id } = req.params;
    dbStore.updateData(data => {
      data.appointments = data.appointments.filter(a => a.id !== id && a.referenceCode !== id);
    });
    res.json({ success: true, message: 'نوبت حذف شد.' });
  });

  // ==========================================
  // 11. MEDIA / IMAGE UPLOAD HELPER
  // ==========================================
  app.post('/api/upload', requireApiKey, (req, res) => {
    const { imageBase64, imageUrl } = req.body;
    if (imageUrl) {
      res.json({ success: true, url: imageUrl });
      return;
    }
    if (imageBase64) {
      res.json({ success: true, url: imageBase64 });
      return;
    }
    res.status(400).json({ success: false, message: 'لطفاً تصویر یا آدرس تصویر را ارسال نمایید.' });
  });

  // ==========================================
  // 12. COMPREHENSIVE API SPECIFICATION & DOCUMENTATION
  // ==========================================
  app.get('/api/docs', (req, res) => {
    const host = req.get('host') || 'localhost:3000';
    const baseUrl = `${req.protocol}://${host}`;

    res.json({
      apiName: 'سرویس یکپارچه اتصال پنل مدیریت مطب دکتر اکبر شهیدی پیام',
      baseUrl,
      auth: {
        type: 'ApiKey',
        header: 'x-api-key',
        alternativeHeader: 'Authorization: Bearer <API_KEY>',
        defaultKey: DEFAULT_API_KEY
      },
      endpoints: [
        {
          module: 'Articles (مقالات علمی و بلاگ)',
          items: [
            { method: 'GET', path: '/api/articles', description: 'لیست تمام مقالات به همراه امکان فیلتر بر اساس دسته یا جستجو', auth: false },
            { method: 'GET', path: '/api/articles/:idOrSlug', description: 'دریافت جزییات یک مقاله خاص با آیدی یا اسلاگ', auth: false },
            {
              method: 'POST',
              path: '/api/articles',
              description: 'ایجاد مقاله جدید',
              auth: true,
              bodyExample: {
                title: 'مراقبت‌های بعد از جراحی دندان عقل',
                slug: 'wisdom-teeth-aftercare',
                category: 'جراحی فک و صورت',
                readTime: '۴ دقیقه مطالعه',
                heroImage: 'https://images.unsplash.com/...',
                summary: 'راهنمای گام به گام مراقبت‌های اولیه پس از جراحی دندان عقل نهفته',
                sections: [
                  {
                    title: 'روز اول پس از عمل',
                    paragraphs: ['استفاده از کمپرس سرد و پرهیز از شستشوی شدید دهان']
                  }
                ]
              }
            },
            { method: 'PUT', path: '/api/articles/:id', description: 'ویرایش مقاله موجود', auth: true },
            { method: 'DELETE', path: '/api/articles/:id', description: 'حذف مقاله', auth: true }
          ]
        },
        {
          module: 'Doctor Profile (مشخصات و ساعات کاری مطب)',
          items: [
            { method: 'GET', path: '/api/doctor', description: 'دریافت تمام مشخصات، تلفن‌ها، آدرس، عکس و متن‌ها', auth: false },
            { method: 'PUT', path: '/api/doctor', description: 'به‌روزرسانی اطلاعات دکتر و مطب (عکس، تلفن، بیوگرافی و...) ', auth: true },
            { method: 'GET', path: '/api/clinic-hours', description: 'دریافت ساعات کاری مطب', auth: false },
            { method: 'PUT', path: '/api/clinic-hours', description: 'به‌روزرسانی ساعات کاری مطب', auth: true }
          ]
        },
        {
          module: 'Appointments (نوبت‌های رزرو شده بیماران)',
          items: [
            { method: 'GET', path: '/api/appointments', description: 'دریافت نوبت‌های ثبت شده (با قابلیت فیلتر status=pending/confirmed/cancelled)', auth: true },
            { method: 'POST', path: '/api/appointments', description: 'ثبت نوبت جدید (توسط بیمار یا منشی)', auth: false },
            { method: 'PATCH', path: '/api/appointments/:id', description: 'تغییر وضعیت نوبت (تایید، لغو یا ثبت یادداشت مطب)', auth: true },
            { method: 'DELETE', path: '/api/appointments/:id', description: 'حذف یک نوبت', auth: true }
          ]
        },
        {
          module: 'Services (خدمات جراحی و درمانی)',
          items: [
            { method: 'GET', path: '/api/services', description: 'لیست تمام خدمات', auth: false },
            { method: 'POST', path: '/api/services', description: 'افزودن خدمت جدید', auth: true },
            { method: 'PUT', path: '/api/services/:id', description: 'ویرایش خدمت', auth: true },
            { method: 'DELETE', path: '/api/services/:id', description: 'حذف خدمت', auth: true }
          ]
        },
        {
          module: 'Gallery & Reviews (گالری و نظرات مراجعین)',
          items: [
            { method: 'GET', path: '/api/gallery', description: 'لیست تصاویر قبل و بعد', auth: false },
            { method: 'POST', path: '/api/gallery', description: 'افزودن تصویر قبل و بعد', auth: true },
            { method: 'DELETE', path: '/api/gallery/:id', description: 'حذف از گالری', auth: true },
            { method: 'GET', path: '/api/reviews', description: 'لیست نظرات بیماران', auth: false },
            { method: 'POST', path: '/api/reviews', description: 'ثبت نظر جدید', auth: false },
            { method: 'DELETE', path: '/api/reviews/:id', description: 'حذف نظر', auth: true }
          ]
        }
      ]
    });
  });

  // ==========================================
  // VITE OR STATIC FRONTEND SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Key: ${DEFAULT_API_KEY}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
