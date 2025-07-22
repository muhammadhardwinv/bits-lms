import { forumContents } from '@/lib/forumContent';
import { QuizQuestion, quizQuestions } from '@/lib/quizData';
import { Separator } from '@radix-ui/react-separator';
import { useEffect, useState } from 'react';

interface Props {
    courseId: string;
    courseName: string;
}

const questionStats: { [questionId: string]: { total: number; wrong: number } } = {};

const getWrongAnswerRecap = (questions: QuizQuestion[], selectedAnswers: { [key: string]: string }) => {
    const categoryCount: { [key: string]: number } = {};
    questions.forEach((q) => {
        const selected = selectedAnswers[q.id];
        const correct = q.answer;
        if (!q || !q.category || !correct) return;
        if (selected !== correct) {
            if (!categoryCount[q.category]) categoryCount[q.category] = 0;
            categoryCount[q.category]++;
        }
    });
    return Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .map(([category, count]) => ({ category, count }));
};

export default function CourseQuizContent({ courseId, courseName }: Props) {
    const classId = forumContents[0].classId;
    const forum = forumContents.find((f) => f.classId === classId);

    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    // Generate or restore quiz questions
    useEffect(() => {
        const generateQuestions = () => {
            const recap = getWrongAnswerRecap(quizQuestions, selectedAnswers);
            const totalMistakes = recap.reduce((sum, r) => sum + r.count, 0);

            if (totalMistakes === 0) {
                const categories = ['Algoritma', 'DB', 'HCI'];
                const baseCounts = [4, 3, 3];
                let selected: QuizQuestion[] = [];
                categories.forEach((cat, idx) => {
                    const pool = quizQuestions.filter((q) => q.category === cat);
                    selected.push(...pool.sort(() => 0.5 - Math.random()).slice(0, baseCounts[idx]));
                });
                return selected;
            }

            const weighted = recap.map((r) => ({
                category: r.category,
                rawWeight: r.count / totalMistakes,
            }));

            let assigned = weighted.map((w) => ({
                category: w.category,
                count: Math.round(w.rawWeight * 10),
            }));

            let total = assigned.reduce((sum, r) => sum + r.count, 0);
            while (total !== 10) {
                const diff = 10 - total;
                if (diff > 0) {
                    const max = assigned.reduce((a, b) => (a.count < b.count ? b : a));
                    max.count++;
                } else {
                    const min = assigned.find((a) => a.count > 1);
                    if (min) min.count--;
                }
                total = assigned.reduce((sum, r) => sum + r.count, 0);
            }

            let selected: QuizQuestion[] = [];
            assigned.forEach(({ category, count }) => {
                const pool = quizQuestions.filter((q) => q.category === category);
                selected.push(...pool.sort(() => 0.5 - Math.random()).slice(0, count));
            });

            return selected;
        };

        const resetFlag = sessionStorage.getItem(`reset-${courseId}`);
        if (resetFlag === 'true') {
            sessionStorage.removeItem(`reset-${courseId}`);
            localStorage.removeItem(`quiz-${courseId}-questions`);
            localStorage.removeItem(`quiz-${courseId}-answers`);
            localStorage.removeItem(`quiz-${courseId}-score`);
            localStorage.removeItem(`quiz-${courseId}-submitted`);
        }

        const storedQuestions = localStorage.getItem(`quiz-${courseId}-questions`);
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        } else {
            const generated = generateQuestions();
            setQuestions(generated);
            localStorage.setItem(`quiz-${courseId}-questions`, JSON.stringify(generated));
        }
    }, [courseId]);

    // Restore state from localStorage
    useEffect(() => {
        const storedAnswers = localStorage.getItem(`quiz-${courseId}-answers`);
        const storedScore = localStorage.getItem(`quiz-${courseId}-score`);
        const storedSubmitted = localStorage.getItem(`quiz-${courseId}-submitted`);

        if (storedAnswers) setSelectedAnswers(JSON.parse(storedAnswers));
        if (storedScore) setScore(parseInt(storedScore));
        if (storedSubmitted === 'true') setSubmitted(true);
    }, [courseId]);

    // Persist quiz state
    useEffect(() => {
        localStorage.setItem(`quiz-${courseId}-answers`, JSON.stringify(selectedAnswers));
    }, [selectedAnswers, courseId]);

    useEffect(() => {
        if (score !== null) localStorage.setItem(`quiz-${courseId}-score`, score.toString());
    }, [score, courseId]);

    useEffect(() => {
        localStorage.setItem(`quiz-${courseId}-submitted`, submitted.toString());
    }, [submitted, courseId]);

    const currentQuestion = questions[currentIndex];

    if (!questions || questions.length === 0) {
        return (
            <div className="py-40 text-center">
                <h2 className="text-2xl font-bold text-red-600">Error: No questions available.</h2>
                <p className="text-gray-500">Please contact the course administrator.</p>
            </div>
        );
    }

    const handleSelect = (option: string) => {
        setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: option });
    };

    const handleNext = () => {
        if (!selectedAnswers[currentQuestion.id]) return;
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const allAnswered = questions.every((q) => selectedAnswers[q.id]);
            if (!allAnswered) {
                alert('Please answer all questions before submitting.');
                return;
            }
            const finalScore = calculateScore();
            setScore(finalScore);
            setSubmitted(true);
        }
    };

    const calculateScore = () => {
        let sc = 0;
        const MAX_STATS = 1000;
        if (Object.keys(questionStats).length > MAX_STATS) {
            for (const key in questionStats) delete questionStats[key];
        }

        questions.forEach((q) => {
            const selected = selectedAnswers[q.id];
            const correct = q.answer;
            if (!q || !q.category || !correct) return;
            if (!questionStats[q.id]) questionStats[q.id] = { total: 0, wrong: 0 };
            questionStats[q.id].total++;
            if (selected !== correct) questionStats[q.id].wrong++;
            else sc++;
        });

        return sc;
    };

    const getFrequentlyWrongQuestions = () => {
        return questions.filter((q) => {
            const stat = questionStats[q.id];
            return stat && stat.total >= 5 && stat.wrong / stat.total > 0.6;
        });
    };

    const getWeakCategories = () => {
        const freqWrong = getFrequentlyWrongQuestions();
        const categoryCount: { [key: string]: number } = {};
        freqWrong.forEach((q) => {
            if (!q || !q.category) return;
            if (!categoryCount[q.category]) categoryCount[q.category] = 0;
            categoryCount[q.category]++;
        });
        return Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .map(([category]) => category);
    };

    const renderNavigation = () => (
        <div className="my-8 flex flex-col items-center gap-2">
            <div className="mb-3 flex text-lg font-semibold text-gray-800 dark:text-gray-100">Question Navigation</div>
            <div className="grid grid-cols-5 gap-3">
                {questions.map((_, i) => {
                    const isCurrent = i === currentIndex;
                    const isAnswered = !!selectedAnswers[questions[i].id];

                    return (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`flex h-12 w-8 flex-col items-center rounded-md border pt-2 text-start text-sm font-semibold transition ${isCurrent ? 'bg-[#F2951B] text-white' : 'bg-gray-100 text-gray-800'} ${isAnswered ? 'border-green-500' : 'border-gray-300'} hover:bg-[#F2951B] hover:text-white`}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div>
            <div className='mx-10 my-4'>
                <h3 className="text-2xl font-black">Session 1</h3>
                <h3 className="text-4xl">Quiz 1</h3>
                <span>
                    {courseId} - {classId}
                </span>
                <Separator className="my-6 border" />
            </div>
            <div className="flex w-full flex-row items-start gap-6">
                {/* Main Quiz Content */}
                <div className="flex-1">
                    <div className="w-full rounded-2xl bg-white p-6 shadow-lg dark:bg-[#1f1f1f]">
                        <div className="rounded-2xl bg-[#CDE3E7] py-6">
                            {!submitted ? (
                                <>
                                    <div className="mt-2 mb-5 ml-6 flex flex-row justify-between text-5xl font-black text-[#113F67]">
                                        <div>
                                            <span>Question</span>
                                            <span className="ml-4">{currentIndex + 1}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                sessionStorage.setItem(`reset-${courseId}`, 'true');
                                                window.location.reload();
                                            }}
                                            className="mt-15 mr-6 mb-2 h-10 w-25 cursor-pointer items-center rounded-xl bg-red-600 text-center text-sm text-white hover:bg-red-700"
                                        >
                                            Restart Quiz
                                        </button>
                                    </div>

                                    <div className="mb-4 text-center text-3xl font-black text-gray-800 dark:text-gray-100">
                                        {currentQuestion.question}
                                    </div>

                                    <div className="my-15 flex flex-row flex-wrap items-center justify-center gap-8">
                                        {currentQuestion.options.map((opt, idx) => {
                                            const selected = selectedAnswers[currentQuestion.id] === opt;
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

                                    <div className="my-6 flex justify-center px-10">
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
                                    <h2 className="mb-20 text-5xl font-bold text-[#2C71AE]">Quiz Completed!</h2>
                                    <p className="mt-35 mb-20 text-xl font-semibold text-gray-700 dark:text-gray-100">
                                        Your score: {score} / {questions.length}
                                    </p>

                                    {getFrequentlyWrongQuestions().length > 0 ? (
                                        <div className="mt-6 font-semibold text-red-600 dark:text-red-400">
                                            <h3 className="mb-2 text-lg">Frequently Wrong Questions:</h3>
                                            <ul className="list-inside list-disc">
                                                {getFrequentlyWrongQuestions().map((q) => (
                                                    <li key={q.id}>{q.question}</li>
                                                ))}
                                            </ul>
                                            <div className="mt-4 text-red-500 dark:text-red-300">
                                                <h3 className="font-bold">Categories to Improve:</h3>
                                                <ul className="list-inside list-disc">
                                                    {getWeakCategories().map((cat, idx) => (
                                                        <li key={idx}>{cat}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mx-auto flex w-fit flex-col text-center text-green-700 dark:text-green-400">
                                            <h3 className="my-20 mb-5 text-2xl font-black">Answer Recap – Categories to Improve:</h3>
                                            <ul className="flex list-inside list-disc text-lg">
                                                {getWrongAnswerRecap(questions, selectedAnswers).length > 0 ? (
                                                    getWrongAnswerRecap(questions, selectedAnswers).map((item, idx) => (
                                                        <li className="my-2 mr-10" key={idx}>
                                                            {item.category}: {item.count} incorrect {item.count === 1 ? 'answer' : 'answers'}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>Excellent! All answers correct across all categories.</li>
                                                )}
                                            </ul>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => {
                                                        sessionStorage.setItem(`reset-${courseId}`, 'true');
                                                        window.location.reload();
                                                    }}
                                                    className="mt-20 mb-2 h-15 w-25 rounded-xl bg-red-600 py-2 text-center text-sm text-white hover:bg-red-700"
                                                >
                                                    Retake Quiz
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quiz Navigation – right side */}
                <div className="mr-10 my-30 flex w-[180px] flex-col items-center justify-center">{renderNavigation()}</div>
            </div>
        </div>
    );
}
