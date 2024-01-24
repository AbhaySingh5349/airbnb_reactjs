import React, { useState } from 'react';
import axios from 'axios';

import { Image } from '../index';

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

  function selectCoverPhoto(e: any, filename: string) {
    e.preventDefault();
    setAddedPhotos([
      filename,
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
              {/* <img
                className="rounded-xl"
                src={`http://localhost:8080/image-uploads/${link}`}
                alt={link}
              /> */}
              <Image src={link} alt={link} className="rounded-xl" />
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
              <button
                onClick={(e) => selectCoverPhoto(e, link)}
                className="absolute bottom-1 left-1 text-gray-300 bg-black bg-opacity-50 rounded-xl p-1.5 cursor-pointer"
              >
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#d9d766"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#d9d766"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                )}
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
