'use client';

import { useCallback, useState } from 'react';
import { Urbanist } from 'next/font/google';
import dynamic from 'next/dynamic';
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useRouter } from 'next/navigation';
import { Lemonada } from 'next/font/google';


const urbanist = Urbanist({ subsets: ['latin'] });
const lemonada = Lemonada({ subsets: ['latin'], weight: ['400', '600'] });


const Particles = dynamic(() => import('react-particles').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

export default function Page() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const handleGenerator = async () => {
    if (!inputValue.trim()) return;

    try {
      setIsLoading(true);
      console.log("Generating summary for:", inputValue);

      // For Next.js applications, use a proxy through your own API route
      // This will avoid CORS issues with direct browser-to-API calls
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch summary: ${response.status}`);
      }

      const result = await response.json();

      localStorage.setItem(
        'summaryResult',
        JSON.stringify({
          originalText: inputValue,
          summary: result.summary || result.data?.summary || result,
        })
      );


      // Store the result in localStorage to access it on the output page
      localStorage.setItem(
        'summaryResult',
        JSON.stringify({
          originalText: inputValue,
          summary: result.summary || result.data?.summary || result,
        })
      );
      router.push('/output');
      
    } catch (error) {
      console.error('Error generating summary:', error);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`${urbanist.className} flex min-h-screen flex-col bg-gradient-to-br from-[#b2dfdb] via-[#c5cae9] to-[#e1bee7]  overflow-hidden`}
    >
      {/* Navigation bar */}
      <div className="flex flex-row items-center justify-between p-5 z-10 relative">
        <h1 className={` ${lemonada.className} text-4xl font-bold bg-gradient-to-br from-[#3949ab] to-[#8e24aa] text-transparent bg-clip-text transition-transform duration-300 hover:-translate-y-0.5`}>
          FineReader
        </h1>
        <button className="px-6 py-3 bg-gradient-to-br from-[#e3f2fd] via-[#fce4ec] to-[#f3e5f5]
  text-gray-800 font-medium rounded-2xl shadow-md border border-transparent 
  transition-all duration-300 hover:bg-[#fce4ec] hover:from-[#fce4ec] hover:via-[#fce4ec] hover:to-[#fce4ec] 
  hover:border-[#ec407a]   hover:shadow-lg active:translate-y-0 active:shadow-md" onClick={() => router.push('/output')}>
          Get started
        </button>
      </div>

      {/* Translucent Circle Background + Particles */}
      <div className="absolute w-full h-full rounded-tl-full rounded-tr-full bg-white/15 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/5 z-0 backdrop-blur-sm border border-white/10 pointer-events-none">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            particles: {
              number: { value: 60, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              opacity: { value: 0.4, random: false },
              size: { value: 4, random: true },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                outMode: "out",
                bounce: false,
              },
            },
            detectRetina: true,
          }}
          className="absolute w-full h-full"
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-grow items-center justify-center py-8 z-10 relative">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 shadow-sm">
            <h3 className="text-2xl font-bold">QuickSummarize</h3>
          </div>
        </div>

        {/* Headline section */}
        <div className="flex flex-col items-center px-4 md:px-8 max-w-4xl mx-auto text-center mt-6 mb-12 text-gray-500">
          <div className='flex flex-row items-start mb-2 self-start'>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              summarize the 
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ml-3 bg-gradient-to-br from-[#3949ab] to-[#8e24aa] text-transparent bg-clip-text  ">
               world's knowledge
            </h2>
          </div>
          <div className='flex flex-row items-start mb-6'>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              with the 
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ml-3 bg-gradient-to-br from-[#3949ab] to-[#8e24aa] text-transparent bg-clip-text  ">
               click of a button.
            </h2>
          </div>
          <p className="text-lg text-gray-900 max-w-2xl">
            Get instant summaries of articles, research papers, and documents. Save time and extract key insights efficiently.
          </p>
        </div>

        {/* Input section */}
        <div className="w-full max-w-4xl px-4 mb-8">
          <div className="relative group">
            <input
              type="text"
              className="w-full h-16 p-5 pl-12 text-lg rounded-xl bg-white text-gray-800 shadow-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 transition-all"
              placeholder="Paste your text to summarize..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {/* Star icon in input */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            {/* Generate button */}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-br from-[#e3f2fd] via-[#fce4ec] to-[#f3e5f5]
              text-gray-800 font-medium rounded-2xl shadow-md border border-transparent 
              transition-all duration-300 hover:bg-[#fce4ec] hover:from-[#fce4ec] hover:via-[#fce4ec] hover:to-[#fce4ec] 
              hover:border-[#ec407a] hover:shadow-lg active:shadow-md"
              onClick={handleGenerator}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate →'}
            </button>
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-xl p-0.5 -z-10 bg-gradient-to-r from-[#f9e8fb] via-[#e1f5fe] to-[#fce4ec] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4 mt-8 mb-12">
          {[
            {
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.5 3v18L21 12L9.5 3z M7.5 3v18L19 12L7.5 3z M3 3v18h2V3H3z" />
                </svg>
              ),
              title: "Lightning Fast",
              description: "Get summaries in seconds, not minutes"
            },
            {
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              ),
              title: "Accurate",
              description: "AI-powered precision you can trust"
            },
            {
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              ),
              title: "Secure",
              description: "Your data stays private and protected"
            }
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="p-3 bg-white/30 rounded-full mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-center text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 px-4 mt-auto z-10 relative text-center">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} finereader. All rights reserved.</p>
      </footer>
    </main>
  );
}