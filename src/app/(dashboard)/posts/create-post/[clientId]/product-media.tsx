import { useFormContext } from 'react-hook-form';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';

interface ProductMediaProps {
  className?: string;
}

export default function ProductMedia({ className }: ProductMediaProps) {
  const { getValues, setValue } = useFormContext();

  return (
    <FormGroup
      title="Post Media"
      description="Upload your post image here"
      className={cn(className)}
    >
      <UploadZone
        className="col-span-full"
        name="imageUrl"
        getValues={getValues}
        setValue={setValue}
      />
    </FormGroup>
  );
}
