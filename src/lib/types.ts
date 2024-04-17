export interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  courses: string;
  phone: number;
  idNum: number;
  role: string;
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

export type UserForm = Omit<User, "id">;
export type StudentForm = Omit<Student, "id">;
