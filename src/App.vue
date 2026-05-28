<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X, Scale, Phone, Mail, MapPin, ChevronRight, Award, Shield } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About JPAL', path: '/about' },
  { name: 'Practice Areas', path: '/practice-areas' },
  { name: 'Case Tracker', path: '/tracker' },
  { name: 'Legal Insights', path: '/insights' },
  { name: 'Contact Us', path: '/contact' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-slate-50 font-sans">
    <!-- Header/Nav -->
    <header 
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'glass-card py-3 shadow-md' 
          : 'bg-transparent py-5 border-b border-white/5'
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group" @click="closeMobileMenu">
            <div class="bg-gradient-to-br from-gold-400 to-gold-600 p-2 rounded flex items-center justify-center text-white shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300">
              <Scale class="h-6 w-6" />
            </div>
            <div>
              <span 
                :class="[
                  'block font-serif text-lg md:text-xl font-bold tracking-wide transition-colors duration-300',
                  isScrolled ? 'text-primary-900' : 'text-slate-800'
                ]"
              >
                JOHN PAUL ALIGNO
              </span>
              <span class="block text-[10px] tracking-[0.2em] font-semibold text-gold-600 uppercase">
                Law Office & Counsel
              </span>
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center gap-8">
            <router-link 
              v-for="link in navLinks" 
              :key="link.path"
              :to="link.path"
              :class="[
                'font-medium text-sm tracking-wide uppercase relative py-2 transition-colors duration-200',
                route.path === link.path 
                  ? 'text-gold-600' 
                  : (isScrolled ? 'text-slate-700 hover:text-gold-600' : 'text-slate-800 hover:text-gold-600')
              ]"
            >
              {{ link.name }}
              <span 
                v-if="route.path === link.path" 
                class="absolute bottom-0 left-0 w-full h-0.5 gold-gradient-bg animate-fade-in"
              ></span>
            </router-link>
          </nav>

          <!-- CTA and Hamburger -->
          <div class="flex items-center gap-4">
            <router-link 
              to="/booking" 
              class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded border border-gold-500 text-gold-600 font-semibold text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-sm shadow-gold-500/5 hover:shadow-gold-500/20"
            >
              Book Consultation
            </router-link>

            <button 
              @click="toggleMobileMenu"
              class="lg:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu v-if="!isMobileMenuOpen" class="h-6 w-6 text-slate-800" />
              <X v-else class="h-6 w-6 text-slate-800" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-slate-950/95 backdrop-blur-lg z-40 flex flex-col p-6 overflow-y-auto">
          <div class="flex flex-col gap-6 my-auto max-w-sm mx-auto w-full text-center">
            <router-link 
              v-for="link in navLinks" 
              :key="link.path"
              :to="link.path"
              @click="closeMobileMenu"
              class="text-xl font-serif text-slate-200 hover:text-gold-400 py-2 border-b border-slate-800 transition-colors"
            >
              {{ link.name }}
            </router-link>
            <router-link 
              to="/booking" 
              @click="closeMobileMenu"
              class="mt-4 inline-flex items-center justify-center px-6 py-3 rounded gold-gradient-bg text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-gold-500/25"
            >
              Schedule Online Booking
            </router-link>
          </div>
        </div>
      </transition>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow pt-[80px]">
      <router-view v-slot="{ Component }">
        <transition 
          name="fade" 
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Professional Footer -->
    <footer class="navy-gradient-bg text-slate-300 border-t border-slate-800 relative z-10 overflow-hidden">
      <!-- Legal Pattern Overlay -->
      <div class="absolute inset-0 bg-legal-pattern opacity-10 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Column 1: Brand -->
          <div class="flex flex-col gap-6">
            <div class="flex items-center gap-3">
              <div class="bg-gradient-to-br from-gold-400 to-gold-600 p-2.5 rounded text-white flex items-center justify-center shadow-md">
                <Scale class="h-6 w-6" />
              </div>
              <div>
                <span class="block font-serif text-lg font-bold tracking-wide text-white">
                  JOHN PAUL ALIGNO
                </span>
                <span class="block text-[9px] tracking-[0.2em] font-semibold text-gold-400 uppercase">
                  Law Office & Counsel
                </span>
              </div>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed font-light">
              Providing rigorous legal advocacy, objective representation, and trusted advisory services to safeguard what matters most to our clients.
            </p>
            <div class="flex gap-4">
              <!-- Certifications badges/icons mock -->
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                <Award class="h-3 w-3" /> Certified Attorney
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                <Shield class="h-3 w-3" /> Trusted Counsel
              </span>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h3 class="font-serif text-white text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gold-500">
              Useful Navigation
            </h3>
            <ul class="space-y-3">
              <li v-for="link in navLinks" :key="link.path">
                <router-link 
                  :to="link.path" 
                  class="text-sm text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight class="h-4 w-4 text-slate-600 group-hover:text-gold-500 transition-colors" />
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Column 3: Legal Practice Areas -->
          <div>
            <h3 class="font-serif text-white text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gold-500">
              Practice Sectors
            </h3>
            <ul class="space-y-3 text-sm text-slate-400">
              <li>
                <router-link to="/practice-areas" class="hover:text-gold-400 transition-colors flex items-center gap-2">
                  <ChevronRight class="h-4 w-4 text-slate-600" /> Family & Matrimonial Law
                </router-link>
              </li>
              <li>
                <router-link to="/practice-areas" class="hover:text-gold-400 transition-colors flex items-center gap-2">
                  <ChevronRight class="h-4 w-4 text-slate-600" /> Corporate & Business Law
                </router-link>
              </li>
              <li>
                <router-link to="/practice-areas" class="hover:text-gold-400 transition-colors flex items-center gap-2">
                  <ChevronRight class="h-4 w-4 text-slate-600" /> Civil & Contract Litigation
                </router-link>
              </li>
              <li>
                <router-link to="/practice-areas" class="hover:text-gold-400 transition-colors flex items-center gap-2">
                  <ChevronRight class="h-4 w-4 text-slate-600" /> Criminal Defense Litigation
                </router-link>
              </li>
              <li>
                <router-link to="/practice-areas" class="hover:text-gold-400 transition-colors flex items-center gap-2">
                  <ChevronRight class="h-4 w-4 text-slate-600" /> Labor & Employment Law
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Column 4: Main Office Info -->
          <div>
            <h3 class="font-serif text-white text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gold-500">
              Office Details
            </h3>
            <ul class="space-y-4 text-sm text-slate-400">
              <li class="flex items-start gap-3">
                <MapPin class="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <span>
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
            </ul>
          </div>
        </div>

        <!-- Attorney Legal Disclaimer Note (Extremely important for professional law sites) -->
        <div class="mt-16 pt-8 border-t border-slate-800/80 text-xs text-slate-500 text-center space-y-4 max-w-4xl mx-auto leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> The materials and information provided on this website are for general informational purposes only and do not, and are not intended to, constitute legal advice. Accessing, viewing, or transmitting information through this website or using the online scheduling system does not create an attorney-client relationship between you and John Paul Aligno Law Office.
          </p>
          <p class="text-slate-600">
            &copy; 2026 John Paul Aligno Law Office. All Rights Reserved. Built with Vue.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* CSS transition definitions for router view */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
