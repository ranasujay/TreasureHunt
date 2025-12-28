import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { levelAPI } from '../utils/api';
import toast from 'react-hot-toast';

// Level content configuration
const levelContent = {
  1: {
    title: 'Level 1',
    question: 'How many branches are there?',
    image: '/images/level1.jpeg',
    hint: 'Count carefully!',
  },
  2: {
    title: 'Level 2',
    description: 'Think you\'re up for the challenge? Can you crack the code and solve the mystery?',
    link: 'https://drive.google.com/file/d/1XJSezvM4Q2iZVBdl7wr7AeXW9ezo22tz/view',
    linkText: 'Click to View Challenge',
    hint: 'Look for patterns in the challenge',
  },
  3: {
    title: 'Level 3',
    description: '"Got the skills? Let\'s see if you can crack this puzzle!"',
    subText: 'Go through the link:',
    link: 'https://drive.google.com/file/d/16hH1cCg8_h6JMyI5zXpAqhGna4-8u11p/view?usp=drive_link',
    linkText: 'click here',
    hint: 'Numbers and letters combined',
  },
  4: {
    title: 'Level 4',
    question: 'Do you like mathematics?',
    mathExpression: 'Your answer = {3 + (6 - 2) / 2 * 2 - (6 / 3 * 4) + 1}',
    hint: 'Follow your answer',
  },
  5: {
    title: 'Level 5',
    description: '"Challenge accepted? Let\'s see if you can break the code!"',
    puzzle: 'indm ew herel otso fb ooksa res toredf',
    icons: ['🔄', '⬅️'],
    hint: 'Rotate and arrange the letters',
  },
  6: {
    title: 'Level 6',
    question: '"Let\'s see how strong your memory is..."',
    puzzle: 'Enter the PIN: ______',
    hint: 'Think back to previous levels',
  },
  7: {
    title: 'Level 7',
    description: '"Ready to test your limits? Let\'s see if you can solve this!"',
    link: 'https://drive.google.com/file/d/1BnfDxvdanlkKn5gadMNCPtK9fnnu5Jee/view?usp=drive_link',
    linkText: 'Click me',
    hint: 'Six digit code',
  },
  8: {
    title: 'Level 8',
    description: '"Do you have the wit to unlock the answer?"',
    link: 'https://drive.google.com/file/d/1XRrJd-yvld_P1vJ_34aIKEYeAGprgZY_/view',
    linkText: 'Click here',
    hint: 'Think logically',
  },
  9: {
    title: 'Level 9',
    description: '"Ready to test your limits? Let\'s see if you can solve this!"',
    subText: '"Here\'s a hint to help you get closer to the passcode!"',
    link: 'https://drive.google.com/file/d/1xVeua24JZUT_zeHFrqAnbqsniuV7MbYA/view',
    linkText: 'Click me',
    hint: 'Popular series',
  },
  10: {
    title: 'Level 10',
    description: '"Let\'s have some fun..!!"',
    link: 'https://drive.google.com/file/d/1w5RbeuydoNMM2hlwQG7P4cyO-7scnvbT/view',
    linkText: 'Click me',
    hint: 'Decode the sequence',
  },
  11: {
    title: 'Level 11',
    description: '"Only the sharpest minds will solve this. Are you one of them?"',
    link: 'https://drive.google.com/drive/folders/1Wmyp5iFcwIs1-livkVbUb8x3szTDOw_n',
    linkText: 'Click me',
    instruction: 'Kindly read the instructions attached..',
    hint: 'What comes after first name?',
  },
  12: {
    title: 'Congratulations!',
    isFinal: true,
    message: '"You have successfully completed all the levels!"',
  },
};

const Level = ({ levelNumber }) => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);
  const { updateLevel, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const content = levelContent[levelNumber];
  const isLastLevel = levelNumber === 12;

  // Clear answer input when level changes
  useEffect(() => {
    setAnswer('');
  }, [levelNumber]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const nextLevel = levelNumber + 1;
      const response = await levelAPI.submitAnswer(nextLevel, answer);

      if (response.success) {
        toast.success(response.message);
        updateLevel(nextLevel);
        
        setTimeout(() => {
          if (!isLastLevel) {
            navigate(`/level/${nextLevel}`);
          }
          setIsLoading(false);
        }, 2000);
      } else {
        toast.error(response.message);
        setIsLoading(false);
        setAnswer('');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setIsLoading(false);
      setAnswer('');
    }
  };

  // If it's the final level, show congratulations message
  if (content.isFinal) {
    return (
      <div className="background-container flex items-center justify-center min-h-screen p-4">
        {/* Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 backdrop-blur-sm shadow-lg z-40 px-3 md:px-4 py-2 md:py-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-4">
              <span className="text-white font-semibold text-sm md:text-base">👋 {user?.name}</span>
              <span className="text-indigo-400 text-xs md:text-sm">Completed! 🎉</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => navigate('/leaderboard')}
                className="text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md transition text-base"
              >
                🏅 Leaderboard
              </button>
              <button
                onClick={logout}
                className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md transition text-base"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative" ref={menuRef}>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-white p-2 hover:bg-gray-700 rounded-md transition"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              {/* Mobile Dropdown Menu */}
              {showMobileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700">
                  <button
                    onClick={() => {
                      navigate('/leaderboard');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <span>🏅</span>
                    <span>Leaderboard</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Congratulations Content */}
        <div className="w-full max-w-2xl glass p-6 md:p-8 mt-24 md:mt-20 animate-fade-in">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              🏆 {content.title}
            </h2>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 md:p-6 mb-6">
              <p className="text-white text-lg md:text-xl font-semibold">
                {content.message}
              </p>
            </div>
            <div className="text-gray-300 text-base md:text-lg">
              <p>You've completed all 11 levels!</p>
              <p className="mt-4">🎉 Well done, Champion! 🎉</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="background-container flex items-center justify-center min-h-screen p-4">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 backdrop-blur-sm shadow-lg z-40 px-3 md:px-4 py-2 md:py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-white font-semibold text-sm md:text-base">👋 {user?.name}</span>
            <span className="text-indigo-400 text-xs md:text-sm">Level {user?.currLevel}/11</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => navigate('/leaderboard')}
              className="text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md transition text-base"
            >
              🏅 Leaderboard
            </button>
            <button
              onClick={logout}
              className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md transition text-base"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative" ref={menuRef}>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-white p-2 hover:bg-gray-700 rounded-md transition"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700">
                <button
                  onClick={() => {
                    navigate('/leaderboard');
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center space-x-2"
                >
                  <span>🏅</span>
                  <span>Leaderboard</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl glass p-4 md:p-8 mt-24 md:mt-20 animate-fade-in">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🎯 {content.title}
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">Level {levelNumber} of 11</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 md:mb-6">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(levelNumber / 12) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            {/* Level-specific content */}
            {content.question && (
              <h3 className="text-lg md:text-xl text-white mb-3 md:mb-4 text-center font-semibold">
                {content.question}
              </h3>
            )}

            {content.description && (
              <p className="text-base md:text-lg text-white mb-3 md:mb-4 text-center">
                {content.description}
              </p>
            )}

            {content.subText && (
              <p className="text-white mb-2 text-center text-sm md:text-base">{content.subText}</p>
            )}

            {content.mathExpression && (
              <div className="text-white text-lg md:text-xl mb-3 md:mb-4 text-center bg-gray-700 bg-opacity-50 p-3 md:p-4 rounded-lg">
                <h2>{content.mathExpression}</h2>
              </div>
            )}

            {content.puzzle && (
              <div className="text-white text-center mb-3 md:mb-4 bg-gray-700 bg-opacity-50 p-3 md:p-4 rounded-lg">
                <h2 className="text-base md:text-lg">{content.puzzle}</h2>
              </div>
            )}

            {content.icons && (
              <div className="flex justify-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                {content.icons.map((icon, idx) => (
                  <span key={idx} className="text-2xl md:text-3xl text-indigo-400">{icon}</span>
                ))}
              </div>
            )}

            {content.link && (
              <div className="text-center mb-3 md:mb-4">
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 underline text-base md:text-lg font-medium"
                >
                  {content.linkText}
                </a>
              </div>
            )}

            {content.instruction && (
              <p className="text-white text-center mt-2 md:mt-3 text-xs md:text-sm">{content.instruction}</p>
            )}

            {content.image && (
              <div className="flex justify-center mb-4 md:mb-6">
                <img
                  src={content.image}
                  alt={`Level ${levelNumber} challenge`}
                  className="rounded-lg shadow-lg max-h-48 md:max-h-72 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 md:p-4 mb-3 md:mb-4 mt-4 md:mt-6">
              <p className="text-gray-300 text-xs md:text-sm">
                💡 <span className="font-semibold">Hint:</span> {content.hint}
              </p>
            </div>

            <label htmlFor="answer" className="block text-base md:text-lg font-medium text-white mb-2 md:mb-3">
              Your Answer
            </label>
            <input
              id="answer"
              name="answer"
              type="text"
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoComplete="off"
              className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-700 text-white rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your answer"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 md:py-3 text-sm md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 btn-hover disabled:opacity-50 font-semibold"
          >
            {isLoading ? 'Checking...' : '➡️ Submit Answer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Level;
