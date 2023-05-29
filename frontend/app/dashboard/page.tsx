"use client";

import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

const sampleFiles = [
    {
      id: '1',
      name: 'Document 1',
      previewImage: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: '2',
      name: 'Image 1',
      previewImage: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: '3',
      name: 'Presentation 1',
      previewImage: 'https://picsum.photos/id/237/200/300',
    },
    // Add more sample files as needed, todo: link them to individual document pages, preview pdf small
];

type cardProps = {
  id: string
  name: string
  previewImage: string
}

function DisplayCard( {id, name, previewImage}: cardProps) {
  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={previewImage} alt="Card Image" width={200} height={200} className="rounded-lg" />
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="container grid grid-cols-6 gap-6 p-4">
        {sampleFiles.map((item) => (
          <div key={item.id}>
            <DisplayCard {...item} />
          </div>
        ))}
        <Button className="absolute top-15 right-10">Upload Image</Button>
      </div>

    </div>
  )
}