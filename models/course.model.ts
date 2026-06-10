// import { Temporal } from "@js-temporal/polyfill";

// export interface Course {
// readonly id: string;
// title: string;
// capacity: number;
// startDate?: Temporal.PlainDate;
// }
// //Legacy 27 impossible states allowed
// interface course {
// isPending: boolean;
// isApproved: boolean;
// isActive: boolean;
// isCompleted: boolean;
// isDropped: boolean;
// }
// export type CourseStatus =
// | { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
// | { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
// | { status: "ACTIVE"; enrolledCount: number;
// startDate: Temporal.PlainDate;
// }
// | { status: "ARCHIVED"; archivedAt: Temporal.Instant;
// finalEnrollmentCount: number;
// }
// | { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };


//   //  Your switch goes here. Handle all 5 states.Each case should return a descriptive string using the state-specific fields.Include the default/never check.
// export function describeCourse(course:Course): string { 
// switch (course.status) {
// case "PENDING":
// return `Awaiting approval since ${course.requestedAt}`;
// case "APPROVED":
// return `Approved by ${course.approvedBy}`;
// case "ACTIVE":
// return course.currentGrade !== undefined
// ? `In progress grade so far: ${course.currentGrade}`
// : `In progress not yet graded`;
// case "COMPLETED":
// return `Finished with ${course.finalGrade}`;
// case "DROPPED":
// return `Dropped: ${course.reason}`;
// default: {
// const exhaustivecheck: never =course.status;throw new Error(`Unhandled status: ${JSON.stringify(exhaustivecheck)}`);
// }
// }
// }
import { Temporal } from "@js-temporal/polyfill";

export type CourseStatus =
  | { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
  | { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
  | { status: "ACTIVE"; enrolledCount: number; startDate: Temporal.PlainDate }
  | { status: "ARCHIVED"; archivedAt: Temporal.Instant; finalEnrollmentCount: number }
  | { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };

export function describeCourse(status: CourseStatus): string {
  switch (status.status) {
    case "DRAFT":
      return `Draft created by ${status.createdBy} on ${status.createdAt.toString()}`;

    case "PUBLISHED":
      return `Published on ${status.publishedAt.toString()} with syllabus: ${status.syllabus}`;

    case "ACTIVE":
      return `Active course started on ${status.startDate.toString()} with ${status.enrolledCount} students enrolled`;

    case "ARCHIVED":
      return `Archived on ${status.archivedAt.toString()} with final enrollment count of ${status.finalEnrollmentCount}`;

    case "CANCELLED":
      return `Cancelled on ${status.cancelledAt.toString()} due to: ${status.reason}`;

    default: {
      const exhaustiveCheck: never = status as never;
      throw new Error(`Unhandled status: ${JSON.stringify(exhaustiveCheck)}`);
    }
  }
}
