// ============================================================
//  CENY SA NAČÍTAVAJÚ Z /_data/prices.json
// ============================================================

// Funkcia na načítanie prekladov po načítaní dát cien
async function loadTranslations() {
  try {
    const response = await fetch("../data/prices.json");
    if (!response.ok) {
      const errorUrl = new URL("../data/prices.json", import.meta.url);
      throw new Error(
        `HTTP error! status: ${response.status} fetching ${errorUrl.href}`
      );
    }
    const priceValues = await response.json();

    // Definícia prekladov bola sem presunutá
    const translations = {
      cs: {
        nav: {
          accommodation: "Ubytování",
          services: "Služby",
          rooms: "Pokoje",
          apartments: "Apartmány",
          playroom: "Herna",
          garden: "Zahrada",
          reservation: "Rezervace",
          prices: "Ceny",
          contact: "Kontakt",
        },
        home: {
          title:
            "Hledáte klidné místo uprostřed přírody, kam se budete rádi vracet Vy i Vaše děti?",
          description:
            "Náš rodinný penzion s jedinečnou atmosférou původní Jizerskohorské chalupy nabízí útulně zařízené komfortní pokoje a apartmány, společenskou místnost s krbem, bar, kuchyňku, dětskou hernu, lyžárnu, saunu a mnoho dalšího pro Vaši pohodovou dovolenou, víkend v přírodě nebo setkání s přáteli či rodinou.",
        },
        accommodation: {
          title: "Ubytování",
          rooms: "Pokoje",
          playroom: "Herna",
          garden: "Zahrada",
          apartments: "Apartmány",
          common_room: "Společenská místnost",
        },
        services: {
          title: "Služby",
          breakfast: {
            title: "Snídaně",
            description:
              "Celoročně nabízíme našim hostům vydatné a vyvážené snídaně, bohaté na bílkoviny, zdravé tuky, vlákninu, vitamíny a minerály. Na našem bufetovém stole najdete sladké i slané pečivo, toastový chléb, domácí koláč nebo palačinky, marmelády, med, nutelu, mléko, džusy, jogurty, vejce, několik druhů sýra a šunky, zeleninu, ovoce, cereálie apod.",
          },
          sauna: {
            title: "Sauna",
            description:
              "Pro příznivce saunování jsme před nedávnem vybudovali krásnou malou saunu s kamenným obložením, klenutým stropem, nápaditým osvětlením a dřevěnou ochlazovací kádí. Během správného saunování se uvolňuje napětí svalů, dýchací cesty, posílí se Vaše imunita a Váš organismus se celkově detoxikuje.",
          },
          parking: {
            title: "Parkování",
            description:
              "Parkoviště s asfaltovým povrchem se nachází přímo před penzionem a hosté ho mohou využívat po celou dobu pobytu zcela zdarma. Parkování před zahájením pobytu a po jeho skončení je možné po dohodě (eventuálně za příplatek).",
          },
          playground: {
            title: "Dětské hřiště",
            description:
              "Děti se zcela jistě zabaví na zahradě, která je plná atrakcí právě pro ně. Hřiště, pískoviště, domečky, houpačky, lezecí stěna a síť, trampolína, bazén a další prvky pro dětskou zábavu ocení rodiče i prarodiče malých i větších dětí.",
          },
        },
        prices: {
          title: "Ceny",
          table: {
            caption: "Ceny služeb",
            winter: "Zimní sezóna",
            summer: "Letní sezóna",
            special: "Silvestr, Jiz50, atd.",
            adults: "Dospělí",
            adults_winter: `${priceValues.adults_winter} Kč osoba/noc`,
            adults_summer: `${priceValues.adults_summer} Kč osoba/noc`,
            adults_special: `${priceValues.adults_special} Kč osoba/noc`,
            children_12: "Děti do 12 let",
            children_12_winter: `${priceValues.children_12_winter} Kč osoba/noc`,
            children_12_summer: `${priceValues.children_12_summer} Kč osoba/noc`,
            children_12_special: `${priceValues.children_12_special} Kč osoba/noc`,
            children_2: "Děti do 2 let", // Popisek zůstává
            free: " zdarma", // Text pro zobrazení zdarma zůstává
            extra_bed: "Přistýlka", // Změněno z "Extra Bed"
            extra_bed_winter: `${priceValues.extra_bed_winter} Kč osoba/noc`,
            extra_bed_summer: `${priceValues.extra_bed_summer} Kč osoba/noc`,
            extra_bed_special: `${priceValues.extra_bed_special} Kč osoba/noc`,
            adults_1night: "Dospělí na 1 noc",
            adults_1night_price: `${priceValues.adults_1night} Kč`,
            single_room: "Jednolůžkový pokoj",
            single_room_winter: `${priceValues.single_room_winter} Kč/noc`,
            single_room_summer: `${priceValues.single_room_summer} Kč/noc`,
            single_room_special: `${priceValues.single_room_special} Kč/noc`,
            apartment_surcharge: "Příplatek za apartmán",
            apartment_surcharge_price: `${priceValues.apartment_surcharge} Kč/noc`,
            breakfast_adults: "Snídaně dospělí",
            breakfast_adults_price: `${priceValues.breakfast_adults} Kč`,
            breakfast_children: "Snídaně děti",
            breakfast_children_price: `${priceValues.breakfast_children} Kč`,
            sauna: "Sauna (2 osoby)",
            sauna_price: `${priceValues.sauna} Kč`,
          },
          included: {
            title: "Ceny zahrnují: ",
            description:
              "Wifi v celém objektu, energii, vodu, odvoz odpadků, závěrečný úklid, ručníky, povlečení, TV/SAT, skladování kol a lyží, parkování, využití areálu.",
          },
          notIncluded: {
            title: "Ceny nezahrnují:",
            description:
              "Rekreační poplatek obci - sazba poplatku činí za osobu starší 18 let a každý den pobytu 35,- Kč.",
          },
          paymentTerms: {
            title: "Rezervace a platební podmínky:",
            description:
              "Rezervace ubytování je platná po zaplacení zálohy 20% z celkové ceny ubytování. Doplatek se hradí v hotovosti nebo převodem na účet v den nástupu k pobytu.",
          },
          cancellation: {
            title: "Storno podmínky:",
            rule1: "21 a více dní před příjezdem vracíme celou zálohu",
            rule2: "20-8 dní před příjezdem vracíme 25% ze zaplacené zálohy",
            rule3: "7 a méně dní před příjezdem zálohu již nevracíme",
          },
          arrival: {
            title: "Příjezd: ",
            description: "Zahájení pobytu od 15:00 hod.",
          },
          departure: {
            title: "Odjezd: ",
            description: "Vyklizení pokoje do 10:00 hod.",
          },
        },
        operating_rules: {
          title: "Provozní řád",
          rule1:
            "1. V penzionu může být ubytován pouze host, který je k ubytování přihlášen po předložení občanského průkazu, platného cestovního pasu nebo jiného dokladu o totožnosti.",
          rule2:
            "2. Užívání hotelového zařízení je dovoleno osobám, které nejsou postiženi infekčními nemocemi.",
          rule3:
            "3. Požádá-li ubytovaný host o prodloužení doby pobytu, může mu být nabídnutý jiný pokoj než ten, ve kterém byl původně ubytován.",
          rule4:
            "4. Host užívá pokoj po dobu, kterou sjednal při příchodu. Nebyla-li doba pobytu sjednána jinak, pokoje jsou připraveny od 15:00 hod, poslední den pobytu host uvolní pokoj nejpozději do 10:00 hod. Pokud provoz penzionu dovoluje, je možno domluvit i pozdější hodinu pro uvolnění pokoje.",
          rule5:
            "5. V době od 22:00 hod do 7:00 hod je host povinen dodržovat noční klid.",
          rule6:
            "6. Za pobyt a poskytnuté služby je ubytovaný host povinen platit ceny v souladu s platným ceníkem zpravidla při příchodu.",
          rule7:
            "7. Donášení a konzumace vlastních nápojů a potravin do prostor restaurace není dovoleno.",
          rule8:
            "8. V pokoji a společných prostorách nesmí host bez souhlasu majitele přemisťovat zařízení, provádět opravy a jakékoliv zásahy do elektrické sítě nebo jiné instalace.",
          rule9:
            "9. Není dovoleno užívat vlastních elektrospotřebičů (např. varné konvice, vařiče, toustovače apod.) Vyjímkou jsou holící a masážní strojky, vysoušeče vlasů, kulmy, rádia. Za použití povolených spotřebičů zodpovídá host a ručí za jakékoliv škody způsobené jejich provozem.",
          rule10:
            "10. Při odchodu z pokoje je host povinen uzavřít vodovodní uzávěry, zhasnout světla, vypnout televizi, uzavřít okna a při ukončení pobytu odevzdat klíč.",
          rule11:
            "11. Není dovoleno donášet na pokoje sportovní nářadí a předměty (lyže, sáňky, kola), pro jejichž uschování je vyhrazeno jiné místo.",
          rule12:
            "12. Z bezpečnostních důvodů není dovoleno ponechávat děti bez dozoru dospělé osoby v pokoji a ostatních prostorách pensionu. Rodiče odpovídají za bezpečnost svých dětí ve všech prostorech penzionu i v jeho venkovní části.",
          rule13:
            "13. Za škody způsobené na majetku penzionu odpovídá host v plném rozsahu.",
          rule14:
            "14. Malá domácí zvířata mohou být umístěna v prostorách penzionu jen se souhlasem majitele.Majitel zvířete je povinen prokázat jeho nezávadný zdravotní stav předložením platného očkovacího průkazu. Psům a jiným zvířatům je zakázán vstup v těch prostorách, kde jsou skladovány potraviny, připravována nebo podávána jídla a nápoje. Ve všech veřejných prostorách mají psi mít náhubek a být na vodítku. Není dovoleno, aby zvířata byla ponechána v pokoji bez dozoru svého majitele Zvířata nesmí ležet na lůžku nebo ostatním zařízení pro hosty, musí mít svůj pelech. Nelze užívat vany, sprchy nebo umyvadla ke koupání nebo mytí zvířat. Ke krmení zvířat nesmí být používán inventář, který slouží hostům. Majitel zvířete odpovídá za dodržování nočního klidu od 22:00 hod do 07:00 hod.",
          rule15:
            "15. Penzion odpovídá za věci vnesené hostem do pensionu, za škodu na odložených věcech, pokud tyto věci byly uloženy na místě k tomu vyhrazeném. Za peníze a cenné věci odpovídá penzion jen tehdy, převzal-li je do úschovy proti potvrzení.",
          rule16:
            "16. Snídaně se podává v restaurace od 08:00 do 10:00 hod po předchozí domluvě s personálem.",
          rule17:
            "17. Pokud host odchází z penzionu v nočních hodinách, kdy není v provozu restaurace, je povinen zhasnout světla na schodišti a zamknout budovu.",
          rule18:
            "18. Každý ubytovaný host je povinen dodržovat tento ubytovací řád i požární řád.V případě, že jej závažným způsobem poruší, má majitel penzionu právo smluvní poměr s ním ukončit bez náhrady.",
        },
        rooms: {
          title: "Pokoje",
          room: "Pokoj",
          room1: "Pokoj č.1",
          room2: "Pokoj č.2",
          room3: "Pokoj č.3",
          room4: "Pokoj č.4",
          room5: "Pokoj č.5",
          room6: "Pokoj č.6",
          room7: "Pokoj č.7",
          three_beds: "3 lůžka",
          two_beds: "2 lůžka",
          four_beds: "4 lůžka",
          six_beds: "6 lůžek", // Doplněno z EN/DE verze
          wc: "sprcha + wc",
          wc_apartment: "sprcha + vana + wc",
          tv: "televize na pokoji",
          refrigerator: "lednice",
          wifi: "wifi na celém pokoji",
          parking: "parkovací místo",
          rooms_text:
            "Dvoulůžkové a třílůžkové pokoje, tak jako i čtyřlůžkový pokoj se nacházejí v prvním patře našeho penzionu a jsou tak dostatečně vzdálené od společenské místnosti a ostatních společných prostor, což umožňuje našim hostům klidný a nerušený pobyt. Všechny pokoje jsou zařízené nábytkem z masivu v přírodním odstínu, manželskou postelí, šatní skříní, stolkem a židlemi, nočními stolky a poličkami. Třílůžkové pokoje mají ještě jednolůžkovou postel, čtyřlůžkový pokoj je vybaven palandou taktéž z masivního dřeva. Pro Váš komfort je v každém pokoji malá hotelová lednička, rychlovarná konvice, hrnečky na čaj, TV a fén na vlasy. Do každého pokoje je možné na vyžádání přidat dětskou dřevěnou postýlku s peřinkami, dětské prkénko, nočník nebo stupátko pod umyvadlo.",
          apartments: "Apartmány", // Změněno z "Apartments"
          apartment: "Apartmán", // Změněno z "Apartment"
          apartment67: "Apartmán č.67",
          apartment68: "Apartmán č.68",
          apartments_text:
            "Oba nadstandardně zařízené apartmány se nacházejí v podkroví našeho penzionu a umožňují tak krásný výhled na okolní krajinu. Každý apartmán je dvoupokojový a je vybavený nábytkem z masivu v přírodním odstínu, manželskou postelí, jednolůžko ze stejného materiálu, šatní skříní, jídelním stolem, židlemi, křeslem nebo gaučem, TV, moderní kuchyní a prostornou koupelnou. Do každého apartmánu je možné na vyžádání přidat dětskou dřevěnou postýlku s peřinkami, dětskou jídelní židličku, dětské prkénko, nočník, vaničku nebo stupátko pod umyvadlo.",
        },
        playroom: {
          title: "Herna",
          text: "Náš penzion je často vyhledáván rodinami s malými dětmi a to především díky veliké a dobře vybavené dětské herně. Herna je od jídelny oddělena prosklenými dveřmi, takže rodiče, kteří si chtějí v klidu vychutnat šálek kávy nebo čaje u stolu v jídelně  mají své ratolesti stále na dohled.",
        },
        garden: {
          title: "Zahrada",
          text: "Zahrada penzionu je ideální pro rodinné pobyty s dětmi. Na zahradě se nachází dětské houpačky, pískoviště, dětský hrad, hrazdy, lezecí síť,  trampolína, lehátka a bazén. Celá zahrada je pokryta přírodním travnatým povrchem, na kterém je možnost provozovat spousty aktivit od klasických dětských her a radovánek, až po ping-pong, badminton, petang, frisbee apod. Terasa před penzionem vybízí především v horkých letních dnech k večernímu posezení, ohniště v dolní části zahrady láká k opékání buřtů a trávení krásných chvil u večerního táboráku.",
        },
        common_room: {
          title: "Společenská místnost",
          text: "Společenská místnost s krbem, TV a samoobslužným barem, ve kterém najdete nealko i alko nápoje a něco malého k zakousnutí, slouží také jako jídelna, kde se podávají snídaně a využívána je také k večernímu posezení, případně k rodinným oslavám a setkáním s přáteli. Její součástí je i vybavený kuchyňský kout, kde je možné připravit si vlastní pokrmy, což ocení především rodiče malých dětí.",
        },
        contact: {
          title: "Kontakty",
          address: "Adresa",
          telephone: "Telefon",
          map: {
            consentText:
              "Abychom vám mohli zobrazit mapu, musíme načíst obsah od Google Maps, který může nastavovat cookies. Kliknutím na tlačítko níže souhlasíte s jejich použitím.",
            acceptButton: "Přijmout",
          },
        },
        reservation: {
          arrival: "Příjezd",
          departure: "Odjezd",
          adults: "Dospělí",
          children: "Děti",
          title: "Rezervace",
          firstname: "Jméno",
          lastname: "Příjmení",
          email: "Email",
          phone: "Telefon",
          date: "Datum",
          room: "Pokoj",
          message: "Zpráva",
          submit: "Odeslat",
          select_room: "-- Vyberte pokoj --",
          privacy_notice: "Prosíme, přečtěte si naše",
          privacy_policy: "Prohlášení o ochraně osobních údajů",
          consent_text:
            "Přečetl jsem si a souhlasím se zpracováním osobních údajů",
          submission_success:
            "Děkujeme za odeslání poptávky! Brzy se Vám ozveme.",
        },
        privacy: {
          title: "Ochrana dat",
          whatDataTitle: "Jaké osobní údaje shromažďujeme?",
          whatDataIntro:
            "Prostřednictvím našeho formuláře pro nezávaznou rezervaci shromažďujeme následující osobní údaje:",
          dataName: "Jméno a příjmení",
          dataEmail: "E-mailová adresa",
          dataPhone: "Telefonní číslo",
          whyDataTitle: "Proč tyto údaje shromažďujeme?",
          whyDataText:
            "Údaje shromažďujeme výhradně za účelem zpracování vaší nezávazné rezervace a případné komunikace s vámi. Právním základem pro zpracování osobních údajů je čl. 6 odst. 1 písm. b) GDPR – plnění smlouvy nebo předsmluvních opatření.",
          howLongTitle: "Jak dlouho údaje uchováváme?",
          howLongText:
            "Vaše údaje uchováváme po dobu nezbytnou k vyřízení rezervace, maximálně však 6 měsíců. Poté budou bezpečně smazány.",
          whoShareTitle: "Komu údaje poskytujeme?",
          whoShareText:
            "Vaše osobní údaje nejsou poskytovány žádné třetí straně.",
          securityTitle: "Jak údaje chráníme?",
          securityText:
            "Osobní údaje jsou uchovávány v zabezpečeném systému a nejsou zpřístupněny neoprávněným osobám.",
          rightsTitle: "Jaká jsou vaše práva?",
          rightsText: "Máte právo požádat o:",
          rightsAccess: "přístup k vašim údajům,",
          rightsCorrection: "opravu nepřesných údajů,",
          rightsDeletion: "výmaz údajů, pokud již nejsou potřebné.",
          rightsContact:
            "Kontaktujte nás našem e-mailu a vaši žádost vyřídíme.",
          complaintTitle: "Možnost podání stížnosti",
          complaintText:
            "Pokud se domníváte, že bylo s vašimi osobními údaji nakládáno v rozporu s právními předpisy, máte právo podat stížnost u Úřadu pro ochranu osobních údajů (www.uoou.cz).",
          contactTitle: "Kontakt",
          contactText:
            "Pokud máte jakékoli dotazy ohledně zpracování vašich osobních údajů, neváhejte nás kontaktovat na našem emailu harmonie-bedrichov@centrum.cz",
        },
      },
      en: {
        nav: {
          accommodation: "Accommodation",
          reservation: "Reservation",
          prices: "Prices",
          contact: "Contact",
          services: "Services",
          rooms: "Rooms",
          apartments: "Apartments",
          playroom: "Playroom",
          garden: "Garden",
        },
        home: {
          title:
            "Looking for a peaceful place in nature where you and your children will love to return?",
          description:
            "Our family pension with the unique atmosphere of an original Jizera Mountains cottage offers cozy and comfortable rooms and apartments, a common room with a fireplace, bar, kitchen, children's playroom, ski storage, sauna, and much more for your relaxing holiday, weekend in nature, or meeting with friends and family.",
        },
        accommodation: {
          title: "Accommodation",
          rooms: "Rooms",
          playroom: "Playroom",
          garden: "Garden",
          apartments: "Apartments",
          common_room: "Common Room",
        },
        services: {
          title: "Services",
          breakfast: {
            title: "Breakfast",
            description:
              "Throughout the year, we offer our guests hearty and balanced breakfasts, rich in protein, healthy fats, fiber, vitamins, and minerals. On our buffet table, you'll find sweet and savory pastries, toast bread, homemade cake or pancakes, jams, honey, Nutella, milk, juices, yogurts, eggs, several types of cheese and ham, vegetables, fruit, cereals, etc.",
          },
          sauna: {
            title: "Sauna",
            description:
              "For sauna enthusiasts, we recently built a beautiful small sauna with stone cladding, vaulted ceiling, creative lighting, and a wooden cooling tub. During proper sauna use, muscle tension is released, airways are cleared, your immunity is strengthened, and your body undergoes overall detoxification.",
          },
          parking: {
            title: "Parking",
            description:
              "The asphalt parking lot is located directly in front of the guesthouse and guests can use it free of charge for the entire duration of their stay. Parking before the start of the stay and after its end is possible by arrangement (possibly for an additional fee).",
          },
          playground: {
            title: "Children's Playground",
            description:
              "Children will surely enjoy themselves in the garden, which is full of attractions just for them. Playground, sandbox, playhouses, swings, climbing wall and net, trampoline, pool, and other elements for children's entertainment will be appreciated by parents and grandparents of both small and older children.",
          },
        },
        prices: {
          title: "Prices",
          table: {
            caption: "Service Prices",
            winter: "Winter Season",
            summer: "Summer Season",
            special: "New Year's Eve, Jiz50, etc.",
            adults: "Adults",
            adults_winter: `${priceValues.adults_winter} CZK per person/night`,
            adults_summer: `${priceValues.adults_summer} CZK per person/night`,
            adults_special: `${priceValues.adults_special} CZK per person/night`,
            children_12: "Children under 12",
            children_12_winter: `${priceValues.children_12_winter} CZK per person/night`,
            children_12_summer: `${priceValues.children_12_summer} CZK per person/night`,
            children_12_special: `${priceValues.children_12_special} CZK per person/night`,
            children_2: "Children under 2", // Label remains
            free: " free", // Text for free display remains
            extra_bed: "Extra Bed",
            extra_bed_winter: `${priceValues.extra_bed_winter} CZK per person/night`,
            extra_bed_summer: `${priceValues.extra_bed_summer} CZK per person/night`,
            extra_bed_special: `${priceValues.extra_bed_special} CZK per person/night`,
            adults_1night: "Adults for 1 night",
            adults_1night_price: `${priceValues.adults_1night} CZK`,
            single_room: "Single Room",
            single_room_winter: `${priceValues.single_room_winter} CZK per night`,
            single_room_summer: `${priceValues.single_room_summer} CZK per night`,
            single_room_special: `${priceValues.single_room_special} CZK per night`,
            apartment_surcharge: "Apartment Surcharge",
            apartment_surcharge_price: `${priceValues.apartment_surcharge} CZK per night`,
            breakfast_adults: "Breakfast Adults",
            breakfast_adults_price: `${priceValues.breakfast_adults} CZK`,
            breakfast_children: "Breakfast Children",
            breakfast_children_price: `${priceValues.breakfast_children} CZK`,
            sauna: "Sauna (2 persons)",
            sauna_price: `${priceValues.sauna} CZK`,
          },
          included: {
            title: "Prices include:",
            description:
              "WiFi throughout the property, energy, water, garbage collection, final cleaning, towels, bedding, TV/SAT, bike and ski storage, parking, use of the premises.",
          },
          notIncluded: {
            title: "Prices do not include:",
            description:
              "Municipal tourist tax - the fee rate is 35 CZK per person over 18 years old per day of stay.",
          },
          paymentTerms: {
            title: "Reservation and Payment Terms:",
            description:
              "The accommodation reservation is valid after paying a deposit of 20% of the total accommodation price. The balance is paid in cash or by bank transfer on the day of arrival.",
          },
          cancellation: {
            title: "Cancellation Policy: ",
            rule1: "21 or more days before arrival - full deposit refund",
            rule2: "20-8 days before arrival - 25% of the deposit refund",
            rule3: "7 days or less before arrival - no deposit refund",
          },
          arrival: {
            title: "Check-in:",
            description: "Starting from 3:00 PM",
          },
          departure: {
            title: "Check-out:",
            description: "Until 10:00 AM",
          },
        },
        operating_rules: {
          title: "Operating Rules",
          rule1:
            "1. Only guests who are registered for accommodation may be accommodated in the guesthouse upon presentation of an ID card, valid passport or other proof of identity.",
          rule2:
            "2. Persons who are not affected by infectious diseases are allowed to use the hotel facilities.",
          rule3:
            "3. If a guest requests an extension of his/her stay, he/she may be offered a room other than the one in which he/she was originally accommodated.",
          rule4:
            "4. The guest shall use the room for the period of time agreed upon upon arrival. Unless otherwise agreed, rooms are ready from 15:00, on the last day of the stay the guest vacates the room by 10:00 at the latest. If the guest house operation allows, it is possible to arrange a later time for the room release.",
          rule5:
            "5. The guest is obliged to observe the night quiet from 10:00 pm to 7:00 am",
          rule6:
            "6. The guest is obliged to pay for the stay and services provided in accordance with the current price list, usually upon arrival.",
          rule7:
            "7. The guest is not allowed to bring and consume their own drinks and food in the restaurant.",
          rule8:
            "8. In the room and common areas, the guest is not allowed to move equipment, make repairs or any interference with the electrical network or other installations without the owner's consent.",
          rule9:
            "9. It is not allowed to use own electrical appliances (e.g. kettles, cookers, toasters, etc.) Exceptions are shavers and massagers, hair dryers, curling irons, radios. The guest is responsible for the use of permitted appliances and is liable for any damage caused by their operation.",
          rule10:
            "10. When leaving the room, the guest is obliged to close the water taps, turn off the lights, turn off the TV, close the windows and hand over the key at the end of the stay.",
          rule11:
            "11. It is not allowed to bring sports equipment and items (skis, sledges, bicycles) to the rooms, for which another place is reserved.",
          rule12:
            "12. For safety reasons it is not allowed to leave children without adult supervision in the room and other areas of the pension. Parents are responsible for the safety of their children in all areas of the guesthouse and its outdoor areas.",
          rule13:
            "13. The guest is fully responsible for any damage caused to the property of the guesthouse.",
          rule14:
            "14. Small pets can be placed in the premises of the guesthouse only with the consent of the owner.The owner of the pet is obliged to prove its safe health condition by presenting a valid vaccination certificate. Dogs and other animals are not allowed in areas where food is stored, prepared or served. Dogs are to be muzzled and leashed in all public areas. Animals are not allowed to be left in the room without the supervision of their owner Animals are not allowed to lie on the bed or other guest facilities, they must have their own bed. Baths, showers or sinks cannot be used for bathing or washing animals. Inventory that is used to feed the animals may not be used to feed the guests. The owner of the animal is responsible for observing the night-time curfew from 22:00 to 07:00.",
          rule15:
            "15. The guesthouse is responsible for items brought into the guesthouse by the guest, for damage to the items left behind, if these items have been stored in a place reserved for this purpose. The guest house is only liable for money and valuable items if it has taken them into custody against a receipt.",
          rule16:
            "16. Breakfast is served in the restaurant from 08:00 to 10:00 by prior arrangement with the staff.",
          rule17:
            "17. If a guest leaves the guesthouse at night when the restaurant is not open, he/she is obliged to turn off the lights in the staircase and lock the building.",
          rule18:
            "18. Each guest is obliged to comply with these accommodation rules and fire regulations. In the event of a serious breach of these rules and regulations, the owner of the guesthouse has the right to terminate the contractual relationship with the guest without compensation.",
        },
        rooms: {
          title: "Rooms",
          room: "Room",
          room1: "Room No.1",
          room2: "Room No.2",
          room3: "Room No.3",
          room4: "Room No.4",
          room5: "Room No.5",
          room6: "Room No.6",
          room7: "Room No.7",
          three_beds: "3 beds",
          two_beds: "2 beds",
          four_beds: "4 beds",
          six_beds: "6 beds",
          wc: "shower + wc",
          wc_apartment: "shower + bath + wc",
          tv: "TV in the room",
          refrigerator: "refrigerator",
          wifi: "wifi in the room",
          parking: "parking space",
          rooms_text:
            "Double and triple rooms, as well as a quadruple room are located on the first floor of our guesthouse and are thus far enough away from the social room and other common areas, allowing our guests a quiet and undisturbed stay. All rooms are furnished with solid wood furniture in a natural shade, a double bed, wardrobe, table and chairs, bedside tables and shelves. Triple rooms have a single bed, the quadruple room is equipped with a bunk bed as well made of solid wood. For your comfort there is a small hotel fridge in each room, electric kettle, tea cups, TV and hairdryer. Each room can be on request, a wooden cot with blankets, a child's bed, a potty or step stool under the sink.",
          apartments: "Apartments",
          apartment: "Apartment",
          apartment67: "Apartment No.67",
          apartment68: "Apartment No.68",
          apartments_text:
            "Both luxuriously furnished apartments are located in the attic of our guesthouse and allow a beautiful view of the surrounding countryside. Each apartment is a two-room of the same material, wardrobe, dining table, chairs, armchair or sofa, TV, a modern kitchen and a spacious bathroom.Each apartment can be On request, a wooden cot with blankets, a highchair for children can be added to each apartment, A baby board, potty, bath tub or step stool under the sink.",
        },
        playroom: {
          title: "Playroom",
          text: "Our guesthouse is often popular with families with small children, especially thanks to the large and well-equipped children's playroom. The playroom is separated from the dining room by a glass door, so parents who want to enjoy a cup of coffee or tea at the dining room table can always keep their little ones in sight. ",
        },
        garden: {
          title: "Garden",
          text: "The garden is ideal for family stays with children. In the garden there are children's swings, sandpit, children's castle, trapeze, climbing net, trampoline, deck chairs and swimming pool. The entire garden is covered with natural grass surface, on which there is a possibility to practice a lot of activities from classic children's games and fun, to ping-pong, badminton, petanque, frisbee, etc. The terrace in front of the guesthouse invites especially on hot summer days for evening sitting, the fireplace in the lower part of the garden invites to roasting sausages and spending beautiful moments at the evening campfire. ",
        },
        common_room: {
          title: "Common Room",
          text: "The lounge with a fireplace, TV and a self-service bar, where you can find soft and alcoholic drinks and small snacks, also serves as a dining room, where breakfast is served and is also used for evening gatherings, or for family celebrations and meetings with friends. It also includes an equipped kitchenette where you can prepare your own meals, which will be especially appreciated by parents of young children.",
        },
        contact: {
          title: "Contact",
          address: "Address",
          telephone: "Telephone",
          map: {
            consentText:
              "To show you the map, we need to load content from Google Maps, which may set cookies. By clicking the button below, you agree to their use.",
            acceptButton: "Accept",
          },
        },
        reservation: {
          title: "Reservation",
          arrival: "Arrival",
          departure: "Departure",
          adults: "Adults",
          children: "Children",
          room: "Room",
          firstname: "First name",
          lastname: "Last name",
          email: "Email",
          phone: "Phone",
          date: "Date",
          guests: "Number of Guests", // Chybělo v původní EN verzi
          message: "Message",
          submit: "Submit",
          select_room: "-- Select room --",
          privacy_notice: "Please read our",
          privacy_policy: "Privacy Policy",
          consent_text:
            "I have read and agree to the processing of personal data",
          submission_success:
            "Thank you for submitting your inquiry! We will contact you soon.",
        },
        privacy: {
          title: "Data Protection",
          whatDataTitle: "What personal data do we collect?",
          whatDataIntro:
            "Through our non-binding reservation form, we collect the following personal data:",
          dataName: "First and last name",
          dataEmail: "Email address",
          dataPhone: "Phone number",
          whyDataTitle: "Why do we collect this data?",
          whyDataText:
            "We collect data exclusively for the purpose of processing your non-binding reservation and possible communication with you. The legal basis for the processing of personal data is Art. 6 para. 1 letter b) GDPR – fulfillment of a contract or pre-contractual measures.",
          howLongTitle: "How long do we store your data?",
          howLongText:
            "We store your data for the time necessary to process the reservation, but for a maximum of 6 months. After that, they will be safely deleted.",
          whoShareTitle: "Who do we share your data with?",
          whoShareText:
            "Your personal data is not provided to any third party.",
          securityTitle: "How do we protect your data?",
          securityText:
            "Personal data is stored in a secure system and is not accessible to unauthorized persons.",
          rightsTitle: "What are your rights?",
          rightsText: "You have the right to request:",
          rightsAccess: "access to your data,",
          rightsCorrection: "correction of inaccurate data,",
          rightsDeletion: "deletion of data if no longer needed.",
          rightsContact:
            "Contact us at our email and we will process your request.",
          complaintTitle: "Possibility to file a complaint",
          complaintText:
            "If you believe that your personal data has been handled in violation of legal regulations, you have the right to file a complaint with the Office for Personal Data Protection (www.uoou.cz).",
          contactTitle: "Contact",
          contactText:
            "If you have any questions regarding the processing of your personal data, do not hesitate to contact us at our email harmonie-bedrichov@centrum.cz",
        },
      },
      de: {
        nav: {
          accommodation: "Unterkunft",
          reservation: "Reservierung",
          prices: "Preise",
          contact: "Kontakt",
          services: "Dienstleistungen",
          rooms: "Zimmer",
          apartments: "Apartments",
          playroom: "Spielzimmer",
          garden: "Garten",
        },
        home: {
          title:
            "Suchen Sie einen friedlichen Ort in der Natur, an den Sie und Ihre Kinder gerne zurückkehren werden?",
          description:
            "Unsere Familienpension mit der einzigartigen Atmosphäre einer originalen Isergebirgs-Hütte bietet gemütliche und komfortable Zimmer und Apartments, einen Gemeinschaftsraum mit Kamin, Bar, Küche, Kinderspielzimmer, Skilager, Sauna und vieles mehr für Ihren erholsamen Urlaub, Wochenende in der Natur oder Treffen mit Freunden und Familie.",
        },
        accommodation: {
          title: "Unterkunft",
          rooms: "Zimmer",
          playroom: "Spielzimmer",
          garden: "Garten",
          apartments: "Apartments",
          common_room: "Gemeinschaftsraum",
        },
        services: {
          title: "Dienstleistungen",
          breakfast: {
            title: "Frühstück",
            description:
              "Ganzjährig bieten wir unseren Gästen ein herzhaftes und ausgewogenes Frühstück, reich an Proteinen, gesunden Fetten, Ballaststoffen, Vitaminen und Mineralstoffen. Auf unserem Buffet finden Sie süße und herzhafte Backwaren, Toastbrot, hausgemachten Kuchen oder Pfannkuchen, Marmeladen, Honig, Nutella, Milch, Säfte, Joghurts, Eier, mehrere Käse- und Schinkensorten, Gemüse, Obst, Müsli usw.",
          },
          sauna: {
            title: "Sauna",
            description:
              "Für Saunaenthusiasten haben wir kürzlich eine schöne kleine Sauna mit Steinverkleidung, Gewölbedecke, kreativer Beleuchtung und einem hölzernen Abkühlbecken gebaut. Bei richtiger Saunanutzung lösen sich Muskelverspannungen, die Atemwege werden gereinigt, Ihre Immunität gestärkt und der Körper entgiftet.",
          },
          parking: {
            title: "Parkplatz",
            description:
              "Der asphaltierte Parkplatz befindet sich direkt vor der Pension und kann von den Gästen während des gesamten Aufenthalts kostenlos genutzt werden. Parken vor Beginn des Aufenthalts und nach dessen Ende ist nach Absprache möglich (eventuell gegen Aufpreis).",
          },
          playground: {
            title: "Kinderspielplatz",
            description:
              "Kinder werden sich sicherlich im Garten vergnügen, der voller Attraktionen speziell für sie ist. Spielplatz, Sandkasten, Spielhäuschen, Schaukeln, Kletterwand und -netz, Trampolin, Pool und andere Elemente zur Kinderunterhaltung werden von Eltern und Großeltern sowohl kleiner als auch größerer Kinder geschätzt.",
          },
        },
        prices: {
          title: "Preise",
          table: {
            caption: "Servicepreise",
            winter: "Wintersaison",
            summer: "Sommersaison",
            special: "Silvester, Jiz50, etc.",
            adults: "Erwachsene",
            adults_winter: `${priceValues.adults_winter} CZK pro Person/Nacht`,
            adults_summer: `${priceValues.adults_summer} CZK pro Person/Nacht`,
            adults_special: `${priceValues.adults_special} CZK pro Person/Nacht`,
            children_12: "Kinder unter 12",
            children_12_winter: `${priceValues.children_12_winter} CZK pro Person/Nacht`,
            children_12_summer: `${priceValues.children_12_summer} CZK pro Person/Nacht`,
            children_12_special: `${priceValues.children_12_special} CZK pro Person/Nacht`,
            children_2: "Kinder unter 2", // Label remains
            free: " kostenlos", // Text for free display remains
            extra_bed: "Zusatzbett",
            extra_bed_winter: `${priceValues.extra_bed_winter} CZK pro Person/Nacht`,
            extra_bed_summer: `${priceValues.extra_bed_summer} CZK pro Person/Nacht`,
            extra_bed_special: `${priceValues.extra_bed_special} CZK pro Person/Nacht`,
            adults_1night: "Erwachsene für 1 Nacht",
            adults_1night_price: `${priceValues.adults_1night} CZK`,
            single_room: "Einzelzimmer",
            single_room_winter: `${priceValues.single_room_winter} CZK pro Nacht`,
            single_room_summer: `${priceValues.single_room_summer} CZK pro Nacht`,
            single_room_special: `${priceValues.single_room_special} CZK pro Nacht`,
            apartment_surcharge: "Apartment-Zuschlag",
            apartment_surcharge_price: `${priceValues.apartment_surcharge} CZK pro Nacht`,
            breakfast_adults: "Frühstück Erwachsene",
            breakfast_adults_price: `${priceValues.breakfast_adults} CZK`,
            breakfast_children: "Frühstück Kinder",
            breakfast_children_price: `${priceValues.breakfast_children} CZK`,
            sauna: "Sauna (2 Personen)",
            sauna_price: `${priceValues.sauna} CZK`,
          },
          included: {
            title: "Preise inklusive:",
            description:
              "WLAN im gesamten Objekt, Energie, Wasser, Müllentsorgung, Endreinigung, Handtücher, Bettwäsche, TV/SAT, Fahrrad- und Skilager, Parkplatz, Nutzung der Räumlichkeiten.",
          },
          notIncluded: {
            title: "Preise exklusive:",
            description:
              "Gemeindetourismussteuer - Der Gebührensatz beträgt 35 CZK pro Person über 18 Jahre pro Aufenthaltstag.",
          },
          paymentTerms: {
            title: "Reservierungs- und Zahlungsbedingungen:",
            description:
              "Die Unterkunftsreservierung wird nach Zahlung einer Anzahlung von 20% des Gesamtpreises gültig. Der Restbetrag wird bar oder per Überweisung am Anreisetag beglichen.",
          },
          cancellation: {
            title: "Stornierungsbedingungen: ",
            rule1:
              "21 oder mehr Tage vor Anreise - volle Rückerstattung der Anzahlung",
            rule2: "20-8 Tage vor Anreise - 25% der Anzahlung Rückerstattung",
            rule3:
              "7 Tage oder weniger vor Anreise - keine Rückerstattung der Anzahlung",
          },
          arrival: {
            title: "Anreise:",
            description: "Ab 15:00 Uhr",
          },
          departure: {
            title: "Abreise:",
            description: "Bis 10:00 Uhr",
          },
        },
        operating_rules: {
          title: "Hausordnung",
          rule1:
            "1. Nur Gäste, die zur Unterkunft angemeldet sind, dürfen in der Pension unter Vorlage eines Personalausweises, gültigen Reisepasses oder anderem Identitätsnachweis untergebracht werden.",
          rule2:
            "2. Personen, die nicht von ansteckenden Krankheiten betroffen sind, dürfen die Hotelanlagen nutzen.",
          rule3:
            "3. Wenn ein Gast eine Verlängerung seines Aufenthalts wünscht, kann ihm ein anderes Zimmer als das ursprünglich zugewiesene angeboten werden.",
          rule4:
            "4. Der Gast nutzt das Zimmer für den bei der Ankunft vereinbarten Zeitraum. Sofern nicht anders vereinbart, sind die Zimmer ab 15:00 Uhr bereit. Am letzten Aufenthaltstag räumt der Gast das Zimmer spätestens bis 10:00 Uhr. Falls der Betrieb es zulässt, kann eine spätere Räumungszeit vereinbart werden.",
          rule5:
            "5. Der Gast ist verpflichtet, die Nachtruhe zwischen 22:00 und 07:00 Uhr einzuhalten.",
          rule6:
            "6. Der Gast ist verpflichtet, die Unterkunft und in Anspruch genommene Dienstleistungen gemäß der gültigen Preisliste zu bezahlen, in der Regel bei Ankunft.",
          rule7:
            "7. Das Mitbringen und Verzehren eigener Getränke und Speisen im Restaurant ist nicht gestattet.",
          rule8:
            "8. In Zimmern und Gemeinschaftsbereichen ist das Verschieben von Einrichtungen, Reparaturen oder Eingriffe in elektrische Anlagen ohne Zustimmung des Besitzers untersagt.",
          rule9:
            "9. Die Nutzung eigener Elektrogeräte (z.B. Wasserkocher, Kochplatten, Toaster etc.) ist nicht gestattet. Ausnahmen sind Rasierer, Massagegeräte, Haartrockner, Lockenstäbe, Radios. Der Gast haftet für Schäden durch die Nutzung erlaubter Geräte.",
          rule10:
            "10. Beim Verlassen des Zimmers ist der Gast verpflichtet, Wasserhähne zu schließen, Licht auszuschalten, TV zu deaktivieren, Fenster zu schließen und den Schlüssel bei Abreise abzugeben.",
          rule11:
            "11. Das Mitbringen von Sportgeräten (Skier, Schlitten, Fahrräder) in die Zimmer ist nicht gestattet, hierfür sind separate Lagerplätze vorgesehen.",
          rule12:
            "12. Aus Sicherheitsgründen dürfen Kinder in Zimmern und anderen Bereichen nicht ohne Aufsicht bleiben. Eltern haften für die Sicherheit ihrer Kinder in allen Bereichen der Pension.",
          rule13:
            "13. Der Gast haftet vollumfänglich für von ihm verursachte Schäden am Pensionseigentum.",
          rule14:
            "14. Kleine Haustiere dürfen nur mit Zustimmung des Besitzers in der Pension untergebracht werden. Der Tierhalter muss einen gültigen Impfausweis vorlegen. Hunde und andere Tiere sind in Lebensmittelbereichen nicht gestattet. Hunde sind in öffentlichen Bereichen anzuleinen und zu maulkorbieren. Tiere dürfen nicht unbeaufsichtigt im Zimmer bleiben. Sie dürfen nicht auf Betten oder Möbeln liegen und müssen ihr eigenes Bett haben. Badezimmerutensilien dürfen nicht zur Tierpflege verwendet werden. Der Tierhalter ist für die Einhaltung der Nachtruhe (22:00-07:00 Uhr) verantwortlich.",
          rule15:
            "15. Die Pension haftet für eingebrachte Gegenstände nur, wenn diese an dafür vorgesehenen Orten gelagert wurden. Für Geld und Wertsachen besteht Haftung nur bei schriftlicher Verwahrung.",
          rule16:
            "16. Frühstück wird nach Absprache von 08:00 bis 10:00 Uhr im Restaurant serviert.",
          rule17:
            "17. Verlässt ein Gast nachts das Gebäude, ist er verpflichtet, das Treppenhauslicht auszuschalten und das Gebäude zu verschließen.",
          rule18:
            "18. Jeder Gast ist verpflichtet, diese Hausordnung und Brandschutzbestimmungen einzuhalten. Bei schwerwiegenden Verstößen behält sich der Besitzer das Recht vor, den Vertrag ohne Entschädigung zu kündigen.",
        },
        rooms: {
          title: "Zimmer",
          room: "Zimmer",
          room1: "Zimmer Nr.1",
          room2: "Zimmer Nr.2",
          room3: "Zimmer Nr.3",
          room4: "Zimmer Nr.4",
          room5: "Zimmer Nr.5",
          room6: "Zimmer Nr.6",
          room7: "Zimmer Nr.7",
          three_beds: "3 Betten",
          two_beds: "2 Betten",
          four_beds: "4 Betten",
          six_beds: "6 Betten",
          wc: "Dusche + WC",
          wc_apartment: "Dusche + Badewanne + WC",
          tv: "TV im Zimmer",
          refrigerator: "Kühlschrank",
          wifi: "WLAN im Zimmer",
          parking: "Parkplatz",
          rooms_text:
            "Doppel- und Dreibettzimmer sowie ein Vierbettzimmer befinden sich im ersten Stock unserer Pension und sind damit weit genug entfernt vom Gesellschaftsraum und anderen Gemeinschaftsbereichen, was unseren Gästen einen ruhigen Aufenthalt ermöglicht. Alle Zimmer sind mit Massivholzmöbeln in Naturfarbe ausgestattet, mit Doppelbett, Schrank, Tisch und Stühlen, Nachttischen und Regalen. Dreibettzimmer haben ein Einzelbett, das Vierbettzimmer ist mit einem Massivholz-Etagenbett ausgestattet. Für Ihren Komfort gibt es in jedem Zimmer einen kleinen Hotelkühlschrank, Wasserkocher, Teetassen, TV und Haartrockner. Auf Wunsch können jedes Zimmer mit einem Holzreisebett mit Decken, Kinderbett, Töpfchen oder Tritthocker unter dem Waschbecken ausgestattet werden.",
          apartments: "Apartments",
          apartment: "Apartment",
          apartment67: "Apartment Nr.67",
          apartment68: "Apartment Nr.68",
          apartments_text:
            "Beide luxuriös eingerichteten Apartments befinden sich im Dachgeschoss unserer Pension und bieten einen schönen Blick auf die umliegende Landschaft. Jedes Apartment besteht aus zwei Räumen mit gleicher Ausstattung: Schrank, Esstisch, Stühlen, Sessel oder Sofa, TV, moderner Küche und geräumigem Badezimmer. Auf Wunsch kann jedes Apartment mit einem Holzreisebett mit Decken, einem Kinderhochstuhl, Baby-Wickelauflage, Töpfchen, Badewanne oder Tritthocker ausgestattet werden.",
          operating_rules_link: "Hausordnung", // Toto chybělo v CS/EN, ale bylo v DE, ponecháno
        },
        playroom: {
          title: "Spielzimmer",
          text: "Unsere Pension ist besonders bei Familien mit kleinen Kindern beliebt, nicht zuletzt dank des großen und gut ausgestatteten Kinderspielzimmers. Das Spielzimmer ist durch eine Glastür vom Speiseraum getrennt, sodass Eltern, die sich gerne an den Esstisch setzen und Kaffee oder Tee trinken möchten, ihre Kleinen immer im Blick behalten können.",
        },
        garden: {
          title: "Garten",
          text: "Der Garten ist ideal für Familienaufenthalte mit Kindern. Im Garten befinden sich Kinderschaukeln, Sandkasten, Spielburg, Trapez, Kletternetz, Trampolin, Liegestühle und Pool. Der gesamte Garten ist mit natürlichem Gras bewachsen und bietet Platz für zahlreiche Aktivitäten von klassischen Kinderspielen bis hin zu Tischtennis, Badminton, Petanque, Frisbee etc. Die Terrasse lädt besonders an heißen Sommertagen zum abendlichen Verweilen ein, der Feuerplatz im unteren Gartenteil zum Würstchengrillen und gemütlichen Beisammensein am Lagerfeuer.",
        },
        common_room: {
          title: "Aufenthaltsraum",
          text: "Der Aufenthaltsraum mit Kamin, Fernseher und einer Selbstbedienungsbar, an der Sie alkoholfreie und alkoholische Getränke sowie kleine Snacks erhalten, dient auch als Speisesaal, in dem das Frühstück serviert wird und der auch für abendliche Zusammenkünfte oder für Familienfeiern und Treffen mit Freunden genutzt wird. Außerdem gibt es eine ausgestattete Küchenzeile, in der Sie Ihre eigenen Mahlzeiten zubereiten können, was vor allem Eltern mit kleinen Kindern zu schätzen wissen werden.",
        },
        contact: {
          title: "Kontakt",
          address: "Adresse",
          telephone: "Telefon",
          map: {
            consentText:
              "Um Ihnen die Karte anzeigen zu können, müssen wir Inhalte von Google Maps laden, die möglicherweise Cookies setzen. Indem Sie auf die Schaltfläche unten klicken, stimmen Sie deren Verwendung zu.",
            acceptButton: "Akzeptieren",
          },
        },
        reservation: {
          title: "Reservierung",
          arrival: "Anreise",
          departure: "Abreise",
          adults: "Erwachsene",
          children: "Kinder",
          room: "Zimmer",
          firstname: "Vorname",
          lastname: "Nachname",
          email: "E-Mail",
          phone: "Telefon",
          date: "Datum",
          guests: "Anzahl der Gäste", // Chybělo v původní DE verzi
          message: "Nachricht",
          submit: "Absenden",
          select_room: "-- Zimmer auswählen --",
          privacy_notice: "Bitte lesen Sie unsere",
          privacy_policy: "Datenschutzerklärung",
          consent_text:
            "Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung personenbezogener Daten zu",
          submission_success:
            "Vielen Dank für Ihre Anfrage! Wir werden uns bald bei Ihnen melden.",
        },
        privacy: {
          title: "Datenschutz",
          whatDataTitle: "Welche personenbezogenen Daten erheben wir?",
          whatDataIntro:
            "Über unser unverbindliches Reservierungsformular erheben wir folgende Daten:",
          dataName: "Vor- und Nachname",
          dataEmail: "E-Mail-Adresse",
          dataPhone: "Telefonnummer",
          whyDataTitle: "Warum erheben wir diese Daten?",
          whyDataText:
            "Wir erheben Daten ausschließlich zur Bearbeitung Ihrer unverbindlichen Reservierung und möglicher Kommunikation. Rechtsgrundlage ist Art. 6 Abs. 1 Buchstabe b) DSGVO – Vertragserfüllung oder vorvertragliche Maßnahmen.",
          howLongTitle: "Wie lange speichern wir Ihre Daten?",
          howLongText:
            "Wir speichern Ihre Daten für die zur Bearbeitung notwendige Dauer, maximal jedoch 6 Monate. Danach werden sie sicher gelöscht.",
          whoShareTitle: "An wen geben wir Ihre Daten weiter?",
          whoShareText: "Ihre Daten werden nicht an Dritte weitergegeben.",
          securityTitle: "Wie schützen wir Ihre Daten?",
          securityText:
            "Daten werden in einem sicheren System gespeichert und sind Unbefugten nicht zugänglich.",
          rightsTitle: "Welche Rechte haben Sie?",
          rightsText: "Sie haben das Recht auf:",
          rightsAccess: "Auskunft über Ihre Daten,",
          rightsCorrection: "Berichtigung unrichtiger Daten,",
          rightsDeletion: "Löschung, sofern nicht mehr erforderlich.",
          rightsContact:
            "Kontaktieren Sie uns per E-Mail, wir bearbeiten Ihr Anliegen.",
          complaintTitle: "Beschwerderecht",
          complaintText:
            "Falls Sie der Ansicht sind, dass Ihre Daten unrechtmäßig verarbeitet werden, können Sie sich bei der Datenschutzbehörde (www.uoou.cz) beschweren.",
          contactTitle: "Kontakt",
          contactText:
            "Bei Fragen zur Datenverarbeitung kontaktieren Sie uns bitte unter harmonie-bedrichov@centrum.cz",
        },
      },
    };

    // Vložil som celý obsah objektu translations sem, vynechal som len opakovania pre EN a DE pre stručnosť
    // V skutočnosti tam bude celý obsah

    return translations;
  } catch (error) {
    console.error("Error loading or parsing translations:", error);
    return {}; // Fallback
  }
}

// Exportujeme asynchrónnu funkciu
export { loadTranslations };
