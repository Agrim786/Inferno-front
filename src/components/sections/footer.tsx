import React from "react";
import { Linkedin, Github } from "lucide-react";


const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <title>Discord</title>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4464.8245-.6083 1.2496-1.8447-.2762-3.68-.2762-5.4868 0-.1619-.4251-.3973-.8743-.6083-1.2496a.0741.0741 0 00-.0785-.0371 19.7363 19.7363 0 00-4.8851 1.5152.069.069 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0321.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.5787.8871-1.2264 1.2944-1.931-1.5881-.5787-3.0365-1.3219-4.351-2.2684a.0777.0777 0 01-.0207-.0785c.1315-.2477.263-.5062.3838-.7852a.0777.0777 0 01.0628-.0464c.6273-.186 1.2547-.3827 1.882-.5902a.0777.0777 0 01.0746.0092c-.0523.0561-.1045.1015-.1459.1469a7.3513 7.3513 0 00-1.0321 1.053c-.0414.0464-.031.0656.0092.0848 1.4883.6004 2.9455.9737 4.4027.9737s2.9144-.3733 4.4027-.9737c.0414-.0192.0523-.0384.0092-.0848-.2017-.237-.414-.474-.6274-.711a7.2844 7.2844 0 00-1.0428-1.053c-.0414-.0453-.0937-.0897-.1459-.1469a.0777.0777 0 01.0746-.0092c.6273.2075 1.2547.4042 1.882.5902a.0777.0777 0 01.0628.0464c.1208.279.2515.5375.3838.7852a.0777.0777 0 01-.0207.0785c-1.3145.9465-2.7629 1.6897-4.3617 2.2684.4073.7046.8328 1.3523 1.2944 1.931a.0777.0777 0 00.0842.0276c1.9612-.6067 3.9497-1.5219 6.0021-3.0294a.0824.0824 0 00.0321-.0561c.5428-5.177-.8222-9.6738-2.6734-13.6602a.069.069 0 00-.0321-.0277z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-background py-12 text-sm text-muted-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 border-b border-border pb-12 md:grid-cols-6 md:gap-8">
          <div className="md:col-span-2">
            <a className="flex items-center gap-2.5 text-foreground" href="#">
             <img
              src="/SynapEase.svg"
              alt="SynapEase Logo"
              className="h-7 w-auto md:h-7" 
              />
              <span className="text-xl font-semibold">SynapEase</span>
            </a>
            <p className="mt-4 max-w-sm">
              Real-time, intelligence for every person in pain.
            </p>
            {/* <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <DiscordIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
            </div> */}
          </div>

          <div>
          </div>
         {/*  <div>
            <h3 className="font-semibold text-foreground">Products</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Syllabus Parser
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Smart Study Planner
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Attendance Tracker
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Exam Crash Mode
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  AI Question Generator
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  User Guides
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Campus Launch Kit
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/about"
                  className="transition-colors hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Campus Ambassadors
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="/legal"
              className="font-medium transition-colors hover:text-foreground"
            >
              Legal
            </a>
            <a
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Use
            </a>
            <a
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </a>
          </div>
          <p className="text-center md:text-right">
            © 2025 SynapEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
