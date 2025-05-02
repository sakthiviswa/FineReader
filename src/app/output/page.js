'use client';

import { useState } from 'react';

function getStarColor() {
  const colors = [
    '#ffffff',
    '#a5b4fc',
    '#c4b5fd',
    '#a5f3fc',
    '#e9d5ff',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getParticleColor(index) {
  const colors = [
    '#6366f1',
    '#a855f7',
    '#3b82f6',
    '#d946ef',
    '#8b5cf6',
    '#0ea5e9',
  ];
  return colors[index % colors.length];
}

export default function output() {
  const [content, setContent] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Toggle animation on click
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#b2dfdb] via-[#c5cae9] to-[#e1bee7]">
      {/* Header with logo */}
      <header className="flex justify-center py-6">
      <h1 className="text-4xl font-bold bg-gradient-to-br from-[#3949ab] to-[#8e24aa] text-transparent bg-clip-text transition-transform duration-300 hover:-translate-y-0.5">
          finereader
        </h1>
      </header>

      {/* Main content area */}
      <main className="flex-grow flex justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 flex flex-col">
          {/* Text content area */}
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="text-gray-700 text-center w-full min-h-[200px] flex items-center justify-center">
              {content || (
                <div className="relative w-96 h-64 cursor-pointer rounded-2xl" onClick={toggleAnimation}>
                  {/* Outer gradient border with animation */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e1cfe2] via-[#90caf9] to-[#f48fb1] opacity-50 ${isAnimating ? 'animate-pulse' : ''}`} 
                      style={{ animationDuration: '2s' }}></div>
                  
                  {/* Inner glow effect */}
                  <div className="absolute inset-1 rounded-xl  opacity-90 blur-sm"></div>
                  
                  {/* Main content area with glass effect */}
                  <div className="absolute inset-2 rounded-xl flex items-center justify-center overflow-hidden">
                    {/* Glass backdrop */}
                    <div className="absolute w-full h-full rounded-xl bg-white/15 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 backdrop-blur-sm border border-white/10 pointer-events-none"></div>
                    
                    {/* Stars that blink */}
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute ${isAnimating ? '' : 'pause-animation'}`}
                        style={{
                          width: `${Math.random() * 4 + 1}px`,
                          height: `${Math.random() * 4 + 1}px`,
                          backgroundColor: getStarColor(),
                          borderRadius: '50%',
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animation: isAnimating ? `twinkle ${Math.random() * 3 + 1}s ease-in-out infinite` : 'none',
                          animationDelay: `${Math.random() * 3}s`
                        }}
                      ></div>
                    ))}
                    
                    {/* Larger featured stars */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`feature-${i}`}
                        className={`absolute ${isAnimating ? '' : 'pause-animation'}`}
                        style={{
                          width: `${Math.random() * 6 + 4}px`,
                          height: `${Math.random() * 6 + 4}px`,
                          background: `radial-gradient(circle, white 0%, ${getStarColor()} 70%, transparent 100%)`,
                          borderRadius: '50%',
                          top: `${10 + Math.random() * 80}%`,
                          left: `${10 + Math.random() * 80}%`,
                          animation: isAnimating ? `twinkle ${Math.random() * 2 + 2}s ease-in-out infinite` : 'none',
                          animationDelay: `${Math.random() * 3}s`,
                          boxShadow: `0 0 10px ${getStarColor()}`
                        }}
                      ></div>
                    ))}
                    
                    {/* Add shooting stars occasionally */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`shooting-${i}`}
                        className={`absolute ${isAnimating ? '' : 'pause-animation'}`}
                        style={{
                          width: '2px',
                          height: '2px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          top: `${Math.random() * 70}%`,
                          left: '0%',
                          boxShadow: '0 0 4px 1px white, 0 0 10px 6px rgba(255,255,255,0.5)',
                          animation: isAnimating ? `shootingStar ${Math.random() * 3 + 6}s linear infinite` : 'none',
                          animationDelay: `${i * 2 + Math.random() * 5}s`
                        }}
                      ></div>
                    ))}
                    
                    {/* Nebula-like effect */}
                    <div className="absolute w-3/4 h-1/2 opacity-20 rounded-full blur-xl bg-gradient-to-r from-purple-500 via-pink-300 to-indigo-400"></div>
                  </div>
                  
                  {/* Orbiting particles - adjusted for rectangular shape */}
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const isHorizontal = i % 2 === 0;
                    return (
                      <div 
                        key={i} 
                        className={`absolute w-3 h-3 rounded-full ${isAnimating ? '' : 'pause-animation'}`}
                        style={{
                          backgroundColor: getParticleColor(i),
                          opacity: 0.8,
                          top: isHorizontal ? '50%' : (i < 3 ? '25%' : '75%'),
                          left: !isHorizontal ? '50%' : (i < 3 ? '25%' : '75%'),
                          animation: isAnimating ? `${isHorizontal ? 'orbitHorizontal' : 'orbitVertical'} ${3 + i % 3}s linear infinite` : 'none',
                          animationDelay: `${i * -0.5}s`,
                          transform: 'translate(-50%, -50%)'
                        }}>
                      </div>
                    );
                  })}
                  
                  {/* AI text in the center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white font-bold text-3xl tracking-widest opacity-30">AI Processing</div>
                  </div>
                  
                 
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom input bar */}
      <div className="flex justify-center py-4 px-4">
        <div className="w-full max-w-xl relative">
          <input 
            type="text" 
            placeholder="Edit with AI" 
            className="w-full py-3 px-5 rounded-full border-0 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-300 text-white p-2 rounded-full hover:bg-pink-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-6 left-6">
        <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>
      
      {/* Styles for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes orbitHorizontal {
          0% {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
        
        @keyframes orbitVertical {
          0% {
            transform: rotate(0deg) translateY(60px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateY(60px) rotate(-360deg);
          }
        }
        
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            transform: translateX(calc(96rem * 0.8)) translateY(calc(64rem * 0.2));
            opacity: 1;
          }
          100% {
            transform: translateX(96rem) translateY(calc(64rem * 0.25));
            opacity: 0;
          }
        }
        
        .pause-animation {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}