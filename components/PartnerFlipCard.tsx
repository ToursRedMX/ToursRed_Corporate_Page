'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PartnerFlipCardProps {
  partnerName: string;
  logo: string;
  discountCode?: string;
  discountPercentage?: string;
  linkUrl?: string;
  badgeText?: string;
}

export function PartnerFlipCard({
  partnerName,
  logo,
  discountCode,
  discountPercentage,
  linkUrl,
  badgeText,
}: PartnerFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (linkUrl && isFlipped) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    } else if (discountCode) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (discountCode && window.innerWidth >= 768) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsFlipped(false);
    }
  };

  if (!discountCode) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-32">
        <img
          src={logo}
          alt={partnerName}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="relative h-32 cursor-pointer perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute inset-0 backface-hidden">
          <div className="relative flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
            {badgeText && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                {badgeText}
              </div>
            )}
            <img
              src={logo}
              alt={partnerName}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg shadow-lg h-full text-white">
            <div className="text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                Código de Descuento
              </p>
              <div className="bg-white text-red-600 px-4 py-2 rounded-lg font-mono font-bold text-sm shadow-md">
                {discountCode}
              </div>
              {discountPercentage && (
                <p className="text-lg font-bold">{discountPercentage}</p>
              )}
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-red-600 hover:bg-gray-100 font-semibold mt-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  if (linkUrl) {
                    window.open(linkUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Ir a {partnerName}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
