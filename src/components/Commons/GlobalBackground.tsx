import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GlobalBackground() {
    const container = useRef(null);

    useGSAP(() => {
        // Intro animation
        const tl = gsap.timeline();

        // Chỉ animate các hình tròn
        tl.from(".deco-circle", {
            scale: 0,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)"
        });

        // Mouse move parallax effect
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
            const y = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(".deco-circle-1", {
                x: x * 1.5,
                y: y * 1.5,
                duration: 1,
                ease: "power2.out"
            });
            
            gsap.to(".deco-circle-2", {
                x: x * -1, // Di chuyển ngược hướng
                y: y * -1,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, { scope: container });

    return (
        <div ref={container} className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
            <div className="deco-line absolute inset-0 line-pattern"></div>
            {/* ------ */}
            <div className="deco-circle deco-circle-1 absolute -top-[10%] -left-[10%] w-[40%] h-[40%] border rounded-full" style={{borderColor: 'var(--accent-subtle)'}}></div>
            <div className="deco-circle deco-circle-2 absolute top-[20%] -right-[5%] w-[30%] h-[30%] border rounded-full" style={{borderColor: 'var(--accent-subtle)'}}></div>
        </div>
    )
}