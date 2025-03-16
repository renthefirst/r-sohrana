import { Models } from 'node-appwrite';
import Image from 'next/image';

import { formatDateTime } from '@/lib/utils';
import Thumbnail from '@/components/Thumbnail';
import FormattedDateTime from '@/components/FormattedDateTime';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail extension={file.extension} type={file.type} url={file.url} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="file-details-label text-left">{label}</p>
    <p className="file-details-value text-left">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Формат:" value={file.extension} />
        <DetailRow label="Размер:" value={file.size} />
        <DetailRow label="Владелец:" value={file.owner.fullName} />
        <DetailRow label="Последнее изменение:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface ShareInputProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput =  ({
  file,
  onInputChange,
  onRemove,
}: ShareInputProps) => {

  return (
    <>
      <ImageThumbnail file={file} />

      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">
          Поделиться с другими пользователями
        </p>
        <Input
          type="email"
          placeholder="Введи электронную почту..."
          onChange={(e) => onInputChange(e.target.value.trim().split(','))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Количество пользователей с доступом:</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} 
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="share-remove-user"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
