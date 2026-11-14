
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cardsData = [
  {
    title: 'Ashish & Deepali',
    subtitle: 'THE WEDDING CELEBRATION',
    bg: '#3A1F1B',
  },
  {
    title: 'Our Story',
    subtitle: 'TWO HEARTS, ONE JOURNEY',
    bg: '#7B3932',
  },
  {
    title: 'Wedding Events',
    subtitle: 'A CELEBRATION OF LOVE',
    bg: '#B18B60',
  },
  {
    title: 'Save The Date',
    subtitle: '24 NOVEMBER 2026',
    bg: '#E8D8C2',
  },
]

const StackCards = () => {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stack-card')

      cards.forEach((card, index) => {
        if (index === 0) return

        gsap.set(card, {
          yPercent: 100,
        })
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      cards.forEach((card, index) => {
        if (index === 0) return

        const previousCard = cards[index - 1]

        timeline.to(
          previousCard,
          {
            scale: 0.88,
            opacity: 0.35,
            duration: 1,
            ease: 'none',
          },
          index - 1
        )

        timeline.to(
          card,
          {
            yPercent: 0,
            duration: 1,
            ease: 'none',
          },
          index - 1
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      <div className="relative h-full w-full">

        {cardsData.map((item, index) => (
          <div
            key={index}
            className="stack-card absolute inset-0 flex items-center justify-center p-5"
            style={{
              zIndex: index + 1,
              backgroundColor: item.bg,
            }}
          >
            <div className="text-center text-white">
              <p className="mb-5 text-sm tracking-[0.4em]">
                {item.subtitle}
              </p>

              <h1 className="text-4xl md:text-7xl font-serif">
                {item.title}
              </h1>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default StackCards
