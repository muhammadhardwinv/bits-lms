import ContentLayout from '@/layouts/content-layout';
import { courses, semesters, subjects, teachers } from '@/lib/schoolData';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function DummyTester() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCourse = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
    };

    const course = courses[currentIndex];
    const teacher = teachers.find((t) => t.id === course.teacherId);
    const subject = subjects.find((s) => s.id === course.subjectId);
    const semester = semesters.find((s) => s.id === course.semesterId);

    return (
        <ContentLayout>
            <Head title="Dummy Tester">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="justify w-[80vw] flex-col space-y-6 bg-gradient-to-b from-gray-50 to-white p-6">
                <h1 className="text-4xl font-bold text-gray-900">Explore Our Course Offerings</h1>
                <p className="max-w-2xl text-lg text-gray-600">
                    Dive into detailed information about each course our school offers — including subject area, instructor, semester, and class
                    schedule. Use the "Next Course" button to explore them one by one.
                </p>

                <div className="flex w-full flex-col justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-3xl font-semibold text-blue-900">{course.name}</h2>
                        <span className="text-sm text-gray-500">
                            Course {currentIndex + 1} of {courses.length}
                        </span>
                    </div>

                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>
                            <strong>Class:</strong> {course.classId}
                        </li>
                        <li>
                            <strong>Course Code:</strong> {course.courseId}
                        </li>
                        <li>
                            <strong>Subject:</strong> {subject?.name} ({subject?.code})
                        </li>
                        <li>
                            <strong>Teacher:</strong> {teacher?.name} —{' '}
                            <a href={`mailto:${teacher?.email}`} className="text-blue-600 hover:underline">
                                {teacher?.email}
                            </a>
                        </li>
                        <li>
                            <strong>Semester:</strong> {semester?.name}
                        </li>
                        <li>
                            <strong>Schedule:</strong> {course.schedule.map((s) => `${s.day} ${s.time}`).join(', ')}
                        </li>
                        <li>
                            <strong>Credits:</strong> {course.credits} credit hour(s)
                        </li>
                        <li>
                            <strong>Created At:</strong> {new Date(course.createdAt).toLocaleDateString()}
                        </li>
                    </ul>

                    <div className="mt-4 text-gray-600 italic">"{course.description}"</div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={nextCourse}
                        className="mt-4 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white shadow transition hover:bg-blue-700"
                    >
                        Next Course ➜
                    </button>
                </div>
            </div>
        </ContentLayout>
    );
}
