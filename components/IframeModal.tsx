'use client';

import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface IframeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function IframeModal({ isOpen, onClose, url, title }: IframeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 gap-0">
        <div className="flex items-center justify-between p-4 border-b bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-200 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>
        <div className="w-full h-[calc(90vh-64px)]">
          <iframe
            src={url}
            className="w-full h-full border-0"
            title={title}
            allow="payment"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
