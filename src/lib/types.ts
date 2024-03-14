
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

  export type UserForm=Omit<User,"id">