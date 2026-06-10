import { Temporal } from "@js-temporal/polyfill";
import { EnrollmentStatus, describeEnrollment } from "./models/enrollment.model";
import { CourseStatus, describeCourse } from "./models/course.model";
import { isStudent } from "./models/student.model";
const student: Student = {
id: "STU-001",
name: "Hana Tadesse",
enrollmentDate: Temporal.Now.instant(),
};
// Try these what does the compiler say?
student.id = "STU-999";
console.log(student.gpa?.toFixed(2));
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");
console.log("Script started.");


function processStudent(raw: unknown) {
if (isStudent(raw)) {
const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
console.log(`Student ${raw.name} GPA: ${gpaDisplay}`);
} else {
console.error("Invalid student data received");
}
}
processStudent({ id: "STU-001", name: "Hana", gpa: 3.7 });
// Prints: Student Hana GPA: 3.70
processStudent(42);
// Prints: Invalid student data received


import { parseStudent } from "./models/student.model";
console.log(parseStudent({ id: "STU-001", name: "Hana" }));
// Prints a valid Student object
parseStudent({ id: 42, name: "Test" });
// Throws: TypeError: Expected id to be a string, received number


import { AssessmentItem, calculateGrade } from "./models/assessment.model";
const quiz: AssessmentItem = {
id: "QUIZ-001",
kind: "quiz",
title: "SQL Basics",
correctAnswers: 8,
totalQuestions: 10,
};
const lab: AssessmentItem = {
id: "LAB-001",
kind: "lab",
title: "REST API Project",
functionalityScore: 85,
codeQualityScore: 90,
};
console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // 80
console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87
// Verify readonly try this line and check the compiler error:
quiz.id = "QUIZ-999";
// ERROR: Cannot assign to 'id' because it is a read-only property

const pending: EnrollmentStatus = {
status: "PENDING",
requestedAt: Temporal.Now.instant(),
studentId: "STU-001",
courseId: "CRS-101",
};
console.log(describeEnrollment(pending));
// Should print something like: Awaiting approval since 2026-05-08T...


    const webDev: CourseStatus = {
    status: "ACTIVE", enrolledCount: 28, startDate: Temporal.PlainDate.from("2026-09-01"),
    };
    console.log(describeCourse(webDev));
    // Should print something like: Active with 28 students since 2026-09-01

import { Student } from "./models/student.model";
// `Course` is not exported from ./models/course.model in this project.
// Define a local minimal Course type matching usage in this file.
type Course = {
  id: string;
  title: string;
  capacity: number;
  startDate: Temporal.PlainDate;
};
type ApiResponse<T> = {
  status: "success" | "error";
  data: T;
  fetchedAt: Temporal.Instant;
  message?: string;
};
function renderResponse<T, U>(
  response: ApiResponse<T>,
  formatter: (data: T) => U,
): string {
  return `${response.status}: ${formatter(response.data)}`;
}
const studentRes: ApiResponse<Student> = {
status: "success",
data: {
id: "STU-001",
name: "Dawit Bekele",
enrollmentDate: Temporal.Now.instant(),
gpa: 3.4,
},
fetchedAt: Temporal.Now.instant(),
};
console.log(
renderResponse(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`),
);
// Nowtest with a different data type
const courseListRes: ApiResponse<Course[]> = {
status: "success",
data: [
{
id: "CRS-101",
title: "Web Development Fundamentals",
capacity: 30,
startDate: Temporal.PlainDate.from("2026-09-01"),
},
],
fetchedAt: Temporal.Now.instant(),
};
console.log(
renderResponse(courseListRes, (courses) =>
courses.map((c) => c.title).join(", "),
),
);


// 1. Record the exact moment an enrollment is approved (UTC)
const approvedAt = Temporal.Now.instant();
console.log(`Approved at (UTC): ${approvedAt}`);
// 2. Display in local timezone
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");
console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);
// Same moment, different wall-clock time
// 3. Course start date (date only, no time)
const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();
const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);
// 4. Assignment deadline duration
const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
`${remaining.total({ unit: "days" })} days until assignment is due`,
);