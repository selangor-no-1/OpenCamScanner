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
        <div className="flex items-center justify-stretch gap-6 m-80 p-4">
            <input type="file" onChange={handleChange} accept="/image/*" />
            <Button className="place-content-center" onClick={uploadAndSendAPI}>Upload</Button>
        </div>
    </section>
  )
}