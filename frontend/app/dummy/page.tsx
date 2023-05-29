import Link from "next/link"

"use client";

import storage from "./../../../config/firebaseConfig.js"
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { ToastWithAction } from "@/components/ToastWithAction"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import LoginWithIceCream from "@/components/LoginWithIceCream"
import Sidebar from "@/components/sidebar"

import React, { Fragment, useEffect, useState } from 'react';




export default function DummyPage() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [percent, setPercent] = useState(0);

  function handleChange(event) {
      setFile(event.target.files[0]);
  }

  const handleUpload = () => {
      if (!file) {
          alert("Please upload an image first!");
      }

      const storageRef = ref(storage, `/${file.name}`);
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


  const processImage = async (fileName) => {
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
        const imgUrl = response['loc'];
        getDownloadURL(ref(storage, imgUrl))
        .then((url) => {

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
        })
        .catch((error) => {
            console.log(error)
        });
                
  };
  }


  const uploadAndSendAPI = () => {
    // handleUpload()
    processImage(file?.name)
  }


  const fetchImages = async () => {
      const storageRef = await ref(storage, "/");
      const result = await listAll(storageRef);
      const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
      return Promise.all(urlPromises);
  };
      
  const loadImages = async () => {
    const urls = await fetchImages();
    // console.log(urls)
    setFiles(urls);
  };

  useEffect(() => {
    loadImages();
  });
    
  return (
    <section className="flex">
    
    <Sidebar />
    <section className="container">
    <input type="file" onChange={handleChange} accept="/image/*" />
    <Button variant="outline" onClick={uploadAndSendAPI}>Button</Button>
        {/* <FilePreviewList files = {sampleFiles} /> */}
        
    </section>
    </section>
  )
}

