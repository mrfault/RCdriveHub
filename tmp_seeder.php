<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\{User, Brand, Category, Product, ProductImage, Part, PartImage, BuilderStep, BuilderOption, Setting, HeroSlide, NavItem, FooterGroup, FooterLink, ReassuranceItem};

class RcHubSeeder extends Seeder
{
    private function img($file, $w = 800) {
        return 'https://commons.wikimedia.org/wiki/Special:FilePath/' . rawurlencode($file) . '?width=' . $w;
    }

    public function run(): void
    {
        // Admin user
        User::updateOrCreate(['email' => 'admin@rchub.az'], [
            'name' => 'Admin',
            'password' => Hash::make('RcHub2026!'),
        ]);

        // Brands
        $brands = [];
        foreach (['ARRMA','AXIAL','LOSI','TRAXXAS','TEAM ASSOCIATED','TEKNO','PRO-LINE','SPEKTRUM','HOBBYWING','GENS ACE','CASTLE','SAVOX','RPM','LOUISE','YEAH RACING','PROTOFORM','MUGEN'] as $i => $name) {
            $brands[$name] = Brand::create(['slug' => strtolower(str_replace(' ', '-', $name)), 'name' => $name, 'is_featured' => $i < 8, 'sort_order' => $i]);
        }

        // Categories
        $cats = [];
        $catData = [
            ['monster', 'Monster Truck', 'product', 'truck', 64],
            ['crawler', 'Crawler', 'product', 'gauge', 42],
            ['buggy', 'Buggy', 'product', 'zap', 38],
            ['onroad', 'On-Road', 'product', 'flag', 51],
            ['short', 'Short Course', 'product', 'truck', 22],
            ['parts-general', 'Ehtiyat & Tuning', 'product', 'wrench', 1280],
            ['wheels', 'Təkərlər & Şinlər', 'part', 'gauge', 186],
            ['electronics', 'Elektronika', 'part', 'zap', 324],
            ['suspension', 'Süspansiyon', 'part', 'wrench', 92],
            ['chassis', 'Şassi & Gövdə', 'part', 'package', 148],
            ['drivetrain', 'Ötürmə & Dişli', 'part', 'bolt', 210],
            ['body', 'Kuzov & Aksesuar', 'part', 'flag', 176],
        ];
        foreach ($catData as $i => [$slug, $name, $type, $icon, $count]) {
            $cats[$slug] = Category::create(['slug'=>$slug,'name'=>$name,'type'=>$type,'icon'=>$icon,'product_count'=>$count,'sort_order'=>$i]);
        }

        // Products
        $products = [
            ['ara-kraton','ARRMA','monster','KRATON 6S EXB 4X4 Brushless Monster Truck RTR',733.53,839.52,'1/8','80+ km/s','sale','-13%',4.5,'Automodelo rc combustao off road monster truck.jpg'],
            ['axi-scx10','AXIAL','crawler','SCX10 III Base Camp 4WD Rock Crawler RTR',376.84,419.00,'1/10','20 km/s','sale','-10%',5.0,'Traxxas Slash.jpg'],
            ['los-typhon','LOSI','buggy','TLR Tuned TYPHON 4WD BLX Buggy RTR',604.09,null,'1/8','90+ km/s','new','YENİ',4.0,'Traxxas Jato.jpg'],
            ['ta-apex2','TEAM ASSOCIATED','onroad','Apex2 Sport Datsun 240Z RTR On-Road',299.46,323.97,'1/10','60 km/s','sale','-8%',4.5,'Radio controlled model car of Lamborghini Murci%C3%A9lago LP670-4 SV (7).JPG'],
            ['ara-infraction','ARRMA','onroad','INFRACTION 6S BLX All-Road Truck RTR',647.24,null,'1/7','100+ km/s','stock','STOKDA',4.5,'Radio controlled model car of MOTUL NISMO GT-R Ver.Tokachi 24h race (1).JPG'],
            ['tko-et48','TEKNO','buggy','ET48 2.0 4WD E-Truggy Kit',489.00,null,'1/8','85 km/s','preorder','SİFARİŞ ÜZRƏ',5.0,'E revo VXL.JPG'],
            ['los-promoto','LOSI','onroad','Promoto-SM FXR Supermoto Motorcycle RTR',578.20,null,'1/4','40 km/s','new','YENİ',4.0,'Traxxas Rustler Electric.jpg'],
            ['axi-capra','AXIAL','crawler','Capra 1.9 Unlimited Trail Buggy 4WD RTR',405.84,null,'1/10','18 km/s','stock','STOKDA',4.5,'TraxxasE-Maxx.JPG'],
            ['tra-slash','TRAXXAS','short','Slash 4X4 VXL Brushless Short Course Truck RTR',529.00,589.00,'1/10','95 km/s','sale','-10%',4.5,'Osaka Motor Show 2013 (225) YOKOMO Radio Control car.JPG'],
            ['mug-mbx8','MUGEN','buggy','MBX8R 4WD Nitro Racing Buggy Kit',712.40,765.00,'1/8','90+ km/s','sale','-7%',5.0,'TraxxasRCDemonstration2009BorgWarnerCrandon.jpg'],
        ];
        foreach ($products as $i => [$slug,$brand,$cat,$title,$price,$oldPrice,$scale,$speed,$badgeTone,$badgeLabel,$rating,$imgFile]) {
            $p = Product::create([
                'slug'=>$slug,'brand_id'=>$brands[$brand]->id,'category_id'=>$cats[$cat]->id,
                'title'=>$title,'price'=>$price,'old_price'=>$oldPrice,'scale'=>$scale,'speed'=>$speed,
                'badge_tone'=>$badgeTone,'badge_label'=>$badgeLabel,'rating'=>$rating,
                'description'=>'Trasaya hazır, suya davamlı brushless platforma.',
                'sort_order'=>$i,'is_active'=>true,
            ]);
            ProductImage::create(['product_id'=>$p->id,'url'=>$this->img($imgFile),'sort_order'=>0,'is_primary'=>true]);
        }

        // Parts
        $partsData = [
            ['p1','PRO-LINE','wheels','Masher 2.8" Tire (2)',46.00,57.50,'PRO10155','ARRMA Kraton / Outcast','sale','-20%','Automodelo rc combustao off road monster truck.jpg'],
            ['p2','HOBBYWING','electronics','EZRUN MAX5 G2 ESC + 800kV Motor Combo',403.95,449.00,'HW38010602','1/5 & 1/6 Brushless','sale','-10%','E revo VXL.JPG'],
            ['p3','SPEKTRUM','electronics','S6290 Digital HV Servo',78.40,null,'SPMSS6290','Universal 1/8','preorder','SİFARİŞ ÜZRƏ','Traxxas Rustler Electric.jpg'],
            ['p4','GENS ACE','electronics','5000mAh 4S 14.8V 60C LiPo',112.90,129.00,'GEA50004S60','EC5 plug','sale','-12%','TraxxasE-Maxx.JPG'],
            ['p5','TRAXXAS','chassis','Maxx Slash Alüminium Şassi',89.50,null,'TRA8922','Maxx Slash 1/8','new','YENİ','Traxxas Slash.jpg'],
            ['p6','RPM','suspension','A-Arm Üst/Alt Dəsti',34.20,null,'RPM80242','ARRMA 6S seriya','stock','STOKDA','Traxxas Jato.jpg'],
            ['p7','CASTLE','electronics','Mamba Monster X 8S ESC',524.00,null,'CSE010016200','1/6 & 1/5 Brushless','stock','STOKDA','A Traxxas T-Maxx 3.3 in action.jpg'],
            ['p8','PROTOFORM','body','Corvette C8 Kuzov',62.30,null,'PRM155830','190mm TC','new','YENİ','Traxxas Slash.jpg'],
            ['p9','SAVOX','electronics','SW-1211SG Waterproof Servo',96.70,109.00,'SAV1211SG','Universal','sale','-11%','Traxxas Rustler Electric.jpg'],
            ['p10','LOUISE','wheels','MT-Cyclone 1/8 Təkər (2)',54.80,null,'LOU3218SB','17mm Hex','stock','STOKDA','TraxxasRCDemonstration2009BorgWarnerCrandon.jpg'],
            ['p11','YEAH RACING','suspension','Alüminium Amortizator (4)',73.40,null,'YA0261BU','1/10 Universal','new','YENİ','Osaka Motor Show 2013 (225) YOKOMO Radio Control car.JPG'],
            ['p12','ARRMA','drivetrain','HD Çelik Ötürmə Dişli Dəsti',41.60,null,'ARA310997','Kraton / Outcast 6S','stock','STOKDA','Automodelo rc combustao off road monster truck.jpg'],
        ];
        foreach ($partsData as $i => [$slug,$brand,$cat,$title,$price,$oldPrice,$sku,$fit,$bt,$bl,$img]) {
            $pt = Part::create([
                'slug'=>$slug,'brand_id'=>$brands[$brand]->id,'category_id'=>$cats[$cat]->id,
                'title'=>$title,'price'=>$price,'old_price'=>$oldPrice,'sku'=>$sku,'fit'=>$fit,
                'badge_tone'=>$bt,'badge_label'=>$bl,'sort_order'=>$i,'is_active'=>true,
            ]);
            PartImage::create(['part_id'=>$pt->id,'url'=>$this->img($img, 400),'sort_order'=>0]);
        }

        // Builder steps + options
        $stepsData = ['BASE MODEL','MOTOR','BATTERY','TIRES','SUSPENSION','BODY SHELL'];
        $optionsData = [
            [['Monster Truck Şassi','1/8 miqyas · alüminium · 4WD',289],['Buggy Şassi','1/8 miqyas · karbon · 4WD',345],['Crawler Şassi','1/10 miqyas · çelik · portal ox',265],['On-Road Şassi','1/10 miqyas · alüminium · RWD',215]],
            [['Brushless 2200KV','Sensorlu · 4-pol · 6S uyğun',189],['Brushless 3500KV','Sensorsuz · yüksək RPM',145],['Brushless 1900KV','Sensorlu · yüksək tork · 8S',245],['Brushed 550 Titan','Klassik · 12T · büdcəyə uyğun',35]],
            [['4S 5000mAh 60C LiPo','Hardcase · EC5',89],['6S 5000mAh 100C LiPo','Hardcase · IC5 · yarış',149],['3S 5200mAh 50C LiPo','Softcase · Deans',65],['2S 7600mAh 75C LiPo','Shorty · uzun müddət',78]],
            [['Badlands MX43 Pro-Loc','All-terrain · köpüklü',56],['Hyrax 2.2" G8','Crawler · yapışqanlı',42],['Road Rage 3.8"','Belted · on-road',48],['Trencher LP 2.8"','Short course · universal',38]],
            [['Alüminium Big Bore (4)','16mm · yağ daxil',86],['GTR Uzun Amortizator (4)','Titan kaplı · 3 pozisiya',64],['Standart Plastik (4)','OEM · büdcə',24],['Emulsion Yarış (4)','Qaz təzyiqli · pro',112]],
            [['Agresiv Basher Kuzov','Şəffaf polikarbonat',45],['Scale Pickup Truck','Rəngli · LED hazır',68],['Race Aero Kuzov','Yüksək downforce',52],['Qapalı Crawler Gövdə','ABS · funksional qapılar',85]],
        ];
        foreach ($stepsData as $i => $label) {
            $s = BuilderStep::create(['label'=>$label,'step_number'=>$i+1,'sort_order'=>$i+1]);
            foreach ($optionsData[$i] as $oi => [$name,$desc,$price]) {
                BuilderOption::create(['builder_step_id'=>$s->id,'name'=>$name,'description'=>$desc,'price'=>$price,'sort_order'=>$oi]);
            }
        }

        // Settings
        $settings = [
            ['hero_eyebrow','SPRING WEEKS · 52%-Ə QƏDƏR ENDİRİM','text','hero'],
            ['hero_title_1','YOLSUZLUQLARI','text','hero'],
            ['hero_title_2','FƏTH ET','text','hero'],
            ['hero_description','Mövsümün ən güclü RC modelləri — palçıq, asfalt və qaya üçün hazır. İndi al, sabah sür.','text','hero'],
            ['hero_cta_primary','İNDİ AL','text','hero'],
            ['hero_cta_secondary','Hədiyyə bələdçisi','text','hero'],
            ['sale_title','52%-Ə QƏDƏR ENDİRİM','text','sale'],
            ['sale_eyebrow','SPRING WEEKS · BİTMƏK ÜZRƏ','text','sale'],
            ['splash_slogan_1','Böyüklərin','text','splash'],
            ['splash_slogan_2','kiçik arzuları','text','splash'],
            ['splash_subtitle','Davam etmək üçün klik edin','text','splash'],
            ['topbar_left','120 ₼-dən yuxarı pulsuz çatdırılma','text','topbar'],
            ['topbar_right1','Eyni gün göndəriş','text','topbar'],
            ['topbar_right2','200.000+ hissə stokda','text','topbar'],
            ['free_shipping_threshold','120','number','general'],
            ['music_volume','0.3','number','general'],
            ['footer_copyright','© 2026 RC DriveHub — bütün hüquqlar qorunur','text','footer'],
            ['footer_company','RC HUB Azerbaijan','text','footer'],
        ];
        foreach ($settings as [$key,$value,$type,$group]) {
            Setting::create(['key'=>$key,'value'=>$value,'type'=>$type,'group'=>$group,'label'=>$key]);
        }

        // Hero slides
        HeroSlide::create(['type'=>'video','url'=>'/assets/hero1.mp4','sort_order'=>0]);
        HeroSlide::create(['type'=>'video','url'=>'/assets/hero2.mp4','sort_order'=>1]);

        // Nav items
        $navData = [
            ['Modellər','catalog',null,null,false],
            ['Ehtiyat hissələri','finder',null,null,false],
            ['Tuning','tuning',null,null,false],
            ['RC BUILDER','builder','var(--flame-500)','en',true],
            ['Endirimlər','sale',null,null,false],
        ];
        foreach ($navData as $i => [$label,$route,$color,$lang,$anim]) {
            NavItem::create(['label'=>$label,'route'=>$route,'color'=>$color,'lang'=>$lang,'has_animation'=>$anim,'sort_order'=>$i]);
        }

        // Footer
        $mg = FooterGroup::create(['title'=>'Mağaza','sort_order'=>0]);
        foreach (['RC Modellər','Ehtiyat hissələri','Tuning','Elektronika','Endirimlər'] as $i => $l) {
            FooterLink::create(['footer_group_id'=>$mg->id,'label'=>$l,'sort_order'=>$i]);
        }
        $ds = FooterGroup::create(['title'=>'Dəstək','sort_order'=>1]);
        foreach (['Çatdırılma','Qaytarma','Hissə tap','Əlaqə','FAQ'] as $i => $l) {
            FooterLink::create(['footer_group_id'=>$ds->id,'label'=>$l,'sort_order'=>$i]);
        }

        // Reassurance
        $reassurance = [
            ['truck','Sürətli göndəriş','Eyni gün · 120 ₼-dən pulsuz'],
            ['shield','Rəsmi zəmanət','Bütün modellərə zəmanət'],
            ['wrench','Ekspert dəstək','Real RC-çilərdən məsləhət'],
            ['package','200.000+ hissə','Anbardan dərhal hazır'],
        ];
        foreach ($reassurance as $i => [$icon,$title,$sub]) {
            ReassuranceItem::create(['icon'=>$icon,'title'=>$title,'subtitle'=>$sub,'sort_order'=>$i]);
        }
    }
}
