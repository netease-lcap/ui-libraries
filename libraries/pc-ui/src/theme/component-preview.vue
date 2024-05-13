<template>
  <div
    :id="name"
    :class="$style.sectionContainer"
    :selected="actived ? true : false"
    v-on="$listeners">
    <div :class="$style.sectionTitle">
      {{ title }}
    </div>
    <hr style="margin: 0" />
    <div :class="$style.sectionBody">
      <component :is="demo"></component>
    </div>
  </div>
</template>
<script>
export default {
  props: ['demo', 'actived', 'title', 'name'],
};
</script>
<style module>
.sectionContainer {
  margin: 0 0 20px 0;
  background: white;
  border: 1.5px solid #e7e8eb;
  box-sizing: border-box;
}

.sectionContainer:hover {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
}

.sectionContainer[selected='selected'] {
  border: 1.5px solid #4c88ff;
}

.sectionContainer [class^='u-carousel__'] {
  max-width: 100%;
}

.sectionTitle,
.sectionBody {
  padding: 24px;
}

.sectionTitle {
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
}

.componentClassTitle {
  margin-bottom: 16px;
  height: 14px;
  line-height: 14px;
  color: #666666;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}
</style>
