<template>
  <el-flex direction="vertical">
    <el-menu mode="horizontal" defaultActive="menu1">
      <template #left>
        <el-flex mode="flex" :gutter="12" alignment="center" style="min-width: 160px; margin-right: 12px;">
          <el-text text="应用名称" size="large" style="--custom-start: auto;"></el-text>
        </el-flex>
      </template>
      <el-menu-item index="menu1"><template #default><el-text text="菜单项一"></el-text></template></el-menu-item>
      <el-menu-item index="menu2"><template #default><el-text text="菜单项二"></el-text></template></el-menu-item>
      <el-submenu><template #title><el-text text="子菜单"></el-text></template><template #default><el-menu-item><template
              #default><el-text text="菜单项"></el-text></template></el-menu-item></template></el-submenu>
      <template #right>
        <el-dropdown :hide-on-click="false">
          <el-flex mode="flex" alignment="center" :gutter="12" style="color: #fff;cursor: pointer;">
            <el-image fit="cover" :src="avatarIcon" style="width: 36px; height: 36px;"></el-image>
          </el-flex>
          <template #items>
            <el-dropdown-item>
              <el-text text="安全退出"></el-text>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </template>
    </el-menu>

    <el-menu>
      <el-menu-item index="1"><el-text text="导航一"></el-text></el-menu-item>
      <el-menu-item index="2"><el-text text="导航二"></el-text></el-menu-item>
      <el-menu-item index="3"><el-text text="导航三"></el-text></el-menu-item>
    </el-menu>
  </el-flex>
</template>
<script>
import logoIcon from '../../assets/lcap-logo-light.svg'
import avatarIcon from '../../assets/avatar-default.svg'
export default {
  data() {
    return {
      logoIcon,
      avatarIcon
    }
  },
}
</script>