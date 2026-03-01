---
name: gsap-animation
description: Guide for implementing animations with GSAP and ScrollTrigger in the portfolio project. Use this skill when creating scroll animations, entrance effects, and interactive animations.
license: MIT
metadata:
  author: portfolio-team
  version: "1.0.0"
  category: animation
  tags: gsap, scrolltrigger, animation, motion
---

# GSAP Animation Guide

Comprehensive guide for implementing animations with GSAP in the portfolio_astro project.

## When to Use This Skill

Activate this skill when:

- Creating scroll-based animations
- Entrance animations for elements
- Interactive hover/click animations
- Text reveal effects
- Parallax effects

## Animation Tech Stack

- **GSAP 3.14+** - Core animation library
- **@gsap/react** - React integration hook
- **ScrollTrigger** - Scroll-based animations

## Basic Setup

### Import and Register Plugins

```tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins - REQUIRED
gsap.registerPlugin(ScrollTrigger);
```

### Hook Pattern with useGSAP

```tsx
export default function Component() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".element", {
        y: 30,
        opacity: 0,
        duration: 1,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef}>
      <div className="element">Content</div>
    </section>
  );
}
```

## Common Animation Patterns

### 1. Entrance Animation (Load)

```tsx
useGSAP(
  () => {
    gsap.from(".hero-anim-item", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15, // Delay between elements
      ease: "power3.out",
      delay: 0.5, // Initial delay
    });
  },
  { scope: container }
);
```

### 2. Scroll-Triggered Animation

```tsx
useGSAP(
  () => {
    gsap.fromTo(
      ".card",
      // From state
      {
        y: 80,
        opacity: 0,
        rotateX: 10,
      },
      // To state
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".card",
          start: "top 85%", // When card top hits 85% of viewport
          toggleActions: "play none none reverse",
        },
      }
    );
  },
  { scope: sectionRef }
);
```

### 3. Scrub Animation (Scroll-linked)

```tsx
useGSAP(
  () => {
    gsap.to(headingRef.current, {
      backgroundSize: "100% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1, // Higher number = smoother animation
      },
    });
  },
  { scope: sectionRef }
);
```

### 4. Class Toggle on Scroll

```tsx
useGSAP(
  () => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 30%",
        onEnter: () => element.classList.add(st.filled),
        onLeaveBack: () => element.classList.remove(st.filled),
      },
    });
  },
  { scope: sectionRef }
);
```

### 5. Staggered Reveal

```tsx
useGSAP(
  () => {
    const cards = cardsRef.current?.querySelectorAll(`.${st.card}`);

    if (cards) {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  },
  { scope: sectionRef }
);
```

### 6. Line/Shape Reveal

```tsx
useGSAP(
  () => {
    gsap.fromTo(
      `.${st.subLine}`,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${st.subInfo}`,
          start: "top 80%",
        },
      }
    );
  },
  { scope: sectionRef }
);
```

## ScrollTrigger Options

### toggleActions

```javascript
toggleActions: "onEnter onLeave onEnterBack onLeaveBack";
// Values: play, pause, resume, restart, reset, complete, reverse, none
```

| Scenario     | Value                         | Description                           |
| ------------ | ----------------------------- | ------------------------------------- |
| Play once    | `"play none none none"`       | Play once on enter                    |
| Play/Reverse | `"play none none reverse"`    | Play on enter, reverse on scroll back |
| Restart      | `"restart none none reverse"` | Restart each time entering            |

### start and end

```javascript
// Format: "element-position viewport-position"
start: "top 80%",    // Trigger's top hits 80% from viewport top
start: "center center", // Trigger's center hits viewport center
end: "bottom top",   // Trigger's bottom hits viewport top
```

### scrub

```javascript
scrub: true,    // Animation syncs with scroll
scrub: 1,       // Smooth with 1 second delay
scrub: 0.5,     // Smooth with 0.5 second delay
```

## Easing Functions

### Commonly Used in This Project

| Ease                                   | Usage                                  |
| -------------------------------------- | -------------------------------------- |
| `power3.out`                           | Entrance animations, smooth decelerate |
| `power2.out`                           | Subtle reveals                         |
| `none`                                 | Scrub animations                       |
| `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Custom smooth                          |

## Best Practices

### MUST DO ✅

1. **Use `useGSAP` hook** instead of `useEffect`
2. **Set `scope`** to limit animations within component
3. **Register plugins** before using
4. **Use refs** for elements needing precise animation
5. **Class selectors** compatible with SCSS modules
6. **Cleanup** - `useGSAP` handles cleanup automatically

### MUST NOT DO ❌

1. **useEffect instead of useGSAP** - can cause memory leaks
2. **Global selectors** without scope
3. **Too many animations** at once (performance)
4. **Animations on hidden elements** (display: none)

## Template Component with Animation

```tsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import st from "./component.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedComponent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Entrance animation
      gsap.from(`.${st.animItem}`, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      // Scroll-triggered
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          backgroundSize: "100% 100%",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={st.section}>
      <h1 ref={headingRef} className={st.heading}>
        Title
      </h1>
      <div className={st.animItem}>Item 1</div>
      <div className={st.animItem}>Item 2</div>
    </section>
  );
}
```

## Performance Tips

1. **`will-change`** in CSS for elements that will animate
2. **Composite properties** (transform, opacity) instead of layout properties
3. **Limit number** of active ScrollTriggers
4. **Lazy init** ScrollTrigger for below-fold elements

## Animation Checklist

- [ ] Import and register GSAP plugins
- [ ] Use `useGSAP` with `scope`
- [ ] Create refs for target elements
- [ ] Configure ScrollTrigger with appropriate start/end
- [ ] Test on mobile (touch scroll)
- [ ] Verify performance (no lag when scrolling)
