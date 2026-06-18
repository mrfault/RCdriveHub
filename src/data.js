/* RC HUB — shared catalog data.
   Images self-hosted on /storage/uploads/products/ */
const P = (name) => '/storage/uploads/products/' + name;
export const RCIMG = {
  heroAction: P('a-traxxas-t-maxx-3.3-in-action.jpg'),
  heroAction2: P('automodelo-rc-combustao-off-road-monster-truck.jpg'),
  demo: P('traxxasrcdemonstration2009borgwarnercrandon.jpg'),
};
export const RCDATA = {
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
    { id: 'ara-kraton', image: P('automodelo-rc-combustao-off-road-monster-truck.jpg'), brand: 'ARRMA', scale: '1/8', title: 'KRATON 6S EXB 4X4 Brushless Monster Truck RTR', price: '733,53 ₼', oldPrice: '839,52 ₼', badge: { tone: 'sale', label: '-13%' }, rating: 4.5, cat: 'monster', speed: '80+ km/s' },
    { id: 'axi-scx10', image: P('traxxas-slash.jpg'), brand: 'AXIAL', scale: '1/10', title: 'SCX10 III Base Camp 4WD Rock Crawler RTR', price: '376,84 ₼', oldPrice: '419,00 ₼', badge: { tone: 'sale', label: '-10%' }, rating: 5, cat: 'crawler', speed: '20 km/s' },
    { id: 'los-typhon', image: P('traxxas-jato.jpg'), brand: 'LOSI', scale: '1/8', title: 'TLR Tuned TYPHON 4WD BLX Buggy RTR', price: '604,09 ₼', badge: { tone: 'new', label: 'YENİ' }, rating: 4, cat: 'buggy', speed: '90+ km/s' },
    { id: 'ta-apex2', image: P('lamborghini-rc.jpg'), brand: 'TEAM ASSOCIATED', scale: '1/10', title: 'Apex2 Sport Datsun 240Z RTR On-Road', price: '299,46 ₼', oldPrice: '323,97 ₼', badge: { tone: 'sale', label: '-8%' }, rating: 4.5, cat: 'onroad', speed: '60 km/s' },
    { id: 'ara-infraction', image: P('motul-nismo-rc.jpg'), brand: 'ARRMA', scale: '1/7', title: 'INFRACTION 6S BLX All-Road Truck RTR', price: '647,24 ₼', badge: { tone: 'stock', label: 'STOKDA' }, rating: 4.5, cat: 'onroad', speed: '100+ km/s' },
    { id: 'tko-et48', image: P('e-revo-vxl.jpg'), brand: 'TEKNO', scale: '1/8', title: 'ET48 2.0 4WD E-Truggy Kit', price: '489,00 ₼', badge: { tone: 'preorder', label: 'SİFARİŞ ÜZRƏ' }, rating: 5, cat: 'buggy', speed: '85 km/s' },
    { id: 'los-promoto', image: P('traxxas-rustler-electric.jpg'), brand: 'LOSI', scale: '1/4', title: 'Promoto-SM FXR Supermoto Motorcycle RTR', price: '578,20 ₼', badge: { tone: 'new', label: 'YENİ' }, rating: 4, cat: 'onroad', speed: '40 km/s' },
    { id: 'axi-capra', image: P('traxxase-maxx.jpg'), brand: 'AXIAL', scale: '1/10', title: 'Capra 1.9 Unlimited Trail Buggy 4WD RTR', price: '405,84 ₼', badge: { tone: 'stock', label: 'STOKDA' }, rating: 4.5, cat: 'crawler', speed: '18 km/s' },
    { id: 'tra-slash', image: P('osaka-motor-show-2013-(225)-yokomo-radio-control-car.jpg'), brand: 'TRAXXAS', scale: '1/10', title: 'Slash 4X4 VXL Brushless Short Course Truck RTR', price: '529,00 ₼', oldPrice: '589,00 ₼', badge: { tone: 'sale', label: '-10%' }, rating: 4.5, cat: 'short', speed: '95 km/s' },
    { id: 'mug-mbx8', image: P('traxxasrcdemonstration2009borgwarnercrandon.jpg'), brand: 'MUGEN', scale: '1/8', title: 'MBX8R 4WD Nitro Racing Buggy Kit', price: '712,40 ₼', oldPrice: '765,00 ₼', badge: { tone: 'sale', label: '-7%' }, rating: 5, cat: 'buggy', speed: '90+ km/s' },
  ],
  parts: [
    { id: 'p1', image: P('automodelo-rc-combustao-off-road-monster-truck.jpg'), brand: 'PRO-LINE', title: 'Masher 2.8" Tire (2) — Monster Truck', price: '46,00 ₼', oldPrice: '57,50 ₼', sku: 'PRO10155', fit: 'ARRMA Kraton / Outcast', cat: 'wheels', badge: { tone: 'sale', label: '-20%' } },
    { id: 'p2', image: P('e-revo-vxl.jpg'), brand: 'HOBBYWING', title: 'EZRUN MAX5 G2 ESC + 800kV Motor Combo', price: '403,95 ₼', oldPrice: '449,00 ₼', sku: 'HW38010602', fit: '1/5 & 1/6 Brushless', cat: 'electronics', badge: { tone: 'sale', label: '-10%' } },
    { id: 'p3', image: P('traxxas-rustler-electric.jpg'), brand: 'SPEKTRUM', title: 'S6290 Digital HV Servo — High Torque', price: '78,40 ₼', sku: 'SPMSS6290', fit: 'Universal 1/8', cat: 'electronics', badge: { tone: 'preorder', label: 'SİFARİŞ ÜZRƏ' } },
    { id: 'p4', image: P('traxxase-maxx.jpg'), brand: 'GENS ACE', title: '5000mAh 4S 14.8V 60C Hardcase LiPo', price: '112,90 ₼', oldPrice: '129,00 ₼', sku: 'GEA50004S60', fit: 'EC5 plug', cat: 'electronics', badge: { tone: 'sale', label: '-12%' } },
    { id: 'p5', image: P('traxxas-slash.jpg'), brand: 'TRAXXAS', title: 'Maxx Slash Alüminium Şassi Lövhəsi', price: '89,50 ₼', sku: 'TRA8922', fit: 'Maxx Slash 1/8', cat: 'chassis', badge: { tone: 'new', label: 'YENİ' } },
    { id: 'p6', image: P('traxxas-jato.jpg'), brand: 'RPM', title: 'A-Arm Üst/Alt Dəsti — Ön', price: '34,20 ₼', sku: 'RPM80242', fit: 'ARRMA 6S seriya', cat: 'suspension', badge: { tone: 'stock', label: 'STOKDA' } },
    { id: 'p7', image: P('a-traxxas-t-maxx-3.3-in-action.jpg'), brand: 'CASTLE', title: 'Mamba Monster X 8S ESC', price: '524,00 ₼', sku: 'CSE010016200', fit: '1/6 & 1/5 Brushless', cat: 'electronics', badge: { tone: 'stock', label: 'STOKDA' } },
    { id: 'p8', image: P('lamborghini-rc.jpg'), brand: 'PROTOFORM', title: 'Corvette C8 Kuzov — 1/10 On-Road', price: '62,30 ₼', sku: 'PRM155830', fit: '190mm TC', cat: 'body', badge: { tone: 'new', label: 'YENİ' } },
    { id: 'p9', image: P('motul-nismo-rc.jpg'), brand: 'SAVOX', title: 'SW-1211SG Waterproof Digital Servo', price: '96,70 ₼', oldPrice: '109,00 ₼', sku: 'SAV1211SG', fit: 'Universal', cat: 'electronics', badge: { tone: 'sale', label: '-11%' } },
    { id: 'p10', image: P('traxxasrcdemonstration2009borgwarnercrandon.jpg'), brand: 'LOUISE', title: 'MT-Cyclone 1/8 Monster Truck Təkər (2)', price: '54,80 ₼', sku: 'LOU3218SB', fit: '17mm Hex', cat: 'wheels', badge: { tone: 'stock', label: 'STOKDA' } },
    { id: 'p11', image: P('osaka-motor-show-2013-(225)-yokomo-radio-control-car.jpg'), brand: 'YEAH RACING', title: 'Alüminium Amortizator Dəsti — 100mm (4)', price: '73,40 ₼', sku: 'YA0261BU', fit: '1/10 Universal', cat: 'suspension', badge: { tone: 'new', label: 'YENİ' } },
    { id: 'p12', image: P('automodelo-rc-combustao-off-road-monster-truck.jpg'), brand: 'ARRMA', title: 'HD Çelik Ötürmə Dişli Dəsti', price: '41,60 ₼', sku: 'ARA310997', fit: 'Kraton / Outcast 6S', cat: 'drivetrain', badge: { tone: 'stock', label: 'STOKDA' } },
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
