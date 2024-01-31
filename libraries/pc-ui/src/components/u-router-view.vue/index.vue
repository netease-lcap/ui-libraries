<template>
    <div :class="$style.fake" v-if="$env.VUE_APP_DESIGNER" :designer="$env.VUE_APP_DESIGNER && designer">
        <div :class="$style.fakeRouter">
          <router-view></router-view>
        </div>
        <div :class="$style.fakeEmpty">
          <span>此容器为子页面呈现占位，可在子页面编辑内容</span>
          <div :class="$style.tooltip" v-if="inAbsoluteLayout">
            <span :class="$style.tooltipIcon"></span>
            <span>温馨提示</span>
            <u-tooltip :class="$style.tooltipContent" trigger="hover" size="large">
              <div>
                自由布局中子组件相互独立。若希望下方内容位置随子页面发布后实际高度变化，可将其放入自由布局容器，再将容器和子页面设置为“纵向线性布局”。
              </div>
              <div :class="$style.tipImg"></div>
            </u-tooltip>
          </div>
        </div>
    </div>
    <router-view v-else-if="disableKeepAlive"></router-view>
    <keep-alive v-else>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
export default {
    name: 'u-router-view',
    inject: {
      inAbsoluteLayout: {
        type: Boolean,
        default: false,
      },
    },
    props: {
        designer: { type: Boolean, default: true },
        disableKeepAlive: { type: Boolean, default: true },
    },
};
</script>

<style module>
.fakeEmpty {
    min-height: 32px;
    text-align: center;
    display: none;
}
.fake[designer] .fakeEmpty {
    background: linear-gradient(-45deg, white 25%,
    #f3f5fa 25%, #f3f5fa 50%,
    white 50%, white 75%,
    #f3f5fa 75%);
    background-size: 45px 45px !important;
    background-repeat: repeat !important;
    font-size: 12px;
    color: var(--font-second-color);
}
.fakeRouter:empty + .fakeEmpty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tooltip {
  color: var(--brand-primary);
  margin-left: 4px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  height: 22px;
  border: 1px solid #DADEE8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 150ms;
}

.tooltip:hover {
  border-color: var(--brand-primary);
  background-color: var(--brand-primary-lightest);
}

.tooltipContent [class^=u-tooltip_body] {
  max-width: 456px !important;
  max-height: 285px !important;
}
.tooltipIcon {
  background: url(./assets/info.png) no-repeat;
  background-size: cover;
  width: 16px;
  height: 16px;
  margin-right: 2px;
}

.tipImg {
  background: url(./assets/bg.png) no-repeat;
  background-size: cover;
  width: 100%;
  height: 225px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
