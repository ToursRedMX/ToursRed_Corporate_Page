'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import NatureStayHubHostForm from './NatureStayHubHostForm';

interface NatureStayHubSectionProps {
  name: string;
  description: string;
  features: string;
  cta: string;
  hostCta: string;
  hostButton: string;
  legal: string;
  lang: 'es' | 'en';
}

export default function NatureStayHubSection({
  name,
  description,
  features,
  cta,
  hostCta,
  hostButton,
  legal,
  lang,
}: NatureStayHubSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Card className="border-0 shadow-2xl max-w-4xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <Image
              src="https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Nature Stay Hub"
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-8 lg:p-10 bg-gradient-to-br from-teal-600 to-teal-700 text-white flex flex-col">
            <h3 className="text-3xl font-bold mb-4">{name}</h3>
            <p className="text-teal-100 leading-relaxed mb-6">{description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {features.split(' • ').map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  {feature}
                </Badge>
              ))}
            </div>
            <Button
              asChild
              className="bg-white text-teal-700 hover:bg-teal-50 mb-6"
            >
              <a
                href="https://naturestayhub.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {cta}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="bg-white/10 p-4 rounded-lg mb-4">
              <p className="text-white text-center font-medium mb-3">
                {hostCta}
              </p>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="w-full bg-white text-teal-700 hover:bg-teal-50"
              >
                {hostButton}
              </Button>
            </div>
            <p className="text-xs text-teal-200 italic mt-auto">{legal}</p>
          </CardContent>
        </div>
      </Card>

      <NatureStayHubHostForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        lang={lang as Locale}
      />
    </>
  );
}
