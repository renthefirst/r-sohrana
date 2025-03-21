import { Models } from 'node-appwrite';

import { getFiles } from '@/lib/actions/files.actions';
import {
  convertFileSize,
  getFileTypesParams,
  getRussianType,
} from '@/lib/utils';
import Sort from '@/components/Sort';
import Card from '@/components/Card';

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || '';
  const searchText = ((await searchParams)?.query as string) || '';
  const sort = ((await searchParams)?.sort as string) || '';

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  const totalSize = files.documents.reduce(
    (sum: number, { size }: { size: number }) => sum + size,
    0
  );

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{getRussianType(type)}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Всего: <span className="h5">{convertFileSize(totalSize)}</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">
              Сортировать:
            </p>

            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">Нет загруженных файлов</p>
      )}
    </div>
  );
};

export default Page;
