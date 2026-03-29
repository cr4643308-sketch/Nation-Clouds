export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-slate-400">
        <div>
          <h4 className="text-white font-bold mb-4">Nation clouds™</h4>
          <p>Premium hosting solutions.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>VPS</li>
            <li>Minecraft</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>Knowledge Base</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
