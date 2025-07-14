import { forumContents } from '@/lib/forumContent';
import { QuizQuestion, quizQuestions } from '@/lib/quizData';
import { useState } from 'react';

type PageProps = {
    course: {
        id: string;
        name: string;
    };
};

type Class = {
    classes: {
        id: string;
    };
};

interface Props {
    courseId: string;
    courseName: string;
}

export default function CourseQuizContent({ courseId, courseName }: Props) {
    const classId = forumContents[0].classId;
    const forum = forumContents.find((f) => f.classId === classId);
    const [questions] = useState<QuizQuestion[]>(quizQuestions.sort(() => 0.5 - Math.random()).slice(0, 10));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    const currentQuestion = questions[currentIndex];
    const handleSelect = (option: string) => {
        setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: option });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
        else setSubmitted(true);
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q) => {
            if (selectedAnswers[q.id] === q.answer) score++;
        });
        return score;
    };

    return (
        <div>
            {/* Judul */}
            <div className="mx-auto w-full mb-10 max-w-3xl items-center px-4 py-2 text-center">
                <h1 className="mb-2 text-4xl font-bold">Trivia Quiz</h1>
                <span className='mb-4'>
                    {courseId} - {classId}
                </span>
            </div>

            {/* Body */}
            <div>
                {!submitted ? (
                    <>
                        {/* Question Counter */}
                        <div className="my-2 mr-20 mb-4 flex flex-col items-end text-xl font-black text-[#EFA928] transition-all duration-300 dark:text-[#EFA928]">
                            <span>Question</span>
                            <span>
                                {currentIndex + 1} of {questions.length}
                            </span>
                        </div>

                        {/* Question Text */}
                        <div className="mb-4 text-center text-3xl font-black text-gray-800 transition-all duration-300 dark:text-gray-100">
                            {currentQuestion.question}
                        </div>

                        {/* Answer Option Cards (A–D Colored) */}
                        <div className="mt-15 flex flex-row flex-wrap items-center justify-center gap-8">
                            {currentQuestion.options.map((opt, idx) => {
                                const selected = selectedAnswers[currentQuestion.id] === opt;

                                // A–D color palette
                                const colors = ['#2C71AE', '#2E9DA6', '#D5546D', '#EFA928'];
                                const color = colors[idx] || '#ccc';

                                return (
                                    <button
                                        key={idx}
                                        className={`flex h-[35vh] w-[15vw] cursor-pointer items-center justify-center rounded-xl border-2 p-6 text-center text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 ${
                                            selected ? 'text-white' : 'text-white opacity-90 hover:opacity-100'
                                        }`}
                                        style={{
                                            backgroundColor: selected ? color : `${color}bb`,
                                            borderColor: color,
                                        }}
                                        onClick={() => handleSelect(opt)}
                                        disabled={submitted}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        <div className="mt-15 flex justify-center px-10">
                            <button
                                onClick={handleNext}
                                className="rounded-xl bg-[#2C71AE] px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2E9DA6] disabled:cursor-not-allowed disabled:opacity-40"
                                disabled={!selectedAnswers[currentQuestion.id]}
                            >
                                {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="py-10 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-[#2C71AE] dark:text-[#2C71AE]">Quiz Completed!</h2>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Your score: {calculateScore()} / {questions.length}
                        </p>
                    </div>
                )}
            </div>
            {/* Footer */}
        </div>
    );
}
