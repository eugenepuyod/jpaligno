<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronDown, Calendar, User, ArrowRight, BookOpen, AlertCircle, HelpCircle } from '@lucide/vue'

// FAQ ACCORDION STATE
const openFaqId = ref(null)

const faqs = [
  {
    id: 1,
    category: 'general',
    question: 'How do I start a legal consultation with your office?',
    answer: 'You can easily start by scheduling an online booking slot using our Scheduler portal. Select whether you prefer a secure video call, telephone brief, or an in-office face-to-face consultation at our Cebu Business Prestige suite. Select your date/hour and file a short case brief.'
  },
  {
    id: 2,
    category: 'fees',
    question: 'What are your standard legal fees and retainer packages?',
    answer: 'Initial consultation fees range between ₱5,000 to ₱8,000 for a rigorous, 60-minute case-evaluation brief. For subsequent representations, we provide transparent contracts structured either as fixed-project rates (e.g. for extrajudicial settlements or company registrations) or competitive hourly rates.'
  },
  {
    id: 3,
    category: 'litigation',
    question: 'How long does a standard civil lawsuit take to resolve in Cebu?',
    answer: 'A standard civil lawsuit (such as contract breaches or title recovery) usually spans between 6 to 24 months. The exact timeline relies heavily on court scheduling load, compulsory mediation attempts (SENA or court-annexed mediation), and potential defendant appeals.'
  },
  {
    id: 4,
    category: 'family',
    question: 'What is the legal difference between Annulment and Nullity of Marriage?',
    answer: 'Under the Family Code of the Philippines, an Annulment applies to marriages that are valid but possess a defect at inception (e.g. fraud or lack of parental consent), which can be ratified. Declaration of Nullity applies to marriages that are void from the beginning (e.g. bigamous marriages or psychological incapacity under Article 36).'
  },
  {
    id: 5,
    category: 'labor',
    question: 'Is SENA mediation compulsory prior to filing an illegal dismissal lawsuit?',
    answer: 'Yes. Under Department of Labor and Employment (DOLE) rules, Single Entry Approach (SENA) mediation is a mandatory, 30-day fast-track settlement attempt. A case cannot be formally elevated to the Labor Arbiter or NLRC unless a Certificate of Non-Resolution is issued during SENA.'
  }
]

const toggleFaq = (id) => {
  if (openFaqId.value === id) {
    openFaqId.value = null
  } else {
    openFaqId.value = id
  }
}

// LEGAL INSIGHTS BLOG STATE
const searchQuery = ref('')
const selectedTag = ref('all')
const activeBlogModal = ref(null)

const tags = [
  { id: 'all', name: 'All Topics' },
  { id: 'corporate', name: 'Corporate Operations' },
  { id: 'family', name: 'Family & Estates' },
  { id: 'civil', name: 'Civil Disputes' },
  { id: 'labor', name: 'Labor Standards' }
]

const blogs = [
  {
    id: 1,
    tag: 'family',
    title: 'Understanding Extrajudicial Settlement of Estates in the Philippines',
    excerpt: 'When a family member passes away without leaving a will, an Extrajudicial Settlement is the fastest way to divide properties without court disputes.',
    date: 'May 12, 2026',
    author: 'Atty. John Paul Aligno',
    readTime: '6 min read',
    content: `When a loved one passes away in the Philippines leaving real or personal properties but without leaving a formal Will or any outstanding debts, the heirs do not necessarily have to undergo expensive, long probate trials in court. Instead, the heirs can settle the estate amongst themselves via an "Extrajudicial Settlement of Estate."
    
    To execute this legally, all heirs must be in full agreement regarding the dividing parameters. They must draft and sign a formal public instrument called the "Deed of Extrajudicial Settlement," listing all real and personal properties (titles, tax declarations, stock certificates), which must then be notarized.
    
    Critical prerequisites include publishing the Deed in a newspaper of general circulation once a week for three consecutive weeks, paying the corresponding Estate Tax to the Bureau of Internal Revenue (BIR) within the legal timeline, and securing the Electronic Certificate Authorizing Registration (eCAR) before registering properties at the Registry of Deeds.`,
    checklist: [
      'PSA-certified Death Certificate of the deceased',
      'PSA-certified Birth Certificates of all surviving heirs',
      'PSA-certified Marriage Contract (if applicable)',
      'Certified True Copies of Land Titles & Tax Declarations'
    ]
  },
  {
    id: 2,
    tag: 'corporate',
    title: 'A Checklist Guide to SEC Corporation Registration (Revised Corporation Code)',
    excerpt: 'Explore structural rules, authorized stocks, and the new One Person Corporation (OPC) framework under Republic Act 11232.',
    date: 'April 28, 2026',
    author: 'Atty. John Paul Aligno',
    readTime: '8 min read',
    content: `The enactment of the Revised Corporation Code (Republic Act No. 11232) introduced dynamic provisions that modernized business registrations in the Philippines, fostering ease of operations. 
    
    A primary modification is the removal of the 5-incorporator minimum. You can now register a corporation with as few as two incorporators, or even establish a "One Person Corporation" (OPC) where a single stockholder acts as both Sole Director and President.
    
    Additionally, the law removed the minimum authorized capital stock requirement (except for specifically regulated industries like banks or insurance), allowing flexible capitalization.
    
    To register, you must secure a unique corporate name via the SEC ESPAYSEC portal, draft the Articles of Incorporation and By-Laws outlining stock structures, nominate corporate officers (Treasurer, Corporate Secretary), register with the BIR for Tax Identification, and secure local business permits (Mayor's Permit, Barangay Clearances).`,
    checklist: [
      'SEC Approved Corporate Name Reservation',
      'Articles of Incorporation and By-Laws public drafts',
      'Treasurer Affidavit & Nominated Officers details',
      'BIR TIN numbers for all foreign or local incorporators'
    ]
  },
  {
    id: 3,
    tag: 'labor',
    title: 'SENA Mediation: The Critical Gateway for Employee illegal Dismissals',
    excerpt: 'Learn the compulsory procedural guidelines of Single Entry Approach (SENA) prior to filing NLRC arbitrations.',
    date: 'March 15, 2026',
    author: 'Atty. John Paul Aligno',
    readTime: '5 min read',
    content: `Single Entry Approach (SENA) is an administrative mandate designed to prevent minor disputes from clogging NLRC litigation dockets. It acts as an interactive, fast-track mediation system lasting up to 30 calendar days.
    
    Under DOLE guidelines, either an illegal dismissal complaint by an employee or a labor standard violation claim must undergo SENA mediation first. A designated SENA desk officer coordinates meeting schedules between the company management/legal counsel and the employee.
    
    If both parties reach a mutual agreement (e.g. separation pay settlements or workplace reinstatements), a binding Compromise Agreement is notarized, bringing a rapid end to the dispute. If mediation fails, the SENA desk officer issues a formal Certificate of Non-Resolution, which is the compulsory key to elevating complaints to a formal NLRC Labor Arbiter case.`,
    checklist: [
      'Employment Contracts showing salary/role details',
      'Formal Termination Letter or HR notices',
      'Payslips or Bank Transfer receipts showing historical pay',
      'Compulsory 30-day SENA mediation scheduling brief'
    ]
  }
]

// Filter and Search computed list
const filteredBlogs = computed(() => {
  return blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTag = selectedTag.value === 'all' || blog.tag === selectedTag.value
    return matchesSearch && matchesTag
  })
})

const openBlog = (blog) => {
  activeBlogModal.value = blog
}

const closeBlog = () => {
  activeBlogModal.value = null
}
</script>

<template>
  <div class="bg-slate-50 min-h-screen pb-20">
    <!-- Header Banner -->
    <section class="bg-slate-950 text-white py-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" style="background-image: url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=80')"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/60 z-0"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Legal Insights & FAQs</h1>
        <p class="text-sm md:text-base text-gold-400 uppercase tracking-widest font-semibold max-w-xl mx-auto font-sans">
          Informing families and corporate leaders. Read expert analyses regarding Philippine jurisprudence and general office parameters.
        </p>
      </div>
    </section>

    <!-- Main Content Layout -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- LEFT COLUMN: Legal Insights Blogs (8 Columns) -->
        <div class="lg:col-span-8 space-y-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
            <h2 class="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <BookOpen class="h-6 w-6 text-gold-600" /> Jurisprudential Insights
            </h2>
            
            <!-- Tags toggle (mini) -->
            <div class="flex flex-wrap gap-1.5">
              <button 
                v-for="t in tags" 
                :key="t.id"
                @click="selectedTag = t.id"
                :class="[
                  'px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border',
                  selectedTag === t.id 
                    ? 'gold-gradient-bg text-white border-transparent' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                ]"
              >
                {{ t.name }}
              </button>
            </div>
          </div>

          <!-- Blog search widget -->
          <div class="relative">
            <Search class="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search legal articles (e.g. Extrajudicial, SEC)..."
              class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors shadow-sm"
            />
          </div>

          <!-- Blog list grid -->
          <div v-if="filteredBlogs.length > 0" class="space-y-6">
            <article 
              v-for="blog in filteredBlogs" 
              :key="blog.id"
              class="bg-white rounded-lg border border-slate-200 p-6 md:p-8 hover:shadow-md hover:border-gold-300 transition-all duration-300 space-y-4 group"
            >
              <div class="flex items-center gap-4 text-xs text-slate-400">
                <span class="bg-gold-50 text-gold-600 px-2.5 py-0.5 rounded border border-gold-500/10 font-bold uppercase tracking-wider text-[9px]">{{ blog.tag }}</span>
                <span class="flex items-center gap-1"><Calendar class="h-3.5 w-3.5" /> {{ blog.date }}</span>
                <span class="flex items-center gap-1"><User class="h-3.5 w-3.5" /> {{ blog.author }}</span>
              </div>

              <h3 class="text-xl md:text-2xl font-serif font-bold text-slate-900 group-hover:text-gold-600 transition-colors">
                {{ blog.title }}
              </h3>

              <p class="text-sm text-slate-500 leading-relaxed font-light">
                {{ blog.excerpt }}
              </p>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-xs text-slate-400 font-light">{{ blog.readTime }}</span>
                <button 
                  @click="openBlog(blog)"
                  class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-gold-600 transition-colors"
                >
                  Read Full Brief <ArrowRight class="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          </div>

          <!-- Empty state -->
          <div v-else class="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-4">
            <AlertCircle class="h-12 w-12 text-slate-300 mx-auto" />
            <h3 class="font-serif font-bold text-slate-700 text-lg">No Articles Found</h3>
            <p class="text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
              Verify your search spelling parameters or switch the tag categories to All Topics to continue.
            </p>
          </div>
        </div>

        <!-- RIGHT COLUMN: Accordion FAQs (4 Columns) -->
        <div class="lg:col-span-4 space-y-8">
          <div class="border-b border-slate-200 pb-4">
            <h2 class="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle class="h-6 w-6 text-gold-600" /> Frequently Asked
            </h2>
          </div>

          <div class="space-y-4">
            <div 
              v-for="faq in faqs" 
              :key="faq.id"
              class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm transition-all duration-300"
            >
              <!-- FAQ Header -->
              <button 
                @click="toggleFaq(faq.id)"
                class="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-slate-800 hover:text-gold-600 transition-colors"
                :aria-expanded="openFaqId === faq.id"
              >
                <span>{{ faq.question }}</span>
                <ChevronDown 
                  :class="[
                    'h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0',
                    openFaqId === faq.id ? 'rotate-180 text-gold-600' : ''
                  ]"
                />
              </button>

              <!-- FAQ Body (with basic transition height helper) -->
              <div 
                v-show="openFaqId === faq.id"
                class="p-5 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500 font-light leading-relaxed animate-fade-in"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- FULL BLOG ARTICLE MODAL POPUP -->
    <transition 
      enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-200 ease-in"
    >
      <div v-if="activeBlogModal" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="closeBlog"></div>

        <!-- Modal Card -->
        <div class="relative bg-white w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col justify-between max-h-[90vh]">
          
          <!-- Modal Header -->
          <div class="p-6 bg-slate-950 text-white border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <BookOpen class="h-5 w-5 text-gold-500" />
              <span class="font-serif font-bold text-sm text-white">Executive Case Briefing</span>
            </div>
            <button @click="closeBlog" class="p-1 hover:bg-slate-900 rounded-full transition-colors text-slate-400 hover:text-white">
              <span class="sr-only">Close modal</span>
              <ChevronDown class="h-6 w-6 rotate-90" />
            </button>
          </div>

          <!-- Modal Scrollable Content -->
          <div class="flex-grow p-6 md:p-8 overflow-y-auto space-y-6">
            <div class="flex items-center gap-4 text-xs text-slate-400">
              <span class="bg-gold-50 text-gold-600 px-2.5 py-0.5 rounded border border-gold-500/10 font-bold uppercase tracking-wider text-[9px]">{{ activeBlogModal.tag }}</span>
              <span>{{ activeBlogModal.date }}</span>
              <span>By {{ activeBlogModal.author }}</span>
            </div>

            <h2 class="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-snug">
              {{ activeBlogModal.title }}
            </h2>

            <div class="text-sm text-slate-600 leading-relaxed font-light space-y-4 whitespace-pre-line border-t border-slate-100 pt-6">
              {{ activeBlogModal.content }}
            </div>

            <!-- Prerequisites Checkbox list in post -->
            <div v-if="activeBlogModal.checklist" class="p-5 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <h4 class="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle class="h-4 w-4 text-gold-600" /> Crucial Evidentiary Files Checklist
              </h4>
              <ul class="space-y-2">
                <li 
                  v-for="(check, idx) in activeBlogModal.checklist" 
                  :key="idx"
                  class="flex items-center gap-2.5 text-xs text-slate-600 font-light"
                >
                  <CheckCircle2 class="h-4 w-4 text-green-500 shrink-0" />
                  <span>{{ check }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <router-link 
              to="/booking" 
              @click="closeBlog"
              class="px-6 py-3 rounded font-bold text-xs uppercase tracking-widest gold-gradient-bg text-white hover:opacity-95 shadow shadow-gold-500/20"
            >
              Book Callback Assessment
            </router-link>
            <button 
              @click="closeBlog"
              class="px-5 py-3 rounded font-bold text-xs uppercase tracking-widest border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>
