<script setup>
import { ref, computed } from 'vue'
import { Scale, Search, ShieldCheck, ChevronRight, CheckCircle2, AlertCircle, FileText, Landmark, ClipboardList, RefreshCw, Star, Info, Play } from 'lucide-vue-next'

// Active tab between Case Tracker and Case Intake Questionnaire
const activeTab = ref('tracker')

// CASE TRACKER STATE
const searchCaseId = ref('')
const hasSearched = ref(false)
const caseDetails = ref(null)
const trackerError = ref('')

const mockCases = {
  'CASE-2026-JPAL': {
    id: 'CASE-2026-JPAL',
    clientName: 'Richard Montejo (VistaTech Systems)',
    specialty: 'Corporate Breach of Contract',
    courtName: 'Regional Trial Court (RTC), Cebu City - Branch 12',
    filedDate: 'January 15, 2026',
    activeMilestone: 3, // 0-indexed
    milestones: [
      { title: 'Case Intake & Screening', date: 'Jan 10, 2026', desc: 'Secure evaluation of dispute particulars and contract reviews complete.', status: 'completed' },
      { title: 'Formal Complaint Filed', date: 'Jan 15, 2026', desc: 'Complaint registered at Regional Trial Court Cebu City; fees settled.', status: 'completed' },
      { title: 'Summons Issued & Answer Filed', date: 'Feb 10, 2026', desc: 'Defendant received summons and submitted formal Answer pleadings.', status: 'completed' },
      { title: 'Mediation Conferences', date: 'June 05, 2026 (Scheduled)', desc: 'Court-annexed mediation scheduled to explore amicable corporate settlement agreements.', status: 'active' },
      { title: 'Pre-Trial Discovery & Prep', date: 'Pending', desc: 'Exchange of documentary proofs, witness depositions, and motions.', status: 'pending' },
      { title: 'RTC Trial Proceedings', date: 'Pending', desc: 'Formal trial hearings, presentation of case briefs and cross-examinations.', status: 'pending' },
      { title: 'Judicial Judgment', date: 'Pending', desc: 'Official final ruling from RTC Cebu Presiding Judge.', status: 'pending' }
    ]
  },
  'CASE-2026-CUST': {
    id: 'CASE-2026-CUST',
    clientName: 'Dr. Elena Santos',
    specialty: 'Child Custody & Support',
    courtName: 'Family Court, Cebu City - Branch 3',
    filedDate: 'March 02, 2026',
    activeMilestone: 1,
    milestones: [
      { title: 'Case Intake & Screening', date: 'Feb 26, 2026', desc: 'Psychological and school certifications collected; evaluation complete.', status: 'completed' },
      { title: 'Petition for Sole Custody Filed', date: 'Mar 02, 2026', desc: 'Formal petition registered in Cebu Family Court.', status: 'active' },
      { title: 'Barangay/Court Mediation', date: 'Pending', desc: 'Compulsory mediation session to discuss mutual support allocations.', status: 'pending' },
      { title: 'Social Welfare Assessment', date: 'Pending', desc: 'Home visits by Cebu DSWD social worker to evaluate child environments.', status: 'pending' },
      { title: 'Trial Hearing & Testimony', date: 'Pending', desc: 'Hearing of child interests and testimony evaluations.', status: 'pending' },
      { title: 'Final Custody Decree', date: 'Pending', desc: 'Official court order establishing sole custody and support duties.', status: 'pending' }
    ]
  }
}

const performCaseSearch = () => {
  trackerError.value = ''
  hasSearched.value = true
  const query = searchCaseId.value.trim().toUpperCase()
  
  if (mockCases[query]) {
    caseDetails.value = mockCases[query]
  } else {
    caseDetails.value = null
    trackerError.value = 'No active case found matching this registry code. Verify your case ID formatting (e.g. CASE-2026-JPAL).'
  }
}

// INTAKE QUESTIONNAIRE STATE
const intakeStep = ref(1)
const isIntakeComplete = ref(false)
const clientRole = ref('')
const opposingPartyType = ref('')
const disputeType = ref('')
const monetaryDisputeValue = ref('')
const hasContracts = ref('')

const calculateAssessment = computed(() => {
  let meritScore = 0
  let codeExplanation = ''
  let recommendation = ''

  if (hasContracts.value === 'yes') meritScore += 40
  if (clientRole.value === 'plaintiff') meritScore += 30
  else meritScore += 20

  if (disputeType.value === 'corporate') {
    codeExplanation = 'This dispute is governed primarily by the Revised Corporation Code of the Philippines (R.A. 11232) and the Philippine Civil Code provisions on Obligations and Contracts.'
    recommendation = 'Strong documentary standing is critical. Ensure GIS forms, SEC registrations, and authorized emails are secured. Booking an Executive Corporate Consultation is highly recommended.'
  } else if (disputeType.value === 'family') {
    codeExplanation = 'This matter falls within the jurisdiction of the Family Code of the Philippines (E.O. 209), specifically provisions regarding marital obligations, custody structures, or legal separations.'
    recommendation = 'Sensitive matters require quick, secure interventions. Prioritize collecting child birth certificates, PSA marriage records, and barangay mediation logs.'
  } else if (disputeType.value === 'civil') {
    codeExplanation = 'Governed by the Civil Code of the Philippines (R.A. 386), under Book IV regarding Obligations and Contracts, and Tort Liabilities.'
    recommendation = 'Ensure you have written demand letters showing proof of receipt by the opposing party. This is a critical prerequisite for filing a sum of money claim.'
  } else {
    codeExplanation = 'Governed by the Labor Code of the Philippines (P.D. 442) and NLRC Rules of Procedure.'
    recommendation = 'Collect copies of payslips, 201 files, termination letters, or company HR rules. NLRC cases require compulsory SENA mediation prior to formal complaints.'
  }

  // Assess monetary value impact
  const isHighValue = monetaryDisputeValue.value === 'high' || monetaryDisputeValue.value === 'mid'
  if (isHighValue) meritScore += 30
  else meritScore += 15

  return {
    score: meritScore,
    code: codeExplanation,
    recommend: recommendation,
    rating: meritScore >= 80 ? 'High Legal Merit Probability' : (meritScore >= 50 ? 'Moderate Merit / Requires Fact-finding' : 'Sub-complex Legal Standing')
  }
})

const nextIntake = () => {
  if (intakeStep.value < 4) {
    intakeStep.value++
  }
}

const prevIntake = () => {
  if (intakeStep.value > 1) {
    intakeStep.value--
  }
}

const finishIntake = () => {
  isIntakeComplete.value = true
}

const resetIntake = () => {
  intakeStep.value = 1
  isIntakeComplete.value = false
  clientRole.value = ''
  opposingPartyType.value = ''
  disputeType.value = ''
  monetaryDisputeValue.value = ''
  hasContracts.value = ''
}
</script>

<template>
  <div class="bg-slate-50 min-h-screen pb-20">
    <!-- Header Banner -->
    <section class="bg-slate-950 text-white py-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" style="background-image: url('https://images.unsplash.com/photo-1521791136368-1a85190079f2?auto=format&fit=crop&w=1920&q=80')"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/60 z-0"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Client Portal & Screening</h1>
        <p class="text-sm md:text-base text-gold-400 uppercase tracking-widest font-semibold max-w-xl mx-auto">
          Secure digital gateways. Track active lawsuits in real-time or pre-screen case eligibility via our intake questionnaire.
        </p>
      </div>
    </section>

    <!-- Tab Selectors -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="flex border-b border-slate-200 bg-white rounded-lg p-1.5 shadow-sm">
        <button 
          @click="activeTab = 'tracker'"
          :class="[
            'w-1/2 py-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 flex items-center justify-center gap-2',
            activeTab === 'tracker' 
              ? 'gold-gradient-bg text-white shadow shadow-gold-500/20' 
              : 'text-slate-600 hover:text-slate-950'
          ]"
        >
          <Search class="h-4 w-4" /> Case Milestone Tracker
        </button>
        
        <button 
          @click="activeTab = 'intake'"
          :class="[
            'w-1/2 py-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 flex items-center justify-center gap-2',
            activeTab === 'intake' 
              ? 'gold-gradient-bg text-white shadow shadow-gold-500/20' 
              : 'text-slate-600 hover:text-slate-950'
          ]"
        >
          <ClipboardList class="h-4 w-4" /> Legal Intake Questionnaire
        </button>
      </div>

      <!-- PORTAL 1: CASE TRACKER -->
      <div v-if="activeTab === 'tracker'" class="mt-8 space-y-8 animate-fade-in">
        
        <!-- Search Input Card -->
        <div class="bg-white rounded-lg border border-slate-200 p-8 shadow-sm space-y-6">
          <div class="space-y-2">
            <h2 class="text-xl font-serif font-bold text-slate-900">Track Lawsuit Progress</h2>
            <p class="text-xs text-slate-500 font-light leading-relaxed">
              Active clients of John Paul Aligno Law Office can trace ongoing litigation proceedings using their assigned Registry Case Code.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-grow">
              <Search class="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                v-model="searchCaseId"
                placeholder="Enter Case Code (e.g. CASE-2026-JPAL)"
                class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors"
                @keyup.enter="performCaseSearch"
              />
            </div>
            <button 
              @click="performCaseSearch"
              class="px-8 py-3 rounded font-bold text-xs uppercase tracking-widest gold-gradient-bg text-white hover:opacity-95 shadow shadow-gold-500/20"
            >
              Search Registry
            </button>
          </div>

          <!-- Help Info Hint -->
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 text-xs text-slate-500 leading-relaxed font-light">
            <Info class="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
            <div>
              <span>Don't have an active case yet? Use our demonstration registry code <code class="bg-slate-200 px-1 py-0.5 rounded font-mono font-bold text-slate-800">CASE-2026-JPAL</code> or <code class="bg-slate-200 px-1 py-0.5 rounded font-mono font-bold text-slate-800">CASE-2026-CUST</code> to preview the milestone tracking flow.</span>
            </div>
          </div>
        </div>

        <!-- Search Error -->
        <div v-if="trackerError" class="bg-red-50 border border-red-200/50 rounded-lg p-5 flex gap-3 text-xs text-red-700">
          <AlertCircle class="h-5 w-5 shrink-0" />
          <span>{{ trackerError }}</span>
        </div>

        <!-- Case Milestones Display -->
        <div v-if="caseDetails" class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
          <!-- Case Header Details -->
          <div class="bg-slate-950 text-white p-6 md:p-8 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span class="text-xs text-gold-400 font-bold uppercase tracking-widest">Active Lawsuit Profile</span>
                <h3 class="text-xl font-serif font-bold mt-1 text-white">{{ caseDetails.clientName }}</h3>
              </div>
              <div class="self-start sm:self-auto bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-gold-400">
                Code: {{ caseDetails.id }}
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div>
                <span class="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Legal Sector</span>
                <span class="block font-semibold text-slate-200 mt-0.5">{{ caseDetails.specialty }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Assigned Court Venue</span>
                <span class="block font-semibold text-slate-200 mt-0.5">{{ caseDetails.courtName }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Filing Date</span>
                <span class="block font-semibold text-slate-200 mt-0.5">{{ caseDetails.filedDate }}</span>
              </div>
            </div>
          </div>

          <!-- Milestones Timeline Grid -->
          <div class="p-6 md:p-8 space-y-10">
            <h4 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Landmark class="h-4.5 w-4.5 text-gold-600" /> Court Registry Milestones
            </h4>

            <div class="relative border-l-2 border-slate-100 ml-4 space-y-8">
              <div 
                v-for="(mile, idx) in caseDetails.milestones" 
                :key="idx"
                class="relative pl-8 group"
              >
                <!-- Dot Icon Indicator -->
                <div 
                  :class="[
                    'absolute -left-2 top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white transition-all shadow-sm',
                    mile.status === 'completed' ? 'bg-green-500 shadow-green-500/20' : 
                    (mile.status === 'active' ? 'bg-gold-500 animate-pulse shadow-gold-500/30 scale-110' : 'bg-slate-200')
                  ]"
                ></div>

                <!-- Milestone Content Box -->
                <div 
                  :class="[
                    'p-5 rounded-lg border transition-all duration-300',
                    mile.status === 'completed' ? 'bg-slate-50/30 border-slate-100' :
                    (mile.status === 'active' ? 'bg-gold-50/10 border-gold-500/30 shadow shadow-gold-500/5' : 'bg-white border-slate-200/60 opacity-60')
                  ]"
                >
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h5 
                      :class="[
                        'font-serif font-bold text-base',
                        mile.status === 'active' ? 'text-gold-600' : 'text-slate-900'
                      ]"
                    >
                      {{ mile.title }}
                    </h5>
                    
                    <span 
                      :class="[
                        'px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider self-start sm:self-auto border',
                        mile.status === 'completed' ? 'bg-green-50 border-green-200 text-green-600' :
                        (mile.status === 'active' ? 'bg-gold-50 border-gold-400 text-gold-600' : 'bg-slate-50 border-slate-200 text-slate-400')
                      ]"
                    >
                      {{ mile.status === 'completed' ? 'Completed' : (mile.status === 'active' ? 'In Progress' : 'Pending') }}
                    </span>
                  </div>

                  <span class="block text-xs font-semibold text-slate-400 mb-2">{{ mile.date }}</span>
                  <p class="text-xs text-slate-500 leading-relaxed font-light">{{ mile.desc }}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PORTAL 2: CASE INTAKE SCREENING -->
      <div v-if="activeTab === 'intake'" class="mt-8 space-y-8 animate-fade-in">
        
        <!-- Intake Questionnaire Card -->
        <div class="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
          
          <!-- ASSESSMENT RESULT STATE -->
          <div v-if="isIntakeComplete" class="space-y-8 animate-fade-in">
            <div class="text-center space-y-4">
              <div class="inline-flex bg-gold-50 text-gold-600 border border-gold-200 p-4 rounded-full shadow-inner">
                <ShieldCheck class="h-10 w-10" />
              </div>
              <h2 class="text-2xl font-serif font-bold text-slate-900">Intake Evaluation Completed</h2>
              <p class="text-xs text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                Our dynamic screening module has mapped your dispute against standard statutory prerequisites. Review the preliminary legal assessment.
              </p>
            </div>

            <!-- Result breakdown grid -->
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-xl mx-auto space-y-6 text-xs">
              <div class="flex justify-between items-center border-b border-slate-200 pb-3">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluation Standing</span>
                <span class="text-sm font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded border border-gold-500/25 uppercase tracking-wide">{{ calculateAssessment.rating }}</span>
              </div>

              <!-- Merit Progress bar -->
              <div class="space-y-1.5">
                <div class="flex justify-between font-semibold">
                  <span class="text-slate-400 uppercase tracking-wider text-[9px]">Mock Case Weight Score</span>
                  <span class="text-slate-800">{{ calculateAssessment.score }} / 100</span>
                </div>
                <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div class="gold-gradient-bg h-full transition-all duration-1000" :style="{ width: calculateAssessment.score + '%' }"></div>
                </div>
              </div>

              <!-- Jurisprudential applicability -->
              <div class="space-y-1.5">
                <span class="block text-slate-400 font-bold uppercase tracking-wider text-[9px]">Applicable Statutory Code</span>
                <p class="text-slate-600 leading-relaxed font-light bg-white p-3 border rounded border-slate-200">
                  {{ calculateAssessment.code }}
                </p>
              </div>

              <!-- Recommendation -->
              <div class="space-y-1.5">
                <span class="block text-slate-400 font-bold uppercase tracking-wider text-[9px]">Pre-Consultation Recommendation</span>
                <p class="text-slate-600 leading-relaxed font-light bg-white p-3 border rounded border-slate-200 italic">
                  {{ calculateAssessment.recommend }}
                </p>
              </div>
            </div>

            <div class="flex justify-center gap-4 pt-4">
              <router-link 
                to="/booking"
                class="px-8 py-3.5 rounded font-bold text-xs uppercase tracking-widest gold-gradient-bg text-white hover:opacity-90 transition-opacity shadow shadow-gold-500/25"
              >
                Schedule Consultation Session
              </router-link>
              <button 
                @click="resetIntake"
                class="px-6 py-3.5 rounded font-bold text-xs uppercase tracking-widest border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
              >
                Re-Screen Case
              </button>
            </div>
          </div>

          <!-- QUESTIONNAIRE WIZARD STEPS -->
          <div v-else class="space-y-8">
            <div class="space-y-2 border-b border-slate-100 pb-4">
              <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Question {{ intakeStep }} of 4</span>
              <h3 class="text-xl font-serif font-bold text-slate-900">Intake Screening Wizard</h3>
              <p class="text-xs text-slate-500 font-light">
                Answer these preliminary screening factors to help calculate initial merit parameters.
              </p>
            </div>

            <!-- Step 1: Role -->
            <div v-if="intakeStep === 1" class="space-y-4 animate-fade-in">
              <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider">What is your primary relationship to this legal issue?</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  v-for="role in [
                    { id: 'plaintiff', label: 'Plaintiff / Claimant', desc: 'I am initiating a legal action or demanding resolution.' },
                    { id: 'defendant', label: 'Defendant / Opponent', desc: 'I received a lawsuit or formal legal demand.' },
                    { id: 'advisory', label: 'General Advisory', desc: 'I require strategic drafting, auditing or contracts.' }
                  ]"
                  :key="role.id"
                  @click="clientRole = role.id"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    clientRole === role.id ? 'border-gold-500 bg-gold-50/10 shadow shadow-gold-500/5' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', clientRole === role.id ? 'text-gold-600' : 'text-slate-900']">{{ role.label }}</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">{{ role.desc }}</span>
                </button>
              </div>
            </div>

            <!-- Step 2: Dispute specialty field -->
            <div v-if="intakeStep === 2" class="space-y-4 animate-fade-in">
              <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Select the legal practice sector of the dispute:</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  v-for="disp in [
                    { id: 'corporate', label: 'Corporate & Business', desc: 'Company partnerships, stock registrations, SEC, regulatory.' },
                    { id: 'family', label: 'Family & Custody', desc: 'Annulments, child custody, alimony or support parameters.' },
                    { id: 'civil', label: 'Civil & Contract Claims', desc: 'Breach of contracts, title disputes, damages, debt collect.' },
                    { id: 'labor', label: 'Labor & Employment', desc: 'Illegal dismissals, NLRC claims, employee HR policies.' }
                  ]"
                  :key="disp.id"
                  @click="disputeType = disp.id"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    disputeType === disp.id ? 'border-gold-500 bg-gold-50/10' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', disputeType === disp.id ? 'text-gold-600' : 'text-slate-900']">{{ disp.label }}</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">{{ disp.desc }}</span>
                </button>
              </div>
            </div>

            <!-- Step 3: Contracts availability -->
            <div v-if="intakeStep === 3" class="space-y-4 animate-fade-in">
              <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Are there signed contracts, notary deeds, or formal written exchanges?</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  @click="hasContracts = 'yes'"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    hasContracts === 'yes' ? 'border-gold-500 bg-gold-50/10' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', hasContracts === 'yes' ? 'text-gold-600' : 'text-slate-900']">Yes, Signed Contracts</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">Signed contracts, emails, or notary instruments are active.</span>
                </button>
                <button 
                  @click="hasContracts = 'no'"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    hasContracts === 'no' ? 'border-gold-500 bg-gold-50/10' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', hasContracts === 'no' ? 'text-gold-600' : 'text-slate-900']">No, Verbal Agreements</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">Disputes are based on verbal statements or text messages.</span>
                </button>
                <button 
                  @click="hasContracts = 'uncertain'"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    hasContracts === 'uncertain' ? 'border-gold-500 bg-gold-50/10' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', hasContracts === 'uncertain' ? 'text-gold-600' : 'text-slate-900']">Unsure / Missing Files</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">Pleadings exist but documents are in opposing possession.</span>
                </button>
              </div>
            </div>

            <!-- Step 4: Dispute Value -->
            <div v-if="intakeStep === 4" class="space-y-4 animate-fade-in">
              <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider">What is the estimated financial value of damage or claims involved?</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  @click="monetaryDisputeValue = 'high'"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    monetaryDisputeValue === 'high' ? 'border-gold-500 bg-gold-50/10' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', monetaryDisputeValue === 'high' ? 'text-gold-600' : 'text-slate-900']">High Value (₱1M+)</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">Complex commercial damages, property settlements, large assets.</span>
                </button>
                <button 
                  @click="monetaryDisputeValue = 'mid'"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    monetaryDisputeValue === 'mid' ? 'border-gold-500 bg-gold-50/10' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', monetaryDisputeValue === 'mid' ? 'text-gold-600' : 'text-slate-900']">Medium (₱200K - ₱1M)</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">Standard contract collections, wage arbitrations, minor deeds.</span>
                </button>
                <button 
                  @click="monetaryDisputeValue = 'low'"
                  :class="[
                    'p-5 rounded-lg border text-left cursor-pointer transition-all duration-300 space-y-2',
                    monetaryDisputeValue === 'low' ? 'border-gold-500 bg-gold-50/10' : 'border-slate-200 hover:border-gold-300 bg-white'
                  ]"
                >
                  <span :class="['block font-serif font-bold text-sm', monetaryDisputeValue === 'low' ? 'text-gold-600' : 'text-slate-900']">Minor (< ₱200K) / Non-fiscal</span>
                  <span class="block text-xs text-slate-500 font-light leading-relaxed">Non-monetary family custody issues, small claims.</span>
                </button>
              </div>
            </div>

            <!-- Wizard controls -->
            <div class="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 mt-6">
              <button 
                @click="prevIntake"
                v-if="intakeStep > 1"
                class="px-5 py-3 rounded border border-slate-300 hover:bg-slate-100 font-bold text-xs uppercase tracking-widest text-slate-700 transition-colors flex items-center gap-1"
              >
                Back
              </button>
              <div v-else class="w-1"></div>

              <button 
                v-if="intakeStep < 4"
                @click="nextIntake"
                :disabled="
                  (intakeStep === 1 && !clientRole) ||
                  (intakeStep === 2 && !disputeType) ||
                  (intakeStep === 3 && !hasContracts)
                "
                :class="[
                  'px-6 py-3 rounded font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1',
                  ((intakeStep === 1 && clientRole) || (intakeStep === 2 && disputeType) || (intakeStep === 3 && hasContracts))
                    ? 'gold-gradient-bg text-white hover:opacity-95' 
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed border-transparent'
                ]"
              >
                Next Step <ChevronRight class="h-4 w-4" />
              </button>

              <button 
                v-else
                @click="finishIntake"
                :disabled="!monetaryDisputeValue"
                :class="[
                  'px-8 py-3 rounded font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1',
                  monetaryDisputeValue ? 'gold-gradient-bg text-white hover:opacity-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                ]"
              >
                Compute Assessment
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>
