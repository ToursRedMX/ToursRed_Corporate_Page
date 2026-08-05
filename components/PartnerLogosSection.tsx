'use client';

import Image from 'next/image';

const partners = [
  { name: 'Exoticca', logo: '/exoticca.png' },
  { name: 'Mega Travel', logo: '/mega-travel.jpg' },
  { name: 'Nefertari', logo: '/nefertari.jpg' },
  { name: 'Volando Viajes', logo: '/VolandoViajes.jpg' },
  { name: 'Travel Shop', logo: '/TravelShop.png' },
  { name: 'Nao Travel', logo: '/NaoTravel.png' },
  { name: 'Julia Tours', logo: '/JuliaTours.png' },
  { name: 'Sierra Madre Travel', logo: '/sierramadretravel.png' },
  { name: 'Regio Operadora', logo: '/RegioOperadora.png' },
  { name: 'Operadora Punta del Este', logo: '/OperadoraPuntaDelEste.png' },
  { name: 'Euro Mundo', logo: '/EuroMundo.png' },
  { name: 'Travel Smart', logo: '/travelsmart.png' },
  { name: 'Assist Card', logo: '/assist-card.png' },
  { name: 'Universal Assistance', logo: '/universalAssitance.png' },
  { name: 'Go Assistance', logo: '/GoAssistance.jpg' },
  { name: 'Hotel Do', logo: '/HotelDo.jpg' },
  { name: 'Expedia TAAP', logo: '/ExpediaTAAP.png' },
  { name: 'Price Agencies', logo: '/Logo-PriceAgencies.png' },
  { name: 'Petra', logo: '/petra.jpg' },
  { name: 'Auras Insurance', logo: '/Auras-Insurance.png' },
  { name: 'Protege tu Viaje', logo: '/Protegetuviaje.png' },
  { name: 'Viator', logo: '/viator.png' },
  { name: 'BookingCars', logo: '/BookingCars.jpg' },
  { name: 'Civitatis', logo: '/Civitatis.jpg' },
  { name: 'Aeromexico Vacations', logo: '/AeroMexicoVacations.png' },
  { name: 'CIT Entorno', logo: '/CIT_Entorno.png' },
  { name: 'Gente Mayorista', logo: '/GenteMayorista.png' },
  { name: 'Hotel Hoy Viajes', logo: '/HotelHoy.jpg' },
  { name: 'Sevents', logo: '/sevents.jpg' },
  { name: 'SafeTravel', logo: '/SafeTravel.png' },
  { name: 'Volaris', logo: '/Volaris.png' },
  { name: 'Viva Aerobus', logo: '/VivaAerobus.png' },
  { name: 'Terrawind', logo: '/terrawind.png' },
  { name: 'Acrux', logo: '/Acrux.png' },
  { name: 'OBTec Tour & Travel', logo: '/Obtec.png' },
  { name: 'Assist 365', logo: '/Assist365.png' },
  { name: 'Datos de Viaje', logo: '/DatosdeViaje.png' },
  { name: 'Saily', logo: '/Saily.png' },
  { name: 'WIM by AT&T', logo: '/WIM.jpg' },
  { name: 'IATI Seguros', logo: '/IATI.jpg' },
  { name: 'Sim Local', logo: '/SimLocal.jpg' },
  { name: 'HolaSim', logo: '/HolaSIM.jpg' },
  { name: 'Viajes Fama', logo: '/ViajesFama.png' },
  { name: 'Viajes de Gala', logo: '/ViajesdeGala.jpg' },
  { name: 'Travel Viajes Group', logo: '/TravelViajesGroup.jpg' },
  { name: 'Travel Portal', logo: '/TravelPortal.png' },
  { name: 'Travel CIT', logo: '/TravelCIT.jpg' },
  { name: 'RateHawk', logo: '/RateHawk.png' },
  { name: 'Mundo Cruceros y Viajes', logo: '/MundoCruceros.png' },
  { name: 'Mex-Inca Travel', logo: '/Mex-Inca.png' },
  { name: 'EuroMayorista de Viajes', logo: '/EuroMayorista.png' },
  { name: 'Enjoy Travel Group', logo: '/EnjoyTravel.png' },
  { name: 'CST Travel', logo: '/CSTravel.png' },
  { name: 'Cruceristas J&E', logo: '/Cruceristas.jpg' },
  { name: 'Aswan Tours', logo: '/logo-aswan-circulo.png' },
  { name: 'Concierge Operadora', logo: '/ConciergeOperadora.png' },
  { name: 'Surfroam', logo: '/Surfroam.png' },
  { name: 'Beds Online', logo: '/BedsOnline.png' },
  { name: 'Agent Cars', logo: '/logo_agentcars_es.png' },
  { name: 'EMETRAVEL', logo: '/EMETRAVEL.png' },
  { name: 'TravelKit', logo: '/TravelKit.jpg' },
  { name: 'Nexus Tours', logo: '/NexusTours.jpg' },
  { name: 'TTX Mayorista', logo: '/TTXMayorista.jpg' },
  { name: 'Mercado Pago', logo: '/images/partners/mercadopago.png' },
  { name: 'Stripe', logo: '/images/partners/Stripe.png' },
  { name: 'Openpay', logo: '/images/partners/openpay.png' },
  { name: 'Conekta', logo: '/images/partners/conekta.png' },
  { name: 'PayPal', logo: '/images/partners/paypal.jpg' },
];

export default function PartnerLogosSection() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="flex items-center justify-center p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
        >
          <div className="relative w-full h-24">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
