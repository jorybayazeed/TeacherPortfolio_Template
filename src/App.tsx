import { useEffect, useRef, useState } from 'react';

// Edit the content in this block to personalize the portfolio. All entries below are examples.
const profile = {
  name: 'اسم المعلّم',
  region: 'المدينة / المنطقة',
  specialty: 'التخصص التعليمي',
  stage: 'المرحلة التعليمية',
  school: 'اسم المدرسة',
  qualification: 'المؤهل العلمي',
  email: '',
  linkedin: '',
  cvUrl: '',
};

const photos = {
  portrait: 'https://images.unsplash.com/photo-1765366574945-e2f1b4b1a5b3?auto=format&fit=crop&w=1000&q=85',
  classroom: 'https://images.unsplash.com/photo-1719159381962-4170890ada4e?auto=format&fit=crop&w=1200&q=85',
  workshop: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85',
  teaching: 'https://images.unsplash.com/photo-1758270704925-fa59d93119c1?auto=format&fit=crop&w=1200&q=85',
  study: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=85',
  event: 'https://images.unsplash.com/photo-1728743264694-4ac39fa29385?auto=format&fit=crop&w=1200&q=85',
  activity: 'https://images.unsplash.com/photo-1761208662734-fb46f1398551?auto=format&fit=crop&w=1200&q=85',
};

const nav = [
  ['الرئيسية', 'home'], ['نبذة عني', 'about'], ['المسيرة المهنية', 'journey'],
  ['الإنجازات', 'achievements'], ['المبادرات', 'initiatives'], ['الشهادات', 'certificates'],
  ['المشاركات', 'events'], ['معرض الصور', 'gallery'], ['تواصل معي', 'contact'],
];

const achievements = [
  { title: 'تطوير بيئة تعلّم تفاعلية', category: 'إنجازات تعليمية', year: '٢٠٢٤', agency: 'الجهة التعليمية', description: 'توظيف استراتيجيات تعلّم متنوعة لتعزيز تفاعل الطلاب داخل الصف.', impact: 'المساهمة في رفع مستوى المشاركة الصفية وإثراء تجربة التعلّم.', icon: 'spark' },
  { title: 'مبادرة التعلم الرقمي', category: 'مبادرات', year: '٢٠٢٣', agency: 'المدرسة / إدارة التعليم', description: 'تصميم موارد رقمية مساندة ومشاركتها مع مجتمع التعلّم.', impact: 'إتاحة مصادر تعلّم أكثر مرونة وسهولة للطلاب.', icon: 'screen' },
  { title: 'تقدير التميز المهني', category: 'جوائز وتكريم', year: '٢٠٢٢', agency: 'الجهة المانحة', description: 'نموذج توضيحي لتكريم عن المساهمة في تطوير الممارسات التعليمية.', impact: 'تشجيع تبادل الممارسات الجيدة بين الزملاء.', icon: 'award' },
  { title: 'تبادل الخبرات التعليمية', category: 'تطوير مهني', year: '٢٠٢١', agency: 'مجتمع التعلّم المهني', description: 'المشاركة في ورش عمل لتبادل الأفكار والتجارب التعليمية.', impact: 'نقل خبرات قابلة للتطبيق في البيئة الصفية.', icon: 'users' },
];

const initiatives = [
  { title: 'مساحة تعلّم مبتكرة', date: '٢٠٢٤', audience: 'الطلاب', role: 'تصميم وتنفيذ', goal: 'تعزيز التعلّم النشط داخل الصف', description: 'مبادرة تجريبية تتيح للطلاب فرصًا أكبر للمشاركة والتجربة والعمل الجماعي.', impact: 'بيئة صفية أكثر تفاعلًا ومشاركة.', image: photos.classroom, category: 'مبادرة تعليمية' },
  { title: 'مهارات المستقبل الرقمية', date: '٢٠٢٣', audience: 'الطلاب والمعلمون', role: 'مشاركة وتنسيق', goal: 'دعم توظيف التقنية في التعلّم', description: 'برنامج توضيحي لتقديم أدوات ومصادر رقمية تثري العملية التعليمية.', impact: 'تعزيز الوصول إلى أدوات تعليمية حديثة.', image: photos.workshop, category: 'مشروع تعليمي' },
];

const certificates = [
  { title: 'عنوان دورة تدريبية', field: 'التعليم الرقمي', issuer: 'اسم الجهة المقدمة', date: '٢٠٢٤', hours: '٢٠ ساعة تدريبية' },
  { title: 'عنوان شهادة مهنية', field: 'استراتيجيات التدريس', issuer: 'اسم الجهة المقدمة', date: '٢٠٢٣', hours: '١٥ ساعة تدريبية' },
  { title: 'عنوان ورشة عمل', field: 'القيادة التعليمية', issuer: 'اسم الجهة المقدمة', date: '٢٠٢٣', hours: '١٠ ساعات تدريبية' },
  { title: 'عنوان برنامج تدريبي', field: 'التعليم الرقمي', issuer: 'اسم الجهة المقدمة', date: '٢٠٢٢', hours: '٢٥ ساعة تدريبية' },
];

const awards = [
  { title: 'خطاب شكر وتقدير', issuer: 'اسم الجهة المانحة', year: '٢٠٢٤', reason: 'للمساهمة في تنفيذ الأنشطة التعليمية', description: 'نموذج لمادة تكريمية يمكن استبداله بالوثيقة الفعلية.' },
  { title: 'تكريم التميز في المبادرات', issuer: 'اسم الجهة المانحة', year: '٢٠٢٣', reason: 'للمشاركة الفاعلة في مبادرة تعليمية', description: 'نموذج لتوثيق أثر المبادرات والمشاريع المدرسية.' },
];

const events = [
  { title: 'ملتقى الممارسات التعليمية', type: 'ملتقى تعليمي', date: '٢٠٢٤', image: photos.workshop, description: 'مشاركة معرفية وتبادل للتجارب مع المهتمين بالتعليم.' },
  { title: 'أنشطة التعلّم المدرسية', type: 'فعالية مدرسية', date: '٢٠٢٣', image: photos.activity, description: 'المساهمة في أنشطة تتيح للطلاب التعلّم بالمشاركة.' },
  { title: 'ورشة تطوير مهني', type: 'ورشة عمل', date: '٢٠٢٣', image: photos.event, description: 'حوار مهني حول أساليب التدريس وتطوير التجربة الصفية.' },
];

const gallery = [
  { image: photos.classroom, title: 'بيئة التعلّم', category: 'الأنشطة' },
  { image: photos.workshop, title: 'مشاركة معرفية', category: 'الدورات' },
  { image: photos.activity, title: 'أنشطة صفية', category: 'المبادرات' },
  { image: photos.teaching, title: 'تجربة تعليمية', category: 'الفعاليات' },
  { image: photos.event, title: 'لقاء تعليمي', category: 'الفعاليات' },
  { image: photos.study, title: 'رحلة المعرفة', category: 'التكريم' },
];

const stats = [
  { number: 15, label: 'سنة خبرة' }, { number: 40, label: 'دورة تدريبية' },
  { number: 25, label: 'مبادرة تعليمية' }, { number: 30, label: 'شهادة تقدير' },
  { number: 20, label: 'مشاركة وفعالية' },
];

const effects = [
  { number: '٠١', title: 'تعلّم أكثر تفاعلًا', text: 'تحويل الحصة إلى مساحة للحوار والمشاركة، حيث يصبح الطالب شريكًا في بناء المعرفة.' },
  { number: '٠٢', title: 'تقنية تخدم الهدف', text: 'استخدام أدوات رقمية مناسبة لتوسيع فرص التعلّم وتيسير الوصول إلى المحتوى.' },
  { number: '٠٣', title: 'خبرة تتجاوز الصف', text: 'مشاركة الممارسات والخبرات مع الزملاء لصناعة أثر يمتد إلى المجتمع المدرسي.' },
];

type IconName = 'arrow' | 'arrowLeft' | 'menu' | 'close' | 'spark' | 'screen' | 'award' | 'users' | 'book' | 'download' | 'mail' | 'external' | 'expand' | 'check' | 'location' | 'calendar' | 'play';

function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className, 'aria-hidden': true as const };
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    arrowLeft: <><path d="M19 12H5m6-6-6 6 6 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z" /></>,
    screen: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 22h8m-4-4v4m-3-12 2 2 4-4" /></>,
    award: <><circle cx="12" cy="8" r="5" /><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2H3Zm13-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2h-3" /></>,
    book: <><path d="M12 6c-2.4-2-5.6-2.4-9-1v14c3.4-1.4 6.6-1 9 1 2.4-2 5.6-2.4 9-1V5c-3.4-1.4-6.6-1-9 1Zm0 0v14" /></>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    external: <><path d="M13 5h6v6m0-6-9 9M19 14v5H5V5h5" /></>,
    expand: <><path d="M8 3H3v5m0-5 7 7m6-7h5v5m0-5-7 7M3 16v5h5m-5 0 7-7m11 2v5h-5m5 0-7-7" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    play: <><path d="m9 6 9 6-9 6V6Z" /></>,
  };
  return <svg {...shared}>{paths[name]}</svg>;
}

function SectionHeading({ kicker, title, description, light = false }: { kicker: string; title: string; description?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'section-heading-light' : ''}`}><span className="eyebrow"><span className="eyebrow-line" />{kicker}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function FilterTabs({ options, active, onChange }: { options: string[]; active: string; onChange: (value: string) => void }) {
  return <div className="filter-tabs" role="group" aria-label="تصفية المحتوى">{options.map(option => <button key={option} type="button" className={active === option ? 'active' : ''} onClick={() => onChange(option)} aria-pressed={active === option}>{option}</button>)}</div>;
}

function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(value); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        setCount(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>+{new Intl.NumberFormat('ar-SA').format(count)}</span>;
}

type ModalContent = { title: string; type: 'image' | 'certificate' | 'detail'; image?: string; subtitle?: string; body?: string; impact?: string };

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [achievementFilter, setAchievementFilter] = useState('الكل');
  const [certificateFilter, setCertificateFilter] = useState('الكل');
  const [galleryFilter, setGalleryFilter] = useState('الكل');
  const [modal, setModal] = useState<ModalContent | null>(null);
  const [formNotice, setFormNotice] = useState('');

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [achievementFilter, certificateFilter, galleryFilter]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setModal(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [modal]);

  function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.email) { setFormNotice('نموذج تجريبي: أضف بريدك الإلكتروني في بيانات الملف لتفعيل إرسال الرسائل.'); return; }
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get('subject') || 'رسالة من ملف الإنجاز'));
    const body = encodeURIComponent(`من: ${form.get('name')} (${form.get('email')})\n\n${form.get('message')}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setFormNotice('سيتم فتح تطبيق البريد لإكمال إرسال الرسالة.');
  }

  return <div className="site" dir="rtl">
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="العودة إلى الرئيسية"><span className="brand-mark"><Icon name="book" size={24} /></span><span className="brand-copy"><strong>ملف الإنجاز</strong><small>مسيرة تصنع أثرًا</small></span></a>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="التنقل الرئيسي">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
        <a href="#contact" className="header-contact">لنتواصل <Icon name="arrowLeft" size={16} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={25} /></button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="hero-kicker"><span className="kicker-dot" /> ملف إنجاز رقمي · المملكة العربية السعودية</div>
            <span className="hero-overline">أهلًا بكم في مسيرتي التعليمية</span>
            <h1>التعليم رسالة،<br /><em>والأثر هو الإنجاز.</em></h1>
            <p className="hero-name">{profile.name} <span className="name-line" /></p>
            <p className="hero-role">معلّم <span>•</span> إدارة التعليم بـ {profile.region}</p>
            <p className="hero-description">مسيرة تعليمية نحو التميز، الإبداع، وصناعة أثر مستدام في التعليم. هنا أوثّق التجارب التي صنعت فرقًا، والخطوات التي تستحق أن تُروى.</p>
            <div className="hero-actions"><a className="button button-gold" href="#achievements">استعرض إنجازاتي <Icon name="arrowLeft" size={18} /></a><a className="button button-outline-light" href="#certificates">الشهادات والدورات</a><a className="button button-outline-light" href="#contact">تواصل معي</a>{profile.cvUrl && <a className="button button-outline-light" href={profile.cvUrl} download>تحميل السيرة الذاتية <Icon name="download" size={16} /></a>}</div>
            <div className="hero-bottom"><span><Icon name="location" size={16} /> المملكة العربية السعودية</span><span className="hero-bottom-divider" /><span>الملف قابل للتخصيص</span></div>
          </div>
          <div className="hero-visual reveal">
            <div className="portrait-frame"><img src={photos.portrait} alt="صورة شخصية توضيحية قابلة للاستبدال بصورة المعلم" /><div className="portrait-overlay" /><span className="portrait-note">صورة توضيحية</span></div>
            <div className="hero-float"><span className="float-icon"><Icon name="spark" size={23} /></span><div><small>رؤيتي في التعليم</small><strong>إلهام يُحدث فرقًا</strong></div></div>
            <div className="vertical-label">رحلة من العطاء والتأثير — ٢٠٢٥</div>
          </div>
        </div>
        <a className="scroll-cue" href="#about"><span>اكتشف المزيد</span><span className="scroll-line" /></a>
      </section>

      <section className="about section-pad" id="about"><div className="container about-grid">
        <div className="about-aside reveal"><div className="about-symbol"><Icon name="book" size={55} /></div><span className="about-aside-index">01 / عن المسيرة</span><p>« كل تجربة تعليمية فرصة لنترك أثرًا أبعد من حدود الصف. »</p><div className="about-aside-line" /></div>
        <div className="about-content reveal"><SectionHeading kicker="من أنا" title="نبذة عني" /><p className="lead-text">معلّم أؤمن بأن التعليم يتجاوز نقل المعرفة إلى صناعة الأثر وبناء جيل قادر على التعلّم والإبداع.</p><p className="body-text">أسعى باستمرار إلى تطوير الممارسات التعليمية، وتوظيف التقنيات الحديثة، والمشاركة في المبادرات والبرامج التي تسهم في تحسين جودة العملية التعليمية. هذا الملف مساحة لتوثيق رحلة مستمرة من التعلّم والعطاء.</p><div className="about-details">{[['التخصص', profile.specialty], ['المرحلة التعليمية', profile.stage], ['إدارة التعليم', profile.region], ['المدرسة', profile.school], ['المؤهل العلمي', profile.qualification], ['سنوات الخبرة', '١٥+ سنة (مثال)']].map(([label, value]) => <div className="detail-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><a href="#journey" className="text-link">تعرّف على مسيرتي <Icon name="arrowLeft" size={17} /></a></div>
      </div></section>

      <section className="stats-section"><div className="container"><div className="stats-intro"><span className="eyebrow"><span className="eyebrow-line" /> لمحة سريعة</span><h2>أرقام من المسيرة</h2><p>أرقام توضيحية قابلة للتعديل لتعكس مسيرتك الفعلية.</p></div><div className="stats-grid">{stats.map(stat => <div className="stat" key={stat.label}><strong><Count value={stat.number} /></strong><span>{stat.label}</span></div>)}</div></div></section>

      <section className="section-pad journey-section" id="journey"><div className="container"><div className="section-top reveal"><SectionHeading kicker="رحلة العطاء" title="المسيرة المهنية" description="محطات وتجارب شكّلت منهجي في التعليم، وخبرات أعتز بما تركته من أثر." /><span className="section-index">02 / المسيرة</span></div><div className="timeline"><div className="timeline-item reveal"><span className="timeline-dot" /><div className="timeline-date">٢٠٢٠ — حتى الآن</div><div className="timeline-card"><div className="timeline-card-head"><div><span className="small-label">المحطة الحالية</span><h3>معلّم · {profile.specialty}</h3></div><span className="timeline-icon"><Icon name="book" size={24} /></span></div><p className="timeline-place">{profile.school} <span>·</span> إدارة التعليم بـ {profile.region}</p><p>تطوير ممارسات صفية تركز على الطالب، والمشاركة في الأنشطة والمبادرات التعليمية، وتوظيف أدوات تدعم التعلّم الفعّال.</p><div className="timeline-highlight"><Icon name="check" size={17} /> أبرز الأثر: تعزيز التفاعل داخل البيئة الصفية</div></div></div><div className="timeline-item reveal"><span className="timeline-dot" /><div className="timeline-date">٢٠١٠ — ٢٠٢٠</div><div className="timeline-card"><div className="timeline-card-head"><div><span className="small-label">بداية المسيرة</span><h3>معلّم · مرحلة تعليمية</h3></div><span className="timeline-icon"><Icon name="book" size={24} /></span></div><p className="timeline-place">اسم المدرسة / الجهة <span>·</span> إدارة التعليم بـ {profile.region}</p><p>بناء أساس متين في التدريس والتخطيط للدرس وتقييم التعلّم، مع الإسهام في البرامج والفعاليات المدرسية.</p><div className="timeline-highlight"><Icon name="check" size={17} /> أبرز الأثر: تطوير أنشطة تعليمية تراعي تنوّع الطلاب</div></div></div></div></div></section>

      <section className="section-pad achievements-section" id="achievements"><div className="container"><div className="section-top reveal"><SectionHeading kicker="ما أفتخر به" title="الإنجازات" description="وراء كل إنجاز فكرة، وجهد، وأثر يستحق التوثيق. جميع العناصر هنا نماذج توضيحية." /><span className="section-index">03 / الإنجازات</span></div><FilterTabs options={['الكل', 'إنجازات تعليمية', 'مبادرات', 'جوائز وتكريم', 'تطوير مهني']} active={achievementFilter} onChange={setAchievementFilter} /><div className="achievement-grid">{achievements.filter(item => achievementFilter === 'الكل' || item.category === achievementFilter).map((item, index) => <article className="achievement-card reveal" key={item.title}><div className="achievement-top"><span className="achievement-icon"><Icon name={item.icon as IconName} size={26} /></span><span className="achievement-year">{item.year}</span></div><span className="card-category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><div className="impact-line"><span>الأثر</span><strong>{item.impact}</strong></div><button className="card-link" type="button" onClick={() => setModal({ type: 'detail', title: item.title, subtitle: `${item.category} · ${item.year} · ${item.agency}`, body: item.description, impact: item.impact })}>عرض التفاصيل <Icon name="arrowLeft" size={17} /></button><span className="card-number">0{index + 1}</span></article>)}</div></div></section>

      <section className="section-pad initiatives-section" id="initiatives"><div className="container"><div className="section-top reveal"><SectionHeading kicker="أفكار تتحوّل إلى أثر" title="المبادرات والمشاريع" description="مساحات للتجربة والابتكار، صُممت لتخدم تعلّمًا أكثر حضورًا وفاعلية." /><span className="section-index">04 / المبادرات</span></div><div className="initiative-grid">{initiatives.map(item => <article className="initiative-card reveal" key={item.title}><div className="initiative-image"><img src={item.image} alt={`صورة توضيحية لمبادرة ${item.title}`} loading="lazy" /><span>{item.category}</span></div><div className="initiative-body"><div className="initiative-meta"><span><Icon name="calendar" size={15} /> {item.date}</span><span><Icon name="users" size={15} /> {item.audience}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="initiative-facts"><div><span>الدور</span><strong>{item.role}</strong></div><div><span>الهدف</span><strong>{item.goal}</strong></div></div><div className="initiative-impact"><Icon name="spark" size={18} /><span>الأثر: {item.impact}</span></div></div></article>)}</div></div></section>

      <section className="section-pad certificates-section" id="certificates"><div className="container"><div className="section-top reveal"><SectionHeading kicker="تعلّم لا يتوقف" title="الشهادات والدورات التدريبية" description="التطوير المهني رحلة مستمرة. استعرض نماذج للشهادات بحسب المجال." /><span className="section-index">05 / التعلّم</span></div><FilterTabs options={['الكل', 'التعليم الرقمي', 'استراتيجيات التدريس', 'القيادة التعليمية']} active={certificateFilter} onChange={setCertificateFilter} /><div className="certificate-grid">{certificates.filter(item => certificateFilter === 'الكل' || item.field === certificateFilter).map(item => <article className="certificate-card reveal" key={item.title}><div className="certificate-art"><div className="certificate-paper"><Icon name="award" size={33} /><span>شهادة إتمام</span><span className="cert-rule" /><small>نموذج توضيحي للشهادة</small></div></div><div className="certificate-info"><span className="card-category">{item.field}</span><h3>{item.title}</h3><p>{item.issuer}</p><div className="certificate-bottom"><span>{item.date} <span className="meta-separator">·</span> {item.hours}</span><button type="button" aria-label={`عرض ${item.title}`} onClick={() => setModal({ type: 'certificate', title: item.title, subtitle: `${item.issuer} · ${item.date} · ${item.hours}` })}><Icon name="expand" size={18} /></button></div></div></article>)}</div><p className="placeholder-note">الوثائق المعروضة نماذج بصرية. يمكن استبدالها بصور الشهادات الحقيقية لاحقًا.</p></div></section>

      <section className="section-pad awards-section" id="awards"><div className="container awards-layout"><div className="reveal"><SectionHeading kicker="تقدير أعتز به" title="الجوائز والتكريم" description="لحظات تقدير تذكّرني بأن العمل المخلص يترك أثرًا يُرى ويُقدّر." /><div className="awards-decor"><Icon name="award" size={75} /><span>تقديرٌ يلهم للمزيد</span></div></div><div className="awards-list">{awards.map(item => <article className="award-item reveal" key={item.title}><span className="award-icon"><Icon name="award" size={25} /></span><div><div className="award-title-row"><h3>{item.title}</h3><span>{item.year}</span></div><p>{item.issuer} · {item.reason}</p><small>{item.description}</small></div></article>)}</div></div></section>

      <section className="impact-section section-pad" id="impact"><div className="container"><div className="impact-header reveal"><SectionHeading kicker="ما يبقى بعد التجربة" title="أثر أفتخر به" description="لا تُقاس قيمة العمل بما أنجزناه فقط، بل بما تغيّر للأفضل بسببه." light /></div><div className="effects-grid">{effects.map(item => <div className="effect-card reveal" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><div className="effect-rule" /></div>)}</div></div></section>

      <section className="section-pad events-section" id="events"><div className="container"><div className="section-top reveal"><SectionHeading kicker="حضور ومشاركة" title="المشاركات والفعاليات" description="تجارب تجمع بين التعلّم، التعاون، وخدمة المجتمع التعليمي." /><span className="section-index">06 / المشاركات</span></div><div className="events-grid">{events.map(item => <article className="event-card reveal" key={item.title}><div className="event-image"><img src={item.image} alt={`صورة توضيحية: ${item.title}`} loading="lazy" /><span className="event-date">{item.date}</span></div><div className="event-content"><span className="card-category">{item.type}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></div></section>

      <section className="section-pad gallery-section" id="gallery"><div className="container"><div className="section-top reveal"><SectionHeading kicker="لحظات موثّقة" title="معرض الإنجازات" description="صور توضيحية تجسّد روح الأنشطة والمبادرات والفعاليات التعليمية." /><span className="section-index">07 / المعرض</span></div><FilterTabs options={['الكل', 'الأنشطة', 'المبادرات', 'التكريم', 'الفعاليات', 'الدورات']} active={galleryFilter} onChange={setGalleryFilter} /><div className="gallery-grid">{gallery.filter(item => galleryFilter === 'الكل' || item.category === galleryFilter).map(item => <button className="gallery-item reveal" key={item.title} type="button" onClick={() => setModal({ type: 'image', title: item.title, subtitle: `${item.category} · صورة توضيحية`, image: item.image })} aria-label={`تكبير صورة ${item.title}`}><img src={item.image} alt={`صورة توضيحية: ${item.title}`} loading="lazy" /><span className="gallery-overlay"><span><small>{item.category}</small><strong>{item.title}</strong></span><span className="gallery-expand"><Icon name="expand" size={20} /></span></span></button>)}</div></div></section>

      <section className="testimonials-section section-pad" id="testimonials"><div className="container testimonials-layout"><div className="reveal"><SectionHeading kicker="كلمات أعتز بها" title="كلمات وشهادات أعتز بها" description="مساحة لمقتطفات من خطابات الشكر والتوصيات عند إضافتها إلى الملف." /><span className="quote-mark">”</span></div><div className="quote-cards"><blockquote className="quote-card reveal"><p>« مثال لنص من خطاب شكر يسلّط الضوء على التفاني في العمل والمساهمة في تطوير البيئة التعليمية. »</p><footer><span className="quote-avatar"><Icon name="book" size={21} /></span><span><strong>اسم الجهة / المدرسة</strong><small>خطاب شكر · ٢٠٢٤</small></span></footer></blockquote><blockquote className="quote-card reveal"><p>« مثال لتوصية مهنية تُبرز روح التعاون والمبادرة وأثر المشاركة في مجتمع التعلّم. »</p><footer><span className="quote-avatar"><Icon name="users" size={21} /></span><span><strong>اسم الجهة / الإدارة</strong><small>توصية مهنية · ٢٠٢٣</small></span></footer></blockquote></div></div></section>

      <section className="contact-section section-pad" id="contact"><div className="container contact-grid"><div className="contact-copy reveal"><SectionHeading kicker="لنصنع أثرًا معًا" title="تواصل معي" description="يسعدني التواصل لتبادل الخبرات، ومناقشة الأفكار، وبناء فرص تعاون تُثري التعليم." light /><div className="contact-info"><div><span className="contact-icon"><Icon name="mail" size={21} /></span><span><small>البريد الإلكتروني</small><strong>{profile.email || 'يُضاف البريد الإلكتروني هنا'}</strong></span></div><div><span className="contact-icon"><Icon name="external" size={21} /></span><span><small>LinkedIn</small><strong>{profile.linkedin || 'يُضاف الرابط المهني هنا'}</strong></span></div></div><p className="contact-footnote">يرجى تحديث بيانات التواصل قبل نشر الموقع.</p></div><form className="contact-form reveal" onSubmit={submitContact}><h3>أرسل رسالة</h3><p>يسعدني أن أسمع منك. اترك رسالتك هنا.</p><div className="form-row"><label>الاسم الكامل<input name="name" type="text" placeholder="أدخل اسمك" required /></label><label>البريد الإلكتروني<input name="email" type="email" placeholder="example@email.com" dir="ltr" required /></label></div><label>الموضوع<input name="subject" type="text" placeholder="ما موضوع رسالتك؟" required /></label><label>الرسالة<textarea name="message" rows={4} placeholder="اكتب رسالتك هنا..." required /></label><button className="button button-green" type="submit">إرسال الرسالة <Icon name="arrowLeft" size={18} /></button>{formNotice && <p className="form-notice" role="status">{formNotice}</p>}</form></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark"><Icon name="book" size={24} /></span><span className="brand-copy"><strong>ملف الإنجاز</strong><small>مسيرة تصنع أثرًا</small></span></a><p>توثيق لمسيرة تعليمية تؤمن بأن الأثر الحقيقي يبدأ بفكرة، وينمو بالعطاء.</p></div><div className="footer-links"><h4>روابط سريعة</h4><div><a href="#about">نبذة عني</a><a href="#journey">المسيرة المهنية</a><a href="#achievements">الإنجازات</a><a href="#initiatives">المبادرات</a><a href="#certificates">الشهادات</a><a href="#contact">تواصل معي</a></div></div><div className="footer-cta"><h4>هل لديك فكرة أو فرصة تعاون؟</h4><p>باب التواصل مفتوح دائمًا لكل ما يصنع فرقًا في التعليم.</p><a href="#contact">لنبدأ الحديث <Icon name="arrowLeft" size={17} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name} — جميع الحقوق محفوظة</span><span>ملف الإنجاز الرقمي · المملكة العربية السعودية</span></div></div></footer>

    {modal && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setModal(null); }}><div className={`modal-panel ${modal.type === 'image' ? 'image-modal' : ''}`} role="dialog" aria-modal="true" aria-label={modal.title}><button className="modal-close" type="button" aria-label="إغلاق النافذة" onClick={() => setModal(null)}><Icon name="close" size={22} /></button>{modal.type === 'image' && modal.image && <img className="modal-image" src={modal.image} alt={`صورة توضيحية: ${modal.title}`} />}{modal.type === 'certificate' && <div className="modal-certificate"><Icon name="award" size={58} /><span>شهادة إتمام · نموذج توضيحي</span><h3>{modal.title}</h3><p>{modal.subtitle}</p><small>استبدل هذا النموذج بصورة الشهادة الأصلية عند توفرها</small></div>}<div className="modal-info"><span className="eyebrow"><span className="eyebrow-line" /> ملف الإنجاز</span><h3>{modal.title}</h3><p>{modal.subtitle}</p>{modal.body && <p>{modal.body}</p>}{modal.impact && <div className="modal-impact"><strong>الأثر والنتيجة</strong><span>{modal.impact}</span></div>}</div></div></div>}
  </div>;
}
