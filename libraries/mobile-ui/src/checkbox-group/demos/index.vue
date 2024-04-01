<template>
  <demo-section>
    <demo-block title="基础使用">
      <van-checkbox-group
        @change="onGroupChange"
        direction="horizontal"
      >
        <van-checkbox title="选框1"></van-checkbox>
        <van-checkbox title="选框2"></van-checkbox>
        <van-checkbox title="选框3"></van-checkbox>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="基础使用--多选项配置label">
      <van-checkbox-group
        @change="onGroupChange"
        direction="horizontal"
      >
        <van-checkbox title="选框1" label="1"></van-checkbox>
        <van-checkbox title="选框2" label="2"></van-checkbox>
        <van-checkbox title="选框3" label="3"></van-checkbox>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="数据源">
      <van-checkbox-group
        :data-source="[1, 2, 3]"
        @change="onGroupChange"
        direction="horizontal"
      >
        <template #item="current">
          <van-checkbox
            :title="'选项' + current.item"
          ></van-checkbox>
        </template>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="数据源--多选项配置label">
      <van-checkbox-group
        :data-source="[0, 1, 2]"
        @change="onGroupChange"
        direction="horizontal"
      >
        <template #item="current">
          <van-checkbox
            :title="'选项' + current.item"
            :label="current.item"
          ></van-checkbox>
        </template>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="数据源--配置值字段">
      <van-checkbox-group
        :data-source="[{id: 1, name: '选项1'}, {id: 2, name: '选项2'}, {id: 3, name: '选项3'}]"
        value-field="id"
        @change="onGroupChange"
        direction="horizontal"
      >
        <template #item="current">
          <van-checkbox
            :title="current.item.name"
          ></van-checkbox>
        </template>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="数据源混合静态多选项">
      <van-checkbox-group
        :data-source="[{ id: 1, name: '选项1' }, { id: 2, name: '选项2' }, { id: 3, name: '选项3' }]"
        value-field="id"
        @change="onGroupChange"
        direction="horizontal"
      >
        <template #item="current">
          <van-checkbox
            :title="current.item.name"
          ></van-checkbox>
        </template>

        <van-checkbox title="静态框4" label="4"></van-checkbox>
        <van-checkbox title="静态框5" label="5"></van-checkbox>
      </van-checkbox-group>
    </demo-block>


    <demo-block title="转换器--none">
      <van-checkbox-group
        :data-source="[1, 2, 3]"
        converter="none"
        @change="onGroupChange"
        direction="horizontal"
      >
        <template #item="current">
          <van-checkbox
            :title="'选项' + current.item"
          ></van-checkbox>
        </template>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="预览模式">
      <van-checkbox-group
        preview
        :value="[1, 2, 4]"
        direction="horizontal"
        :data-source="[4,5]"
        :column="3"
      >
        <van-checkbox :label="1" title="选框1"></van-checkbox>
        <van-checkbox :label="2" title="选框2"></van-checkbox>
        <van-checkbox :label="3" title="选框3"></van-checkbox>

        <template #item="current">
          <van-checkbox
            :label="current.item"
            :title="'选项' + current.item"
          ></van-checkbox>
        </template>
      </van-checkbox-group>
    </demo-block>

  </demo-section>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  methods: {
    onGroupChange(e) {
      console.log('onGroupChange', e);
    },
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-checkbox {
  background: @white;

  .van-checkbox {
    margin: 0 0 8px 20px;
  }

  .van-cell {
    .van-checkbox {
      margin: 0;
    }
  }

  img {
    height: 20px;
  }

  &-buttons {
    margin-top: @padding-md;

    .van-button {
      margin-left: @padding-md;
    }
  }

  .van-doc-demo-block__title {
    margin-top: -8px;
  }
}
</style>
