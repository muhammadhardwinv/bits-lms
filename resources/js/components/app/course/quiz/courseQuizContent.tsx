import { forumContents } from '@/lib/forumContent';
import { QuizQuestion, quizQuestions } from '@/lib/quizData';
import { Separator } from '@radix-ui/react-separator';
import { useEffect, useState } from 'react';
import { ForumContentType } from '../../../../lib/forumContent';
import Classroom from '../../../../pages/classroom/classroom';
import { Calendar } from 'lucide-react';

interface Props {
    courseId?: string;
    courseName?: string;
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

export default function CourseQuizContent({ forum }: { forum: ForumContentType }) {
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

        const resetFlag = sessionStorage.getItem(`reset-${forum.courseId}`);
        if (resetFlag === 'true') {
            sessionStorage.removeItem(`reset-${forum.courseId}`);
            localStorage.removeItem(`quiz-${forum.courseId}-questions`);
            localStorage.removeItem(`quiz-${forum.courseId}-answers`);
            localStorage.removeItem(`quiz-${forum.courseId}-score`);
            localStorage.removeItem(`quiz-${forum.courseId}-submitted`);
        }

        const storedQuestions = localStorage.getItem(`quiz-${forum.courseId}-questions`);
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        } else {
            const generated = generateQuestions();
            setQuestions(generated);
            localStorage.setItem(`quiz-${forum.courseId}-questions`, JSON.stringify(generated));
        }
    }, [forum.courseId]);

    // Restore state from localStorage
    useEffect(() => {
        const storedAnswers = localStorage.getItem(`quiz-${forum.courseId}-answers`);
        const storedScore = localStorage.getItem(`quiz-${forum.courseId}-score`);
        const storedSubmitted = localStorage.getItem(`quiz-${forum.courseId}-submitted`);

        if (storedAnswers) setSelectedAnswers(JSON.parse(storedAnswers));
        if (storedScore) setScore(parseInt(storedScore));
        if (storedSubmitted === 'true') setSubmitted(true);
    }, [forum.courseId]);

    // Persist quiz state
    useEffect(() => {
        localStorage.setItem(`quiz-${forum.courseId}-answers`, JSON.stringify(selectedAnswers));
    }, [selectedAnswers, forum.courseId]);

    useEffect(() => {
        if (score !== null) localStorage.setItem(`quiz-${forum.courseId}-score`, score.toString());
    }, [score, forum.courseId]);

    useEffect(() => {
        localStorage.setItem(`quiz-${forum.courseId}-submitted`, submitted.toString());
    }, [submitted, forum.courseId]);

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
        <div className="my-10 flex flex-col items-center justify-between">
            <div className="mb-4 flex text-lg font-semibold text-gray-800 dark:text-gray-100">Quiz Navigation</div>
            <div className="my-4 grid grid-cols-5 gap-3">
                {questions.map((_, i) => {
                    const isCurrent = i === currentIndex;
                    const isAnswered = !!selectedAnswers[questions[i].id];

                    return (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`relative flex h-12 w-8 cursor-pointer flex-col items-center rounded-sm border pt-2 text-start text-sm font-semibold transition ${isCurrent ? 'bg-[#F2951B] text-white' : 'bg-gray-100 text-gray-800'} ${isAnswered ? 'border-green-500' : 'border-gray-300'} hover:bg-[#F2951B] hover:text-white`}
                        >
                            {i + 1}
                            {isAnswered && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div>
            <div className="mx-6 my-4 flex flex-col gap-2">
                <h3 className="text-5xl font-black">Session: {forum.forumTitle}</h3>
                <h3 className="text-2xl">Classroom: {forum.classId}</h3>
                <Separator className="my-6 border" />
                <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex w-full items-center justify-start gap-8">
                        <span className="flex items-center font-medium">
                            <Calendar className="mr-1 h-4 w-4 text-blue-500" /> Start: {forum.start}
                        </span>
                        <span className="flex items-center font-medium">
                            <Calendar className="mr-1 h-4 w-4 text-red-500" /> End: {forum.end}
                        </span>
                    </div>
                </div>
                {/* <Separator className="my-6 border" /> */}
            </div>
            <div className="flex w-full flex-row items-start">
                {/* Main Quiz Content */}
                <div className="flex-1">
                    <div className="w-full rounded-2xl bg-white p-6 dark:bg-[#1f1f1f]">
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
                                                sessionStorage.setItem(`reset-${forum.courseId}`, 'true');
                                                window.location.reload();
                                            }}
                                            className="mt-15 mr-6 mb-2 h-10 w-25 cursor-pointer items-center rounded-xl bg-red-600 text-center text-sm text-white hover:bg-red-700"
                                        >
                                            Restart Quiz
                                        </button>
                                    </div>

                                    <div className="my-16 text-center text-4xl font-black text-gray-800 dark:text-gray-100">
                                        {currentQuestion.question}
                                    </div>

                                    <div className="my-16 flex flex-row flex-wrap items-center justify-center gap-8">
                                        {currentQuestion.options.map((opt, idx) => {
                                            const selected = selectedAnswers[currentQuestion.id] === opt;
                                            const colors = ['#2C71AE', '#2E9DA6', '#D5546D', '#EFA928'];
                                            const color = colors[idx] || '#ccc';

                                            return (
                                                <button
                                                    key={idx}
                                                    className={`relative flex h-[32vh] w-[12vw] cursor-pointer items-center justify-center rounded-xl border-2 p-6 text-center font-semibold shadow-md transition-all duration-300 ${selected ? 'scale-110 text-2xl shadow-2xl ring-4 ring-black ring-offset-2' : 'text-lg opacity-90 hover:scale-105 hover:opacity-100'} `}
                                                    style={{
                                                        backgroundColor: selected ? color : `${color}bb`,
                                                        borderColor: color,
                                                    }}
                                                    onClick={() => handleSelect(opt)}
                                                    disabled={submitted}
                                                >
                                                    {opt}
                                                    {selected && <span className="absolute top-2 right-2 text-2xl text-white">✓</span>}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="my-6 flex justify-center px-10">
                                        <button
                                            onClick={handleNext}
                                            className="cursor-pointer rounded-xl bg-[#2C71AE] px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2E9DA6] disabled:cursor-not-allowed disabled:opacity-40"
                                            disabled={!selectedAnswers[currentQuestion.id]}
                                        >
                                            {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="py-6 text-center">
                                    <h2 className="text-5xl font-bold text-[#2C71AE]">Quiz Completed!</h2>
                                    <p className="mt-24 mb-12 cursor-pointer text-2xl font-semibold text-gray-700 transition-transform duration-300 ease-in-out hover:scale-150 dark:text-gray-100">
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
                                            <div className="mt-2 text-red-500 dark:text-red-300">
                                                <h3 className="font-bold">Categories to Improve:</h3>
                                                <ul className="list-inside list-disc">
                                                    {getWeakCategories().map((cat, idx) => (
                                                        <li key={idx}>{cat}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mx-auto flex w-fit flex-col text-center text-green-800 dark:text-green-400">
                                            <h3 className="my-12 mb-5 text-2xl font-black">Answer Recap – Categories to Improve:</h3>
                                            <ul className="flex list-inside list-disc flex-row text-xl font-semibold">
                                                {getWrongAnswerRecap(questions, selectedAnswers).length > 0 ? (
                                                    getWrongAnswerRecap(questions, selectedAnswers).map((item, idx) => (
                                                        <li className="my-2 mr-2" key={idx}>
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
                                                        sessionStorage.setItem(`reset-${forum.courseId}`, 'true');
                                                        window.location.reload();
                                                    }}
                                                    className="text-md mt-10 mb-2 h-16 w-24 cursor-pointer rounded-xl bg-red-600 py-2 text-center text-white hover:bg-red-700"
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
                <div className="mt-12 mr-5 flex w-[280px] flex-col items-center justify-center rounded-lg border border-1">{renderNavigation()}</div>
            </div>
        </div>
    );
}
