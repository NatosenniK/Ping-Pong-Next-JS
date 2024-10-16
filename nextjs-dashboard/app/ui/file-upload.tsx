'use client';

import { PlayerField, UserObject } from '@/app/lib/definitions';
import Link from 'next/link';
import { AdjustmentsVerticalIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMatch, saveProfilePhoto, State } from '@/app/lib/actions';
import { useActionState, useEffect, useState } from 'react';
import { User } from 'next-auth';

interface FormProps {
  currentUser: User
}
export default function FileUpload({ currentUser }: FormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setUploading(true)

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    )

    // const session = await auth()

    if (response.ok) {
      const { url, fields, fileUrl } = await response.json()

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if(currentUser && currentUser.email) {
        await saveProfilePhoto(currentUser.email, fileUrl)
      }

      console.log(uploadResponse)

      if (uploadResponse.ok) {
        alert('Upload successful! ')
      } else {
        console.error('S3 Upload Error:', uploadResponse)
        alert('Upload failed.')
      }
    } else {
      alert('Failed to get pre-signed URL.')
    }

    setUploading(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className='ml-2 mb-2 dark:text-white'>How did your match go, {currentUser.name}?</h2>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-slate-700">

        <div className="mb-4">
          <label htmlFor="winnerPoints" className="mb-2 block text-sm font-medium dark:text-white">
            Upload Your Profile Picture
          </label>
          <div className="relative mt-2 rounded-md">
            <input
                id="file"
                type="file"
                onChange={(e) => {
                    const files = e.target.files
                    if (files) {
                    setFile(files[0])
                    }
                }}
                accept="image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/matches"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Upload Photo</Button>
      </div>
    </form>
  );
}
