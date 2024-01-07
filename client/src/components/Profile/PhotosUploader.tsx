import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  addedPhotos: any;
  setAddedPhotos: any;
}

const PhotosUploader = ({ addedPhotos, setAddedPhotos }: Props) => {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(e: any) {
    e.preventDefault();

    try {
      const { data } = await axios.post('/accomodations/upload-photo-by-link', {
        link: photoLink,
      });
      setAddedPhotos((files: any) => {
        return [data.file_name, ...files];
      });
      setPhotoLink('');
    } catch (err) {
      alert(`Error while uploading image: ${err}`);
    }
  }

  function addPhotoFromSystem(e: any) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    axios
      .post('/accomodations/upload-photo-from-system', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data } = response;
        console.log('addPhotoFromSystem data: ', data);
        setAddedPhotos((files: any) => {
          return [...data, ...files];
        });
        setPhotoLink('');
      });
  }

  function removePhoto(e: any, filename: string) {
    e.preventDefault();
    setAddedPhotos([
      ...addedPhotos.filter((photo: string) => photo !== filename),
    ]);
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link... jpg"
          className="form-input"
          value={photoLink}
          disabled={addedPhotos.length >= 5}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className={`border px-4 rounded-2xl ${
            addedPhotos.length >= 5
              ? 'text-gray-500 bg-gray-300 cursor-default'
              : 'cursor-pointer'
          }`}
          onClick={addPhotoByLink}
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {/* (Immediately Invoked Function Expression) */}
        {addedPhotos.length > 0 &&
          addedPhotos.map((link: string, id: number) => (
            <div key={id} className="h-20 flex object-cover relative">
              <img
                className="rounded-xl"
                src={`http://localhost:8080/image-uploads/${link}`}
                alt={link}
              />
              <button
                onClick={(e) => removePhoto(e, link)}
                className="absolute bottom-1 right-1 text-gray-300 bg-black bg-opacity-50 rounded-xl p-1.5 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        <label
          className={`h-20 border rounded-2xl p-3 text-xl flex gap- justify-center items-center ${
            addedPhotos.length >= 5
              ? 'text-gray-500 bg-gray-300 cursor-default'
              : 'cursor-pointer'
          } `}
        >
          <input
            type="file"
            multiple
            className="hidden"
            disabled={addedPhotos.length >= 5}
            onChange={addPhotoFromSystem}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
