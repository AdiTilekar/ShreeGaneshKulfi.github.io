import type { NextPage } from 'next';
import Link from 'next/link';
import SeoLayout from '@/components/layout/SeoLayout';
import { SITE_NAME, CONTACT, BASE_PATH } from '@/utils/constants';

const PUNE_DIVISION_WHATSAPP = '7666809690';

const OPEN_ROLES = [
  {
    title: 'Sales Girl / Sales Boy (Pune Division)',
    location: 'Pune Division, Maharashtra',
    type: 'Part-time ',
    summary:
      'Physical sales job in our outlet near Atal bihari Vajpayee Sky walk, Purnanagr , Pimpri-Chinchwad -411019',
    whatsappNumber: PUNE_DIVISION_WHATSAPP,
  },
  {
    title: 'Sales Digital Marketing Intern (Pune Division)',
    location: 'Pune Division, Maharashtra',
    type: 'Part-time ',
    summary:
      'Create social content, campaign ideas, and track growth across local markets.',
    whatsappNumber: PUNE_DIVISION_WHATSAPP,
  },
  {
    title: 'Delivery & Cold-Chain Coordinator',
    location: 'Nashik Region',
    type: 'Full-time',
    summary:
      'Manage dispatch planning, route quality, and temperature-safe delivery execution.',
  },
  {
    title: 'Production Assistant (Kulfi Unit)',
    location: 'Kopargaon, Maharashtra',
    type: 'Full-time',
    summary:
      'Support daily handcrafted production, hygiene checks, and packaging standards.',
  },
  {
    title: 'Digital Marketing Intern',
    location: 'Hybrid',
    type: 'Internship',
    summary:
      'Create social content, campaign ideas, and track growth across local markets.',
  },
];

const BENEFITS = [
  'Competitive pay with performance incentives',
  'Fast-growing local brand with clear growth opportunities',
  'Hands-on learning across operations, sales, and customer success',
  'Supportive team culture with direct founder access',
];

const CareerPage: NextPage = () => {
  const applyMail = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Career Application - Shree Ganesh Kulfi')}`;
  const puneRoleApplyUrl = `https://wa.me/${PUNE_DIVISION_WHATSAPP}?text=${encodeURIComponent(
    'Hi, I want to apply for Sales Girl / Sales Boy role in Pune Division at Shree Ganesh Kulfi.',
  )}`;

  return (
    <SeoLayout
      title="Careers"
      description="Join Shree Ganesh Kulfi. Explore open roles in sales, operations, production, and marketing. Build your career with a fast-growing kulfi brand."
    >
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
        <div className="absolute -top-16 right-0 w-72 h-72 bg-amber-200/35 dark:bg-amber-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-orange-200/25 dark:bg-orange-700/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-sm font-bold tracking-wide">
                We Are Hiring
              </span>
              <h1 className="mt-5 text-4xl sm:text-6xl font-black leading-tight text-gray-900 dark:text-white">
                Build Your Career With{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  {SITE_NAME}
                </span>
              </h1>
              <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                We are building one of Maharashtra&apos;s fastest-growing kulfi brands. If you love ownership,
                speed, and real impact, there is a place for you here.
              </p>
              <p className="mt-3 text-sm font-semibold text-amber-700 dark:text-amber-300">
                Immediate Opening: Sales Girl and Sales Boy for Pune Division.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={puneRoleApplyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-amber-600/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Apply on WhatsApp (Pune Division)
                </a>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500 font-semibold px-7 py-3.5 rounded-2xl transition-colors"
                >
                  Become a Retail Partner
                </Link>
              </div>
            </div>

            <div className="bg-white/85 dark:bg-gray-900/70 backdrop-blur rounded-3xl p-6 sm:p-8 ring-1 ring-black/5 dark:ring-white/10 shadow-xl dark:shadow-black/40">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Why Join Us</h2>
              <ul className="mt-5 space-y-3">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="mt-1 w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Send your resume to{' '}
                <a href={applyMail} className="font-semibold text-amber-600 hover:text-amber-700">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold tracking-wider text-amber-600 uppercase">Open Positions</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">Current Opportunities</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{OPEN_ROLES.length} roles</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {OPEN_ROLES.map((role) => (
              <article
                key={role.title}
                className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-6 ring-1 ring-black/[0.04] dark:ring-white/[0.06] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{role.title}</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                    {role.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{role.location}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{role.summary}</p>
                {role.whatsappNumber ? (
                  <a
                    href={`https://wa.me/${role.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to apply for ${role.title} (${role.location}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex text-sm font-bold text-green-600 hover:text-green-700"
                  >
                    Apply on WhatsApp &rarr;
                  </a>
                ) : (
                  <a
                    href={`${applyMail}&body=${encodeURIComponent(`Role: ${role.title}\nLocation: ${role.location}\n\nTell us about your experience.`)}`}
                    className="mt-5 inline-flex text-sm font-bold text-amber-600 hover:text-amber-700"
                  >
                    Apply by Email &rarr;
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-amber-600 to-orange-700 p-8 sm:p-12 text-white shadow-2xl shadow-amber-700/30">
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">Do not see a matching role?</h2>
            <p className="mt-3 text-amber-100 text-lg max-w-2xl">
              We are always looking for talented people across sales, operations, and brand building.
              Send us your profile and we will reach out when a fit opens.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={applyMail}
                className="inline-flex items-center bg-white text-amber-700 hover:bg-amber-50 font-bold px-7 py-3 rounded-xl transition-colors"
              >
                Send Resume
              </a>
              <Link
                href="/"
                className="inline-flex items-center border border-white/40 hover:border-white/70 hover:bg-white/10 font-semibold px-7 py-3 rounded-xl transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <img src={`${BASE_PATH}/images/logo.png`} alt="Shree Ganesh Kulfi" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Hiring Contact</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{CONTACT.email}</p>
              </div>
            </div>
            <a href={`tel:${CONTACT.phone}`} className="text-sm font-semibold text-amber-600 hover:text-amber-700">
              Call: {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </SeoLayout>
  );
};

export default CareerPage;