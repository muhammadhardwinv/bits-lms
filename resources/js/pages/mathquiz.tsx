import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useMemo, useState } from 'react';

interface Question {
    question: string;
    options: string[];
    answer: number;
}

export default function MathQuiz() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Map<number, number>>(new Map());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const generatePool = (): Question[] => {
            const pool = Array.from({ length: 100 }, (_, idx) => {
                const num = idx + 1;
                const baseOptions = [`${num * 2 - 1}`, `${num * 2}`, `${num * 2 + 1}`, `${num + 5}`];
                const shuffled = baseOptions.map((opt, i) => ({ opt, originalIndex: i }));
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                const options = shuffled.map((s) => s.opt);
                const answer = shuffled.findIndex((s) => s.originalIndex === 1);
                return {
                    question: `What is ${num} + ${num}?`,
                    options,
                    answer,
                };
            });
            return pool.sort(() => Math.random() - 0.5).slice(0, 10);
        };
        setQuestions(generatePool());
    }, []);

    const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);
    const selectedAnswer = answers.get(currentIndex);
    const isAnswered = selectedAnswer !== undefined;

    const handleAnswer = (optionIndex: number) => {
        if (finished) return;
        setAnswers((prev) => {
            const updated = new Map(prev);
            if (updated.get(currentIndex) === optionIndex) {
                updated.delete(currentIndex);
            } else {
                updated.set(currentIndex, optionIndex);
            }
            return updated;
        });
        const nextIndex = findNextUnanswered(currentIndex);
        if (nextIndex !== null) setCurrentIndex(nextIndex);
    };

    const findNextUnanswered = (from: number): number | null => {
        for (let i = from + 1; i < questions.length; i++) {
            if (!answers.has(i)) return i;
        }
        for (let i = 0; i <= from; i++) {
            if (!answers.has(i)) return i;
        }
        return null;
    };

    const handleFinish = () => {
        let correct = 0;
        for (let [index, answer] of answers.entries()) {
            if (questions[index].answer === answer) correct++;
        }
        setScore(correct * 10);
        setFinished(true);
    };

    const goTo = (index: number) => {
        if (index >= 0 && index < questions.length) setCurrentIndex(index);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 pb-40">
            <div className="fixed top-6 right-6 z-50">
                <a
                    href="/courses/mathematics"
                    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow transition hover:bg-gray-200"
                >
                    ← Back to Course
                </a>
            </div>

            <header className="mb-8">
                <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-md">Mathematics</h1>
                <p className="text-xl text-gray-600 italic">Course Code: MATH101</p>
            </header>

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                    <Card className="min-h-[500px] rounded-xl border border-gray-200 bg-white p-8 shadow-xl">
                        <CardContent>
                            <h2 className="mb-6 text-2xl font-bold text-purple-900">
                                Q{currentIndex + 1}. {currentQuestion?.question || 'Loading...'}
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {currentQuestion?.options.map((opt, idx) => {
                                    const selected = answers.get(currentIndex) === idx;
                                    const disabled = isAnswered || finished;
                                    return (
                                        <Card
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className={`transform cursor-pointer rounded-xl border-4 p-2 text-center transition duration-300 select-none hover:scale-[1.02] ${
                                                selected
                                                    ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
                                                    : disabled
                                                      ? 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-60'
                                                      : 'border-gray-200 bg-white text-gray-800 hover:shadow-md'
                                            }`}
                                        >
                                            <CardContent className="p-6 text-lg font-semibold">{opt}</CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                            {answers.size === questions.length && !finished && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={handleFinish}
                                        className="rounded-lg bg-blue-700 px-6 py-3 text-white shadow transition hover:bg-blue-800"
                                    >
                                        Finish Quiz
                                    </button>
                                </div>
                            )}
                            {finished && score !== null && (
                                <div className="mx-auto mt-8 w-fit rounded-xl border border-gray-300 bg-white px-10 py-6 text-center shadow">
                                    <p className="text-sm text-gray-500">Your Final Grade</p>
                                    <p className="text-4xl font-bold text-green-600">{score} / 100</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <aside className="lg:w-52">
                    <Card className="sticky top-24 border bg-white p-4 shadow">
                        <CardContent>
                            <h3 className="mb-4 text-center text-lg font-bold text-gray-700">Question Panel</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {[...Array(10)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goTo(idx)}
                                        className={`h-10 w-10 rounded-lg text-sm font-bold transition ${
                                            idx === currentIndex
                                                ? 'bg-indigo-600 text-white'
                                                : answers.has(idx)
                                                  ? 'bg-gray-300 text-gray-800'
                                                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
