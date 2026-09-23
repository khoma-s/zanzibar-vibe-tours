import { useState } from 'react';
import { Monitor, Tablet, Smartphone, X } from 'lucide-react';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface ResponsiveTestPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResponsiveTestPanel({ isOpen, onClose }: ResponsiveTestPanelProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');

  if (!isOpen) return null;

  const devices = {
    desktop: { width: '100%', icon: Monitor, label: 'Desktop (1920px+)' },
    tablet: { width: '768px', icon: Tablet, label: 'Tablet (768px)' },
    mobile: { width: '375px', icon: Smartphone, label: 'Mobile (375px)' },
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-navy text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-lg">Responsive Test Panel</h3>
            <div className="flex gap-2">
              {(Object.keys(devices) as DeviceType[]).map((key) => {
                const Icon = devices[key].icon;
                return (
                  <button
                    key={key}
                    onClick={() => setDevice(key)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      device === key
                        ? 'bg-teal text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{devices[key].label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 overflow-auto p-4">
          <div
            className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300"
            style={{
              width: devices[device].width,
              maxWidth: '100%',
              minHeight: '600px',
            }}
          >
            <iframe
              src={window.location.href}
              className="w-full h-full border-0"
              style={{ minHeight: '80vh' }}
              title="Responsive Preview"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-cream/50 border-t border-navy/10 p-4 text-center flex-shrink-0">
          <p className="text-sm text-navy/60">
            Current viewport: <strong className="text-navy">{devices[device].label}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
