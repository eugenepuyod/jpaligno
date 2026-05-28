<script setup>
import { ref, onMounted } from 'vue'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield } from '@lucide/vue'

const formSubmitted = ref(false)
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacyChecked: false
})

const submitInquiry = () => {
  formSubmitted.value = true
  // Reset form fields
  contactForm.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyChecked: false
  }
}

// Initialize Leaflet map on mount
onMounted(() => {
  // Cebu City, F. Cabahug coordinates (approximately 10.3242, 123.9113)
  const officeCoords = [10.3242, 123.9113]
  
  if (window.L) {
    const map = window.L.map('contact-map', {
      scrollWheelZoom: false
    }).setView(officeCoords, 16)

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map)

    // Gold icon representation or standard Marker
    const marker = window.L.marker(officeCoords).addTo(map)
      .bindPopup(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px;">
          <strong style="color: #0f172a; font-serif: 'Playfair Display'; display:block; margin-bottom: 2px;">John Paul Aligno Law Office</strong>
          <span style="color: #b8860b; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display:block; margin-bottom: 4px;">Prestige Business Tower</span>
          <span style="color: #64748b; font-size: 11px; line-height: 1.4; display:block;">Unit 405, F. Cabahug St., Cebu City</span>
        </div>
      `)
      
    // Auto open tooltip on load
    setTimeout(() => {
      marker.openPopup()
    }, 500)
  }
})
</script>

<template>
  <div class="bg-slate-50 min-h-screen pb-20">
    <!-- Header Banner -->
    <section class="bg-slate-950 text-white py-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style="background-image: url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=80')"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/60 z-0"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-white">Contact Our Chambers</h1>
        <p class="text-sm md:text-base text-gold-400 uppercase tracking-widest font-semibold max-w-xl mx-auto">
          Reach out for standard legal briefings, client consultations, or retainer service queries.
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- LEFT COLUMN: Inquiry Form & Success notification (8 Columns) -->
        <div class="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm space-y-8">
          
          <!-- Inquiry Form Success Notification -->
          <div 
            v-if="formSubmitted" 
            class="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4 animate-fade-in"
          >
            <CheckCircle2 class="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
            <div class="space-y-1.5">
              <h3 class="font-serif font-bold text-slate-900 text-base">Inquiry Submitted Successfully</h3>
              <p class="text-xs text-slate-500 font-light leading-relaxed">
                Thank you for reaching out to John Paul Aligno Law Office. Our administrative team will evaluate your briefing details and coordinate a callback within 24 business hours.
              </p>
              <button 
                @click="formSubmitted = false" 
                class="text-xs font-bold text-gold-600 hover:text-gold-700 uppercase tracking-wider mt-2 block"
              >
                Send Another Message
              </button>
            </div>
          </div>

          <!-- Form Panel -->
          <form v-else @submit.prevent="submitInquiry" class="space-y-6">
            <div class="space-y-1">
              <h2 class="text-xl font-serif font-bold text-slate-900">Send Secure Message</h2>
              <p class="text-xs text-slate-500 font-light">
                Submit an initial outline of your legal issue. Your records are encrypted and protected by corporate confidentiality privileges.
              </p>
            </div>

            <!-- Inputs -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label for="name" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  id="name" 
                  type="text" 
                  v-model="contactForm.name" 
                  required
                  placeholder="Eugene Santos"
                  class="w-full border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div class="space-y-1">
                <label for="email" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secure Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  v-model="contactForm.email" 
                  required
                  placeholder="eugene@example.com"
                  class="w-full border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label for="phone" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone / Telephone</label>
                <input 
                  id="phone" 
                  type="tel" 
                  v-model="contactForm.phone" 
                  required
                  placeholder="+63 917 123 4567"
                  class="w-full border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div class="space-y-1">
                <label for="subject" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject Matter</label>
                <input 
                  id="subject" 
                  type="text" 
                  v-model="contactForm.subject" 
                  required
                  placeholder="e.g. Contract Breach / Corporate Setup"
                  class="w-full border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label for="message" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brief Legal Context Outline</label>
              <textarea 
                id="message" 
                rows="5" 
                v-model="contactForm.message" 
                required
                placeholder="Briefly describe dates, parties, and core facts related to the dispute..."
                class="w-full border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 focus:outline-none font-light leading-relaxed"
              ></textarea>
            </div>

            <!-- Privacy terms -->
            <div class="flex items-start gap-2">
              <input 
                id="privacy-check" 
                type="checkbox" 
                v-model="contactForm.privacyChecked" 
                required
                class="mt-1 border-slate-300 text-gold-600 focus:ring-gold-500 h-3.5 w-3.5"
              />
              <label for="privacy-check" class="text-[10px] text-slate-400 leading-normal font-light">
                I understand that submitting this message is an initial inquiry and does not establish a formal lawyer-client contract. All submitted briefings remain fully confidential.
              </label>
            </div>

            <!-- Submit button -->
            <button 
              type="submit" 
              class="px-8 py-3.5 rounded font-bold text-xs uppercase tracking-widest gold-gradient-bg text-white hover:opacity-95 shadow shadow-gold-500/20 flex items-center justify-center gap-2"
            >
              Submit Inquiry Briefing <Send class="h-4 w-4" />
            </button>
          </form>
        </div>

        <!-- RIGHT COLUMN: Contact details & Leaflet Map (4 Columns) -->
        <div class="lg:col-span-4 space-y-8">
          
          <!-- Office info card -->
          <div class="bg-slate-950 text-white rounded-lg border border-slate-800 p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div class="absolute inset-0 bg-legal-pattern opacity-[0.03] pointer-events-none"></div>
            
            <h3 class="text-lg font-serif font-bold text-white border-b border-slate-800 pb-3">Office Location</h3>
            
            <ul class="space-y-4 text-xs text-slate-400 leading-relaxed font-light">
              <li class="flex items-start gap-3">
                <MapPin class="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  <strong>John Paul Aligno Law Office</strong><br />
                  Unit 405, Prestige Business Tower,<br />
                  F. Cabahug St., Cebu City, 6000 Philippines
                </span>
              </li>
              <li class="flex items-center gap-3">
                <Phone class="h-5 w-5 text-gold-500 shrink-0" />
                <a href="tel:+63322384952" class="hover:text-gold-400 transition-colors">+63 (32) 238-4952</a>
              </li>
              <li class="flex items-center gap-3">
                <Mail class="h-5 w-5 text-gold-500 shrink-0" />
                <a href="mailto:info@alignolaw.com" class="hover:text-gold-400 transition-colors">info@alignolaw.com</a>
              </li>
              <li class="flex items-start gap-3 pt-3 border-t border-slate-800">
                <Clock class="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Operating Hours:</strong><br />
                  Monday – Friday: 9:00 AM – 6:00 PM<br />
                  Saturday – Sunday: By Appointment
                </span>
              </li>
            </ul>

            <div class="pt-4 flex items-center gap-2 text-[10px] text-gold-400 font-semibold uppercase tracking-wider">
              <Shield class="h-4 w-4" /> Confidential client counseling
            </div>
          </div>

          <!-- Live Map Card Container -->
          <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-[280px]">
            <div id="contact-map" class="w-full flex-grow relative z-10" aria-label="Interactive map pinpointing location"></div>
          </div>
          
        </div>

      </div>
    </div>
  </div>
</template>
