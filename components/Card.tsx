import Link from 'next/link';
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import { convertFileSize } from '@/lib/utils';
import FormattedDateTime from './FormattedDateTime';
import ActionsDropdown from './ActionsDropdown';

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionsDropdown file={file} />
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className={'body-2 text-light-100'}
        />
        <div className="flex  justify-between caption line-clamp-1 text-light-200">
          <span>Владелец: {file.owner.fullName}</span>
          <span>{convertFileSize(file.size)}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
