import { useScroll, useTransform, useSpring, motion } from 'framer-motion'

/**
 * ScrollDragon
 *
 * Traditional Chinese dragon silhouette that emerges head-first from
 * behind the header and weaves diagonally across the full page as you scroll.
 *
 * - Starts hidden behind the header (translateY: -100%)
 * - As scroll begins, head peeks out and body follows
 * - X position follows a sinuous wave path as it descends
 * - position: fixed, z-index: 1 (above AmbientBackground, below all content)
 * - Dark crimson at 15% opacity — ghosted, subtle
 *
 * Place once in App.tsx, outside all sections.
 */

export function ScrollDragon() {
  const { scrollYProgress } = useScroll()

  // Y: dragon travels from -110% (hidden above/behind header) to 60% (tail exits bottom)
  const rawY = useTransform(scrollYProgress, [0, 1], ['-110%', '60%'])

  // X: sinuous wave — weaves left→right→left→right across the page
  // Values in vw units mapped via scrollYProgress
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
    ['10vw', '55vw', '5vw', '60vw', '8vw', '50vw', '15vw']
  )

  // Rotation follows the X movement — tilts to face direction of travel
  const rotation = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
    [25, -20, 30, -25, 28, -18, 22]
  )

  // Spring smoothing — makes the motion feel organic, not mechanical
  const y = useSpring(rawY, { stiffness: 40, damping: 20 })
  const x = useSpring(rawX, { stiffness: 30, damping: 18 })
  const rotate = useSpring(rotation, { stiffness: 35, damping: 22 })

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x,
          y,
          rotate,
          width: 'clamp(280px, 35vw, 520px)',
          transformOrigin: 'center center',
        }}
      >
        <DragonSVG />
      </motion.div>
    </div>
  )
}

/**
 * DragonSVG
 *
 * Hand-crafted Chinese dragon silhouette in the traditional flat style —
 * matching the reference image: diagonal swimming pose, head down-right,
 * scales, whiskers, claws, flame details. Dark crimson fill, low opacity.
 *
 * ViewBox is tall to accommodate the diagonal body.
 */
function DragonSVG() {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        height: 'auto',
        opacity: 0.15,
        filter: 'drop-shadow(0 0 20px rgba(180, 20, 20, 0.3))',
      }}
    >
      {/* ── DRAGON BODY ─────────────────────────────────────────────── */}
      {/* Main serpentine body — S-curve from head (top-right) to tail (bottom-left) */}
      <g fill="#8B0000">

        {/* HEAD */}
        {/* Snout */}
        <ellipse cx="310" cy="75" rx="28" ry="18" transform="rotate(-35 310 75)" />
        {/* Upper jaw */}
        <path d="M285 55 Q310 40 340 60 Q350 72 335 82 Q315 88 290 78 Z" />
        {/* Lower jaw */}
        <path d="M288 78 Q312 92 338 84 Q342 95 330 100 Q308 106 284 92 Z" />
        {/* Teeth upper */}
        <path d="M295 56 L292 48 L298 55 M308 50 L306 42 L312 50 M322 54 L321 46 L326 54" 
              stroke="#8B0000" strokeWidth="3" fill="none"/>
        {/* Teeth lower */}
        <path d="M296 92 L294 100 L300 92 M312 95 L311 103 L316 95 M326 90 L325 98 L330 90"
              stroke="#8B0000" strokeWidth="3" fill="none"/>
        {/* Eye */}
        <circle cx="302" cy="62" r="7" fill="#8B0000"/>
        <circle cx="304" cy="60" r="3" fill="#3a0000"/>
        {/* Nostril */}
        <ellipse cx="325" cy="70" rx="4" ry="3" transform="rotate(-35 325 70)" fill="#5a0000"/>
        {/* Horn */}
        <path d="M290 52 Q278 35 272 20 Q280 25 288 40 Q294 30 296 18 Q298 32 292 48 Z"/>
        {/* Whiskers */}
        <path d="M315 68 Q340 55 365 48 Q355 58 332 65" fill="#8B0000"/>
        <path d="M320 75 Q348 72 372 70 Q360 76 334 76" fill="#8B0000"/>
        {/* Mane/beard flames */}
        <path d="M285 72 Q268 62 255 50 Q262 65 270 75 Q258 70 248 65 Q258 78 268 85 Z"/>
        <path d="M284 82 Q265 78 250 78 Q262 88 276 90 Z"/>

        {/* NECK */}
        <path d="M288 85 Q275 100 265 120 Q258 138 260 155 
                 Q270 150 278 135 Q282 118 292 102 Z"/>
        {/* Neck scales */}
        <path d="M272 105 Q265 110 268 118 Q275 112 272 105 Z"/>
        <path d="M268 120 Q261 126 264 134 Q271 128 268 120 Z"/>

        {/* FRONT LEGS */}
        {/* Left front leg */}
        <path d="M268 118 Q252 112 240 108 Q235 118 242 124 Q252 120 264 126 Z"/>
        {/* Left front claws */}
        <path d="M238 110 Q228 106 224 100 Q232 108 238 110 Z"/>
        <path d="M238 116 Q226 116 222 112 Q230 116 238 116 Z"/>
        <path d="M240 122 Q228 124 225 120 Q233 122 240 122 Z"/>
        {/* Right front leg */}
        <path d="M278 132 Q292 126 305 118 Q312 126 306 134 Q294 134 280 140 Z"/>
        {/* Right front claws */}
        <path d="M307 120 Q318 115 322 108 Q316 118 307 120 Z"/>
        <path d="M310 128 Q320 126 324 120 Q316 128 310 128 Z"/>
        <path d="M308 134 Q318 135 322 130 Q314 134 308 134 Z"/>

        {/* UPPER BODY */}
        <path d="M260 150 Q248 168 242 188 Q238 208 242 226
                 Q252 220 258 202 Q262 182 270 164 Z"/>
        {/* Body scales row 1 */}
        <path d="M248 162 Q240 170 244 180 Q252 172 248 162 Z"/>
        <path d="M244 178 Q236 188 240 198 Q248 190 244 178 Z"/>
        <path d="M242 196 Q234 206 238 216 Q246 208 242 196 Z"/>

        {/* WING / SPINE FINS */}
        <path d="M268 160 Q280 148 295 142 Q290 158 278 166 Z"/>
        <path d="M262 178 Q274 165 290 158 Q285 175 272 183 Z"/>
        <path d="M256 196 Q268 183 284 176 Q279 193 266 200 Z"/>
        <path d="M250 214 Q262 200 278 193 Q273 210 260 217 Z"/>

        {/* MID BODY */}
        <path d="M242 222 Q235 242 234 262 Q232 282 238 298
                 Q248 292 250 272 Q252 252 256 234 Z"/>
        {/* Mid scales */}
        <path d="M237 238 Q228 248 232 258 Q240 250 237 238 Z"/>
        <path d="M234 256 Q225 266 229 276 Q237 268 234 256 Z"/>
        <path d="M234 274 Q225 284 229 294 Q237 286 234 274 Z"/>

        {/* BACK LEGS */}
        {/* Left back leg */}
        <path d="M242 258 Q226 255 214 256 Q210 266 218 272 Q228 268 240 270 Z"/>
        {/* Left back claws */}
        <path d="M212 257 Q200 255 196 248 Q206 256 212 257 Z"/>
        <path d="M212 264 Q200 264 196 258 Q206 264 212 264 Z"/>
        <path d="M214 270 Q202 272 198 266 Q208 270 214 270 Z"/>
        {/* Right back leg */}
        <path d="M252 270 Q264 262 276 255 Q282 264 276 272 Q264 272 254 278 Z"/>
        {/* Right back claws */}
        <path d="M278 257 Q288 252 292 244 Q286 254 278 257 Z"/>
        <path d="M280 265 Q290 262 294 255 Q286 264 280 265 Z"/>
        <path d="M278 271 Q288 271 292 264 Q284 270 278 271 Z"/>

        {/* LOWER BODY */}
        <path d="M238 294 Q234 314 234 334 Q234 354 240 370
                 Q250 364 252 344 Q252 324 252 304 Z"/>
        {/* Lower scales */}
        <path d="M236 310 Q228 320 232 330 Q240 322 236 310 Z"/>
        <path d="M234 328 Q226 338 230 348 Q238 340 234 328 Z"/>
        <path d="M235 346 Q227 356 231 366 Q239 358 235 346 Z"/>

        {/* Lower spine fins */}
        <path d="M252 300 Q264 288 278 282 Q273 298 260 304 Z"/>
        <path d="M252 318 Q264 306 278 300 Q273 316 260 322 Z"/>
        <path d="M252 336 Q264 323 278 317 Q273 333 260 340 Z"/>
        <path d="M252 354 Q263 341 277 335 Q272 351 259 357 Z"/>

        {/* TAIL */}
        <path d="M240 366 Q238 386 242 404 Q248 420 258 432
                 Q264 424 260 408 Q254 392 252 374 Z"/>
        {/* Tail tip — curling flame */}
        <path d="M258 428 Q268 440 272 455 Q260 448 252 438 
                 Q256 450 254 465 Q246 452 244 438
                 Q240 450 235 460 Q234 446 240 434 Z"/>
        {/* Tail flames */}
        <path d="M262 435 Q275 428 285 418 Q278 430 265 438 Z"/>
        <path d="M258 442 Q272 438 282 430 Q274 440 260 446 Z"/>

        {/* BODY SCALE TEXTURE — diamond pattern along spine */}
        {/* These give the scaly texture visible in the reference */}
        <path d="M265 145 Q270 138 275 145 Q270 152 265 145 Z" opacity="0.6"/>
        <path d="M260 162 Q265 155 270 162 Q265 169 260 162 Z" opacity="0.6"/>
        <path d="M255 179 Q260 172 265 179 Q260 186 255 179 Z" opacity="0.6"/>
        <path d="M250 196 Q255 189 260 196 Q255 203 250 196 Z" opacity="0.6"/>
        <path d="M246 213 Q251 206 256 213 Q251 220 246 213 Z" opacity="0.6"/>
        <path d="M244 230 Q249 223 254 230 Q249 237 244 230 Z" opacity="0.6"/>
        <path d="M243 247 Q248 240 253 247 Q248 254 243 247 Z" opacity="0.6"/>
        <path d="M243 264 Q248 257 253 264 Q248 271 243 264 Z" opacity="0.6"/>
        <path d="M244 281 Q249 274 254 281 Q249 288 244 281 Z" opacity="0.6"/>
        <path d="M245 298 Q250 291 255 298 Q250 305 245 298 Z" opacity="0.6"/>
        <path d="M244 315 Q249 308 254 315 Q249 322 244 315 Z" opacity="0.6"/>
        <path d="M243 332 Q248 325 253 332 Q248 339 243 332 Z" opacity="0.6"/>
        <path d="M243 349 Q248 342 253 349 Q248 356 243 349 Z" opacity="0.6"/>

        {/* FLAME DETAILS on body */}
        <path d="M232 200 Q218 195 210 185 Q218 198 224 210 Q215 205 208 198 Q216 212 225 220 Z"/>
        <path d="M236 280 Q220 278 210 270 Q220 282 228 292 Q218 288 210 282 Q218 295 228 300 Z"/>
        <path d="M244 360 Q230 360 222 352 Q230 364 236 374 Q228 370 220 364 Q228 376 238 380 Z"/>

      </g>
    </svg>
  )
}
