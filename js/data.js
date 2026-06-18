/* RC HUB — shared catalog data.
   Imagery: CC-licensed RC photos hotlinked from Wikimedia Commons.
   TODO: For production, download images to /storage/uploads/images/ and update URLs.
   Hotlinking is fragile — URLs may change or be rate-limited at scale. */
const IMG = (file, w) => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(file) + '?width=' + (w || 800);
window.RCIMG = {
  heroAction: IMG('A Traxxas T-Maxx 3.3 in action.jpg', 1400),
  heroAction2: IMG('Automodelo rc combustao off road monster truck.jpg', 1400),
  demo: IMG('TraxxasRCDemonstration2009BorgWarnerCrandon.jpg', 1400),
};
window.RCDATA = {
  categories: [
    { id: 'monster', name: 'Monster Truck', count: 64, icon: 'truck' },
    { id: 'crawler', name: 'Crawler', count: 42, icon: 'gauge' },
    { id: 'buggy', name: 'Buggy', count: 38, icon: 'zap' },
    { id: 'onroad', name: 'On-Road', count: 51, icon: 'flag' },
    { id: 'short', name: 'Short Course', count: 22, icon: 'truck' },
    { id: 'parts', name: 'Ehtiyat & Tuning', count: 1280, icon: 'wrench' },
  ],
  brands: ['ARRMA', 'AXIAL', 'LOSI', 'TRAXXAS', 'TEAM ASSOCIATED', 'TEKNO', 'PRO-LINE', 'SPEKTRUM'],
  products: [
    { id: 'ara-kraton', image: IMG('Automodelo rc combustao off road monster truck.jpg'), brand: 'ARRMA', scale: '1/8', title: 'KRATON 6S EXB 4X4 Brushless Monster Truck RTR', price: '733,53 ₼', oldPrice: '839,52 ₼', badge: { tone: 'sale', label: '-13%' }, rating: 4.5, cat: 'monster', speed: '80+ km/s' },
    { id: 'axi-scx10', image: IMG('Traxxas Slash.jpg'), brand: 'AXIAL', scale: '1/10', title: 'SCX10 III Base Camp 4WD Rock Crawler RTR', price: '376,84 ₼', oldPrice: '419,00 ₼', badge: { tone: 'sale', label: '-10%' }, rating: 5, cat: 'crawler', speed: '20 km/s' },
    { id: 'los-typhon', image: IMG('Traxxas Jato.jpg'), brand: 'LOSI', scale: '1/8', title: 'TLR Tuned TYPHON 4WD BLX Buggy RTR', price: '604,09 ₼', badge: { tone: 'new', label: 'YENİ' }, rating: 4, cat: 'buggy', speed: '90+ km/s' },
    { id: 'ta-apex2', image: IMG('Radio controlled model car of Lamborghini Murciélago LP670-4 SV (7).JPG'), brand: 'TEAM ASSOCIATED', scale: '1/10', title: 'Apex2 Sport Datsun 240Z RTR On-Road', price: '299,46 ₼', oldPrice: '323,97 ₼', badge: { tone: 'sale', label: '-8%' }, rating: 4.5, cat: 'onroad', speed: '60 km/s' },
    { id: 'ara-infraction', image: IMG('Radio controlled model car of MOTUL NISMO GT-R Ver.Tokachi 24h race (1).JPG'), brand: 'ARRMA', scale: '1/7', title: 'INFRACTION 6S BLX All-Road Truck RTR', price: '647,24 ₼', badge: { tone: 'stock', label: 'STOKDA' }, rating: 4.5, cat: 'onroad', speed: '100+ km/s' },
    { id: 'tko-et48', image: IMG('E revo VXL.JPG'), brand: 'TEKNO', scale: '1/8', title: 'ET48 2.0 4WD E-Truggy Kit', price: '489,00 ₼', badge: { tone: 'preorder', label: 'SİFARİŞ ÜZRƏ' }, rating: 5, cat: 'buggy', speed: '85 km/s' },
    { id: 'los-promoto', image: IMG('Traxxas Rustler Electric.jpg'), brand: 'LOSI', scale: '1/4', title: 'Promoto-SM FXR Supermoto Motorcycle RTR', price: '578,20 ₼', badge: { tone: 'new', label: 'YENİ' }, rating: 4, cat: 'onroad', speed: '40 km/s' },
    { id: 'axi-capra', image: IMG('TraxxasE-Maxx.JPG'), brand: 'AXIAL', scale: '1/10', title: 'Capra 1.9 Unlimited Trail Buggy 4WD RTR', price: '405,84 ₼', badge: { tone: 'stock', label: 'STOKDA' }, rating: 4.5, cat: 'crawler', speed: '18 km/s' },
    { id: 'tra-slash', image: IMG('Osaka Motor Show 2013 (225) YOKOMO Radio Control car.JPG'), brand: 'TRAXXAS', scale: '1/10', title: 'Slash 4X4 VXL Brushless Short Course Truck RTR', price: '529,00 ₼', oldPrice: '589,00 ₼', badge: { tone: 'sale', label: '-10%' }, rating: 4.5, cat: 'short', speed: '95 km/s' },
    { id: 'mug-mbx8', image: IMG('TraxxasRCDemonstration2009BorgWarnerCrandon.jpg'), brand: 'MUGEN', scale: '1/8', title: 'MBX8R 4WD Nitro Racing Buggy Kit', price: '712,40 ₼', oldPrice: '765,00 ₼', badge: { tone: 'sale', label: '-7%' }, rating: 5, cat: 'buggy', speed: '90+ km/s' },
  ],
  parts: [
    { id: 'p1', image: IMG('Automodelo rc combustao off road monster truck.jpg', 400), brand: 'PRO-LINE', title: 'Masher 2.8" Tire (2) — Monster Truck', price: '46,00 ₼', oldPrice: '57,50 ₼', sku: 'PRO10155', fit: 'ARRMA Kraton / Outcast', cat: 'wheels', badge: { tone: 'sale', label: '-20%' } },
    { id: 'p2', image: IMG('E revo VXL.JPG', 400), brand: 'HOBBYWING', title: 'EZRUN MAX5 G2 ESC + 800kV Motor Combo', price: '403,95 ₼', oldPrice: '449,00 ₼', sku: 'HW38010602', fit: '1/5 & 1/6 Brushless', cat: 'electronics', badge: { tone: 'sale', label: '-10%' } },
    { id: 'p3', image: IMG('Traxxas Rustler Electric.jpg', 400), brand: 'SPEKTRUM', title: 'S6290 Digital HV Servo — High Torque', price: '78,40 ₼', sku: 'SPMSS6290', fit: 'Universal 1/8', cat: 'electronics', badge: { tone: 'preorder', label: 'SİFARİŞ ÜZRƏ' } },
    { id: 'p4', image: IMG('TraxxasE-Maxx.JPG', 400), brand: 'GENS ACE', title: '5000mAh 4S 14.8V 60C Hardcase LiPo', price: '112,90 ₼', oldPrice: '129,00 ₼', sku: 'GEA50004S60', fit: 'EC5 plug', cat: 'electronics', badge: { tone: 'sale', label: '-12%' } },
    { id: 'p5', image: IMG('Traxxas Slash.jpg', 400), brand: 'TRAXXAS', title: 'Maxx Slash Alüminium Şassi Lövhəsi', price: '89,50 ₼', sku: 'TRA8922', fit: 'Maxx Slash 1/8', cat: 'chassis', badge: { tone: 'new', label: 'YENİ' } },
    { id: 'p6', image: IMG('Traxxas Jato.jpg', 400), brand: 'RPM', title: 'A-Arm Üst/Alt Dəsti — Ön', price: '34,20 ₼', sku: 'RPM80242', fit: 'ARRMA 6S seriya', cat: 'suspension', badge: { tone: 'stock', label: 'STOKDA' } },
    { id: 'p7', image: IMG('A Traxxas T-Maxx 3.3 in action.jpg', 400), brand: 'CASTLE', title: 'Mamba Monster X 8S ESC', price: '524,00 ₼', sku: 'CSE010016200', fit: '1/6 & 1/5 Brushless', cat: 'electronics', badge: { tone: 'stock', label: 'STOKDA' } },
    { id: 'p8', image: IMG('Radio controlled model car of Lamborghini Murciélago LP670-4 SV (7).JPG', 400), brand: 'PROTOFORM', title: 'Corvette C8 Kuzov — 1/10 On-Road', price: '62,30 ₼', sku: 'PRM155830', fit: '190mm TC', cat: 'body', badge: { tone: 'new', label: 'YENİ' } },
    { id: 'p9', image: IMG('Radio controlled model car of MOTUL NISMO GT-R Ver.Tokachi 24h race (1).JPG', 400), brand: 'SAVOX', title: 'SW-1211SG Waterproof Digital Servo', price: '96,70 ₼', oldPrice: '109,00 ₼', sku: 'SAV1211SG', fit: 'Universal', cat: 'electronics', badge: { tone: 'sale', label: '-11%' } },
    { id: 'p10', image: IMG('TraxxasRCDemonstration2009BorgWarnerCrandon.jpg', 400), brand: 'LOUISE', title: 'MT-Cyclone 1/8 Monster Truck Təkər (2)', price: '54,80 ₼', sku: 'LOU3218SB', fit: '17mm Hex', cat: 'wheels', badge: { tone: 'stock', label: 'STOKDA' } },
    { id: 'p11', image: IMG('Osaka Motor Show 2013 (225) YOKOMO Radio Control car.JPG', 400), brand: 'YEAH RACING', title: 'Alüminium Amortizator Dəsti — 100mm (4)', price: '73,40 ₼', sku: 'YA0261BU', fit: '1/10 Universal', cat: 'suspension', badge: { tone: 'new', label: 'YENİ' } },
    { id: 'p12', image: IMG('Automodelo rc combustao off road monster truck.jpg', 400), brand: 'ARRMA', title: 'HD Çelik Ötürmə Dişli Dəsti', price: '41,60 ₼', sku: 'ARA310997', fit: 'Kraton / Outcast 6S', cat: 'drivetrain', badge: { tone: 'stock', label: 'STOKDA' } },
  ],
  tuningCategories: [
    { id: 'wheels', name: 'Təkərlər & Şinlər', count: 186, icon: 'gauge' },
    { id: 'electronics', name: 'Elektronika', count: 324, icon: 'zap' },
    { id: 'suspension', name: 'Süspansiyon', count: 92, icon: 'wrench' },
    { id: 'chassis', name: 'Şassi & Gövdə', count: 148, icon: 'package' },
    { id: 'drivetrain', name: 'Ötürmə & Dişli', count: 210, icon: 'bolt' },
    { id: 'body', name: 'Kuzov & Aksesuar', count: 176, icon: 'flag' },
  ],
};
