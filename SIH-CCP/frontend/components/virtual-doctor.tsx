import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import { useLanguage } from './language-context';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: Date;
}

const VirtualDoctor: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your virtual veterinary assistant. How can I help you with your cattle today?',
      sender: 'doctor',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateDoctorResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Common cattle health responses
    if (lowerMessage.includes('sick') || lowerMessage.includes('ill')) {
      return 'I understand you\'re concerned about a sick animal. Can you describe the symptoms? Common signs include loss of appetite, lethargy, abnormal breathing, or changes in behavior. It\'s important to isolate the animal and contact a local veterinarian for proper diagnosis.';
    }
    
    if (lowerMessage.includes('feed') || lowerMessage.includes('nutrition')) {
      return 'Proper nutrition is crucial for cattle health. Adult cattle typically need 2-3% of their body weight in dry matter daily. Ensure access to clean water (30-50 gallons per day), quality forage, and appropriate supplements. Would you like specific feeding recommendations based on your cattle\'s age or condition?';
    }
    
    if (lowerMessage.includes('pregnancy') || lowerMessage.includes('pregnant')) {
      return 'Pregnant cattle require special care. Gestation period is about 283 days. Ensure proper nutrition with increased protein and energy intake, especially in the last trimester. Regular veterinary checkups are essential. Keep detailed breeding records and prepare a clean calving area.';
    }
    
    if (lowerMessage.includes('vaccine') || lowerMessage.includes('vaccination')) {
      return 'Vaccination schedules vary by region and herd conditions. Common vaccines include those for respiratory diseases, clostridial diseases, and reproductive diseases. Consult with your local veterinarian to develop an appropriate vaccination program based on your area\'s disease risks.';
    }
    
    if (lowerMessage.includes('milk') || lowerMessage.includes('milking')) {
      return 'Milk production depends on breed, nutrition, and management. Ensure hygienic milking practices, proper udder health management, and maintain consistent milking schedules. Average daily production varies greatly by breed - dairy breeds can produce 20-40+ liters per day.';
    }
    
    if (lowerMessage.includes('temperature') || lowerMessage.includes('fever')) {
      return 'Normal cattle body temperature is 101.5°F (38.6°C). Temperatures above 103°F (39.4°C) indicate fever. Check for other symptoms like reduced appetite, lethargy, or labored breathing. Contact a veterinarian if fever persists or if the animal shows other concerning symptoms.';
    }
    
    if (lowerMessage.includes('calf') || lowerMessage.includes('calves')) {
      return 'Calf care is critical in the first few weeks. Ensure calves receive colostrum within 6 hours of birth. Monitor for signs of scours (diarrhea), respiratory issues, and ensure proper nutrition. Calves should gain 1.5-2 lbs per day. Vaccination and deworming schedules should start at appropriate ages.';
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m here to help with your cattle health questions. Feel free to ask about nutrition, breeding, health issues, or general management practices.';
    }
    
    // Default response for unrecognized queries
    return 'Thank you for your question. While I can provide general guidance, for specific health concerns, I recommend consulting with a local veterinarian who can examine your cattle in person. Is there a particular aspect of cattle health or management you\'d like to know more about?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate doctor thinking time
    setTimeout(() => {
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateDoctorResponse(inputValue),
        sender: 'doctor',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, doctorResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative h-[600px]">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur"></div>
      <Card className="relative h-full flex flex-col bg-card/80 backdrop-blur-lg border border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('virtualDoctor')}
            </span>
          </CardTitle>
        </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'doctor' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('typeMessage')}
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default VirtualDoctor;