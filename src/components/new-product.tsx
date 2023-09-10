import { Product } from "@/models";
import React, { useState } from "react";
import Image from "next/image";
import { MinusIcon } from "@/components/Icons";
import { useRouter } from "next/router";
import Portal from "./utils/Portal";
import { Backdrop } from "./MyCart";
import Head from "next/head";

const FileInput: React.FC<{
  onImageChange: (files: File[]) => void;
}> = ({ onImageChange }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const deletePreviewHandler = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    for (let i = 0; i < e.target.files!.length; i++) {
      const file = e.target.files![i];
      if (newImages.length < 4) {
        newImages.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        reader.readAsDataURL(file);
      } else {
        window.alert("이미지는 4개까지만 가능합니다.");
      }
    }
    setImages(newImages);
    onImageChange(newImages);
  };
  return (
    <>
      <label
        htmlFor="files"
        className="mb-4 inline-block cursor-pointer rounded-md border-[1px] border-solid border-dark px-4 py-2"
      >
        이미지 등록
      </label>
      <input
        className="hidden"
        id="files"
        type="file"
        multiple
        name="img"
        accept="image/*"
        onChange={imageChangeHandler}
        required
      />
      <ul className="grid grid-cols-4 gap-2 md:grid-cols-2">
        {previews?.map((preview, index) => (
          <li className="relative h-40  border-[1px] p-2" key={index}>
            <Image
              src={preview}
              alt={`${preview}-${index}`}
              width={300}
              height={300}
              className="absolute left-0 top-0 h-full w-full"
            />
            <span
              className="absolute right-0 top-0 cursor-pointer bg-red-500 p-1 text-sm text-light"
              onClick={() => deletePreviewHandler(index)}
            >
              <MinusIcon />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

const NewProduct = () => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    price: 0,
    category: 1,
    desc: "",
    images: [] as File[],
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createProductData = async (data: productForm) => {
    setIsLoading(true);
    const postCloudnary = async (imageData: FormData) => {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageData,
        },
      );
      return response.json();
    };
    const getImageUrl = async () => {
      let img = [];
      const setImgClound = data.images.map(async (imgFile: File) => {
        const imageData = new FormData();
        imageData.append("file", imgFile);
        imageData.append(
          "upload_preset",
          `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}`,
        );
        try {
          const response = await postCloudnary(imageData);
          const imgUrl = response.secure_url;
          return imgUrl;
        } catch (error) {
          console.log(error);
          return null;
        }
      });
      const imgUrls = await Promise.all(setImgClound);
      return imgUrls.filter((url) => url !== null);
    };
    const fetchData = async (imgUrls: string[]) => {
      const newProduct = new Product(
        data.company,
        data.name,
        data.price,
        data.desc,
        +data.category,
        imgUrls,
      );

      const response = await fetch(`${process.env.NEXT_PUBLIC_FIRE_BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("저장에 실패하였습니다.");
      }

      return response;
    };

    try {
      const imgUrls = await getImageUrl();
      const result = await fetchData(imgUrls);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const createProductHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      ...formData,
    };
    createProductData(data);
  };

  const updateFormData = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleImageChange = (images: File[]) => {
    // Update the 'images' field in the form data
    setFormData({ ...formData, images });
  };

  return (
    <>
      <Head>
        <title>새 제품 추가하기</title>
      </Head>
      <section className="relative flex items-center justify-center px-32 py-12 md:px-4 lg:px-8">
        {isLoading && (
          <Portal selector="backDrop">
            <>
              <Backdrop />
              <div className="po_center text-lg"></div>
            </>
          </Portal>
        )}
        <div className="w-full rounded-lg border-[1px] border-solid border-dark/50 bg-white p-12 shadow-md dark:bg-slate-700 md:w-full md:p-4">
          <h1 className="mb-12 text-center text-2xl font-bold md:mb-4 md:text-base">
            신규 제품 등록
          </h1>
          <form
            onSubmit={createProductHandler}
            className="flex flex-col gap-4 md:text-sm"
          >
            <div>
              <p className="mb-1 text-dark/75 dark:text-light/75 ">
                제품 카테고리
              </p>
              <select
                name="category"
                onChange={(e) => updateFormData("category", e.target.value)}
                className="w-1/4 rounded-md border-[1px] border-solid border-dark/50 px-4 py-2 md:w-full"
              >
                <option value={1}>의자</option>
                <option value={2}>책상</option>
                <option value={3}>소파</option>
                <option value={4}>조명</option>
                <option value={5}>수납</option>
                <option value={6}>홈리빙</option>
              </select>
            </div>
            <div>
              <p className="mb-1 text-dark/75 dark:text-light/75 ">
                제작 회사명
              </p>
              <input
                type="text"
                name="company"
                className="w-full rounded-md border-[1px] border-solid border-dark/50 px-4 py-2"
                placeholder="제작 회사명을 입력하세요."
                required
                onChange={(e) => updateFormData("company", e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 text-dark/75 dark:text-light/75 ">제품 이름</p>
              <input
                type="text"
                name="name"
                className="w-full rounded-md border-[1px] border-solid border-dark/50 px-4 py-2"
                placeholder="제품 이름을 입력하세요."
                required
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 text-dark/75 dark:text-light/75 ">제품 가격</p>
              <input
                type="number"
                name="price"
                className="w-full rounded-md border-[1px] border-solid border-dark/50 px-4 py-2"
                placeholder="제품 가격을 입력하세요."
                required
                onChange={(e) => updateFormData("price", e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 text-dark/75 dark:text-light/75 ">제품 설명</p>
              <textarea
                name="desc"
                className="h-32 w-full resize-none rounded-md border-[1px] border-solid border-dark/50 px-4 py-2"
                placeholder="제품 설명을 입력하세요."
                required
                onChange={(e) => updateFormData("desc", e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <p className="mb-4 text-dark/75 dark:text-light/75 ">
                제품 이미지를 등록하세요.(최대 4장)
              </p>
              <FileInput onImageChange={handleImageChange} />
            </div>

            <button
              className="w-full rounded-lg bg-dark py-4 text-lg font-bold text-light md:py-2 md:text-base"
              type="submit"
            >
              제품 등록하기
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewProduct;
