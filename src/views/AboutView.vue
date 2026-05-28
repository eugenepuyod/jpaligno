<script setup>
import { Shield, Award, CheckCircle2, BookOpen, Scale, Landmark, ChevronRight } from 'lucide-vue-next'

const values = [
  {
    title: 'Absolute Confidentiality & Security',
    desc: 'Every document, communication, and strategy is guarded with rigorous privacy protocols, ensuring full client security.',
    icon: Shield
  },
  {
    title: 'Meticulous Research & Analytics',
    desc: 'We construct cases with detailed analytical exploration, auditing every precedent to ensure dynamic courtroom strength.',
    icon: BookOpen
  },
  {
    title: 'Transparent Strategic Counsel',
    desc: 'No false promises. We deliver objective evaluations, clear likelihood of success metrics, and straightforward fee updates.',
    icon: Scale
  }
]

const milestones = [
  { year: '2011', title: 'Admitted to the Philippine Bar', desc: 'Successfully passed the Philippine Bar Examinations, ranking in the upper tier; admitted to the Roll of Attorneys.' },
  { year: '2011 - 2015', title: 'Senior Corporate Litigator', desc: 'Represented multi-billion maritime and asset management conglomerates at a tier-1 firm in Manila.' },
  { year: '2016', title: 'Founded John Paul Aligno Law Office', desc: 'Established Cebu-based principal firm specializing in corporate operations, estate advisory, and familial representation.' },
  { year: '2021', title: 'Corporate Legal Counsel Appointment', desc: 'Appointed advisory lead for three major property development and logistics conglomerates in Central Visayas.' },
  { year: '2025', title: 'Distinguished Advocacy Award', desc: 'Recognized for excellent courtroom mediation achievements and complex contract conflict resolutions.' }
]
</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Inner Header / Sub-banner -->
    <section class="bg-slate-950 text-white py-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" style="background-image: url('https://images.unsplash.com/photo-1505664194779-8bebcb95c539?auto=format&fit=crop&w=1920&q=80')"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/60 z-0"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">About Atty. John Paul Aligno</h1>
        <p class="text-sm md:text-base text-gold-400 uppercase tracking-widest font-semibold">
          Roll of Attorneys No. 58942 • Dedicated to Justice & Excellence
        </p>
      </div>
    </section>

    <!-- Asymmetric Biographical Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <!-- Image and Professional Stats Drawer -->
          <div class="lg:col-span-5 space-y-8">
            <div class="relative">
              <div class="absolute -inset-4 bg-gold-500/10 rounded-lg transform rotate-2"></div>
              <div class="relative rounded-lg overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src="../images/jpimage2.png" 
                  alt="Atty. John Paul Aligno" 
                  class="w-full object-cover aspect-[4/5] filter contrast-105 saturate-95" 
                />
              </div>
            </div>

            <!-- Credentials Box -->
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
              <h3 class="text-lg font-serif font-bold text-slate-950 flex items-center gap-2">
                <Landmark class="h-5 w-5 text-gold-500" /> Bar Admissions & Licenses
              </h3>
              <ul class="space-y-3 text-sm text-slate-600">
                <li class="flex items-center gap-2.5">
                  <CheckCircle2 class="h-4.5 w-4.5 text-gold-500 shrink-0" />
                  <span><strong>Philippine Bar Admission:</strong> 2011</span>
                </li>
                <li class="flex items-center gap-2.5">
                  <CheckCircle2 class="h-4.5 w-4.5 text-gold-500 shrink-0" />
                  <span><strong>Integrated Bar of the Philippines:</strong> Cebu Chapter</span>
                </li>
                <li class="flex items-center gap-2.5">
                  <CheckCircle2 class="h-4.5 w-4.5 text-gold-500 shrink-0" />
                  <span><strong>Notary Public:</strong> Commission Active, Cebu City</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Narrative and Education Details -->
          <div class="lg:col-span-7 space-y-8">
            <div class="space-y-4">
              <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Attorney Profile Summary</span>
              <h2 class="text-3xl font-serif font-bold text-slate-900 leading-snug">
                Fierce Courtroom Advocate. Strategic Corporate Adviser.
              </h2>
              <p class="text-slate-600 leading-relaxed font-light">
                Atty. John Paul Aligno has built a reputation in the Philippine legal field for his forensic approach to statutory analysis and his dynamic, composed courtroom presence. Under his stewardship, the firm handles matters ranging from high-stakes corporate acquisitions and contract breaches to personal family trust disputes.
              </p>
              <p class="text-slate-600 leading-relaxed font-light">
                Atty. Aligno believes that effective representation relies heavily on proactive communication. Every client is given direct tracking, allowing them to remain secure and well-informed throughout the lifespan of their litigation or advisory process.
              </p>
            </div>

            <!-- Educational Background Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-serif font-bold text-slate-950 border-b border-slate-100 pb-3">
                Academic Background
              </h3>
              
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="bg-gold-50 text-gold-600 p-2.5 rounded flex items-center justify-center">
                    <BookOpen class="h-5 w-5" />
                  </div>
                  <div>
                    <h4 class="font-serif font-bold text-slate-900 text-base">Juris Doctor (JD) - College of Law</h4>
                    <p class="text-xs text-gold-600 font-semibold tracking-wider uppercase">University of the Philippines • Dean's Honors</p>
                    <p class="text-xs text-slate-500 leading-relaxed mt-1 font-light">
                      Specialized in Corporate Jurisprudence and Civil Trial Advocacy. Active member of the Moot Court Debating Society and legal clinic counsel.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="bg-gold-50 text-gold-600 p-2.5 rounded flex items-center justify-center">
                    <BookOpen class="h-5 w-5" />
                  </div>
                  <div>
                    <h4 class="font-serif font-bold text-slate-900 text-base">Bachelor of Arts in Political Science</h4>
                    <p class="text-xs text-gold-600 font-semibold tracking-wider uppercase">Ateneo de Manila University • Magna Cum Laude</p>
                    <p class="text-xs text-slate-500 leading-relaxed mt-1 font-light">
                      Graduate with highest distinction. Recipient of the Academic Excellence Award in Jurisprudential Studies and Social Sciences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Guiding Core Values Grid -->
    <section class="py-20 bg-slate-50 border-y border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Our Guiding Core Philosophy</span>
          <h2 class="text-3xl font-serif font-bold text-slate-900">How We Approach the Law</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(val, idx) in values" 
            :key="idx" 
            class="bg-white p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div class="inline-flex p-3 bg-gold-50 text-gold-600 rounded-lg mb-6">
              <component :is="val.icon" class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-serif font-bold text-slate-900 mb-3">{{ val.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-light">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Visual Timeline Milestones -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 space-y-4">
          <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Professional Progression</span>
          <h2 class="text-3xl font-serif font-bold text-slate-900">A History of Excellence & Growth</h2>
        </div>

        <!-- Vertical Timeline Layout -->
        <div class="relative border-l-2 border-slate-100 ml-4 md:ml-32 space-y-12">
          <div 
            v-for="(mile, idx) in milestones" 
            :key="idx" 
            class="relative pl-8 md:pl-12 group"
          >
            <!-- Timeline Icon Dot -->
            <div class="absolute -left-2 top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white bg-gold-500 group-hover:scale-125 transition-transform duration-300 shadow-sm shadow-gold-500/50"></div>
            
            <!-- Absolute Floating Year Card for Desktop -->
            <div class="hidden md:block absolute -left-32 top-1 w-24 text-right pr-6 font-serif font-bold text-gold-600">
              {{ mile.year }}
            </div>
            
            <!-- Content Block -->
            <div class="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 hover:border-gold-300 rounded-lg p-6 transition-all duration-300">
              <span class="block md:hidden text-xs font-bold text-gold-600 mb-1">{{ mile.year }}</span>
              <h3 class="text-lg font-serif font-bold text-slate-900 group-hover:text-gold-600 transition-colors mb-2">
                {{ mile.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed font-light">
                {{ mile.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Call-to-action bar -->
    <section class="py-16 bg-slate-950 text-white relative">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 class="text-2xl md:text-3xl font-serif font-bold">Secure Professional Representation Today</h2>
        <p class="text-sm text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Take the first step toward strategic legal defense or advisory. Contact Atty. John Paul Aligno for an initial case screening and appointment schedule.
        </p>
        <div class="flex justify-center gap-4 pt-4">
          <router-link to="/booking" class="px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider gold-gradient-bg text-white hover:opacity-90 transition-opacity">
            Schedule Calendar Booking
          </router-link>
          <router-link to="/contact" class="px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
            Direct Contact Form
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
