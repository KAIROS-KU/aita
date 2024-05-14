import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function POST(request:Request) {
  try {
    const { path, file } = await request.json();
    const storageRef = ref(storage, path);
        
    await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(storageRef);

    return new Response(
      JSON.stringify({
        success: true,
        message: "파일 업로드에 성공했습니다",
        data: imageURL
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "파일 업로드에 실패했습니다",
        data: error
      })
    );
  }
}
