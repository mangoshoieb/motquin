import { Volume2 } from "lucide-react";

type QuizCardProps = {
    question: string
    image?: string
    options: string[]
    current: number
    total: number
    onSelect: (option: string) => void
    onNext: () => void
  }
export default function QuizCard({
  question,
  image,
  options,
  current,
  total,
  onSelect,
  onNext,
}: QuizCardProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border">
      {/* Question */}
      <div className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center text-lg font-bold">
        {question}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={image}
            alt="quiz"
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              className="flex items-center gap-3 border-2 border-gray-200 rounded-xl p-4 text-right hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                {i + 1}
              </span>
              <span className="flex-1 text-gray-700 font-semibold">
                {opt}
              </span>
            </button>
          ))}

          {/* Progress + Next Button */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-gray-600 font-medium">
              Question {current} of {total}
            </span>
            <button
              onClick={onNext}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
