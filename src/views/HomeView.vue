<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Scale, ShieldCheck, Award, Handshake, Users, Gavel, Calendar, ArrowRight, Star, Quote, CheckCircle2 } from 'lucide-vue-next'

const router = useRouter()

const stats = [
  { value: '15+', label: 'Years Active Service', icon: Award },
  { value: '98%', label: 'Trial & Dispute Success', icon: ShieldCheck },
  { value: '1.2K+', label: 'Satisfied Clients', icon: Users },
  { value: '250+', label: 'Corporate Partners', icon: Handshake }
]

const servicesPreview = [
  { 
    title: 'Family & Matrimonial Law', 
    desc: 'Compassionate guidance in divorce, custody arrangements, and marital separations designed to protect families.', 
    icon: Users 
  },
  { 
    title: 'Corporate & Business Law', 
    desc: 'Rigorous regulatory legal support, dynamic contract construction, merges, acquisitions, and operations compliance.', 
    icon: Handshake 
  },
  { 
    title: 'Civil Litigation & Disputes', 
    desc: 'Relentless courtroom representation for complex breach of contract, property rights, and commercial conflicts.', 
    icon: Gavel 
  }
]

const activeTestimonial = ref(0)
const testimonials = [
  {
    quote: "Attorney John Paul Aligno managed my corporate litigation with unprecedented precision. His grasp of complex business law helped us secure a favorable verdict when other firms suggested settling.",
    author: "Engr. Richard Montejo",
    title: "Managing Director, VistaTech Systems",
    rating: 5,
    caseType: "Corporate Breach of Contract"
  },
  {
    quote: "In the most difficult phase of my custody case, JPAL Law Office provided more than excellent defense—they gave me guidance and empathy. The result was highly favorable for my children's welfare.",
    author: "Dr. Elena Santos",
    title: "Chief Pediatrician, Cebu General Hospital",
    rating: 5,
    caseType: "Child Custody & Support"
  },
  {
    quote: "Attorney Aligno's labor dispute advice was stellar. He resolved a highly volatile class-action case in mediation in under three weeks, saving us immense legal overhead and bad press.",
    author: "Humbert Perez",
    title: "VP for HR, Pacific Maritime Logistics",
    rating: 5,
    caseType: "Labor Dispute Mediation"
  }
]

const setTestimonial = (index) => {
  activeTestimonial.value = index
}

const autoScrollTestimonials = () => {
  setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
  }, 7000)
}

// Start auto scrolling reviews on mount
import { onMounted } from 'vue'
onMounted(() => {
  autoScrollTestimonials()
})
</script>

<template>
  <div class="overflow-hidden">
    <!-- 1. Hero / Banner Section with Parallax Overlay -->
    <section class="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden py-20">
      <!-- Darkened Law Pillars Background with Gradient Mask -->
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-1000"
        style="background-image: url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80'); background-attachment: fixed;"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60 z-0"></div>

      <!-- Legal Pattern Mesh -->
      <div class="absolute inset-0 bg-legal-pattern opacity-5 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-8 space-y-8 animate-slide-up">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
              <Scale class="h-3.5 w-3.5" /> Compassionate Counsel • Uncompromising Advocacy
            </div>
            
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight text-white">
              Protecting Your <span class="gold-gradient-text">Rights</span>, <br />
              Securing Your <span class="gold-gradient-text">Legacy</span>.
            </h1>

            <p class="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              We provide premier, strategy-driven legal counsel for families, business operations, and courtroom litigations in the Philippines. We stand firmly at the crossroads of diligence and success.
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <router-link 
                to="/booking" 
                class="px-8 py-4 rounded font-semibold text-sm uppercase tracking-wider gold-gradient-bg text-white hover:opacity-90 shadow-lg shadow-gold-500/30 hover:shadow-gold-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
              >
                Schedule Consultation 
                <ArrowRight class="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </router-link>
              
              <router-link 
                to="/practice-areas" 
                class="px-8 py-4 rounded font-semibold text-sm uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-500 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                Our Practice Areas
              </router-link>
            </div>
          </div>

          <!-- Featured Floating Consultation Badge Drawer -->
          <div class="lg:col-span-4 hidden lg:block animate-fade-in delay-300">
            <div class="glass-card-dark p-8 rounded-lg shadow-2xl relative border border-gold-500/20">
              <div class="absolute -top-6 -right-6 bg-gold-500 text-white rounded-full p-4 shadow-lg shadow-gold-500/30">
                <ShieldCheck class="h-8 w-8" />
              </div>
              <h3 class="text-lg font-serif text-white font-bold mb-4">Request Callback</h3>
              <p class="text-xs text-slate-400 leading-relaxed mb-6">
                Receive priority initial evaluations. Submit a summary case brief through our secure digital client intake.
              </p>
              <div class="space-y-4">
                <router-link to="/tracker" class="block w-full py-3 rounded text-center font-bold text-xs uppercase tracking-widest bg-gold-600 text-white hover:bg-gold-500 transition-colors shadow shadow-gold-500/25">
                  Case Intake Screening
                </router-link>
                <div class="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
                  <span class="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Active evaluation portal open
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Trust Badges / Certification Wall -->
    <section class="bg-slate-900 py-8 border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between gap-8 opacity-75">
          <span class="text-xs tracking-[0.25em] text-slate-500 uppercase font-semibold">Affiliated & Recognized:</span>
          <span class="text-sm font-serif font-semibold text-slate-400">Integrated Bar of the Philippines (IBP)</span>
          <span class="text-sm font-serif font-semibold text-slate-400">Philippine Bar Association</span>
          <span class="text-sm font-serif font-semibold text-slate-400">Elite Trial Counsel Council</span>
          <span class="text-sm font-serif font-semibold text-slate-400">Cebu Chamber of Law</span>
        </div>
      </div>
    </section>

    <!-- 3. Key Stats Metrics -->
    <section class="py-16 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(stat, idx) in stats" 
            :key="idx" 
            class="text-center p-6 border-r last:border-r-0 border-slate-100 hover:bg-slate-50 rounded transition-colors duration-300"
          >
            <div class="inline-flex p-3 bg-gold-50 text-gold-600 rounded-full mb-4">
              <component :is="stat.icon" class="h-6 w-6" />
            </div>
            <div class="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif mb-2">{{ stat.value }}</div>
            <div class="text-xs sm:text-sm font-medium tracking-wide text-slate-500 uppercase">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Principal Attorney Welcome Message -->
    <section class="py-20 bg-slate-50 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Asymmetric Image Column -->
          <div class="lg:col-span-5 relative">
            <div class="absolute -inset-4 bg-gold-500/10 rounded-lg transform -rotate-3 z-0"></div>
            <div class="relative z-10 overflow-hidden rounded-lg shadow-xl border border-slate-200">
              <img 
                src="../images/jpimage2.png" 
                alt="Attorney John Paul Aligno" 
                class="w-full object-cover aspect-[4/5] filter contrast-105 saturate-95 hover:scale-105 transition-transform duration-700" 
              />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 text-white text-center">
                <span class="block font-serif text-lg font-bold">Atty. John Paul Aligno</span>
                <span class="block text-xs text-gold-400 uppercase tracking-widest">Managing Attorney & Counsel</span>
              </div>
            </div>
          </div>

          <!-- Professional Philosophy Text Column -->
          <div class="lg:col-span-7 space-y-6">
            <div class="text-xs font-semibold text-gold-600 uppercase tracking-widest flex items-center gap-2">
              <span class="w-8 h-px bg-gold-500"></span> Attorney Profile
            </div>
            <h2 class="text-3xl sm:text-4xl font-serif text-slate-900 font-bold leading-snug">
              Unwavering Dedication to Legal Excellence & Trust
            </h2>
            
            <p class="text-slate-600 leading-relaxed font-light">
              Founded on the pillars of absolute integrity, precision, and tireless preparation, John Paul Aligno Law Office has navigated complex statutory grounds with outstanding legal successes. We understand that behind every contract, dispute, or lawsuit lies human livelihoods, personal stability, and hard-earned assets.
            </p>
            <p class="text-slate-600 leading-relaxed font-light">
              "We do not merely study the law; we orchestrate its details to defend what is rightfully yours. Our approach combines rigorous analytical jurisprudence with empathetic client partnership."
            </p>

            <!-- Attorney signature element -->
            <div class="pt-6 border-t border-slate-200 flex items-center gap-6">
              <div>
                <span class="block font-serif text-xl italic text-slate-900 font-bold">John Paul Aligno</span>
                <span class="block text-xs font-medium uppercase tracking-wider text-slate-400">Integrated Bar of the Philippines</span>
              </div>
              <router-link 
                to="/about" 
                class="inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-wider hover:text-gold-700 transition-colors group"
              >
                Learn More About Atty. Aligno 
                <ArrowRight class="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Core Services Preview Grid -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Our Sectors of Legal Expertise</span>
          <h2 class="text-3xl sm:text-4xl font-serif text-slate-900 font-bold">Practice Areas We Serve</h2>
          <p class="text-slate-500 leading-relaxed font-light">
            We deliver sophisticated advocacy spanning various fields. Our firm is recognized for crafting surgical legal strategies that deliver clear results.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(service, idx) in servicesPreview" 
            :key="idx" 
            class="p-8 rounded-lg border border-slate-100 hover:border-gold-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-slate-50/50 group"
          >
            <div>
              <div class="bg-gold-50 text-gold-600 group-hover:bg-gold-500 group-hover:text-white p-4 rounded-lg inline-flex mb-6 transition-colors duration-300">
                <component :is="service.icon" class="h-6 w-6" />
              </div>
              <h3 class="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-gold-600 transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed font-light">
                {{ service.desc }}
              </p>
            </div>
            <div class="pt-6 mt-6 border-t border-slate-100/80">
              <router-link 
                to="/practice-areas" 
                class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-gold-600 transition-colors group/link"
              >
                Read Scope & Scenario 
                <ArrowRight class="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
              </router-link>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link 
            to="/practice-areas" 
            class="inline-flex items-center gap-2 px-8 py-3.5 rounded border border-slate-300 hover:border-gold-500 hover:text-gold-600 font-bold text-xs uppercase tracking-widest text-slate-700 transition-all duration-300"
          >
            View All Practices Areas
          </router-link>
        </div>
      </div>
    </section>

    <!-- 6. Client Testimonials Carousel -->
    <section class="py-20 bg-slate-950 text-white relative z-10 overflow-hidden">
      <!-- Legal Pattern Overlay -->
      <div class="absolute inset-0 bg-legal-pattern opacity-[0.03] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-bold text-gold-400 uppercase tracking-widest">Client Testimonials</span>
          <h2 class="text-3xl sm:text-4xl font-serif text-white font-bold">Trusted by Dynamic Enterprises & Families</h2>
        </div>

        <!-- Carousel Content -->
        <div class="relative max-w-4xl mx-auto">
          <div class="glass-card-dark p-8 md:p-12 rounded-lg border border-slate-800 shadow-2xl relative min-h-[300px] flex flex-col justify-between">
            <!-- Large Gold Quote Icon Backdrop -->
            <Quote class="absolute top-6 right-6 h-16 w-16 text-slate-900 shrink-0 select-none" />

            <div class="space-y-6 relative z-10">
              <!-- Star Ratings -->
              <div class="flex items-center gap-1 text-gold-400">
                <Star v-for="i in testimonials[activeTestimonial].rating" :key="i" class="h-4.5 w-4.5 fill-current" />
              </div>
              
              <!-- Quote Content -->
              <p class="text-lg md:text-xl font-light leading-relaxed text-slate-200 font-serif italic">
                "{{ testimonials[activeTestimonial].quote }}"
              </p>
            </div>

            <!-- Client Info Footer -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 mt-8 border-t border-slate-800/80 relative z-10">
              <div>
                <span class="block font-semibold text-white">{{ testimonials[activeTestimonial].author }}</span>
                <span class="block text-xs text-slate-400">{{ testimonials[activeTestimonial].title }}</span>
              </div>
              <div class="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs font-medium text-gold-400 uppercase tracking-wider self-start md:self-auto">
                Case: {{ testimonials[activeTestimonial].caseType }}
              </div>
            </div>
          </div>

          <!-- Slider Indicators -->
          <div class="flex items-center justify-center gap-3 mt-8">
            <button 
              v-for="(test, index) in testimonials" 
              :key="index"
              @click="setTestimonial(index)"
              :class="[
                'w-3.5 h-3.5 rounded-full transition-all duration-300 border border-gold-500/20',
                activeTestimonial === index 
                  ? 'bg-gold-500 scale-110 shadow shadow-gold-500/30' 
                  : 'bg-slate-800 hover:bg-slate-700'
              ]"
              :aria-label="'Go to review ' + (index + 1)"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Call To Action consultation panel -->
    <section class="py-20 bg-white relative">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-xl border border-gold-500/30 relative overflow-hidden bg-slate-950 p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <!-- background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 z-0"></div>
          
          <div class="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Ready to Protect What Matters? Schedule an Executive Assessment
            </h2>
            <p class="text-slate-400 text-sm md:text-base leading-relaxed font-light">
              Secure an expert analysis of your case. Choose a time that matches your schedule to secure strategic, high-impact counsel tailored for your objectives.
            </p>
            <div class="flex flex-wrap justify-center gap-4 pt-4">
              <router-link 
                to="/booking" 
                class="px-8 py-4 rounded font-bold text-xs uppercase tracking-wider gold-gradient-bg text-white hover:opacity-90 shadow-lg shadow-gold-500/25 flex items-center gap-2"
              >
                <Calendar class="h-4 w-4" /> Book Appointment Slots
              </router-link>
              <router-link 
                to="/contact" 
                class="px-8 py-4 rounded font-bold text-xs uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Inquire Form Callback
              </router-link>
            </div>
            
            <div class="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
              <span class="flex items-center gap-1.5">
                <CheckCircle2 class="h-4 w-4 text-gold-500" /> Private Consultations
              </span>
              <span class="flex items-center gap-1.5">
                <CheckCircle2 class="h-4 w-4 text-gold-500" /> Dynamic Client Portal
              </span>
              <span class="flex items-center gap-1.5">
                <CheckCircle2 class="h-4 w-4 text-gold-500" /> Video & Face-To-Face
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
