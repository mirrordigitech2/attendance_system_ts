"use client";

interface AuthHeader {
  label: string;
  title: string;
}

const AuthHeader = ({ label, title }: AuthHeader) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
};
export default AuthHeader;
