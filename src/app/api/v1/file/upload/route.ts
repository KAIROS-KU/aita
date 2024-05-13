/*
import { storage } from "@/firebase/index";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function POST(request:Request) {
  try {
    const {
      path,
      userID,
      file,
    } = await request.json();

    const randId = uuidv4()
    const storageRef = ref(storage, `folder/${randId}`);
        
    await uploadBytes(storageRef, file)
    const imageURL = await getDownloadURL(storageRef)

    return new Response(
      JSON.stringify({
        success: true,
        message: "upload successful",
        data: imageURL,
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "FILE UPLOAD에 실패했습니다",
        data: error,
      }),
    );
  }
}
*/