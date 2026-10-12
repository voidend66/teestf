import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Code2,
  Key,
  Globe,
  Database,
  Send,
  BookOpen,
  Calendar,
  User,
  Sparkles,
  Layers,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'quickstart' | 'tester'>('quickstart');
  const [selectedLanguage, setSelectedLanguage] = useState<'fetch' | 'axios' | 'curl'>('fetch');
  const [copiedText, setCopiedText] = useState<string>('');
  const [testEndpoint, setTestEndpoint] = useState<string>('/api/articles');
  const [testMethod, setTestMethod] = useState<string>('GET');
  const [testPayload, setTestPayload] = useState<string>(JSON.stringify({
    title: "عنوان مقاله جدید از پنل مدیریت",
    summary: "خلاصه توضیحات مقاله تخصصی ایمپلنت و جراحی فک",
    category: "ایمپلنت دندان",
    readTime: "۵ دقیقه مطالعه",
    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
    sections: [
      {
        title: "مقدمه و نکات کلیدی",
        paragraphs: ["متن پاراگراف اول مقاله که مستقیماً از پنل اضافه شده است."]
      }
    ]
  }, null, 2));
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [expandedModule, setExpandedModule] = useState<string>('articles');

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const defaultApiKey = 'dr-shahidi-key-2026';

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult('در حال ارسال درخواست به سرور...');
    try {
      const options: RequestInit = {
        method: testMethod,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': defaultApiKey
        }
      };
      if (testMethod !== 'GET' && testMethod !== 'HEAD') {
        options.body = testPayload;
      }

      const res = await fetch(testEndpoint, options);
      const data = await res.json();
      setTestResult(JSON.stringify({
        status: res.status,
        statusText: res.statusText,
        response: data
      }, null, 2));
    } catch (err: any) {
      setTestResult(JSON.stringify({
        error: 'درخواست با خطا مواجه شد',
        message: err.message
      }, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  const codeSnippets = {
    fetch: `// ۱. نمونه کد دریافت مقالات با Fetch در پنل
const response = await fetch('${baseUrl}/api/articles');
const result = await response.json();
console.log('لیست مقالات:', result.data);

// ۲. نمونه کد ایجاد مقاله جدید از پنل با ارسال کلید API
const createResponse = await fetch('${baseUrl}/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '${defaultApiKey}'
  },
  body: JSON.stringify({
    title: 'مراقبت‌های بعد از ایمپلنت',
    category: 'ایمپلنت دندان',
    readTime: '۴ دقیقه',
    summary: 'راهنمای کامل مراقبت‌های ۲۴ ساعت اول پس از جراحی ایمپلنت',
    featuredImage: 'https://ik.imagekit.io/... یا /media/drshahidi/implant.jpg',
    sections: [
      {
        title: 'نکات بهداشتی',
        paragraphs: ['از شستشوی شدید دهان تا ۲۴ ساعت خودداری فرمایید.']
      }
    ]
  })
});
const createdArticle = await createResponse.json();
console.log('مقاله ثبت شد:', createdArticle);`,

    axios: `// ۱. تعریف نمونه Axios با کلید امنیتی اختصاصی
import axios from 'axios';

const api = axios.create({
  baseURL: '${baseUrl}/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '${defaultApiKey}'
  }
});

// ۲. دریافت نوبت‌های رزرو شده بیماران در پنل
export const getAppointments = async () => {
  const res = await api.get('/appointments');
  return res.data.data;
};

// ۳. تغییر وضعیت یک نوبت به تایید شده
export const confirmAppointment = async (appointmentId) => {
  const res = await api.patch(\`/appointments/\${appointmentId}\`, {
    status: 'confirmed',
    adminNotes: 'تماس تلفنی با بیمار گرفته شد و نوبت قطعی گردید.'
  });
  return res.data;
};

// ۴. به‌روزرسانی شماره تماس یا مشخصات دکتر
export const updateDoctorProfile = async (profileData) => {
  const res = await api.put('/doctor', profileData);
  return res.data;
};`,

    curl: `# ۱. دریافت لیست مقالات
curl -X GET "${baseUrl}/api/articles"

# ۲. ایجاد مقاله جدید با کلید اختصاصی
curl -X POST "${baseUrl}/api/articles" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${defaultApiKey}" \\
  -d '{
    "title": "جراحی دندان عقل نهفته",
    "category": "جراحی فک و صورت",
    "summary": "معرفی تکنیک‌های مدرن جراحی بدون درد دندان‌های عقل",
    "readTime": "۵ دقیقه"
  }'

# ۳. دریافت لیست نوبت‌های مراجعین
curl -X GET "${baseUrl}/api/appointments" \\
  -H "x-api-key: ${defaultApiKey}"`
  };

  const endpointCategories = [
    {
      id: 'articles',
      title: 'مدیریت مقالات و بلاگ (Articles)',
      icon: BookOpen,
      endpoints: [
        { method: 'GET', path: '/api/articles', desc: 'دریافت تمام مقالات (قابلیت جستجو: ?search=ایمپلنت)', auth: false },
        { method: 'GET', path: '/api/articles/:idOrSlug', desc: 'دریافت یک مقاله با آیدی یا اسلاگ', auth: false },
        { method: 'POST', path: '/api/articles', desc: 'ایجاد مقاله جدید', auth: true },
        { method: 'PUT', path: '/api/articles/:id', desc: 'ویرایش کامل مقاله', auth: true },
        { method: 'DELETE', path: '/api/articles/:id', desc: 'حذف مقاله', auth: true }
      ]
    },
    {
      id: 'doctor',
      title: 'مشخصات دکتر و اطلاعات مطب (Profile & Clinic)',
      icon: User,
      endpoints: [
        { method: 'GET', path: '/api/doctor', desc: 'دریافت مشخصات کامل، تلفن‌ها، آدرس و عکس دکتر', auth: false },
        { method: 'PUT', path: '/api/doctor', desc: 'به‌روزرسانی اطلاعات، عکس پرتره، تلفن‌ها، آدرس و متون', auth: true },
        { method: 'GET', path: '/api/clinic-hours', desc: 'دریافت ساعات کاری مطب', auth: false },
        { method: 'PUT', path: '/api/clinic-hours', desc: 'تغییر و به‌روزرسانی روزها و ساعات کاری', auth: true }
      ]
    },
    {
      id: 'appointments',
      title: 'رزرو نوبت‌های بیماران (Appointments)',
      icon: Calendar,
      endpoints: [
        { method: 'GET', path: '/api/appointments', desc: 'مشاهده نوبت‌های ثبت شده (فیلتر: ?status=pending/confirmed)', auth: true },
        { method: 'POST', path: '/api/appointments', desc: 'ثبت نوبت دستی از طرف منشی یا بیمار', auth: false },
        { method: 'PATCH', path: '/api/appointments/:id', desc: 'تغییر وضعیت نوبت به تایید/لغو + درج یادداشت اداری', auth: true },
        { method: 'DELETE', path: '/api/appointments/:id', desc: 'حذف رکورد نوبت', auth: true }
      ]
    },
    {
      id: 'services',
      title: 'خدمات تخصصی (Services)',
      icon: Sparkles,
      endpoints: [
        { method: 'GET', path: '/api/services', desc: 'دریافت لیست خدمات تخصصی مطب', auth: false },
        { method: 'POST', path: '/api/services', desc: 'افزودن خدمت جدید', auth: true },
        { method: 'PUT', path: '/api/services/:id', desc: 'ویرایش خدمت', auth: true },
        { method: 'DELETE', path: '/api/services/:id', desc: 'حذف خدمت', auth: true }
      ]
    },
    {
      id: 'gallery',
      title: 'گالری قبل و بعد (Before & After)',
      icon: Layers,
      endpoints: [
        { method: 'GET', path: '/api/gallery', desc: 'لیست نمونه کارهای قبل و بعد', auth: false },
        { method: 'POST', path: '/api/gallery', desc: 'افزودن تصویر جدید قبل و بعد درمان', auth: true },
        { method: 'DELETE', path: '/api/gallery/:id', desc: 'حذف نمونه کار', auth: true }
      ]
    },
    {
      id: 'reviews',
      title: 'نظرات و دیدگاه بیماران (Reviews)',
      icon: MessageSquare,
      endpoints: [
        { method: 'GET', path: '/api/reviews', desc: 'دریافت نظرات و امتیازات بیماران', auth: false },
        { method: 'POST', path: '/api/reviews', desc: 'ثبت دیدگاه جدید', auth: false },
        { method: 'DELETE', path: '/api/reviews/:id', desc: 'حذف دیدگاه', auth: true }
      ]
    },
    {
      id: 'faqs',
      title: 'سوالات متداول (FAQs)',
      icon: HelpCircle,
      endpoints: [
        { method: 'GET', path: '/api/faqs', desc: 'لیست پرسش و پاسخ‌ها', auth: false },
        { method: 'POST', path: '/api/faqs', desc: 'افزودن سوال جدید', auth: true },
        { method: 'DELETE', path: '/api/faqs/:id', desc: 'حذف سوال', auth: true }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-right" dir="rtl">
        {/* Modal Header */}
        <div className="bg-gradient-to-l from-[#1e3a8a] to-[#122457] text-white px-5 py-4 flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#d4af37]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>راهنمای اتصال پنل مدیریت به سایت</span>
                <span className="text-[11px] bg-[#d4af37] text-slate-950 font-bold px-2 py-0.5 rounded-full">
                  REST API v1
                </span>
              </h2>
              <p className="text-xs text-blue-200 mt-0.5">
                راهنمای کامل کنترل محتوا، مقالات، نوبت‌ها و مشخصات سایت توسط پنل اختصاصی شما
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100/80 px-5 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('quickstart')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'quickstart'
                ? 'bg-white text-[#1e3a8a] shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Globe className="w-4 h-4 text-[#d4af37]" />
            <span>نحوه اتصال سریع و کدهای آماده</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('endpoints')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'endpoints'
                ? 'bg-white text-[#1e3a8a] shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Database className="w-4 h-4 text-[#d4af37]" />
            <span>فهرست کامل APIها (Endpoints)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tester')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'tester'
                ? 'bg-white text-[#1e3a8a] shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Send className="w-4 h-4 text-[#d4af37]" />
            <span>تست زنده API در مرورگر</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-800">
          
          {/* TAB 1: QUICKSTART */}
          {activeTab === 'quickstart' && (
            <div className="space-y-6">
              {/* Credentials Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1e3a8a] mb-1.5">
                    <Globe className="w-4 h-4 text-[#d4af37]" />
                    <span>آدرس پایه سرور (Base URL):</span>
                  </div>
                  <div className="flex items-center justify-between bg-white border border-blue-200 rounded-xl px-3 py-2 font-mono text-xs text-slate-900 direction-ltr">
                    <span className="truncate">{baseUrl}/api</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`${baseUrl}/api`, 'baseurl')}
                      className="text-slate-500 hover:text-[#1e3a8a] transition-colors p-1"
                      title="کپی آدرس"
                    >
                      {copiedText === 'baseurl' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="block text-[11px] text-slate-500 mt-1.5">
                    همه درخواست‌های پنل به این مسیر ارسال می‌شوند.
                  </span>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1.5">
                    <Key className="w-4 h-4 text-amber-600" />
                    <span>کلید امنیتی اتصال (API Key):</span>
                  </div>
                  <div className="flex items-center justify-between bg-white border border-amber-200 rounded-xl px-3 py-2 font-mono text-xs text-slate-900 direction-ltr">
                    <span className="truncate">{defaultApiKey}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(defaultApiKey, 'apikey')}
                      className="text-slate-500 hover:text-amber-800 transition-colors p-1"
                      title="کپی کلید"
                    >
                      {copiedText === 'apikey' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="block text-[11px] text-slate-500 mt-1.5">
                    در هدر <code className="text-amber-900 font-bold">x-api-key</code> ارسال شود.
                  </span>
                </div>
              </div>

              {/* Dynamic Port & Architecture Callout */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>پشتیبانی از پورت‌های دینامیک (مانند ۸۰۸۸، ۳۰۰۰ و ...) بدون نیاز به دامین</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  سرور سایت به گونه‌ای پیکربندی شده که مقدار <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">PORT</code> را از متغیر محیطی (<code className="font-bold">process.env.PORT</code>) می‌خواند.
                  بنابراین اگر این سایت را با پورت دلخواه مثلاً <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">PORT=8088</code> ران کنید، در پنل مدیریت کافیست فقط پورت را تغییر دهید:
                </p>
                <div className="mt-2.5 bg-slate-900 text-emerald-300 font-mono text-xs p-3 rounded-xl direction-ltr text-left">
                  <span>const API_BASE = process.env.SITE_API_URL || 'http://localhost:8088/api';</span>
                </div>
              </div>

              {/* Three Simple Steps */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-black text-[#1e3a8a] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>۳ گام ساده برای اتصال پنل شما به این سایت:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-[11px] mb-2">۱</span>
                    <strong className="block text-slate-900 mb-1">تعریف Base URL در پنل</strong>
                    <p className="text-slate-600 leading-relaxed">
                      در پنل خود، آدرس سرور سایت (<code className="bg-slate-100 px-1 py-0.5 rounded">{baseUrl}/api</code>) را به عنوان آدرس پایه تنظیم کنید.
                    </p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-[11px] mb-2">۲</span>
                    <strong className="block text-slate-900 mb-1">تنظیم هدر x-api-key</strong>
                    <p className="text-slate-600 leading-relaxed">
                      برای عملیات‌های نوشتن، حذف یا ویرایش (POST, PUT, DELETE)، هدر <code className="bg-slate-100 px-1 py-0.5 rounded">x-api-key: {defaultApiKey}</code> را بگذارید.
                    </p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-[11px] mb-2">۳</span>
                    <strong className="block text-slate-900 mb-1">اعمال آنی تغییرات</strong>
                    <p className="text-slate-600 leading-relaxed">
                      به محض ارسال درخواست از پنل (مثلاً ساخت مقاله یا ویرایش شماره تلفن)، سایت بلافاصله محتوای جدید را نمایش می‌دهد.
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Snippets Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#d4af37]" />
                    <span>نمونه کدهای آماده برای کپی در پنل شما:</span>
                  </h3>
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    {(['fetch', 'axios', 'curl'] as const).map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          selectedLanguage === lang ? 'bg-white text-[#1e3a8a] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {lang === 'fetch' ? 'JavaScript (Fetch)' : lang === 'axios' ? 'Axios' : 'cURL'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 text-left font-mono text-xs text-slate-200 overflow-x-auto direction-ltr">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(codeSnippets[selectedLanguage], 'snippet')}
                    className="absolute top-3 right-3 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer border border-slate-700"
                  >
                    {copiedText === 'snippet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'snippet' ? 'کپی شد' : 'کپی کد'}</span>
                  </button>
                  <pre className="mt-6 leading-relaxed whitespace-pre-wrap">{codeSnippets[selectedLanguage]}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FULL ENDPOINTS LIST */}
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <div className="bg-blue-50 text-[#1e3a8a] p-3.5 rounded-xl text-xs border border-blue-200 flex items-center justify-between">
                <span>تمام مسیرها با پیشوند <code className="font-bold font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border border-blue-200">{baseUrl}/api</code> قابل دسترسی هستند.</span>
                <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded">پشتیبانی کامل از CORS فعال است</span>
              </div>

              <div className="space-y-3">
                {endpointCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isExpanded = expandedModule === cat.id;

                  return (
                    <div key={cat.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => setExpandedModule(isExpanded ? '' : cat.id)}
                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 font-bold text-sm text-[#1e3a8a]">
                          <Icon className="w-4 h-4 text-[#d4af37]" />
                          <span>{cat.title}</span>
                          <span className="text-xs font-normal text-slate-500">({cat.endpoints.length} اندپوینت)</span>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {isExpanded && (
                        <div className="divide-y divide-slate-100">
                          {cat.endpoints.map((ep, idx) => (
                            <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/60 transition-colors">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black font-mono ${
                                  ep.method === 'GET' ? 'bg-emerald-100 text-emerald-800' :
                                  ep.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                                  ep.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                                  ep.method === 'PATCH' ? 'bg-indigo-100 text-indigo-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {ep.method}
                                </span>
                                <code className="font-mono text-xs font-bold text-slate-900 direction-ltr">
                                  {ep.path}
                                </code>
                                <span className="text-xs text-slate-600">{ep.desc}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {ep.auth ? (
                                  <span className="text-[10.5px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Key className="w-3 h-3 text-amber-600" />
                                    نیاز به x-api-key
                                  </span>
                                ) : (
                                  <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                    عمومی (Public)
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    setTestEndpoint(ep.path.replace(':idOrSlug', 'digital-implant').replace(':id', '1'));
                                    setTestMethod(ep.method);
                                    setActiveTab('tester');
                                  }}
                                  className="text-xs font-bold text-[#1e3a8a] hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer"
                                >
                                  تست
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE TESTER */}
          {activeTab === 'tester' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="w-28 shrink-0">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">متد HTTP:</label>
                    <select
                      value={testMethod}
                      onChange={(e) => setTestMethod(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">مسیر Endpoint:</label>
                    <input
                      type="text"
                      value={testEndpoint}
                      onChange={(e) => setTestEndpoint(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 direction-ltr text-left"
                      placeholder="/api/articles"
                    />
                  </div>

                  <div className="sm:pt-5">
                    <button
                      type="button"
                      onClick={handleRunTest}
                      disabled={isTesting}
                      className="w-full sm:w-auto bg-[#1e3a8a] hover:bg-[#162d6b] text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{isTesting ? 'در حال ارسال...' : 'ارسال درخواست'}</span>
                    </button>
                  </div>
                </div>

                {testMethod !== 'GET' && testMethod !== 'DELETE' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">بدنه درخواست (JSON Payload):</label>
                    <textarea
                      rows={6}
                      value={testPayload}
                      onChange={(e) => setTestPayload(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 font-mono text-xs text-slate-900 direction-ltr text-left"
                    />
                  </div>
                )}
              </div>

              {/* Test Response Output */}
              {testResult && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">پاسخ دریافتی از سرور (Response):</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(testResult, 'testres')}
                      className="text-xs text-[#1e3a8a] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === 'testres' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>کپی پاسخ</span>
                    </button>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left font-mono text-xs text-emerald-400 overflow-x-auto direction-ltr max-h-64">
                    <pre className="leading-relaxed whitespace-pre-wrap">{testResult}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Key className="w-4 h-4 text-[#d4af37]" />
            <span>کلید پیش‌فرض برای تست و توسعه: <code className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">{defaultApiKey}</code></span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-1.5 rounded-xl transition-colors cursor-pointer mr-auto"
          >
            بستن راهنما
          </button>
        </div>
      </div>
    </div>
  );
};
