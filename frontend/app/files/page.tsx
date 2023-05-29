import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { ToastWithAction } from "@/components/ToastWithAction"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import LoginWithIceCream from "@/components/LoginWithIceCream"
import Sidebar from "@/components/sidebar"

import React, { Fragment } from 'react';

interface FilePreviewListProps {
  files: File[];
}

const FilePreviewList: React.FC<FilePreviewListProps> = ({ files }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {files.map((file) => (
        <div key={file.id} className="bg-white p-4 shadow rounded">
          <img src={file.previewImage} alt={file.name} className="w-full h-32 object-cover mb-2" />
          <div className="text-gray-800 font-semibold">{file.name}</div>
        </div>
      ))}
    </div>
  );
};

export const Text = () => <Fragment>Most Recent Files</Fragment>;

const sampleFiles: File[] = [
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
    // Add more sample files as needed
  ];

export default function IndexPage() {
  return (
    <section className="flex">
    
    <Sidebar />
    <section className="container">
    <Button variant="outline">Button</Button>
        <Text/>
        <FilePreviewList files = {sampleFiles} />
        
    </section>
    </section>
  )
}
