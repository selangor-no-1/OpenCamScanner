"use client";

import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { useEffect, useState } from "react";

const sampleMostRecentFiles = [
    {
      id: '1',
      name: 'Document 1',
      previewImage: require('../../assets/sample.png'),
    },
    {
      id: '2',
      name: 'Image 1',
      previewImage: require('../../assets/sample.png'),
    },
    {
      id: '3',
      name: 'Presentation 1',
      previewImage: require('../../assets/sample.png'),
    },
    // Add more sample files as needed, todo: link them to individual document pages, preview pdf small
];

 
const sampleFiles = [
  {
    name: "CS3230 Assignment 3.pdf",
  },
  {
    name: "April DBS Invoice.pdf",
  },
  {
    name: "CS2111 Finals A01234567.pdf",
  }
]

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-bold">Your Files</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleFiles.map((file) => (
          <TableRow key={file.name}>
            <TableCell className="font-large">{file.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type cardProps = {
  id: string
  name: string
  previewImage: string
}

function DisplayCard( {id, name, previewImage}: cardProps) {
  return (
    <Card key={id} className="items-center">
      <CardContent className="p-4">
        <Image src={previewImage} alt="Card Image" width={300} height={200} className="rounded-lg" />
      </CardContent>
      <CardFooter className="justify-center">{name}</CardFooter>
    </Card>
  )
}

export default function Dashboard() {
  const [files, setFiles] = useState([]);

   useEffect(() => {
      fetch('https://web-production-1361.up.railway.app/list')
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setFiles(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []); // CORS issue

   return (
    <div className="flex">
      <Sidebar />
      <div className="h-12 p-6 text-left align-middle font-medium text-muted-foreground">
      <text className="">Most Recent</text>
      
      <div className="grid grid-flow-col justify-stretch gap-6 p-4">
        {sampleMostRecentFiles.map((item) => (
          <div key={item.id}>
            <DisplayCard {...item} />
          </div>
        ))}
      
      </div>
      <TableDemo />
      </div>
    </div>
  )
}