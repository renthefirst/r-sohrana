'use client';
import { MouseEvent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';
import { MAX_FILE_SIZE } from '@/constants';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/actions/files.actions';
import { usePathname } from 'next/navigation';

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const path = usePathname();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          return toast(
            <p className="error-toast body-2 text-white p-3">
              <span className="font-semibold">{file.name}</span> is too large.
              Max file size is 50MB
            </p>
          );
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadFile) => {
            if (uploadFile) {
              setFiles((prev) => prev.filter((f) => f.name !== file.name));
            }
          }
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();

    setFiles((prevFiles) =>
      prevFiles.filter((file: File) => file.name !== fileName)
    );
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn('uploader-button', className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <p>Загрузить</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100 font-semibold">Загрузка...</h4>

          {files.map((file, i) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li key={`${file.name}-${i}`} className="uploader-preview-item">
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="loader"
                    />
                  </div>
                </div>
                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="remove"
                  onClick={(e) => handleRemove(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
