"use client";

import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { Button, buttonVariants } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"

import React, { useEffect, useState } from 'react';

export default function DummyPage() {

  //upload works but fetch API does not work, CORS
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  function handleChange(event: { target: { files: React.SetStateAction<string>[]; }; }) {
      setFile(event.target.files[0]);
  }

  const handleUpload = () => {
      if (!file) {
          alert("Please upload an image first!");
      }

      const storageRef = ref(storage, `/files/${file?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
          "state_changed",
          (snapshot) => {
              const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setPercent(percent);
          },
          (err) => console.log(err),
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  console.log(url);
              });
          }
      );
  };

  const processImage = async (fileName: null) => {
    if (fileName == null) return;
    console.log(fileName)
    let response = await fetch(
       `https://web-production-1361.up.railway.app/scan/${fileName}`, // change later
       {
          method: 'GET',
       }
    );
    console.log(response)
    if (response.status === 200) {
        const imgUrl = response.text;
        getDownloadURL(ref(storage, imgUrl))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            const img = document.getElementById('myimg');
            img?.setAttribute('src', url);
        })
        .catch((error) => {
            console.log(error)
        });
                
  };
  }

  const uploadAndSendAPI = () => {
    handleUpload()
    processImage(file?.name)
  }
    
  return (
    <section className="flex">
        <Sidebar />
        <div className="mx-auto p-12">
            {/* <input type="file" onChange={handleChange} accept="/image/*" /> */}
            <div className="flex items-center justify-center w-full gap-24">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center p-8 w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 shadow-md">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" accept="/image/*" className="hidden" />
                </label>
                <Button className="place-content-center" onClick={uploadAndSendAPI}>Upload</Button>
            </div> 
        </div>
    </section>
  )
}