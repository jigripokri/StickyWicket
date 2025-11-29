import { motion } from "framer-motion";
import { Mail, Linkedin, Heart, Lightbulb, Rocket, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-parchment">
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-postit-coral/50 rounded-full mb-6 border border-[#E8A8A5]">
              <Heart className="w-4 h-4 text-[#8B4E52]" />
              <span className="text-sm font-medium text-ink">The Story Behind the Code</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-8 leading-tight">
              My Most Important User is Four Years Old
            </h1>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-edge mb-8" style={{ boxShadow: '0 4px 20px rgba(47, 42, 58, 0.06)' }}>
              <p className="text-ink leading-relaxed text-lg mb-4">
                He might only want bedtime stories for a few more years. I want him to open a book and see <strong className="font-semibold">himself</strong> on the page, saving the day alongside the Hulk.
              </p>
              <p className="text-ink leading-relaxed">
                <strong className="font-semibold">That is a user need worth losing some sleep over.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-postit-yellow/50 rounded-xl flex items-center justify-center border border-[#D9C97A]">
                <Lightbulb className="w-5 h-5 text-[#7A6B2A]" />
              </div>
              <h2 className="font-display text-xl font-bold text-ink">The Joy of Building</h2>
            </div>
            <div className="pl-13">
              <p className="text-ink leading-relaxed mb-4">
                Somewhere along the way, I rediscovered something I had forgotten: the pure joy of making things. Not for metrics or roadmaps, but for the delight of watching an idea become something real. Something you can click, share, and smile at.
              </p>
              <p className="text-ink-light leading-relaxed">
                These weekend projects started as ways to teach myself new things. They became something more—tools I actually want to use, built exactly the way I think they should work. No compromises. No committee reviews. Just ideas, code, and that satisfying moment when it all comes together.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-postit-aqua/50 rounded-xl flex items-center justify-center border border-[#9DD4D8]">
                <Rocket className="w-5 h-5 text-[#3D6B6F]" />
              </div>
              <h2 className="font-display text-xl font-bold text-ink">A Wonderful Time to Build</h2>
            </div>
            <div className="pl-13">
              <p className="text-ink leading-relaxed mb-4">
                We are living in a remarkable moment. An idea that used to take months can become working software overnight. The gap between "what if" and "try it" has never been smaller.
              </p>
              <p className="text-ink-light leading-relaxed">
                I am learning every single day—new tools, new techniques, new ways of thinking. Not because I have to, but because it is genuinely fun. Each project here taught me something. Some taught me many things by breaking in interesting ways.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-postit-lavender/50 rounded-xl flex items-center justify-center border border-[#C5B6E8]">
                <MessageCircle className="w-5 h-5 text-[#5B4B8A]" />
              </div>
              <h2 className="font-display text-xl font-bold text-ink">Let's Trade Notes</h2>
            </div>
            <div className="pl-13">
              <p className="text-ink leading-relaxed mb-4">
                If you have tips, tricks, or hard-won lessons from your own building adventures, I would love to hear them. And if you are just getting started and want to know how any of this works, I am happy to share what I have learned.
              </p>
              <p className="text-ink-light leading-relaxed">
                The best part of making things is the people you meet along the way.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-edge" style={{ boxShadow: '0 4px 20px rgba(47, 42, 58, 0.06)' }}>
              <h3 className="font-display text-lg font-bold text-ink mb-4">Say Hello</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:saurabh@stickywicketlabs.com"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl transition-all note-button-coral"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">saurabh@stickywicketlabs.com</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/jigripokri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl transition-all note-button-aqua"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-ink-light mt-12 text-sm"
          >
            Thanks for stopping by. Now go build something.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
