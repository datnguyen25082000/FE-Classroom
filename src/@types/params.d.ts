interface IParamsGetOneCourse {
  courseId: number | string;
}

interface IParamsInviteViaEmail {
  email: string;
  course_id?: number | string;
  teacher_invite?: boolean;
}

interface IParamsUpdateInfo {
  user_displayname?: string;
  user_phone?: string;
  user_email?: string;
  user_address?: string;
  user_studentid?: string;
  user_nameinroom?: string;
}

interface IParamsUpdateCourse {
  course_id: string;
  course_des?: string;
  course_topic?: string;
  course_code?: string;
  course_name: string;
}

interface IParamsAddCourse {
  nameclass: string;
  codeclass?: string;
  hostclass?: string;
}

interface IParamsDeleteCouse {
  idclass: string | number;
}

interface IParamsLeaveCourse {
  course_id?: string | number;
}

interface IParamsGetAllAssignByCourse {
  course_id: string | number;
}

interface IParamsAddAssignmentCategory {
  name: string;
  point: number;
  course_id: number | string;
}

interface IParamsUpdateAssignmentCategory {
  assignmentCategoryId: number | string;
  newName: string;
  newPoint: number;
}

interface IParamsDeleteAssignmentCategory {
  assignmentCategoryId: number;
}

interface IParamsUpdatePositionAssignCate {
  assignmentCategories: Array<{
    id: number;
    position: number;
  }>;
}

interface IParamsGetAllStudentByCourse {
  course_id: number;
}

interface IParamsAddStudentsToCourse {
  students: Array<{
    student_id: string | number;
    full_name: string;
  }>;
  course_id: number;
}

interface IParamsAddScoreAssignmentCate {
  assignment_category_id: number;
  scores: Array<{
    student_id: string;
    point: number;
  }>;
}

interface IParamsForgotPassword {
  email: string;
}
interface IParamsResetPassword {
  email: string;
  otp: string;
  newPassword: string;
}

interface IParamsChangePassword {
  currentPassword: string;
  newPassword: string;
}

interface IParamsActivateUser {
  code: string;
}

interface IParamsCreateScoreReview {
  score_id: string | number;
  expected_point: string;
  reason: string;
}

interface IParamsGetAllReviewByCourse {
  course_id: number;
}

interface IParamsFinalizeReviewScore {
  scoreReviewId: number;
  updatedPoint: number;
}

interface IParamsAddCommentReview {
  score_review_id: number;
  content: string;
}

interface IParamsMarkAsRead {
  id: number;
}

interface IParamsGetReviewByAssignment {
  assignment_category_id: number;
}

interface IParamsGetAllCommentByScoreReview {
  scoreReviewId: number;
}

interface IParamsAddAdmin {
  username: string;
  password: string;
  display_name: string;
  email: string;
}

interface IParamsUpdateStudentId {
  user_id: number;
  new_student_id: string;
}

interface IParamsLockUser {
  user_id: number;
}
