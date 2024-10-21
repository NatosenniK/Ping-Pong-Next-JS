'use client';

import { UserProfileObject } from '@/app/lib/definitions';
import { useRef, useState } from 'react';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteProfilePhoto, saveProfilePhoto } from '@/app/lib/actions';
import { PingPongImage } from './ping-pong-image';
import { toast } from 'react-toastify';

interface FormProps {
  currentUser: UserProfileObject
}
export default function FileUpload({ currentUser }: FormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modifiedUser, setModifiedUser] = useState<UserProfileObject>(currentUser);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      // Auto upload the file
      await handleFileUpload(selectedFile);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    );

    if (response.ok) {
      const { url, fields, fileUrl } = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', file);

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (currentUser && currentUser.email) {
        await saveProfilePhoto(currentUser.email, fileUrl);
        setModifiedUser((prevState) => ({
          ...prevState,
          profile_picture_url: fileUrl,
        }));
      }

      if (uploadResponse.ok) {
        toast.success('Upload successful!')
      } else {
        console.error('S3 Upload Error:', uploadResponse);
        toast.error('Upload failed!')
      }
    } else {
      alert('Failed to get pre-signed URL.');
    }

    setUploading(false);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the file input when button is clicked
    }
  };

  async function removeProfilePhoto() {
    await deleteProfilePhoto(currentUser.email);
    setModifiedUser((prevState) => ({
      ...prevState,
      profile_picture_url: '',
    }));
    toast.success('Photo has been removed')
  }

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-slate-700">
      <div className="mb-4">
        <label htmlFor="profilePicture" className="mb-2 block text-sm font-medium dark:text-white">
          Profile Photo
        </label>
        <PingPongImage
          width={256}
          height={256}
          imageUrl={modifiedUser.profile_picture_url}
          className="mb-4 rounded-md"
        />
        <div>
          <button
            type="button"
            className="rounded-md border p-2 hover:bg-gray-100 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-whiteflex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleButtonClick}
          >
            <div className="flex">
              Upload Photo
              <ArrowUpTrayIcon className="w-5 ml-2" />
            </div>
          </button>

          <button
            type="button"
            className="rounded-md border p-2 hover:bg-gray-100 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-whiteflex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ml-5"
            onClick={removeProfilePhoto}
          >
            <div className="flex">
              Remove Photo
              <TrashIcon className="w-5 ml-2" />
            </div>
          </button>
          <input
            ref={inputRef}
            id="file"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
    </div>
  );
}
