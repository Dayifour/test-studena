import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full bg-white/90 shadow-lg fixed top-0 left-0 z-50 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Studena
          </span>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition"
          >
            Accueil
          </Link>
          <Link
            href="/tutors"
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Tuteurs
          </Link>
          <Link
            href="/students"
            className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
          >
            Élèves
          </Link>
          <Link
            href="/matchmaking"
            className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
          >
            Matchmaking
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 pt-32 pb-12 px-4 animate-fade-in3">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-700 mb-4 tracking-tight drop-shadow-lg">
            Studena Matchmaking
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium animate-fade-in2">
            Plateforme intelligente pour connecter tuteurs et élèves selon les
            matières, niveaux et disponibilités. Trouvez le match parfait en un
            clic !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/tutors"
              className="flex-1 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition text-center"
            >
              Voir les tuteurs
            </Link>
            <Link
              href="/students"
              className="flex-1 px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-lg shadow-lg hover:bg-purple-700 transition text-center"
            >
              Voir les élèves
            </Link>
            <Link
              href="/matchmaking"
              className="flex-1 px-8 py-4 rounded-xl bg-green-600 text-white font-bold text-lg shadow-lg hover:bg-green-700 transition text-center"
            >
              Matchmaking
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-3xl w-full mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Pourquoi Studena ?
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Matching intelligent selon matière, niveau et créneaux horaires
          </li>
          <li>Score de compatibilité avancé</li>
          <li>Interface ultra-moderne, responsive et agréable</li>
          <li>Ajout, gestion et recherche de tuteurs/élèves simplifiés</li>
          <li>Optimisation et rapidité du matching</li>
          <li>
            Bonus : gestion des cas sans tuteur, choix automatique du meilleur
            tuteur
          </li>
        </ul>
      </section>

      <footer className="w-full py-6 px-4 bg-white/80 text-center text-gray-500 text-sm shadow-inner animate-fade-in4 mt-auto">
        <span>
          © 2025 Studena. Test technique Junior. Propulsé par Next.js, Prisma &
          SQLite.
        </span>
      </footer>
    </div>
  );
}
