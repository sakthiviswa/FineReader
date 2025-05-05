'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Urbanist } from 'next/font/google';
import { Lemonada } from 'next/font/google';


const urbanist = Urbanist({ subsets: ['latin'] });
const lemonada = Lemonada({ subsets: ['latin'], weight: ['400', '600'] });


const themeColors = {
  default: {
    gradientFrom: 'from-[#b2dfdb]',
    gradientVia: 'via-[#c5cae9]',
    gradientTo: 'to-[#e1bee7]',
    titleFrom: 'from-[#3949ab]',
    titleTo: 'to-[#8e24aa]',
    button: 'bg-pink-300 hover:bg-pink-400'
  },
  ocean: {
    gradientFrom: 'from-[#cfd8dc]',
    gradientVia: 'via-[#90caf9]',
    gradientTo: 'to-[#4fc3f7]',
    titleFrom: 'from-[#0277bd]',
    titleTo: 'to-[#01579b]',
    button: 'bg-blue-400 hover:bg-blue-500'
  },
  sunset: {
    gradientFrom: 'from-[#ffecb3]',
    gradientVia: 'via-[#ffcc80]',
    gradientTo: 'to-[#ffab91]',
    titleFrom: 'from-[#e65100]',
    titleTo: 'to-[#bf360c]',
    button: 'bg-orange-400 hover:bg-orange-500'
  }
};

// Pre-defined star data to avoid server/client mismatch
const starData = [
  { width: 3.5, height: 3.1, color: '#ffffff', top: '12.5%', left: '24.3%', duration: 2.2, delay: 0.5 },
  { width: 2.8, height: 2.3, color: '#a5b4fc', top: '38.7%', left: '67.1%', duration: 2.8, delay: 1.2 },
  { width: 4.2, height: 3.7, color: '#c4b5fd', top: '75.3%', left: '42.8%', duration: 1.9, delay: 0.8 },
  { width: 3.3, height: 3.0, color: '#a5f3fc', top: '53.2%', left: '89.4%', duration: 3.1, delay: 1.6 },
  { width: 2.5, height: 2.0, color: '#e9d5ff', top: '28.6%', left: '35.9%', duration: 2.5, delay: 0.3 },
  { width: 3.8, height: 3.4, color: '#ffffff', top: '63.1%', left: '12.7%', duration: 2.7, delay: 1.0 },
  { width: 2.2, height: 1.9, color: '#a5b4fc', top: '82.4%', left: '76.5%', duration: 3.2, delay: 1.5 },
  { width: 3.6, height: 3.2, color: '#e9d5ff', top: '18.9%', left: '53.6%', duration: 2.3, delay: 0.7 },
  { width: 4.0, height: 3.6, color: '#c4b5fd', top: '42.1%', left: '28.3%', duration: 2.0, delay: 1.4 },
  { width: 2.7, height: 2.4, color: '#a5f3fc', top: '67.8%', left: '61.2%', duration: 2.9, delay: 0.6 },
  { width: 3.1, height: 2.8, color: '#ffffff', top: '34.5%', left: '17.4%', duration: 2.6, delay: 1.3 },
  { width: 2.9, height: 2.6, color: '#e9d5ff', top: '73.2%', left: '32.1%', duration: 2.4, delay: 0.4 },
  { width: 3.9, height: 3.5, color: '#a5b4fc', top: '22.7%', left: '83.6%', duration: 2.1, delay: 1.1 },
  { width: 3.2, height: 2.9, color: '#c4b5fd', top: '58.4%', left: '47.9%', duration: 3.0, delay: 0.9 },
  { width: 2.6, height: 2.2, color: '#a5f3fc', top: '15.3%', left: '71.8%', duration: 3.3, delay: 1.7 },
  { width: 3.4, height: 3.0, color: '#ffffff', top: '49.6%', left: '21.5%', duration: 1.8, delay: 0.2 },
  { width: 2.3, height: 2.0, color: '#e9d5ff', top: '86.9%', left: '56.3%', duration: 2.6, delay: 1.8 },
  { width: 4.1, height: 3.8, color: '#a5b4fc', top: '31.2%', left: '93.7%', duration: 2.2, delay: 0.7 },
  { width: 3.0, height: 2.7, color: '#c4b5fd', top: '77.5%', left: '27.1%', duration: 3.4, delay: 1.9 },
  { width: 2.4, height: 2.1, color: '#a5f3fc', top: '9.8%', left: '42.3%', duration: 2.7, delay: 0.3 },
  { width: 3.7, height: 3.3, color: '#ffffff', top: '65.4%', left: '16.9%', duration: 2.3, delay: 1.5 },
  { width: 2.1, height: 1.8, color: '#e9d5ff', top: '44.7%', left: '78.2%', duration: 3.0, delay: 0.5 },
  { width: 4.3, height: 3.9, color: '#a5b4fc', top: '25.1%', left: '38.6%', duration: 2.8, delay: 1.1 },
  { width: 2.9, height: 2.5, color: '#c4b5fd', top: '71.3%', left: '52.4%', duration: 1.9, delay: 0.4 },
  { width: 3.5, height: 3.2, color: '#a5f3fc', top: '37.6%', left: '19.8%', duration: 2.5, delay: 1.6 },
  { width: 2.6, height: 2.3, color: '#ffffff', top: '81.5%', left: '66.7%', duration: 3.2, delay: 0.9 },
  { width: 4.5, height: 4.1, color: '#e9d5ff', top: '14.2%', left: '87.3%', duration: 2.0, delay: 1.3 },
  { width: 3.3, height: 2.9, color: '#a5b4fc', top: '59.8%', left: '33.4%', duration: 2.7, delay: 0.6 },
  { width: 2.2, height: 1.9, color: '#c4b5fd', top: '40.9%', left: '72.6%', duration: 3.1, delay: 1.2 },
  { width: 3.8, height: 3.4, color: '#a5f3fc', top: '19.3%', left: '47.1%', duration: 2.4, delay: 0.8 }
];

// Pre-defined feature star data
const featureStarData = [
  { width: 7.5, height: 7.2, color: '#ffffff', top: '25.3%', left: '32.1%', duration: 3.1, delay: 0.7 },
  { width: 8.2, height: 7.9, color: '#a5b4fc', top: '61.7%', left: '74.6%', duration: 3.8, delay: 1.5 },
  { width: 6.8, height: 6.5, color: '#c4b5fd', top: '42.9%', left: '18.3%', duration: 2.9, delay: 0.3 },
  { width: 9.1, height: 8.7, color: '#a5f3fc', top: '78.2%', left: '56.4%', duration: 3.4, delay: 1.9 },
  { width: 7.3, height: 7.0, color: '#e9d5ff', top: '15.6%', left: '81.9%', duration: 2.6, delay: 1.1 },
  { width: 8.7, height: 8.4, color: '#ffffff', top: '53.8%', left: '24.7%', duration: 3.2, delay: 0.5 },
  { width: 6.4, height: 6.1, color: '#a5b4fc', top: '33.1%', left: '67.2%', duration: 2.8, delay: 1.3 },
  { width: 7.9, height: 7.6, color: '#c4b5fd', top: '88.5%', left: '43.8%', duration: 3.6, delay: 0.9 }
];

// Pre-defined shooting star data
const shootingStarData = [
  { top: '45.9%', delay: 2.7, duration: 7.2 },
  { top: '14.3%', delay: 4.9, duration: 7.7 },
  { top: '68.7%', delay: 1.3, duration: 8.1 }
];

// Pre-defined particle data
const particleData = [
  { isHorizontal: true, top: '50%', left: '25%', delay: 0, duration: 3.0 },
  { isHorizontal: false, top: '25%', left: '50%', delay: -0.5, duration: 4.0 },
  { isHorizontal: true, top: '50%', left: '75%', delay: -1.0, duration: 3.5 },
  { isHorizontal: false, top: '75%', left: '50%', delay: -1.5, duration: 5.0 },
  { isHorizontal: true, top: '25%', left: '25%', delay: -2.0, duration: 4.5 },
  { isHorizontal: false, top: '75%', left: '75%', delay: -2.5, duration: 3.8 }
];

export default function Output() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [originalText, setOriginalText] = useState('');
  const [summary, setSummary] = useState('');

  const [editInput, setEditInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState('default');

  // Client-side only state for animations
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true only on the client side
  useEffect(() => {
    setIsClient(true);
    setIsAnimating(true);
  }, []);

  const currentTheme = themeColors[theme];

  const cycleTheme = () => {
    const themes = Object.keys(themeColors);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  function getParticleColor(index) {
    const colors = ['#6366f1', '#a855f7', '#3b82f6', '#d946ef', '#8b5cf6', '#0ea5e9'];
    return colors[index % colors.length];
  }

  useEffect(() => {
    try {
      const storedResult = localStorage.getItem('summaryResult');
      if (storedResult) {
        const resultData = JSON.parse(storedResult);
        if (typeof resultData === 'string') {
          setContent(resultData);
        } else if (resultData.summary) {
          setOriginalText(resultData.originalText || '');
          setSummary(resultData.summary || '');
        } else if (resultData.data && resultData.data.summary) {
          setContent(resultData.data.summary);
        } else {
          const possibleSummary = Object.values(resultData).find(
            val => typeof val === 'string' && val.length > 10
          );
          if (possibleSummary) {
            setContent(possibleSummary);
          } else {
            setContent(JSON.stringify(resultData, null, 2));
          }
        }
      } else {
        setContent("No summary data found. Please generate a summary first.");
      }
    } catch (error) {
      console.error("Error loading summary data:", error);
      setContent("Error loading summary data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoBack = () => {
    router.push('/');
  };

  const handleEdit = async () => {
    if (!editInput.trim()) return;

    setIsEditing(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch new summary');
      }

      const result = await response.json();
      const newSummary = result.summary || result.data?.summary || (typeof result === 'string' ? result : '');

      setOriginalText(editInput);
      setSummary(newSummary);
      localStorage.setItem(
        'summaryResult',
        JSON.stringify({ originalText: editInput, summary: newSummary })
      );
      setEditInput('');
    } catch (error) {
      console.error('Error editing:', error);
      alert('Failed to edit summary. Please try again.');
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  // New function to clear summary data
  const handleClear = () => {
    setOriginalText('');
    setSummary('');
    localStorage.removeItem('summaryResult');
  };

  return (
    <div className={`${urbanist.className} flex flex-col min-h-screen bg-gradient-to-br ${currentTheme.gradientFrom} ${currentTheme.gradientVia} ${currentTheme.gradientTo}`}>
      {/* Header */}
      <header className="flex justify-center py-4 md:py-6 px-2 md:px-0">
        <h1 className={`${lemonada.className} text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br ${currentTheme.titleFrom} ${currentTheme.titleTo} text-transparent bg-clip-text transition-transform duration-300 hover:-translate-y-0.5`}>
          FineReader
        </h1>
      </header>

      <main className="flex-grow flex justify-center px-2 sm:px-4">
        <div className="w-full max-w-full sm:max-w-3xl md:max-w-4xl bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col">
          <div className="mb-4 sm:mb-6 flex flex-row sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Your Summary</h2>

            {/* Clear button */}
            <button
              onClick={handleClear}
              className={`${currentTheme.button} text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Clear
            </button>
          </div>
          <div className="w-20 h-1 bg-pink-200 mx-auto mb-6"></div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="w-full h-auto min-h-[200px] p-4 rounded-lg border border-gray-100 relative overflow-hidden">
              {isLoading ? (
                <div className="relative w-full h-[250px] sm:h-[300px] rounded-2xl">
                  {/* Outer gradient border with animation */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e1cfe2] via-[#90caf9] to-[#f48fb1] opacity-50 ${isClient && isAnimating ? 'animate-pulse' : ''}`}
                    style={{ animationDuration: '2s' }}
                  ></div>

                  {/* Inner glow effect */}
                  <div className="absolute inset-1 rounded-xl opacity-90 blur-sm"></div>

                  {/* Main content area with glass effect */}
                  <div className="absolute inset-2 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute w-full h-full rounded-xl bg-white/15 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 backdrop-blur-sm border border-white/10 pointer-events-none"></div>

                    {/* Only render stars on client side */}
                    {isClient && (
                      <>
                        {/* Regular stars with fixed positions */}
                        {starData.map((star, i) => (
                          <div
                            key={`star-${i}`}
                            className="absolute"
                            style={{
                              width: `${star.width}px`,
                              height: `${star.height}px`,
                              backgroundColor: star.color,
                              borderRadius: '50%',
                              top: star.top,
                              left: star.left,
                              animation: isAnimating ? `twinkle ${star.duration}s ease-in-out infinite` : 'none',
                              animationDelay: `${star.delay}s`
                            }}
                          ></div>
                        ))}

                        {/* Larger featured stars */}
                        {featureStarData.map((star, i) => (
                          <div
                            key={`feature-${i}`}
                            className="absolute"
                            style={{
                              width: `${star.width}px`,
                              height: `${star.height}px`,
                              background: `radial-gradient(circle, white 0%, ${star.color} 70%, transparent 100%)`,
                              borderRadius: '50%',
                              top: star.top,
                              left: star.left,
                              animation: isAnimating ? `twinkle ${star.duration}s ease-in-out infinite` : 'none',
                              animationDelay: `${star.delay}s`,
                              boxShadow: `0 0 10px ${star.color}`
                            }}
                          ></div>
                        ))}

                        {/* Shooting stars */}
                        {shootingStarData.map((star, i) => (
                          <div
                            key={`shooting-${i}`}
                            className="absolute"
                            style={{
                              width: '2px',
                              height: '2px',
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              top: star.top,
                              left: '0%',
                              boxShadow: '0 0 4px 1px white, 0 0 10px 6px rgba(255,255,255,0.5)',
                              animation: isAnimating ? `shootingStar ${star.duration}s linear infinite` : 'none',
                              animationDelay: `${star.delay}s`
                            }}
                          ></div>
                        ))}

                        {/* Orbiting particles */}
                        {particleData.map((particle, i) => (
                          <div
                            key={`orbit-${i}`}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: getParticleColor(i),
                              opacity: 0.8,
                              top: particle.top,
                              left: particle.left,
                              animation: isAnimating ?
                                `${particle.isHorizontal ? 'orbitHorizontal' : 'orbitVertical'} ${particle.duration}s linear infinite`
                                : 'none',
                              animationDelay: `${particle.delay}s`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          ></div>
                        ))}
                      </>
                    )}

                    {/* Nebula effect */}
                    <div className="absolute w-3/4 h-1/2 opacity-20 rounded-full blur-xl bg-gradient-to-r from-purple-500 via-pink-300 to-indigo-400"></div>
                  </div>

                  {/* AI Processing text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white font-bold text-3xl tracking-widest opacity-30">AI Processing</div>
                  </div>
                </div>
              ) : originalText || summary ? (
                <>
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-purple-600">Original Text:</h3>
                    <p className="whitespace-pre-wrap text-gray-800 text-sm sm:text-lg font-medium">{originalText}</p>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-pink-600">Summary:</h3>
                    <p className="whitespace-pre-wrap text-gray-800 text-sm sm:text-lg font-medium">{summary}</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-6 text-center text-gray-500 text-sm sm:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p>No summary data available.</p>
                  <p className="text-sm mt-2">Enter text below to generate a summary.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Edit input */}
      <div className="flex justify-center py-4 px-2 sm:px-4">
        <div className="w-full max-w-full sm:max-w-xl relative">

          <input
            type="text"
            placeholder="Edit with AI"
            className="w-full py-2 sm:py-3 px-4 sm:px-5 rounded-full border-0 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          />
          <button
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${currentTheme.button} text-white p-2 rounded-full transition-colors`}
            onClick={handleEdit}
            disabled={isEditing}
          >
            {isEditing ? (
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Navigation + Theme Toggle */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-row items-center justify-between gap-2 sm:gap-4">
        <button
          className="bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
          onClick={handleGoBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        {/* Theme toggle button */}
        <button
          onClick={cycleTheme}
          className="bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          aria-label="Change theme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
        </button>
      </div>

      {/* Styles for animations */}
      <style jsx>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }

          @keyframes shootingStar {
            0% { transform: translateX(0) translateY(0); opacity: 1; }
            100% { transform: translateX(100vw) translateY(50px); opacity: 0; }
          }

          @keyframes orbitHorizontal {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg); }
          }

          @keyframes orbitVertical {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateY(60px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateY(60px) rotate(-360deg); }
          }
        `}
      </style>
    </div>
  );
}