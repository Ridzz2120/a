import React from 'react';

interface HeritageImage {
  name: string;
  location: string;
  url: string;
  spanClass: string;
}

const HERITAGE_PANELS: HeritageImage[] = [
  {
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop&q=80',
    spanClass: 'col-span-12 sm:col-span-6 lg:col-span-5 row-span-1',
  },
  {
    name: 'Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQU1AKMkxoUsa8Ft8fx4SReaDDh2Isaw6IogGfInYJx2BV-1wyFXy5H5LQ&s=10',
    spanClass: 'col-span-6 sm:col-span-3 lg:col-span-3 row-span-1',
  },
  {
    name: 'Red Fort',
    location: 'Delhi NCR',
    url: 'https://i.pinimg.com/1200x/10/32/71/103271b0baeb51ae662a315d922f6995.jpg',
    spanClass: 'col-span-6 sm:col-span-3 lg:col-span-4 row-span-1',
  },
  {
    name: 'Gateway of India',
    location: 'Mumbai, Maharashtra',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80',
    spanClass: 'col-span-12 sm:col-span-6 lg:col-span-4 row-span-1',
  },
  {
    name: 'Mysore Palace',
    location: 'Mysuru, Karnataka',
    url: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?fm=jpg&q=80&w=1200&auto=format&fit=crop',
    spanClass: 'col-span-6 sm:col-span-3 lg:col-span-3 row-span-1',
  },
  {
    name: 'Qutub Minar',
    location: 'Mehrauli, New Delhi',
    url: 'https://media.istockphoto.com/id/1160975059/photo/qutub-minar-and-its-monuments-delhi.jpg?s=612x612&w=0&k=20&c=nCQpmVYsfFYpMg8i-6kQkuHfQ9P-5IXGxyADVItiD_k=',
    spanClass: 'col-span-6 sm:col-span-3 lg:col-span-2 row-span-1',
  },
  {
    name: 'Varanasi Ghats',
    location: 'Varanasi, Uttar Pradesh',
    url: 'https://t3.ftcdn.net/jpg/07/16/99/30/360_F_716993097_iUNrir313lTW9L9i7WTwmt4qJ5VmEh8a.jpg',
    spanClass: 'col-span-12 sm:col-span-12 lg:col-span-3 row-span-1',
  },
];

export const HeritageWall: React.FC = () => {
  return (
    <div
      id="heritage-background-wall"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#0a1128]"
    >
      {/* Asymmetric Bento Mosaic Grid Wall */}
      <div className="grid grid-cols-12 lg:grid-rows-2 gap-2.5 p-2.5 w-full h-full opacity-90 scale-[1.01] transform transition-transform duration-1000">
        {HERITAGE_PANELS.map((item, idx) => (
          <div
            key={item.name + idx}
            className={`relative w-full h-full min-h-0 overflow-hidden rounded-2xl bg-[#0a1128] border border-white/10 shadow-sm ${item.spanClass}`}
          >
            <img
              src={item.url}
              alt={item.name}
              referrerPolicy="no-referrer"
              loading={idx < 4 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-center filter saturate-[1.12] contrast-[1.05]"
            />
          </div>
        ))}
      </div>

      {/* Light Translucent Overlay for text readability */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'linear-gradient(145deg, rgba(240, 246, 255, 0.45) 0%, rgba(220, 235, 252, 0.48) 45%, rgba(180, 210, 245, 0.54) 100%)',
        }}
      />
      
      {/* Micro grid pattern for technical precision feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
