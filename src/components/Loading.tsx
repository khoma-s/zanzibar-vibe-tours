export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-teal/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-navy/50 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
