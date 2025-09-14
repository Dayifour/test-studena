
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col font-sans">
      <header className="w-full py-8 px-6 flex flex-col items-center justify-center bg-white/80 shadow-lg">
        <Image src="/next.svg" alt="Logo" width={120} height={32} className="mb-2" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2 tracking-tight animate-fade-in">Studena Matchmaking</h1>
        <p className="text-lg text-gray-700 max-w-xl text-center animate-fade-in2">Plateforme intelligente de mise en relation entre tuteurs et élèves, basée sur les matières, niveaux et disponibilités. Découvrez le matching parfait, instantanément.</p>
        <nav className="mt-6 flex gap-4">
          <Link href="/tutors" className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Tuteurs</Link>
          <Link href="/students" className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition">Élèves</Link>
          <Link href="/matchmaking" className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition">Matchmaking</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20 animate-fade-in3">
        <section className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Pourquoi Studena ?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Matching intelligent selon matière, niveau et créneaux horaires</li>
            <li>Score de compatibilité avancé</li>
            <li>Interface ultra-moderne, responsive et agréable</li>
            <li>Ajout, gestion et recherche de tuteurs/élèves simplifiés</li>
            <li>Optimisation et rapidité du matching</li>
            <li>Bonus : gestion des cas sans tuteur, choix automatique du meilleur tuteur</li>
          </ul>
        </section>

        <section className="max-w-2xl w-full bg-gradient-to-r from-blue-100 via-white to-purple-100 rounded-2xl shadow-lg p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Commencez maintenant</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/tutors" className="flex-1 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition text-center">Ajouter un tuteur</Link>
            <Link href="/students" className="flex-1 px-6 py-4 rounded-xl bg-purple-600 text-white font-bold text-lg shadow-lg hover:bg-purple-700 transition text-center">Ajouter un élève</Link>
            <Link href="/matchmaking" className="flex-1 px-6 py-4 rounded-xl bg-green-600 text-white font-bold text-lg shadow-lg hover:bg-green-700 transition text-center">Trouver le meilleur match</Link>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 px-4 bg-white/80 text-center text-gray-500 text-sm shadow-inner animate-fade-in4">
        <span>© 2025 Studena. Test technique Junior. Propulsé par Next.js, Prisma & SQLite.</span>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in2 { animation: fade-in 1.5s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in3 { animation: fade-in 2s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in4 { animation: fade-in 2.5s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
