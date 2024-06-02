import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const path = formData.get("path") as string;
    const file = formData.get("file") as File;

    if (!path || !file) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid path or file"
        }), 
        { status: 400 }
      );
    }

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);

    const URL = await getDownloadURL(storageRef);

    return new Response(
      JSON.stringify({
        success: true,
        message: "파일 업로드에 성공했습니다",
        data: URL
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "파일 업로드에 실패했습니다",
        data: error
      }),
      { status: 500 }
    );
  }
}
