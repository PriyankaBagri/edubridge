import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  const initialGreeting: Record<Language, string> = {
    en: "Hello! I am your EduBridge AI Science Tutor. Ask me anything about plant cells, cell membranes, or food webs!",
    hi: "नमस्ते! मैं आपका EduBridge AI विज्ञान ट्यूटर हूँ। पादप कोशिकाओं, कोशिका झिल्ली या खाद्य जाल के बारे में कुछ भी पूछें!",
    mr: "नमस्कार! मी तुमचा एज्युब्रिज AI विज्ञान शिक्षक आहे. पेशी रचना किंवा पर्यावरणाबद्दल काहीही विचारा!",
    ta: "வணக்கம்! நான் உங்கள் EduBridge AI அறிவியல் ஆசிரியர். தாவர செல்கள் அல்லது அறிவியல் பாடங்களைப் பற்றி எது வேண்டுமானாலும் கேளுங்கள்!",
    te: "నమస్కారం! నేను మీ EduBridge AI సైన్స్ ట్యూటర్‌ని. కణ నిర్మాణం లేదా పర్యావరణ వ్యవస్థ గురించిన ఏవైనా ప్రశ్నలు అడగండి!",
  };

  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: initialGreeting[lang] || initialGreeting.en }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Call server API route
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, lang })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        throw new Error('API Error');
      }
    } catch {
      // Smart offline fallback response
      let fallbackText = "In plant cells, the cell wall (कोशिका भित्ति) provides rigid structure, while the cell membrane (कोशिका झिल्ली) controls what enters and leaves.";
      if (lang === 'hi') {
        fallbackText = "पादप कोशिकाओं में कोशिका भित्ति (Cell Wall) पौधे को आकार और मजबूती देती है, जबकि कोशिका झिल्ली (Cell Membrane) पदार्थों की आवाजाही को नियंत्रित करती है।";
      } else if (lang === 'mr') {
        fallbackText = "वनस्पती पेशींमध्ये पेशी भिंत (Cell Wall) आकार देते, तर पेशी पटल (Cell Membrane) पदार्थांच्या वाहतुकीवर नियंत्रण ठेवते.";
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : lang === 'ta' ? 'ta-IN' : lang === 'te' ? 'te-IN' : 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognition.start();
    } else {
      alert(t.speechNotSupported);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[560px] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base">{t.aiTutorTitle}</h3>
              <p className="text-xs text-indigo-100">{t.aiTutorDesc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-normal'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-600 p-3.5 rounded-2xl text-xs font-bold border border-slate-200 animate-pulse flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-base animate-spin">sync</span>
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={handleMicClick}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-ping'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Speech to Text"
          >
            <span className="material-symbols-outlined text-xl">mic</span>
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? t.listening : t.typeQuestion}
            className="flex-1 bg-slate-50 text-sm text-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xs disabled:opacity-40 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
