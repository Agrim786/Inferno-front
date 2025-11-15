import Image from "next/image";
import { Sparkles } from "lucide-react";

const logos = [
  {
    name: "Quora",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f41ac8d-1612-425b-9157-578a094a0472-delphi-ai-clone-vercel-app/assets/svgs/wsqyBHycBWFGly4vievVAqfauiI-1.svg?",
    width: 80,
    height: 26,
  },
  {
    name: "LiveKit",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f41ac8d-1612-425b-9157-578a094a0472-delphi-ai-clone-vercel-app/assets/svgs/q46u6sPafRUkh1ZfJArgowpZM8-2.svg?",
    width: 90,
    height: 26,
  },
  {
    name: "goodcall",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f41ac8d-1612-425b-9157-578a094a0472-delphi-ai-clone-vercel-app/assets/svgs/iQG8esj7GEya0w96I0RpYNM0-3.svg?",
    width: 110,
    height: 20,
  },
  {
    name: "tavus",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f41ac8d-1612-425b-9157-578a094a0472-delphi-ai-clone-vercel-app/assets/svgs/CAb434VZrVJMXEMmYMb6DpG8-4.svg?",
    width: 85,
    height: 24,
  },
];

const CompanyLogos = () => {
  return (
    <div className="w-full flex-col items-center bg-[#181818] hidden md:flex">
      <div className="w-full max-w-[1239px] flex flex-col items-center">
        <div className="w-full grid grid-cols-5 border-y border-[#333333]">
          <div className="flex justify-center items-center h-[90px] border-r border-[#333333]">
            <Image
              alt="Quora"
              width={80}
              height={26}
              className="filter grayscale brightness-0 invert opacity-60"
              src={logos[0].src}
            />
          </div>
          <div className="flex justify-center items-center h-[90px] border-r border-[#333333]">
            <Image
              alt="LiveKit"
              width={90}
              height={26}
              className="filter grayscale brightness-0 invert opacity-60"
              src={logos[1].src}
            />
          </div>
          <div className="flex justify-center items-center h-[90px] border-r border-[#333333]">
            <Image
              alt="goodcall"
              width={110}
              height={20}
              className="filter grayscale brightness-0 invert opacity-60"
              src={logos[2].src}
            />
          </div>
          <div className="flex justify-center items-center h-[90px] border-r border-[#333333]">
            <div className="flex items-center gap-1.5 text-neutral-500">
              <Sparkles className="w-5 h-5 fill-current" />
              <span className="text-2xl font-medium tracking-tight">hedra</span>
            </div>
          </div>
          <div className="flex justify-center items-center h-[90px]">
            <Image
              alt="tavus"
              width={85}
              height={24}
              className="filter grayscale brightness-0 invert opacity-60"
              src={logos[3].src}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;