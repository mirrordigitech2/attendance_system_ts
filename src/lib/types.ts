export interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  courses: string;
  phone: number;
  idNum: number;
  role: "admin" | "user";
}

export interface Student {
  id: string;
  name: string;
  school: string;
  age: number;
  class1: string;
  phoneParent: number;
  address: string;
  courses: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  lecturer: User;
  manager: string;
  phone: number;
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
