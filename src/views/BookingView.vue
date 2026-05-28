<script setup>
import { ref, computed } from 'vue'
import { Calendar, Clock, Video, Phone, MapPin, ChevronRight, ChevronLeft, Check, Scale, DollarSign, Upload, FileText, AlertCircle } from '@lucide/vue'

const currentStep = ref(1)
const isSubmitted = ref(false)
const generatedCaseId = ref('')

// Step 1: Channel
const selectedChannel = ref(null)
const channels = [
  { id: 'video', name: 'Secure Video Consultation', desc: 'Encrypted Zoom/Teams conference call; links emailed directly.', icon: Video, charge: '₱5,000' },
  { id: 'office', name: 'In-Office Conference', desc: 'Direct face-to-face in our Cebu Prestige Business Tower suite.', icon: MapPin, charge: '₱6,000' },
  { id: 'phone', name: 'Telephone Call Briefing', desc: 'Direct secure callback on your registered phone number.', icon: Phone, charge: '₱5,000' }
]

// Step 2: Practice Specialty
const selectedSpecialty = ref('')
const specialties = [
  { value: 'Family Law', label: 'Family & Custody Law (₱5,000)' },
  { value: 'Corporate Law', label: 'Corporate & Business Operations (₱8,000)' },
  { value: 'Civil Litigation', label: 'Civil & Contract Claims (₱6,000)' },
  { value: 'Criminal Defense', label: 'Criminal Representation (₱7,000)' },
  { value: 'Labor Law', label: 'Labor Disputes & NLRC (₱5,000)' },
  { value: 'Estate Planning', label: 'Estate Advisory & Wills (₱6,000)' }
]

// Step 3: Date and Time slots
const selectedDate = ref(null)
const selectedSlot = ref(null)
const currentMonthYear = ref('June 2026')

// Generating mock dates for calendar (June 2026)
const calendarDays = [
  { dayNum: 1, dayName: 'Mon', available: true },
  { dayNum: 2, dayName: 'Tue', available: true },
  { dayNum: 3, dayName: 'Wed', available: true },
  { dayNum: 4, dayName: 'Thu', available: false }, // fully booked
  { dayNum: 5, dayName: 'Fri', available: true },
  { dayNum: 8, dayName: 'Mon', available: true },
  { dayNum: 9, dayName: 'Tue', available: true },
  { dayNum: 10, dayName: 'Wed', available: true },
  { dayNum: 11, dayName: 'Thu', available: true },
  { dayNum: 12, dayName: 'Fri', available: false }, // Holiday
  { dayNum: 15, dayName: 'Mon', available: true },
  { dayNum: 16, dayName: 'Tue', available: true },
  { dayNum: 17, dayName: 'Wed', available: true },
  { dayNum: 18, dayName: 'Thu', available: true },
  { dayNum: 19, dayName: 'Fri', available: true },
  { dayNum: 22, dayName: 'Mon', available: true },
  { dayNum: 23, dayName: 'Tue', available: false },
  { dayNum: 24, dayName: 'Wed', available: true },
  { dayNum: 25, dayName: 'Thu', available: true },
  { dayNum: 26, dayName: 'Fri', available: true }
]

const timeSlots = [
  { id: 'slot-1', time: '09:00 AM - 10:00 AM', status: 'available' },
  { id: 'slot-2', time: '10:30 AM - 11:30 AM', status: 'available' },
  { id: 'slot-3', time: '01:30 PM - 02:30 PM', status: 'booked' },
  { id: 'slot-4', time: '03:00 PM - 04:00 PM', status: 'available' },
  { id: 'slot-5', time: '04:30 PM - 05:30 PM', status: 'available' }
]

// Step 4: Contact info & case details
const clientForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  briefing: '',
  hasTerms: false
})
const fileName = ref('')
const fileInput = ref(null)

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    fileName.value = file.name
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

// Navigation Controls
const canGoNext = computed(() => {
  if (currentStep.value === 1) return selectedChannel.value !== null
  if (currentStep.value === 2) return selectedSpecialty.value !== ''
  if (currentStep.value === 3) return selectedDate.value !== null && selectedSlot.value !== null
  if (currentStep.value === 4) {
    return (
      clientForm.value.firstName.trim() !== '' &&
      clientForm.value.lastName.trim() !== '' &&
      clientForm.value.email.trim() !== '' &&
      clientForm.value.phone.trim() !== '' &&
      clientForm.value.briefing.trim() !== '' &&
      clientForm.value.hasTerms
    )
  }
  return true
})

const nextStep = () => {
  if (canGoNext.value && currentStep.value < 5) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const selectChannel = (channel) => {
  selectedChannel.value = channel
}

const selectDate = (day) => {
  if (day.available) {
    selectedDate.value = day
    selectedSlot.value = null // Reset time slot on date change
  }
}

const selectSlot = (slot) => {
  if (slot.status === 'available') {
    selectedSlot.value = slot
  }
}

const submitBooking = () => {
  // Generate a mock Case ID
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  generatedCaseId.value = `JPAL-2026-${randomNum}`
  isSubmitted.value = true
}

const resetBooking = () => {
  currentStep.value = 1
  isSubmitted.value = false
  selectedChannel.value = null
  selectedSpecialty.value = ''
  selectedDate.value = null
  selectedSlot.value = null
  clientForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    briefing: '',
    hasTerms: false
  }
  fileName.value = ''
}
</script>

<template>
  <div class="bg-slate-50 min-h-screen pb-20">
    <!-- Header Banner -->
    <section class="bg-slate-950 text-white py-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style="background-image: url('https://images.unsplash.com/photo-1505664194779-8bebcb95c539?auto=format&fit=crop&w=1920&q=80')"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/60 z-0"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Online Booking & Consultation</h1>
        <p class="text-sm md:text-base text-gold-400 uppercase tracking-widest font-semibold max-w-xl mx-auto">
          Reserve an executive assessment session. Secure dynamic strategies directly with Attorney John Paul Aligno.
        </p>
      </div>
    </section>

    <!-- Main Scheduler Wrapper -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
      
      <!-- SUCCESS DASHBOARD STATE -->
      <div 
        v-if="isSubmitted" 
        class="bg-white rounded-lg border border-gold-500/25 shadow-2xl p-8 md:p-12 space-y-8 animate-fade-in"
      >
        <div class="text-center space-y-4">
          <div class="inline-flex bg-green-50 text-green-600 border border-green-200 p-4 rounded-full shadow-inner animate-pulse">
            <Check class="h-10 w-10 stroke-[3]" />
          </div>
          
          <h2 class="text-3xl font-serif font-bold text-slate-900">Consultation Confirmed</h2>
          <p class="text-slate-500 font-light text-sm max-w-lg mx-auto">
            Your booking request has been successfully filed in our secure database. A calendar invite containing secure connectivity details has been dispatched to your email.
          </p>
        </div>

        <!-- Case details card -->
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-xl mx-auto space-y-4">
          <div class="flex justify-between items-center border-b border-slate-200 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Case ID</span>
            <span class="text-sm font-mono font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded border border-gold-500/25">{{ generatedCaseId }}</span>
          </div>

          <div class="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span class="block text-slate-400 font-semibold mb-1">Consultation Date</span>
              <span class="block font-bold text-slate-800">June {{ selectedDate.dayNum }}, 2026</span>
            </div>
            <div>
              <span class="block text-slate-400 font-semibold mb-1">Assigned Time Slot</span>
              <span class="block font-bold text-slate-800">{{ selectedSlot.time }}</span>
            </div>
            <div>
              <span class="block text-slate-400 font-semibold mb-1">Advisory specialty</span>
              <span class="block font-bold text-slate-800">{{ selectedSpecialty }}</span>
            </div>
            <div>
              <span class="block text-slate-400 font-semibold mb-1">Consultation Type</span>
              <span class="block font-bold text-slate-800 uppercase text-gold-600">{{ selectedChannel.name }}</span>
            </div>
          </div>
        </div>

        <!-- What to prepare checklist -->
        <div class="max-w-xl mx-auto space-y-4">
          <h3 class="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Scale class="h-4 w-4 text-gold-600" /> Essential Pre-Consultation Steps
          </h3>
          <ul class="space-y-3 text-xs text-slate-600 leading-relaxed font-light">
            <li class="flex items-start gap-2.5">
              <Check class="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Keep Case ID Secure:</strong> Use <code class="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">{{ generatedCaseId }}</code> on our <router-link to="/tracker" class="text-gold-600 font-semibold hover:underline">Case Tracker</router-link> to check subsequent milestones.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <Check class="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Assemble Documents:</strong> Prepare the documentation checklist listed under your specialty area on our Practice Areas page.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <Check class="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Connectivity Audit:</strong> For video slots, test your microphone and internet connectivity 10 minutes prior. Meeting links will active 5 minutes early.</span>
            </li>
          </ul>
        </div>

        <div class="text-center pt-4">
          <button 
            @click="resetBooking"
            class="px-8 py-3.5 rounded font-bold text-xs uppercase tracking-widest gold-gradient-bg text-white hover:opacity-90 transition-opacity"
          >
            File Another Schedule
          </button>
        </div>
      </div>


      <!-- SCHEDULER WIZARD STEPS -->
      <div v-else class="bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        <!-- Sidebar Tracker -->
        <div class="w-full md:w-1/3 bg-slate-950 text-slate-300 p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
          <div class="space-y-8">
            <div>
              <span class="block text-[10px] tracking-[0.2em] font-semibold text-gold-400 uppercase">Interactive Wizard</span>
              <h2 class="text-lg font-serif font-bold text-white mt-1">Booking Steps</h2>
            </div>
            
            <ul class="space-y-5 text-xs">
              <li 
                v-for="step in [1, 2, 3, 4, 5]" 
                :key="step"
                :class="[
                  'flex items-center gap-3 transition-colors duration-300',
                  currentStep === step ? 'text-white' : (currentStep > step ? 'text-gold-500' : 'text-slate-500')
                ]"
              >
                <div 
                  :class="[
                    'w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border transition-all duration-300',
                    currentStep === step 
                      ? 'border-gold-500 bg-gold-500 text-white shadow shadow-gold-500/30' 
                      : (currentStep > step ? 'border-gold-500 text-gold-500 bg-transparent' : 'border-slate-800 text-slate-600')
                  ]"
                >
                  <Check v-if="currentStep > step" class="h-3 w-3 stroke-[3]" />
                  <span v-else>{{ step }}</span>
                </div>
                <span class="font-medium tracking-wide uppercase">
                  {{ 
                    step === 1 ? 'Meeting Medium' : 
                    step === 2 ? 'Legal Specialty' : 
                    step === 3 ? 'Schedule Calendar' : 
                    step === 4 ? 'Brief & Contact' : 'Review & File'
                  }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Quick Fees Box -->
          <div class="mt-8 pt-6 border-t border-slate-800/80 text-xs text-slate-500 space-y-2">
            <div class="flex justify-between">
              <span>Selected Channel:</span>
              <span class="text-slate-300 font-semibold">{{ selectedChannel ? selectedChannel.name : 'None Selected' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Legal Specialty:</span>
              <span class="text-slate-300 font-semibold">{{ selectedSpecialty || 'None Selected' }}</span>
            </div>
          </div>
        </div>

        <!-- Working Panel content -->
        <div class="w-full md:w-2/3 p-8 flex flex-col justify-between">
          
          <!-- STEP 1: Channels select -->
          <div v-if="currentStep === 1" class="space-y-6 animate-fade-in">
            <div class="space-y-2">
              <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Step 1 of 5</span>
              <h2 class="text-xl font-serif font-bold text-slate-900">Select Consultation Channel</h2>
              <p class="text-xs text-slate-500 font-light leading-relaxed">
                Choose the communication channel that matches your availability. Video and telephone channels utilize secure encrypted pipelines.
              </p>
            </div>

            <div class="space-y-4">
              <div 
                v-for="ch in channels" 
                :key="ch.id"
                @click="selectChannel(ch)"
                :class="[
                  'p-5 rounded-lg border cursor-pointer hover:border-gold-500 transition-all duration-300 flex items-start gap-4',
                  selectedChannel?.id === ch.id 
                    ? 'border-gold-500 bg-gold-50/10 shadow shadow-gold-500/10' 
                    : 'border-slate-200 bg-white'
                ]"
              >
                <div 
                  :class="[
                    'p-2.5 rounded-lg border transition-colors',
                    selectedChannel?.id === ch.id 
                      ? 'bg-gold-500 text-white border-transparent' 
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  ]"
                >
                  <component :is="ch.icon" class="h-5 w-5" />
                </div>
                <div class="flex-grow space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="font-serif font-bold text-sm text-slate-900">{{ ch.name }}</h3>
                    <span class="text-xs font-bold text-gold-600">{{ ch.charge }}</span>
                  </div>
                  <p class="text-xs text-slate-500 font-light leading-relaxed">{{ ch.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: Specialties -->
          <div v-if="currentStep === 2" class="space-y-6 animate-fade-in">
            <div class="space-y-2">
              <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Step 2 of 5</span>
              <h2 class="text-xl font-serif font-bold text-slate-900">Select Practice Specialization</h2>
              <p class="text-xs text-slate-500 font-light leading-relaxed">
                Selecting the exact category allows Attorney John Paul Aligno to audit appropriate jurisprudential files and checklist guidelines prior to your callback.
              </p>
            </div>

            <div class="space-y-4">
              <label for="specialty-dropdown" class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Available Specialties</label>
              <select 
                id="specialty-dropdown" 
                v-model="selectedSpecialty"
                class="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-700 bg-white shadow-sm focus:border-gold-500 focus:outline-none"
              >
                <option value="" disabled>-- Select Specialty --</option>
                <option v-for="spec in specialties" :key="spec.value" :value="spec.value">
                  {{ spec.label }}
                </option>
              </select>

              <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 text-xs text-slate-500 font-light leading-relaxed">
                <AlertCircle class="h-5 w-5 text-gold-600 shrink-0" />
                <span>
                  Consultation charges are paid upon validation of schedules and include a 60-minute rigorous case analytical assessment session with Attorney Aligno.
                </span>
              </div>
            </div>
          </div>

          <!-- STEP 3: Dynamic Calendar Slot Selection -->
          <div v-if="currentStep === 3" class="space-y-6 animate-fade-in">
            <div class="space-y-2">
              <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Step 3 of 5</span>
              <h2 class="text-xl font-serif font-bold text-slate-900">Select Session Date & Time</h2>
              <p class="text-xs text-slate-500 font-light leading-relaxed">
                Select from our active calendar slots. June 2026 schedules are fully synchronized with our office ledger.
              </p>
            </div>

            <div class="space-y-5">
              <!-- Calendar Header -->
              <div class="flex justify-between items-center border-b border-slate-100 pb-3">
                <span class="font-serif font-bold text-sm text-slate-900">{{ currentMonthYear }}</span>
                <div class="flex gap-2">
                  <button class="p-1 rounded border border-slate-200 text-slate-400 hover:bg-slate-100" disabled aria-label="Previous month">
                    <ChevronLeft class="h-4 w-4" />
                  </button>
                  <button class="p-1 rounded border border-slate-200 text-slate-400 hover:bg-slate-100" disabled aria-label="Next month">
                    <ChevronRight class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <!-- Calendar Grid -->
              <div class="grid grid-cols-5 gap-2 text-center">
                <!-- Days labels -->
                <div v-for="l in ['M', 'T', 'W', 'Th', 'F']" :key="l" class="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1">{{ l }}</div>
                
                <!-- Day buttons -->
                <button 
                  v-for="d in calendarDays" 
                  :key="d.dayNum"
                  @click="selectDate(d)"
                  :disabled="!d.available"
                  :class="[
                    'py-2.5 rounded text-xs font-semibold flex flex-col items-center justify-center relative border transition-all',
                    !d.available 
                      ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed' 
                      : (selectedDate?.dayNum === d.dayNum 
                          ? 'gold-gradient-bg text-white border-transparent shadow shadow-gold-500/20 scale-105' 
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        )
                  ]"
                >
                  <span>{{ d.dayNum }}</span>
                  <span 
                    v-if="d.available" 
                    :class="[
                      'absolute bottom-1 w-1 h-1 rounded-full',
                      selectedDate?.dayNum === d.dayNum ? 'bg-white' : 'bg-gold-500'
                    ]"
                  ></span>
                </button>
              </div>

              <!-- Time Slot selector -->
              <div v-if="selectedDate" class="space-y-3 pt-3 border-t border-slate-100">
                <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Available hours for June {{ selectedDate.dayNum }}:</span>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button 
                    v-for="slot in timeSlots" 
                    :key="slot.id"
                    @click="selectSlot(slot)"
                    :disabled="slot.status === 'booked'"
                    :class="[
                      'p-2.5 rounded text-xs font-medium text-left border flex items-center justify-between transition-colors',
                      slot.status === 'booked' 
                        ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed' 
                        : (selectedSlot?.id === slot.id 
                            ? 'border-gold-500 bg-gold-50/10 text-gold-600 font-semibold' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          )
                    ]"
                  >
                    <span>{{ slot.time }}</span>
                    <span :class="[
                      'px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider',
                      slot.status === 'booked' ? 'bg-slate-200 text-slate-400' : (selectedSlot?.id === slot.id ? 'bg-gold-500 text-white' : 'bg-green-50 text-green-600')
                    ]">
                      {{ slot.status === 'booked' ? 'Booked' : 'Free' }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 4: Client brief contact info -->
          <div v-if="currentStep === 4" class="space-y-6 animate-fade-in">
            <div class="space-y-2">
              <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Step 4 of 5</span>
              <h2 class="text-xl font-serif font-bold text-slate-900">Briefing Details & Onboarding</h2>
              <p class="text-xs text-slate-500 font-light leading-relaxed">
                Provide essential contacts and a summary briefing of the legal dispute. File attachments are routed through secure AES encryptions.
              </p>
            </div>

            <div class="space-y-4 max-h-[340px] overflow-y-auto pr-1">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label for="first-name" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                  <input 
                    id="first-name" 
                    type="text" 
                    v-model="clientForm.firstName"
                    class="w-full border border-slate-200 rounded p-2 text-xs focus:border-gold-500 focus:outline-none"
                    placeholder="Eugene"
                  />
                </div>
                <div class="space-y-1">
                  <label for="last-name" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                  <input 
                    id="last-name" 
                    type="text" 
                    v-model="clientForm.lastName"
                    class="w-full border border-slate-200 rounded p-2 text-xs focus:border-gold-500 focus:outline-none"
                    placeholder="Santos"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label for="email" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secure Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    v-model="clientForm.email"
                    class="w-full border border-slate-200 rounded p-2 text-xs focus:border-gold-500 focus:outline-none"
                    placeholder="eugene@example.com"
                  />
                </div>
                <div class="space-y-1">
                  <label for="phone" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telephone / Mobile</label>
                  <input 
                    id="phone" 
                    type="tel" 
                    v-model="clientForm.phone"
                    class="w-full border border-slate-200 rounded p-2 text-xs focus:border-gold-500 focus:outline-none"
                    placeholder="+63 917 123 4567"
                  />
                </div>
              </div>

              <!-- Case briefing -->
              <div class="space-y-1">
                <label for="briefing" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Case Briefing Summary</label>
                <textarea 
                  id="briefing" 
                  rows="3" 
                  v-model="clientForm.briefing"
                  class="w-full border border-slate-200 rounded p-2 text-xs focus:border-gold-500 focus:outline-none leading-relaxed font-light"
                  placeholder="Provide a summary of the contract breach, asset inheritance, or familial issues..."
                ></textarea>
              </div>

              <!-- File Upload Mock -->
              <div class="space-y-1">
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support Documentation (Optional)</span>
                <div 
                  @click="triggerFileInput"
                  class="border border-dashed border-slate-300 hover:border-gold-500 hover:bg-slate-50/50 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center"
                >
                  <Upload class="h-6 w-6 text-slate-400 mb-1" />
                  <span class="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {{ fileName || 'Drag and drop or select file' }}
                  </span>
                  <span class="block text-[9px] text-slate-400 font-light mt-0.5">PDF, DOCX, JPG; Max size 10MB</span>
                  
                  <input 
                    type="file" 
                    ref="fileInput" 
                    class="hidden" 
                    @change="handleFileUpload" 
                  />
                </div>
              </div>

              <!-- Terms Checkbox -->
              <div class="flex items-start gap-2 pt-2">
                <input 
                  id="terms-check" 
                  type="checkbox" 
                  v-model="clientForm.hasTerms"
                  class="mt-1 border-slate-300 text-gold-600 focus:ring-gold-500 h-3.5 w-3.5"
                />
                <label for="terms-check" class="text-[10px] text-slate-400 leading-normal font-light">
                  I understand that submitting this case summary schedule does not establish an attorney-client contract relationship until formal contracts are authorized.
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 5: Final Review -->
          <div v-if="currentStep === 5" class="space-y-6 animate-fade-in">
            <div class="space-y-2">
              <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Step 5 of 5</span>
              <h2 class="text-xl font-serif font-bold text-slate-900">Review & Submit Case File</h2>
              <p class="text-xs text-slate-500 font-light leading-relaxed">
                Confirm all particulars prior to writing to our active calendar ledger.
              </p>
            </div>

            <!-- Review particulars grid -->
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4 text-xs">
              <div class="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                <div>
                  <span class="block text-slate-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">Counsel Medium</span>
                  <span class="block font-bold text-slate-800 uppercase">{{ selectedChannel.name }}</span>
                </div>
                <div>
                  <span class="block text-slate-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">Legal Specialty</span>
                  <span class="block font-bold text-slate-800">{{ selectedSpecialty }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                <div>
                  <span class="block text-slate-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">Meeting Schedule</span>
                  <span class="block font-bold text-slate-800">June {{ selectedDate.dayNum }}, 2026</span>
                </div>
                <div>
                  <span class="block text-slate-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">Assigned Hour</span>
                  <span class="block font-bold text-slate-800">{{ selectedSlot.time }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                <div>
                  <span class="block text-slate-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">Client Particulars</span>
                  <span class="block font-bold text-slate-800">{{ clientForm.firstName }} {{ clientForm.lastName }}</span>
                </div>
                <div>
                  <span class="block text-slate-400 font-semibold uppercase tracking-wider text-[9px] mb-0.5">Contact Detail</span>
                  <span class="block font-bold text-slate-800">{{ clientForm.phone }}</span>
                </div>
              </div>

              <div class="space-y-1">
                <span class="block text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Case Briefing Summary</span>
                <p class="text-slate-600 leading-relaxed font-light italic bg-white p-3 border rounded border-slate-200">
                  "{{ clientForm.briefing }}"
                </p>
              </div>

              <div v-if="fileName" class="flex items-center gap-2 text-slate-500 font-light">
                <FileText class="h-4 w-4 text-gold-500" />
                <span>Uploaded Attachment: <strong>{{ fileName }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Footer Navigation Buttons -->
          <div class="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 mt-6">
            <button 
              @click="prevStep"
              v-if="currentStep > 1"
              class="px-5 py-3.5 rounded border border-slate-300 hover:bg-slate-100 font-bold text-xs uppercase tracking-widest text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft class="h-4 w-4" /> Back
            </button>
            <div v-else class="w-1"></div>

            <button 
              v-if="currentStep < 5"
              @click="nextStep"
              :disabled="!canGoNext"
              :class="[
                'px-5 py-3.5 rounded font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5',
                canGoNext 
                  ? 'gold-gradient-bg text-white hover:opacity-95 shadow shadow-gold-500/20' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-transparent'
              ]"
            >
              Continue <ChevronRight class="h-4 w-4" />
            </button>

            <button 
              v-else
              @click="submitBooking"
              class="px-8 py-3.5 rounded font-bold text-xs uppercase tracking-widest gold-gradient-bg text-white hover:opacity-95 shadow-md shadow-gold-500/25 flex items-center gap-1.5"
            >
              File Appointment <Check class="h-4 w-4 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>
