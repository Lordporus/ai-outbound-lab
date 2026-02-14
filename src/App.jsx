import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ToolView from './components/ToolView';
import OutputPanel from './components/OutputPanel';
import History from './components/History';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('rewrite-dm');
  const [output, setOutput] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTone, setCurrentTone] = useState('Professional');
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ai-outbound-history');
    return saved ? JSON.parse(saved) : [];
  });

  const handleGenerate = async (text, tone) => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setCurrentTone(tone); // Track the tone being used
    setCurrentInput(text); // Track the input being used

    let type = '';

    if (activeTab === 'rewrite-dm') {
      type = 'rewrite';
    } else if (activeTab === 'cold-email') {
      type = 'email';
    } else if (activeTab === 'objection-handler') {
      type = 'objection';
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          input: text,
          tone
        })
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.result);

        // Save to history
        const historyItem = {
          id: Date.now(),
          tool: activeTab,
          input: text,
          output: data.result,
          date: new Date().toLocaleString()
        };

        const newHistory = [historyItem, ...history];
        setHistory(newHistory);
        localStorage.setItem('ai-outbound-history', JSON.stringify(newHistory));
      } else {
        setOutput(data.error || "Error generating response.");
      }

    } catch (error) {
      console.error(error);
      setOutput("Failed to connect to AI backend.");
    }

    setIsGenerating(false);
  };

  const handleClear = () => {
    setOutput('');
  };

  const handleHistoryItemClick = (item) => {
    setOutput(item.output);
    setActiveTab(item.tool);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      localStorage.removeItem('ai-outbound-history');
    }
  };

  return (
    <div className="app-container">
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <main className="main-content">
        <div className="tool-content" style={{ flex: 3, overflowY: 'auto' }}>
          {activeTab === 'history' ? (
            <History
              history={history}
              onItemClick={handleHistoryItemClick}
              onClearHistory={handleClearHistory}
            />
          ) : (
            <ToolView
              activeTab={activeTab}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
        </div>

        <div style={{ flex: 2, minWidth: '350px' }}>
          <OutputPanel
            output={output}
            onClear={handleClear}
            onGenerate={handleGenerate}
            tone={currentTone}
            isGenerating={isGenerating}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
