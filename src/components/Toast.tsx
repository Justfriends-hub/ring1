import React from 'react';
import { useShop } from '../context/ShopContext';
import { Check, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const icons = {
    info: <Info className="w-4 h-4 text-[#B08D57] shrink-0 stroke-[1.5]" />,
    success: <Check className="w-4 h-4 text-[#3F5B46] shrink-0 stroke-[2]" />,
    error: <AlertCircle className="w-4 h-4 text-[#8E3B2F] shrink-0 stroke-[1.5]" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-fadeIn pointer-events-none">
      <div className="bg-[#1F2A24] text-[#FBF8F3] border border-[#B08D57]/40 shadow-xl p-4 flex items-center gap-3">
        {icons[toast.type]}
        <p className="text-[13px] font-normal leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
