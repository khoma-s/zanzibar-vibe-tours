import { useState, useEffect } from 'react';
import ResponsiveTestPanel from './ResponsiveTestPanel';
import { TestTube } from 'lucide-react';

export default function TestMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    // Check URL parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('test') === '1') {
      setIsTestMode(true);
      setIsOpen(true);
    }

    // Keyboard shortcut: Ctrl+Shift+T
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setIsTestMode(true);
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isTestMode) return null;

  return (
    <>
      {/* Test Mode Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[9998] w-12 h-12 bg-orange hover:bg-orange/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Open Responsive Test Panel"
        title="Responsive Test Panel (Ctrl+Shift+T)"
      >
        <TestTube size={20} />
      </button>

      {/* Test Panel */}
      <ResponsiveTestPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
