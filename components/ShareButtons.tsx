"use client";

import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const { toast } = useToast();
  const fullUrl = `https://toursred.com${url}`;

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareOnTwitter = () => {
    const text = description ? `${title} - ${description}` : title;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(text)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(
      `${description ? description + "\n\n" : ""}Lee más en: ${fullUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace ha sido copiado al portapapeles",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border">
      <h3 className="text-lg font-semibold">Compartir este artículo</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnFacebook}
          className="flex items-center gap-2"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnTwitter}
          className="flex items-center gap-2"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnLinkedIn}
          className="flex items-center gap-2"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={shareViaEmail}
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <Link2 className="h-4 w-4" />
          Copiar enlace
        </Button>
      </div>
    </div>
  );
}
