"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [pass, setPass] = useState<string>("");
  const validateForm = (pass: string): boolean => {
    if (pass === "123") {
      return true;
    } else {
      return false;
    }
  };

  const router = useRouter();
  const handlePassChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPass((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (validateForm(pass)) {
      router.push("/");
    } else {
      console.log("wrong password");
      alert("WRONG PASSWORD");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email@domain.com"
          />

          <label htmlFor="pass"></label>
          <input
            type="password"
            id="pass"
            name="pass"
            placeholder=""
            onChange={handlePassChange}
          />

          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}
