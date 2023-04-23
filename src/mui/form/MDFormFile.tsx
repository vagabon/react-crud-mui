import { ChangeEvent } from 'react';

interface IMDFormFile {
  handleChangeFile: (file: File) => void;
}

const MDFormFile: React.FC<IMDFormFile> = (props: IMDFormFile) => {
  const handleCapture = ({ target }: ChangeEvent<HTMLInputElement & { files: FileList }>) => {
    console.log(target.files[0]);
    props.handleChangeFile(target.files[0]);

    //fileReader.readAsDataURL(target.files[0]);
    //fileReader.onload = (e) => {
    //  e.target && setFile(e.target.result as string);
    //};
  };
  return (
    <>
      <input accept='image/*' className={''} id='news-file' onChange={handleCapture} type='file' />
      <label htmlFor='news-file'></label>
    </>
  );
};

export default MDFormFile;
