<script setup>
import { ref } from 'vue'
import { Scale, Users, Handshake, Gavel, Briefcase, Landmark, ShieldCheck, ChevronRight, X, Calendar, DollarSign, FileText, Clock } from '@lucide/vue'

const selectedCategory = ref('all')
const activeDrawer = ref(null)

const categories = [
  { id: 'all', name: 'All Practice Areas' },
  { id: 'family', name: 'Family & Custody' },
  { id: 'corporate', name: 'Corporate & Business' },
  { id: 'civil', name: 'Civil Litigation' },
  { id: 'criminal', name: 'Criminal Defense' },
  { id: 'labor', name: 'Labor & Employment' },
  { id: 'estate', name: 'Estate Planning & Probate' }
]

const practices = [
  {
    id: 1,
    category: 'family',
    title: 'Family & Matrimonial Law',
    shortDesc: 'Compassionate and rigorous representation in matrimonial disputes, child custody, and support arrangements.',
    icon: Users,
    fee: '₱5,000 Consultation',
    timeline: '3 - 12 Months',
    approach: 'We prioritize the safety and mental well-being of minors, pursuing mediated settlements first, but standing ready to mount fierce trial proceedings when required.',
    scenarios: [
      'De-facto Separation & Alimony Disputes',
      'Child Custody, Visitation, & Support Cases',
      'Adoption & Legal Guardianship Claims',
      'Annulment & Declaration of Nullity of Marriage'
    ],
    documents: [
      'Marriage Certificate (PSA copy)',
      'Birth Certificates of children',
      'Asset and Liability Statements',
      'Police or Barangay Reports (if applicable)'
    ]
  },
  {
    id: 2,
    category: 'corporate',
    title: 'Corporate & Business Law',
    shortDesc: 'Sophisticated advisory services regarding regulatory compliance, complex contracts, merges, and asset audits.',
    icon: Handshake,
    fee: '₱8,000 Consultation',
    timeline: 'Ongoing / Project basis',
    approach: 'We align legal safeguards directly with corporate operational goals, ensuring that regulatory risk is minimized without stifling business velocity.',
    scenarios: [
      'Corporate Incorporation & SEC Registrations',
      'Mergers, Acquisitions, & Venture Partnerships',
      'Drafting & Auditing Commercial Contracts',
      'Tax Advisory & BIR Compliance Audits'
    ],
    documents: [
      'Articles of Incorporation & By-Laws',
      'SEC Registration documents',
      'Draft Contracts & Service Agreements',
      'Recent Financial Audits / GIS Forms'
    ]
  },
  {
    id: 3,
    category: 'civil',
    title: 'Civil & Commercial Litigation',
    shortDesc: 'Objective, aggressive representation in contract breaches, property title claims, and debt collections.',
    icon: Gavel,
    fee: '₱6,000 Consultation',
    timeline: '6 - 24 Months',
    approach: 'We perform microscopic document analyses, identifying legal leverages early on to drive early motions, favorable settlements, or trial victories.',
    scenarios: [
      'Breach of Commercial Contract Disputes',
      'Property & Land Title Conflicting Claims',
      'Sum of Money & Debt Collection Actions',
      'Damage Liability & Tort Claims'
    ],
    documents: [
      'Signed Contracts or Promissory Notes',
      'Certified True Copies of Land Titles',
      'Written Demands and Correspondence history',
      'Financial receipts or Proof of Damage'
    ]
  },
  {
    id: 4,
    category: 'criminal',
    title: 'Criminal Defense Representation',
    shortDesc: 'Relentless defense counsel in state prosecutions, corporate fraud charges, and white-collar defense.',
    icon: ShieldCheck,
    fee: '₱7,000 Consultation',
    timeline: '6 - 36 Months',
    approach: 'Every citizen has the right to excellent, unyielding representation. We audit state evidence and police files, searching for constitutional breaches.',
    scenarios: [
      'White-Collar Corporate Fraud & Estafa',
      'Defamation, Cyber-Libel, & Privacy Claims',
      'Dynamic Bail Applications & Pre-Trial representation',
      'Representation in Criminal Trial proceedings'
    ],
    documents: [
      'Formal Criminal Complaint Sheet',
      'Resolutions from Office of the Prosecutor',
      'Arrest warrants or Police Blotters',
      'Affidavits of witnesses'
    ]
  },
  {
    id: 5,
    category: 'labor',
    title: 'Labor & Employment Disputes',
    shortDesc: 'Balancing labor relationships via mediation or aggressive representation in illegal dismissal and claims cases.',
    icon: Briefcase,
    fee: '₱5,000 Consultation',
    timeline: '2 - 8 Months',
    approach: 'Whether advising corporate boards or representing senior executives, we leverage NLRC guidelines to secure rapid resolutions and avoid prolonged arbitrations.',
    scenarios: [
      'Illegal Dismissal & Severance disputes',
      'Constructive Dismissal & Workplace Harassment',
      'Crafting Corporate Employment Handbooks',
      'Representations in NLRC Mediation & Arbitration'
    ],
    documents: [
      'Employment Contracts & Offer Letters',
      'Company HR Handbooks or Memos',
      'Termination Notices & Payslips',
      'Correspondence logs / Email records'
    ]
  },
  {
    id: 6,
    category: 'estate',
    title: 'Estate Planning & Probate',
    shortDesc: 'Safeguarding assets across generations. Drafting wills, trust systems, and managing estate administration.',
    icon: Landmark,
    fee: '₱6,000 Consultation',
    timeline: '4 - 18 Months',
    approach: 'We remove familial uncertainty and heavy tax burdens through meticulously constructed asset preservation frameworks.',
    scenarios: [
      'Drafting Wills, Testaments, & Trust Agreements',
      'Extrajudicial Settlement of Estates',
      'Estate Tax Amnesty and Payment filings',
      'Probate of Wills & Administrator Representation'
    ],
    documents: [
      'Death Certificate (PSA copy, if applicable)',
      'Complete List of Real & Personal Properties',
      'Land Titles, Tax Declarations, Stock certs',
      'Existing Wills or Trust blueprints'
    ]
  }
]

const openDrawer = (practice) => {
  activeDrawer.value = practice
  document.body.style.overflow = 'hidden' // Prevent scroll while drawer active
}

const closeDrawer = () => {
  activeDrawer.value = null
  document.body.style.overflow = '' // Restore scroll
}

const filterPractices = () => {
  if (selectedCategory.value === 'all') return practices
  return practices.filter(p => p.category === selectedCategory.value)
}
</script>

<template>
  <div class="bg-slate-50 min-h-screen pb-20 relative">
    
    <!-- Header Banner -->
    <section class="bg-slate-950 text-white py-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" style="background-image: url('https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1920&q=80')"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/60 z-0"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Practice Areas & Scope</h1>
        <p class="text-sm md:text-base text-gold-400 uppercase tracking-widest font-semibold max-w-xl mx-auto">
          Providing dynamic, expert-led legal strategies designed to safeguard your assets, relationships, and liberty.
        </p>
      </div>
    </section>

    <!-- Filters and Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <!-- Dynamic Filter Categories (Horizontal list on Desktop, select dropdown on mobile) -->
      <div class="mb-12">
        <!-- Desktop Category Tabs -->
        <div class="hidden md:flex flex-wrap items-center justify-center gap-3">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[
              'px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border',
              selectedCategory === cat.id 
                ? 'gold-gradient-bg text-white border-transparent shadow-md shadow-gold-500/25' 
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
            ]"
          >
            {{ cat.name }}
          </button>
        </div>

        <!-- Mobile Select Menu -->
        <div class="md:hidden">
          <label for="category-select" class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Filter Practice Area</label>
          <select 
            id="category-select" 
            v-model="selectedCategory"
            class="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-700 shadow-sm"
          >
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Practice Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="practice in filterPractices()" 
          :key="practice.id"
          class="bg-white rounded-lg border border-slate-200/80 hover:border-gold-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-8 group relative overflow-hidden"
        >
          <div class="space-y-6">
            <div class="bg-gold-50 text-gold-600 p-4 rounded-lg inline-flex group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
              <component :is="practice.icon" class="h-6 w-6" />
            </div>
            
            <h3 class="text-xl font-serif font-bold text-slate-900 group-hover:text-gold-600 transition-colors">
              {{ practice.title }}
            </h3>
            
            <p class="text-slate-500 text-sm leading-relaxed font-light">
              {{ practice.shortDesc }}
            </p>
          </div>

          <div class="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ practice.fee }}</span>
            <button 
              @click="openDrawer(practice)"
              class="inline-flex items-center gap-1 text-xs font-bold text-gold-600 uppercase tracking-wider group-hover:text-gold-700 transition-colors"
            >
              Explore Scope <ChevronRight class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sliding Right Drawer Modal Details Detail Overlay -->
    <transition 
      enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-200 ease-in"
    >
      <div v-if="activeDrawer" class="fixed inset-0 z-50 overflow-hidden flex justify-end">
        <!-- Semi-transparent Backdrop Overlay -->
        <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" @click="closeDrawer"></div>

        <!-- Sliding Panel Content -->
        <div class="relative w-full max-w-2xl bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-fade-in">
          
          <!-- Drawer Header -->
          <div class="p-6 md:p-8 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="bg-gold-500 text-white p-2 rounded">
                <component :is="activeDrawer.icon" class="h-5 w-5" />
              </div>
              <h2 class="text-lg md:text-xl font-serif font-bold text-white">{{ activeDrawer.title }}</h2>
            </div>
            <button @click="closeDrawer" class="p-2 hover:bg-slate-900 rounded-full transition-colors" aria-label="Close details">
              <X class="h-5 w-5 text-slate-400 hover:text-white" />
            </button>
          </div>

          <!-- Drawer Body Scrollable Content -->
          <div class="flex-grow p-6 md:p-8 space-y-8">
            <!-- Summary Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 border border-slate-200/80 rounded-lg p-4 flex items-center gap-3">
                <DollarSign class="h-8 w-8 text-gold-600 shrink-0" />
                <div>
                  <span class="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Initial Fees</span>
                  <span class="block text-sm font-semibold text-slate-900">{{ activeDrawer.fee }}</span>
                </div>
              </div>
              
              <div class="bg-slate-50 border border-slate-200/80 rounded-lg p-4 flex items-center gap-3">
                <Clock class="h-8 w-8 text-gold-600 shrink-0" />
                <div>
                  <span class="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Est. Duration</span>
                  <span class="block text-sm font-semibold text-slate-900">{{ activeDrawer.timeline }}</span>
                </div>
              </div>
            </div>

            <!-- Operational Approach -->
            <div class="space-y-3">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gold-500"></span> Legal Philosophy & Approach
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed font-light">
                {{ activeDrawer.approach }}
              </p>
            </div>

            <!-- Practical Scenarios Grid -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gold-500"></span> Common Case Scenarios
              </h3>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li 
                  v-for="(scene, idx) in activeDrawer.scenarios" 
                  :key="idx"
                  class="flex items-start gap-2 bg-slate-50 p-3 rounded text-xs text-slate-600 leading-relaxed font-light border border-slate-100"
                >
                  <ChevronRight class="h-4.5 w-4.5 text-gold-500 shrink-0 mt-0.5" />
                  <span>{{ scene }}</span>
                </li>
              </ul>
            </div>

            <!-- Required Onboarding Documents Checklist -->
            <div class="space-y-3">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gold-500"></span> Essential Documentation Checklist
              </h3>
              <p class="text-xs text-slate-400 leading-relaxed mb-2 font-light">
                We strongly recommend assembling these files prior to our initial consultation session to enable immediate evaluation.
              </p>
              <ul class="space-y-2">
                <li 
                  v-for="(doc, idx) in activeDrawer.documents" 
                  :key="idx"
                  class="flex items-center gap-3 bg-gold-50/30 p-2.5 rounded border border-gold-500/10 text-xs text-slate-700"
                >
                  <FileText class="h-4.5 w-4.5 text-gold-600 shrink-0" />
                  <span>{{ doc }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Drawer Footer Booking Trigger -->
          <div class="p-6 md:p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            <router-link 
              to="/booking" 
              @click="closeDrawer"
              class="w-full sm:flex-grow py-3.5 rounded text-center font-bold text-xs uppercase tracking-widest gold-gradient-bg text-white hover:opacity-95 shadow-md shadow-gold-500/25 flex items-center justify-center gap-2"
            >
              <Calendar class="h-4 w-4" /> Book Appointment for This Sector
            </router-link>
            
            <button 
              @click="closeDrawer" 
              class="w-full sm:w-auto px-6 py-3.5 rounded text-center border border-slate-300 hover:bg-slate-100 font-bold text-xs uppercase tracking-widest text-slate-700 transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>
