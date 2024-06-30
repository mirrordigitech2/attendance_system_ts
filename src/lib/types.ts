export interface User {
  id: string;
  name: string;
  email: string;
  school: School;
  courses: Course;
  phone: string;
  idNum: number;
  role: "admin" | "user";
}

export interface Student {
  id: string;
  name: string;
  school: School;
  age: number;
  class1: string;
  phoneParent: string;
  address: string;
  courses: Course;
}

export interface School {
  id: string;
  name: string;
  location: string;
  lecturer: User;
  manager: string;
  phone: string;
  totalStudent: number;
}
export interface Course {
  id: string;
  name: string;
  lecturer: User;
  school: School;
  location: string;
  totalStudent: number;
}
export type UserForm = Omit<User, "id">;
export type StudentForm = Omit<Student, "id">;
export type SchoolForm = Omit<School, "id">;
export type CourseForm = Omit<Course, "id">;
