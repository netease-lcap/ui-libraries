import { defineComponent, ref } from 'vue';
import { saveAs } from 'file-saver';
import { ElIcon, ElText } from '@/index';

export default defineComponent({
  name: 'fileTemplate',
  props: {
    file: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
    onRemove: {
      type: Function,
      required: true,
    },
    onDownload: {
      type: Function,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    deleteIcon: {
      type: String,
      default: 'close',
    },
  },
  setup(props) {
    const isHovered = ref(false);

    // 下载文件方法
    const handleDownload = () => {

      saveAs(props.file.url, props.file.name);
    };

    return () => {
      const { file } = props;
      const isSuccess = file.status === 'success';
      // const isUploading = file.status === 'uploading';
      const isFail = file.status === 'fail';

      return (
        <div
          class="el-upload-list__item"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 0',
            transition: 'all 0.3s',
            position: 'relative',
          }}
          onMouseenter={() => {
            isHovered.value = true;
          }}
          onMouseleave={() => {
            isHovered.value = false;
          }}
        >
          {/* 文件图标 */}
          <ElIcon style={{ margin: '0 8px', fontSize: '16px', color: '#909399' }} name="document" />

          {/* 文件名 */}
          <ElText
            text={file.name}
            style={{
              flex: 1,
              marginRight: '8px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          />

          {/* 成功状态：显示勾选图标 */}
          {isSuccess && !isHovered.value && (
            <ElIcon
              name="CircleCheck"
              style={{
                color: '#67c23a',
                fontSize: '16px',
                marginRight: '8px',
              }}
            />
          )}

          {/* 失败状态：显示错误图标 */}
          {isFail && (
            <ElIcon
              name="CircleClose"
              style={{
                color: '#f56c6c',
                fontSize: '16px',
                marginRight: '8px',
              }}
            />
          )}

          {/* Hover 状态：显示操作按钮 */}
          {isHovered.value && isSuccess && (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              {/* 下载按钮 */}
              <ElIcon
                name="Download"
                style={{
                  fontSize: '16px',
                  marginRight: '8px',
                  cursor: 'pointer',
                  color: '#409eff',
                }}
                onClick={(e: Event) => {
                  if (props.disabled) {
                    return;
                  }
                  e.stopPropagation();
                  handleDownload();
                }}
              />
              {/* 删除按钮 */}
              <ElIcon
                name={props.deleteIcon}
                style={{
                  fontSize: '16px',
                  marginRight: '4px',
                  cursor: 'pointer',
                  color: '#909399',
                }}
                onClick={(e: Event) => {
                  if (props.disabled) {
                    return;
                  }
                  e.stopPropagation();
                  props.onRemove(props.file, props.index);
                }}
              />
            </div>
          )}
        </div>
      );
    };
  },
});
