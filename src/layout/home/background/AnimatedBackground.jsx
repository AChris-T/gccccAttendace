import BackgroundGradients from '@/layout/home/background/BackgroundGradients';
import BackgroundParticles from '@/layout/home/background/BackgroundParticles';
import './BackgroundAnimations.css';

const AnimatedBackground = () => (
  <div className="fixed inset-0 pointer-events-none">
    <BackgroundGradients />
    <BackgroundParticles />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgODAgMTAgTSAwIDIwIEwgODAgMjAgTSAwIDMwIEwgODAgMzAgTSAwIDQwIEwgODAgNDAgTSAwIDUwIEwgODAgNTAgTSAwIDYwIEwgODAgNjAgTSAwIDcwIEwgODAgNzAgTSAxMCAwIEwgMTAgODAgTSAyMCAwIEwgMjAgODAgTSAzMCAwIEwgMzAgODAgTSA0MCAwIEwgNDAgODAgTSA1MCAwIEwgNTAgODAgTSA2MCAwIEwgNjAgODAgTSA3MCAwIEwgNzAgODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 dark:opacity-20"></div>
    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#24244e]/30 dark:to-gray-950/30"></div>
  </div>
);

export default AnimatedBackground;
