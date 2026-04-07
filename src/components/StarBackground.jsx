import React, { useEffect, useState } from 'react'

const StarBackground = () => {
    const [stars,setStars] = useState([]);
    const [meteors,setMeteors] = useState([]);

    useEffect(()=>{
      spawnStars()
      spawnMeteors()

      const handleResize = () => {
        spawnStars()
      }
      window.addEventListener("resize",handleResize)

      return () => window.removeEventListener("resize",handleResize)
    },[])

    const spawnStars = () =>{
        const numbers = Math.floor(( window.innerWidth * window.innerHeight) / 10000)
        const newStars = []
        for (let i = 0; i < numbers; i++) {
            newStars.push({
                id:i,
                size : Math.random() * 3 + 1,
                x : Math.random() * 100,
                y : Math.random() * 100,
                opacity : Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
            })
          }
          setStars(newStars)
    }
    const spawnMeteors = () =>{
        const numbersMetors = 8
        const newMeteor = []
        for (let i = 0; i < numbersMetors; i++) {
            newMeteor.push({
                id:i,
                size : Math.random() * 2 + 1,
                x : Math.random() * 120 - 20, // -20% to 100%
                y : Math.random() * 50 - 20,  // -20% to 30%
                delay : Math.random() * 12,    // longer delay to space out slower meteors
                animationDuration: Math.random() * 6 + 10, // 10 to 16s duration (much slower)
            })
          }
          setMeteors(newMeteor)
    }

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
            <div
              key={star.id}
              className="star animate-pulse-subtle"
              style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animationDuration: star.animationDuration + "s",
              }}
            />
          ))}

        {meteors.map((meteor) => (
            <div
              key={meteor.id}
              className="meteor animate-meteor"
              style={{
                width: meteor.size * 50 + "px",
                height: meteor.size + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDelay: meteor.delay,
                animationDuration: meteor.animationDuration + "s",
              }}
            />
          ))}
      </div>
    </>
  )
}

export default StarBackground