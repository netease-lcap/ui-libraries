import { Ref, ref } from '@vue/composition-api';
import { getFileList } from '../../_common/js/upload/utils';
import { ElUploadProps } from '../type';

export interface UploadDragEvents {
  onDragFileChange?: (files: File[]) => void;
  onDragenter?: ElUploadProps['onDragenter'];
  onDragleave?: ElUploadProps['onDragleave'];
  onDrop?: ElUploadProps['onDrop'];
}

export default function useDrag(props: UploadDragEvents, accept: Ref<string>) {
  const target = ref(null);
  const dragActive = ref(false);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    dragActive.value = false;

    const { files } = event.dataTransfer;
    const dragFiles: File[] = getFileList(files, accept.value);
    if (!dragFiles.length) return;

    props.onDragFileChange?.(dragFiles);
    props.onDrop?.({ e: event });
  };

  const handleDragenter = (event: DragEvent) => {
    event.preventDefault();
    target.value = event.target;
    props.onDragenter?.({ e: event });
    dragActive.value = true;
  };

  const handleDragleave = (event: DragEvent) => {
    if (event.target !== target.value) return;
    event.preventDefault();
    props.onDragleave?.({ e: event });
    dragActive.value = false;
  };

  const handleDragover = (event: DragEvent) => {
    event.preventDefault();
  };

  return {
    target,
    dragActive,
    handleDrop,
    handleDragenter,
    handleDragleave,
    handleDragover,
  };
}
