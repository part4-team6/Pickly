import axios from "axios";

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  file: File | null;
  accessToken: string;
}

export default async function postImage({ file, accessToken }: Props) {
  try {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${Base_URL}/images/upload`,
        formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("상품 이미지 등록 실패", error);
  }
}
