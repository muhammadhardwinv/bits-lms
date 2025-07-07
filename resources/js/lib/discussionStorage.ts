import { DiscussionThread } from './discussionContent';

export const postedDiscussions: Record<string, DiscussionThread[]> = {};

export function storeNewDiscussion(
    courseId: string,
    classId: string,
    lecturerId: string,
    lecturerName: string,
    forumTitle: string,
    content: string,
    sessionNumber: number,
    posterName: string,
): void {
    const sessionKey = `${courseId}_Session${sessionNumber}`;

    const newThread: DiscussionThread = {
        courseId,
        classId,
        lecturerId,
        lecturerName,
        forumTitle,
        studentName: posterName,
        studentArgument: content,
        lecturerResponse: '',
        timestampStudent: new Date().toISOString(),
        timestampLecturer: '',
    };

    if (!postedDiscussions[sessionKey]) {
        postedDiscussions[sessionKey] = [];
    }

    postedDiscussions[sessionKey].push(newThread);
}

export function getThreadsForSession(courseId: string, sessionNumber: number): DiscussionThread[] {
    const key = `${courseId}_Session${sessionNumber}`;
    return postedDiscussions[key] || [];
}
