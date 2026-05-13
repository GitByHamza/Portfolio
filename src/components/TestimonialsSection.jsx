import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote:
      'Hamza delivered our SaaS platform migration from Laravel 8 to 12 and Vue 2 to Vue 3 flawlessly. The quality of his work and attention to detail is exceptional. The platform now serves thousands of businesses without a single issue.',
    author: 'Enterprise SaaS Client',
    role: 'CTO — Swiss Tech Company',
    initials: 'SC',
    gradient: 'from-primary to-pop',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Working with Hamza was an outstanding experience. He built our AI Receptionist agent from scratch — it now handles 100% of our customer inquiries 24/7. Exceptional technical skills, fast delivery, and always responsive.',
    author: 'Business Automation Client',
    role: 'CEO — AI Automation Startup',
    initials: 'BA',
    gradient: 'from-pop to-accent',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Hamza transformed our outdated ecommerce platform into a blazing-fast modern application. He understands both design and engineering deeply, communicates clearly, and delivers exactly what was promised — on time.',
    author: 'Ecommerce Platform Client',
    role: 'Founder — Online Retail',
    initials: 'EP',
    gradient: 'from-accent to-primary',
    rating: 5,
  },
]

const StarRating = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />
    ))}
  </div>
)

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const shouldReduceMotion = useReducedMotion()
  const total = testimonials.length

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  // Auto-rotate every 5 s
  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [goNext, shouldReduceMotion])

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * 60,
      scale: 0.96,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
    },
    exit: (dir) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * -60,
      scale: 0.96,
      transition: { duration: 0.3 },
    }),
  }

  return (
    <section id="testimonials" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium font-body mb-5">
            Client Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">
            What Clients{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pop">
              Say
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonials[current].gradient}`}
                />
                <div
                  className={`absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${testimonials[current].gradient} opacity-5 blur-2xl`}
                />

                {/* Quote icon */}
                <Quote
                  size={40}
                  className="text-primary/20 mb-6 fill-primary/10"
                />

                <blockquote className="font-body text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </blockquote>

                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[current].gradient} flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0 shadow-lg`}
                  >
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground text-lg">
                      {testimonials[current].author}
                    </div>
                    <div className="font-body text-sm text-muted-foreground">
                      {testimonials[current].role}
                    </div>
                    <div className="mt-1.5">
                      <StarRating count={testimonials[current].rating} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-white/10 bg-secondary/30 hover:bg-primary/20 hover:border-primary/30 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2.5 bg-primary'
                      : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-white/10 bg-secondary/30 hover:bg-primary/20 hover:border-primary/30 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
