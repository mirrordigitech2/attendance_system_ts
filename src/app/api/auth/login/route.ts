import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import {serialize} from 'cookie'

const authenticateUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  const pass = Number(password);
  const userRef = collection(db, "users");
  const q = query(
    userRef,
    where("email", "==", email),
    where("idNum", "==", pass)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null; // User not found
  }

  const userData = querySnapshot.docs[0].data();
  //   if (!userData || !(await compare(password, userData.idNum.toString()))) {
  //     return null; // Incorrect password
  //   }
  if (!userData || pass !== userData.idNum) {
    return null; // Incorrect password
  }

  const secretKey = uuidv4();
  const token = sign({ email }, secretKey, { expiresIn: "30d" });
  return token;
};

const handler = async (req: NextRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  } else {
    const formData = await req.json();
    console.log(formData);
    const { email, password } = formData;
    console.log("email: ", formData.email);
    const token = await authenticateUser(email, password);
    console.log(token);

    if (!token) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    } else {
        //success
        const serialized = serialize("Attendance-System-User-Cookie", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 60*60*24*30,
            path: '/'
        })
        const response = {
            message: "Authenticatd",
            headers: {"Set-Cookie": serialized},
            status: 200
        }
        return new Response(JSON.stringify(response))
    //   return NextResponse.json(
    //     { message: "SUCCESS", body: token , headers: {"Set-Cookie": serialized}},
    //     { status: 200 },
    //   );
    }
  }
};

export { handler as GET, handler as POST };
