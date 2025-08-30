import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  BookOpen,
  Brain,
  Lightbulb,
  Calculator,
  Microscope,
  Globe,
  Palette,
  Music,
  ChevronRight,
  Mic,
} from "lucide-react";
import type { Subject } from "../App";

interface ChatBotPageProps {
  onBack: () => void;
}

interface Messagee {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isExercise?: boolean;
  exerciseData?: ExerciseData;
}

interface ExerciseData {
  type: "verb-extraction" | "tense-identification" | "sentence-completion";
  sentence: string;
  correctAnswer: string;
  options?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const subjects: Subject[] = [
  {
    id: "english",
    name: "الإنجليزية",
    nameEn: "English",
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
  },
  {
    id: "math",
    name: "الرياضيات",
    nameEn: "Mathematics",
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
  },
  {
    id: "science",
    name: "العلوم",
    nameEn: "Science",
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
  },
  {
    id: "geography",
    name: "الجغرافيا",
    nameEn: "Geography",
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-100 to-orange-200",
  },
];

const subjectIcons = {
  english: BookOpen,
  math: Calculator,
  science: Microscope,
  geography: Globe,
  art: Palette,
  music: Music,
};

const englishUnits = [
  {
    id: 1,
    name: "Unit 1",
    nameAr: "الوحدة الأولى",
    topics: ["Present Simple", "Basic Vocabulary", "Greetings"],
  },
  {
    id: 2,
    name: "Unit 2",
    nameAr: "الوحدة الثانية",
    topics: ["Present Continuous", "Family Members", "Daily Activities"],
  },
  {
    id: 3,
    name: "Unit 3",
    nameAr: "الوحدة الثالثة",
    topics: ["Past Simple", "Time Expressions", "School Life"],
  },
  {
    id: 4,
    name: "Unit 4",
    nameAr: "الوحدة الرابعة",
    topics: ["Future Tense", "Plans and Dreams", "Weather"],
  },
];

const exercises = {
  "present simple": [
    {
      type: "verb-extraction" as const,
      sentence: "She plays tennis every Sunday.",
      correctAnswer: "plays",
      explanation: 'الفعل في هذه الجملة هو "plays" وهو في زمن المضارع البسيط',
    },
    {
      type: "tense-identification" as const,
      sentence: "They study English at school.",
      correctAnswer: "Present Simple",
      options: [
        "Present Simple",
        "Present Continuous",
        "Past Simple",
        "Future",
      ],
      explanation:
        "هذه الجملة في زمن المضارع البسيط لأنها تعبر عن عادة أو حقيقة",
    },
    {
      type: "sentence-completion" as const,
      sentence: "I _____ to school every day.",
      correctAnswer: "go",
      options: ["go", "goes", "going", "went"],
      explanation: 'نستخدم "go" مع الضمير "I" في المضارع البسيط',
    },
  ],
};

export default function ChatBotPage({ onBack }: ChatBotPageProps) {
  const [messagess] = useState<Messagee[]>([
    {
      id: 1,
      text: "In this sentence before we explain verb, subject, and object: 'I need Motqen everyday.' Can you tell me which one is the verb?",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "The verb is 'need', the subject is 'I', and the object is 'Motqen'.",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "Exactly 👌. This tense is called the Present Simple, and it has several uses. Another tense is the Present Continuous, which adds the idea of an action happening right now, like: 'I am studying now.' Let’s explain its structure. Can you tell me who the subject is in the last sentence?",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 4,
      text: "Great 👍. For example: 'She plays tennis every Sunday.' Notice that the verb takes an 's' because the subject is 'She'.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [currentStep, setCurrentStep] = useState<"subject" | "unit" | "chat">(
    "subject"
  );
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    if (subject.id === "english") {
      setCurrentStep("unit");
    } else {
      // For other subjects, go directly to chat
      setCurrentStep("chat");
      initializeChat(subject, null);
    }
  };

  const handleUnitSelect = (unitId: number) => {
    setSelectedUnit(unitId);
    setCurrentStep("chat");
    initializeChat(selectedSubject!, unitId);
  };

  const initializeChat = (subject: Subject, unit: number | null) => {
    const welcomeMessage: Message = {
      id: 1,
      text: unit
        ? `مرحباً! أنا مساعدك الذكي في ${subject.name} - ${
            englishUnits.find((u) => u.id === unit)?.nameAr
          }. يمكنني مساعدتك في فهم الدروس وحل التمارين. ما الموضوع الذي تريد أن نتحدث عنه؟`
        : `مرحباً! أنا مساعدك الذكي في ${subject.name}. كيف يمكنني مساعدتك اليوم؟`,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userText: string): Message => {
    const lowerText = userText.toLowerCase();

    // Check if user is asking about Present Simple
    if (
      lowerText.includes("present simple") ||
      lowerText.includes("المضارع البسيط")
    ) {
      const exercise = exercises["present simple"][currentExerciseIndex];

      return {
        id: Date.now() + 1,
        text: `ممتاز! دعني أعطيك تمرين على المضارع البسيط. ${
          exercise.type === "verb-extraction"
            ? "استخرج الفعل من الجملة التالية:"
            : exercise.type === "tense-identification"
            ? "حدد زمن الجملة التالية:"
            : "أكمل الجملة التالية:"
        }`,
        sender: "bot",
        timestamp: new Date(),
        isExercise: true,
        exerciseData: exercise,
      };
    }

    // Default responses
    const responses = [
      "هذا سؤال ممتاز! دعني أساعدك في فهم هذا الموضوع بطريقة مبسطة...",
      "بناءً على تقدمك في الدراسة، أنصحك بالتركيز على هذه النقاط الأساسية...",
      "لفهم هذا الدرس بشكل أفضل، يمكننا تقسيمه إلى خطوات بسيطة...",
      "ممتاز! هذا يظهر أنك تفهم المفاهيم الأساسية. دعنا نتعمق أكثر...",
      "أرى أنك تحتاج لمراجعة هذا الموضوع. سأقدم لك شرحاً مفصلاً...",
    ];

    return {
      id: Date.now() + 1,
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: "bot",
      timestamp: new Date(),
    };
  };

  const handleExerciseAnswer = (answer: string, exerciseData: ExerciseData) => {
    const isCorrect =
      answer.toLowerCase() === exerciseData.correctAnswer.toLowerCase();

    const feedbackMessage: Message = {
      id: Date.now(),
      text: isCorrect
        ? `🎉 إجابة صحيحة! ${exerciseData.explanation || ""}`
        : `❌ إجابة خاطئة. الإجابة الصحيحة هي: "${
            exerciseData.correctAnswer
          }". ${exerciseData.explanation || ""}`,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, feedbackMessage]);

    // Move to next exercise if correct
    if (
      isCorrect &&
      currentExerciseIndex < exercises["present simple"].length - 1
    ) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setTimeout(() => {
        const nextExercise =
          exercises["present simple"][currentExerciseIndex + 1];
        const nextMessage: Message = {
          id: Date.now() + 2,
          text: `ممتاز! دعنا ننتقل للتمرين التالي. ${
            nextExercise.type === "verb-extraction"
              ? "استخرج الفعل من الجملة التالية:"
              : nextExercise.type === "tense-identification"
              ? "حدد زمن الجملة التالية:"
              : "أكمل الجملة التالية:"
          }`,
          sender: "bot",
          timestamp: new Date(),
          isExercise: true,
          exerciseData: nextExercise,
        };
        setMessages((prev) => [...prev, nextMessage]);
      }, 2000);
    }
  };

  // Subject Selection View
  if (currentStep === "subject") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft size={24} />
            <span className="text-lg">رجوع</span>
          </button>

          <h1 className="text-3xl font-bold text-blue-600">افهم دروسك</h1>
          <div className="w-16"></div>
        </div>

        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full inline-block mb-6">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            اختر المادة التي تريد فهمها
          </h2>
          <p className="text-gray-600">سأساعدك في فهم الدروس بطريقة تفاعلية</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const IconComponent =
              subjectIcons[subject.id as keyof typeof subjectIcons];

            return (
              <div
                key={subject.id}
                onClick={() => handleSubjectSelect(subject)}
                className={`${subject.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`${subject.color}`}>
                      <IconComponent
                        size={48}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3
                        className={`${subject.color} text-2xl font-bold mb-1`}
                      >
                        {subject.name}
                      </h3>
                      <p className="text-gray-600">{subject.nameEn}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`${subject.color} group-hover:translate-x-1 transition-transform duration-300`}
                    size={24}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Unit Selection View (for English)
  if (currentStep === "unit" && selectedSubject?.id === "english") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentStep("subject")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft size={24} />
            <span className="text-lg">رجوع</span>
          </button>

          <h1 className="text-3xl font-bold text-blue-600">اللغة الإنجليزية</h1>
          <div className="w-16"></div>
        </div>

        <div className="text-center mb-12">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-6">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            اختر الوحدة أو الدرس
          </h2>
          <p className="text-gray-600">سأساعدك في فهم قواعد اللغة الإنجليزية</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {englishUnits.map((unit) => (
            <div
              key={unit.id}
              onClick={() => handleUnitSelect(unit.id)}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer group p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-1">
                    {unit.name}
                  </h3>
                  <p className="text-gray-600">{unit.nameAr}</p>
                </div>
                <ChevronRight
                  className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300"
                  size={24}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-2">المواضيع:</p>
                {unit.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Chat View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => {
              if (selectedSubject?.id === "english") {
                setCurrentStep("unit");
              } else {
                setCurrentStep("subject");
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft size={24} />
            <span className="text-lg">رجوع</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                متقن المدرس
                {selectedUnit &&
                  ` - ${
                    englishUnits.find((u) => u.id === selectedUnit)?.nameAr
                  }`}
              </h1>
              <p className="text-sm text-gray-500">متصل الآن</p>
            </div>
          </div>

          <div className="w-16"></div>
        </div>
      </div>

      {/* Chat Messages */}
      {/* <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.sender === "user"
                        ? "bg-blue-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-500"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <div
                    className={`p-4 rounded-2xl shadow-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("ar-SA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              
              {message.isExercise && message.exerciseData && (
                <div className="mt-4 flex justify-start">
                  <div className="max-w-md bg-gradient-to-r from-green-50 to-blue-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-4">
                      <h4 className="font-bold text-gray-800 mb-2">التمرين:</h4>
                      <p className="text-lg text-gray-700 font-medium">
                        "{message.exerciseData.sentence}"
                      </p>
                    </div>

                    {message.exerciseData.options ? (
                      <div className="space-y-2">
                        {message.exerciseData.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleExerciseAnswer(
                                option,
                                message.exerciseData!
                              )
                            }
                            className="w-full p-3 text-left bg-white hover:bg-blue-100 border border-gray-200 rounded-xl transition-all duration-200 hover:border-blue-300"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="اكتب إجابتك هنا..."
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              const target = e.target as HTMLInputElement;
                              handleExerciseAnswer(
                                target.value,
                                message.exerciseData!
                              );
                              target.value = "";
                            }
                          }}
                        />
                        <p className="text-xs text-gray-500 text-center">
                          اضغط Enter لإرسال الإجابة
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div> */}

      <div className="flex flex-col h-screen bg-gray-50">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="max-w-4xl mx-auto">
            {messagess.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fake Input (not working, just for style) */}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-center">
            {/* Mic button */}
            <button
              // onClick={handleMicClick}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-xl transition-all duration-200"
            >
              <Mic size={20} />
            </button>

            {/* Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleSendMessage(inputText)
              }
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-right"
              dir="rtl"
              disabled={isTyping}
            />

            {/* Send button */}
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
