import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const Advantages = () => {
  return (
    <section className="bg-[#020305] py-20 px-6 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Perfect for late night overthinkers
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary-text">
            Turn emotional overload into calm control. Regulate faster, breathe deeper, and actually feel okay again.
          </p>
        </div>

        {/* Top two boxes layout */}
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT — square-like card */}
          <div className="md:col-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#18181b] via-[#1f1f23] to-[#2a2a2f] shadow-lg hover:shadow-xl transition-all duration-300 min-h-[420px] md:min-h-[460px]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/52365706-a2ca-49af-b8aa-ecab718fa951-orchids-app/assets/images/bottombackground-11.png?"
              alt="Precised Notes Background"
              fill
              className="absolute inset-0 object-cover opacity-100"
            />
            <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                  EMOTION SNAPSHOTS
                </h3>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                  Instant emotional breakdowns that help you understand what’s happening in your mind — built for those ‘everything hits at once’ nights.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — wide rectangular card */}
          <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101010] via-[#151515] to-[#1e1e1e] shadow-lg hover:shadow-xl transition-all duration-300 min-h-[420px] md:min-h-[460px]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/52365706-a2ca-49af-b8aa-ecab718fa951-orchids-app/assets/images/next-151682-bottomleft.png?"
              alt="Attendance Calculator"
              fill
              className="absolute inset-0 object-cover opacity-100"
            />
            <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                  MOOD STABILITY TRACKER
                </h3>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed max-w-2xl">
                  Track emotional fluctuations, predict dips, and know when you need grounding — powered by real-time AI signals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom full-width card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f0f10] via-[#17171a] to-[#212125] shadow-lg hover:shadow-xl transition-all duration-300 w-full min-h-[380px] sm:min-h-[440px]">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/52365706-a2ca-49af-b8aa-ecab718fa951-orchids-app/assets/images/next-646213-topleft.png?"
            alt="AI-generated notes background"
            fill
            className="absolute inset-0 object-cover opacity-100"
          />
          <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl sm:text-3xl uppercase font-display text-white mb-4">
                AI-GUIDED CALM ROUTINES
              </h3>
              <p className="text-sm sm:text-base text-secondary-text leading-relaxed max-w-3xl">
                Upload your thoughts or type what you’re feeling — PulseNet turns it into grounding steps, micro-routines, and stability cues within seconds.
              </p>
            </div>
          </div>
        </div>

      
{/*
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 mt-12">
          <div className="flex gap-4">
            
            <CheckCircle2
              className="h-6 w-6 flex-shrink-0 text-[#34d399]"
              strokeWidth={1.5}
            />
            <div>
               <p className="text-lg font-medium leading-[1.6] text-secondary-text">
                <strong className="text-white">
                  Smart emotional scheduling.
                </strong>{" "}
                SynapEase helps you plan crash-mode study sessions that actually
                stick — no wasted hours, no panic rewrites.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <CheckCircle2
              className="h-6 w-6 flex-shrink-0 text-[#34d399]"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-lg font-medium leading-[1.6] text-secondary-text">
                <strong className="text-white">
                  AI-generated mental snapshots.
                </strong>{" "}
                Upload your syllabus or PDFs and get concise, high-yield notes
                in seconds, perfect for that “tomorrow is my exam”.
              </p> 
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default Advantages;
