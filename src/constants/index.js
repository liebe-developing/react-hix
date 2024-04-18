import {
  instagram,
  orders,
  paymentGateway,
  products,
  profile,
  reports,
  settings,
  telegram,
  product1,
  product2,
  product3,
  product4,
  clientAvatar,
} from "../../public/dashboard/index";

const oneMonthPackage = [
  {
    ability: "تعداد مکالمه هوشمند",
    free: "100",
    economic: "500",
    professional: "1000 + 150 هدیه",
  },
  {
    ability: "حجم فایل ارسالی",
    free: "2 مگابایت",
    economic: "5 مگابایت",
    professional: "8 مگابایت",
  },
  {
    ability: "تعداد اپراتور",
    free: "2",
    economic: "4",
    professional: "8",
  },
  {
    ability: "گزارشات عملکرد ربات ",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "شخصی سازی ویجت",
    free: false,
    economic: true,
    professional: true,
  },
  { ability: "دسترسی API", free: false, economic: false, professional: false },
  {
    ability: "قابلیت اتصال به تلگرام",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "پیام های آماده ",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "فرم دریافت اطلاعات از کاربر",
    free: false,
    economic: false,
    professional: true,
  },
  {
    ability: "نمایش محصولات * (ویترین ساز)",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "امکان حذف متن تبلیغ هیکس",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "مسدودسازی کاربران مزاحم",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "ضبط و ارسال صدا",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "خروجی اکسل از گزارشات و اطلاعات",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "نگهداری تاریخچه مکالمات",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "امکان تغییر پکیج کاربری(کمتر از 48 ساعت)",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "قابلیت اتصال به واتساپ",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "کنترل کیفیت و رضایت مندی",
    free: false,
    economic: false,
    professional: true,
  },
  {
    ability: "اطلاعات بازدید کنندگان حین گفتگو",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "امکان پاسخ گویی مکالمات در 24 ساعت شبانه روز(حتی روزهای تعطیل)",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "اپلیکیشن تحت وب",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "گفتوگو همزمان با کاربران",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: " شخصی سازی لوگو ویجت",
    free: false,
    economic: false,
    professional: true,
  },
  {
    ability: "مانیتورینگ لحظه ای بازدیدکنندگان",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "پاسخ آماده با امکان شخصی سازی",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "وبینار رایگان آموزشی به همراه فایل های آماده",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "امکان دانلود فاکتور رسمی",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "کمک به سئو وبسایت *",
    free: false,
    economic: true,
    professional: true,
  },
  { ability: " وب هوک", free: false, economic: false, professional: false },
  {
    ability: "نمایش دسته بندی های سایت",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "مقایسه 2 محصول انتخابی کاربران ",
    free: false,
    economic: false,
    professional: false,
  },
  {
    ability: "امکان ارسال خودکار کد تخفیف",
    free: false,
    economic: false,
    professional: true,
  },
  {
    ability: "تعامل هوشمند با کاربران",
    free: false,
    economic: true,
    professional: true,
  },
  {
    ability: "مشاوره به کاربران با توجه به اطلاعات وبسایت",
    free: false,
    economic: true,
    professional: true,
  },
];

const sixMonthPackage = [
  { ability: "تعداد مکالمه هوشمند", economic: "3800", professional: "7600" },
  {
    ability: "حجم فایل ارسالی",
    economic: "2 مگابایت",
    professional: "5 مگابایت",
  },
  { ability: "تعداد اپراتور", economic: "8", professional: "10" },
  { ability: "گزارشات عملکرد ربات ", economic: false, professional: true },
  { ability: "شخصی سازی ویجت", economic: true, professional: true },
  { ability: "دسترسی API", economic: false, professional: true },
  { ability: "قابلیت اتصال به تلگرام", economic: false, professional: false },
  { ability: "پیام های آماده ", economic: true, professional: true },
  {
    ability: "فرم دریافت اطلاعات از کاربر",
    economic: true,
    professional: true,
  },
  {
    ability: "نمایش محصولات * (ویترین ساز)",
    economic: true,
    professional: true,
  },
  { ability: "امکان حذف متن تبلیغ هیکس", economic: false, professional: false },
  { ability: "مسدودسازی کاربران مزاحم", economic: true, professional: true },
  { ability: "ضبط و ارسال صدا", economic: true, professional: true },
  {
    ability: "خروجی اکسل از گزارشات و اطلاعات",
    economic: false,
    professional: true,
  },
  { ability: "نگهداری تاریخچه مکالمات", economic: false, professional: false },
  {
    ability: "امکان تغییر پکیج کاربری(کمتر از 48 ساعت)",
    economic: true,
    professional: true,
  },
  { ability: "قابلیت اتصال به واتساپ", economic: false, professional: false },
  { ability: "کنترل کیفیت و رضایت مندی", economic: false, professional: true },
  {
    ability: "اطلاعات بازدید کنندگان حین گفتگو",
    economic: true,
    professional: true,
  },
  {
    ability: "امکان پاسخ گویی مکالمات در 24 ساعت شبانه روز(حتی روزهای تعطیل)",
    economic: false,
    professional: false,
  },
  { ability: "اپلیکیشن تحت وب", economic: true, professional: true },
  { ability: "گفتوگو همزمان با کاربران", economic: true, professional: true },
  { ability: " شخصی سازی لوگو ویجت", economic: false, professional: true },
  {
    ability: "مانیتورینگ لحظه ای بازدیدکنندگان",
    economic: true,
    professional: true,
  },
  {
    ability: "پاسخ آماده با امکان شخصی سازی",
    economic: false,
    professional: false,
  },
  {
    ability: "وبینار رایگان آموزشی به همراه فایل های آماده",
    economic: true,
    professional: true,
  },
  { ability: "امکان دانلود فاکتور رسمی", economic: false, professional: false },
  { ability: "کمک به سئو وبسایت *", economic: true, professional: true },
  { ability: " وب هوک", economic: false, professional: false },
  { ability: "نمایش دسته بندی های سایت", economic: true, professional: true },
  {
    ability: "مقایسه 2 محصول انتخابی کاربران ",
    economic: false,
    professional: false,
  },
  {
    ability: "امکان ارسال خودکار کد تخفیف",
    economic: true,
    professional: true,
  },
  { ability: "تعامل هوشمند با کاربران", economic: true, professional: true },
  {
    ability: "مشاوره به کاربران با توجه به اطلاعات وبسایت",
    economic: true,
    professional: true,
  },
];

const oneYearPackage = [
  { ability: "تعداد مکالمه هوشمند", economic: "12000", professional: "23000" },
  {
    ability: "حجم فایل ارسالی",
    economic: "60 مگابایت",
    professional: "110 مگابایت",
  },
  { ability: "تعداد اپراتور", economic: "نامحدود", professional: "نامحدود" },
  { ability: "گزارشات عملکرد ربات ", economic: false, professional: true },
  { ability: "شخصی سازی ویجت", economic: true, professional: true },
  { ability: "دسترسی API", economic: false, professional: true },
  { ability: "قابلیت اتصال به تلگرام", economic: true, professional: true },
  { ability: "پیام های آماده ", economic: true, professional: true },
  {
    ability: "فرم دریافت اطلاعات از کاربر",
    economic: true,
    professional: true,
  },
  {
    ability: "نمایش محصولات * (ویترین ساز)",
    economic: true,
    professional: true,
  },
  { ability: "امکان حذف متن تبلیغ هیکس", economic: false, professional: true },
  { ability: "مسدودسازی کاربران مزاحم", economic: true, professional: true },
  { ability: "ضبط و ارسال صدا", economic: true, professional: true },
  {
    ability: "خروجی اکسل از گزارشات و اطلاعات",
    economic: false,
    professional: true,
  },
  { ability: "نگهداری تاریخچه مکالمات", economic: false, professional: false },
  {
    ability: "امکان تغییر پکیج کاربری(کمتر از 48 ساعت)",
    economic: true,
    professional: true,
  },
  { ability: "قابلیت اتصال به واتساپ", economic: false, professional: true },
  { ability: "کنترل کیفیت و رضایت مندی", economic: false, professional: true },
  {
    ability: "اطلاعات بازدید کنندگان حین گفتگو",
    economic: true,
    professional: true,
  },
  {
    ability: "امکان پاسخ گویی مکالمات در 24 ساعت شبانه روز(حتی روزهای تعطیل)",
    economic: false,
    professional: false,
  },
  { ability: "اپلیکیشن تحت وب", economic: true, professional: true },
  { ability: "گفتوگو همزمان با کاربران", economic: true, professional: true },
  { ability: " شخصی سازی لوگو ویجت", economic: false, professional: true },
  {
    ability: "مانیتورینگ لحظه ای بازدیدکنندگان",
    economic: true,
    professional: true,
  },
  {
    ability: "پاسخ آماده با امکان شخصی سازی",
    economic: false,
    professional: false,
  },
  {
    ability: "وبینار رایگان آموزشی به همراه فایل های آماده",
    economic: true,
    professional: true,
  },
  { ability: "امکان دانلود فاکتور رسمی", economic: true, professional: true },
  { ability: "کمک به سئو وبسایت *", economic: true, professional: true },
  { ability: " وب هوک", economic: false, professional: false },
  { ability: "نمایش دسته بندی های سایت", economic: true, professional: true },
  {
    ability: "مقایسه 2 محصول انتخابی کاربران ",
    economic: false,
    professional: true,
  },
  {
    ability: "امکان ارسال خودکار کد تخفیف",
    economic: true,
    professional: true,
  },
  { ability: "تعامل هوشمند با کاربران", economic: true, professional: true },
  {
    ability: "مشاوره به کاربران با توجه به اطلاعات وبسایت",
    economic: true,
    professional: true,
  },
];

const fistNavlinkData = [
  { title: "گزارش ها", desc: "آنالیزها و گزارش ها", icon: reports, link: "/dashboard/report" },
  { title: "محصولات", desc: "محصولات کسب و کار", icon: products, link: "/dashboard/product" },
  { title: "دستورات", icon: orders },
  {
    title: "اینستاگرام",
    desc: "اتصال پیج اینستاگرام به ربات",
    icon: instagram,
  },
];
const secondNavlinkData = [
  {
    title: "درگاه پرداخت",
    desc: "درگاه پرداخت متصل به کسب و کار",
    icon: paymentGateway,
  },
  { title: "تلگرام", desc: "اتصال به ربات تلگرامی", icon: telegram },
  { title: "تنظیمات", desc: "تنظیمات ربات هیکس دی ام", icon: settings },
  { title: "پروفایل", desc: "تنظیمات حساب کاربری", icon: profile },
];


const popularProducts = [
  { title: "محصول 1", quantity: 236, productImg: product1 },
  { title: "محصول 2", quantity: 210, productImg: product2 },
  { title: "محصول 3", quantity: 198, productImg: product3 },
  { title: "محصول 4", quantity: 145, productImg: product4 },
];

const popularClients = [
  {
    name: "علی زارعی",
    avatar: clientAvatar,
    username: "ali_zarei",
    totalPurchase: "123.000.000 هزارتومان",
  },
  {
    name: "علی زارعی",
    avatar: clientAvatar,
    username: "ali_zarei",
    totalPurchase: "123.000.000 هزارتومان",
  },
  {
    name: "علی زارعی",
    avatar: clientAvatar,
    username: "ali_zarei",
    totalPurchase: "123.000.000 هزارتومان",
  },
  {
    name: "علی زارعی",
    avatar: clientAvatar,
    username: "ali_zarei",
    totalPurchase: "123.000.000 هزارتومان",
  },
];

// -------------
// RULES 
// -------------

const rulesData = [
  { label: "هیکس یک سامانه گفتگوی آنلاین است که امکان ارتباط بین مدیران و اپراتورهای یک مجموعه با مخاطبانشان را فراهم می‌کند. این متن به منظور آشنایی کاربران با قوانین و مقررات استفاده از این سامانه تدوین شده است."},
  { label: "استفاده از سامانه هیکس تابع قوانین جمهوری اسلامی ایران، قانون تجارت الکترونیک و قانون حمایت از حقوق مصرف کننده است."},
  {
    label: "هیکس حق تغییر و اصلاح قوانین و مقررات خود را در هر زمان و بدون اطلاع قبلی دارد.کاربران موظف به رعایت کلیه قوانین و مقررات سامانه هیکس هستند."},
  { label: "هیکس در قبال محتوای سایت‌های دیگر که از طریق سامانه به آنها لینک داده می‌شود، هیچگونه مسئولیتی ندارد."},
  { label: "هیکس از اطلاعات کاربران به صورت محرمانه محافظت می‌کند و این اطلاعات را در اختیار هیچ شخص یا سازمانی قرار نمی‌دهد."},
  { label: "کاربران مسئول حفظ محرمانگی اطلاعات حساب کاربری خود هستند و در صورت افشا شدن اطلاعات، مسئولیت آن بر عهده خودشان خواهد بود."},
  {
    label: "کاربران موظف به ارائه اطلاعات صحیح و کامل در زمان ثبت نام و استفاده از سامانه هستند.هیکس هیچگونه مسئولیتی در قبال نقص امنیت تکنولوژی سامانه خود ندارد."},
  { label: "کاربران حق ارسال محتوای غیرقانونی، توهین‌آمیز، مغایر با شئونات اسلامی و اخلاقی و یا محتوای تبلیغاتی بدون مجوز را در سامانه هیکس ندارند."},
  { label: "کلیه محتویات سامانه هیکس از جمله متون، گرافیک، لوگو، اسکریپت‌ها و ... متعلق به هیکس بوده و مشمول حمایت‌های مقرر در قوانین مالکیت فکری داخلی و بین المللی می‌باشد."},
  { label: "هرگونه استفاده از محتویات سامانه هیکس بدون کسب مجوز کتبی از هیکس، غیرقانونی بوده و پیگرد قانونی خواهد داشت."},
  { label: "هر گونه اختلاف راجع به این قوانین و مقررات، از جمله انعقاد، اعتبار، تفسیر، فسخ، نقض و اجرای آن برای داوری به شورای نظام صنفی رایانه ای استان تهران ارجاع و نظر آن قطعی و لازم الاجراست."},
  { label: "هیکس در هیچ نقطه ای از کشور نمایندگی ندارد و کلیه سرویس ها، تراکنش های مالی و خدمات قابل ارائه فقط در سایت رسمی هیکس به آدرس hixdm.com می باشد."},
  { label: "در صورت مشاهده هرگونه تخلف و سوء استفاده از سایت، حق پیگرد قانونی برای هیکس محفوظ می باشد."},
  { label: "ارائه خدمات به افراد و سایتهایی که فعالیت آنها مغایر با قوانین کشور جمهوری اسلامی ایران باشد و یا اقدام به هر گونه تغییرات غیرمجاز در ابزارک هیکس یا ایجاد ترافیک و فشار غیرمتعارف به منابع سرور های هیکس بدون هماهنگی قبلی نمایند، میسر نخواهد بود."},

]

export {
  oneMonthPackage,
  sixMonthPackage,
  oneYearPackage,
  fistNavlinkData,
  secondNavlinkData,
  popularProducts,
  popularClients,
  rulesData
};
