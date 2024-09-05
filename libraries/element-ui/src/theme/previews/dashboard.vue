<template>
<el-container style="height: 100vh;">
  <el-header style="padding: 0">
    <el-menu background-color="#545c64" text-color="#fff" style="color: #fff; padding: 0 20px;" active-text-color="#ffd04b" mode="horizontal" defaultActive="menu1">
      <template #left>
        <el-flex mode="flex" :gutter="12" alignment="center" style="min-width: 160px; margin-right: 12px;">
          <el-image fit="cover" :src="Logo" style="width: 28px; height: 28px;"></el-image>
          <el-text text="应用名称" size="large" style="--custom-start: auto;"></el-text>
        </el-flex>
      </template>
      <el-menu-item index="menu1"><template #default><el-text text="顶部导航一"></el-text></template></el-menu-item>
      <el-menu-item index="menu2"><template #default><el-text text="顶部导航二"></el-text></template></el-menu-item>
      <el-submenu index="menu3"><template #title><el-text text="顶部导航三"></el-text></template><template #default><el-menu-item index="men"><template #default><el-text text="菜单项"></el-text></template></el-menu-item></template></el-submenu>
      <template #right>
        <el-flex mode="flex" alignment="center" :gutter="12" style="color: #fff;cursor: pointer;">
          <el-image fit="cover" :src="AvatarDefault" style="width: 36px; height: 36px;"></el-image>
          <el-text text="DEVACC-examtemplate"></el-text>
        </el-flex>
      </template>
      </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu style="height: 100%" defaultActive="1">
        <el-menu-item index="1"><el-text text="Dashboard"></el-text></el-menu-item>
        <el-menu-item index="2"><el-text text="表单页"></el-text></el-menu-item>
        <el-menu-item index="3"><el-text text="导航三"></el-text></el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <el-card shadow="never">
          <el-alert title="Informational Notes 信息提示" type="info" show-icon></el-alert>
          <el-flex style="margin-top: var(--el-comp-margin-l)" mode="flex" justify="space-around">
            <el-statistic
              :value="34"
              title="处理中的申请"
              style="width: auto"
            ></el-statistic>
            <el-statistic
              :value="8"
              title="待处理申请"
              style="width: auto"
            ></el-statistic>
            <el-statistic
              :value="64"
              title="待查看消息"
              style="width: auto"
            ></el-statistic>
            <el-statistic
              :value="3"
              title="异常应用"
              style="width: auto"
            ></el-statistic>
            <el-statistic
              :value="0"
              title="过期租户"
              style="width: auto"
            ></el-statistic>
          </el-flex>
        </el-card>

        <el-card shadow="never" style="margin-top: var(--el-comp-margin-l)">
          <el-text text="资源管控" slot="header"></el-text>
          <el-flex>
            <el-flex style="flex: 1;" alignment="center" direction="horizontal" justify="center">
              <el-progress type="circle" :percentage="63.5"></el-progress>
            </el-flex>
            <el-flex style="flex: 1;" alignment="center" direction="horizontal" justify="center">
              <el-progress type="circle" :percentage="63.5" status="warning"></el-progress>
            </el-flex>
            <el-flex style="flex: 1;" alignment="center" direction="horizontal" justify="center">
              <el-progress type="circle" :percentage="92.5" status="success"></el-progress>
            </el-flex>
          </el-flex>
        </el-card>
        <el-card shadow="never" style="margin-top: var(--el-comp-margin-l)">
          <el-tabs value="first">
            <el-tab-pane label="租户资源" name="first"></el-tab-pane>
            <el-tab-pane label="平台资源" name="second"></el-tab-pane>
          </el-tabs>
          <el-flex style="padding: 0 0 var(--el-comp-margin-l) 0">
            <el-select-pro style="width: 200px;"></el-select-pro>
            <el-button text="查询" type="primary"></el-button>
          </el-flex>

          <el-table-pro
            :data-source="[
              {
                name: '资源名称',
                desc: '资源描述',
                status: 'passed',
              },
              {
                name: '资源名称',
                desc: '资源描述',
                status: 'wait',
              },
              {
                name: '资源名称',
                desc: '资源描述',
                status: 'unpassed',
              },
              {
                name: '资源名称',
                desc: '资源描述',
                status: 'passed',
              },
              {
                name: '资源名称',
                desc: '资源描述',
                status: 'passed',
              },
            ]">
            <el-table-column-pro
              title="资源名称"
              colKey="name"
              width="25%"></el-table-column-pro>
            <el-table-column-pro
              title="资源描述"
              colKey="desc"
              width="25%"></el-table-column-pro>
            <el-table-column-pro
              title="状态"
              colKey="status"
              width="25%">
              <template #cell="scope">
                <el-tag
                  v-if="scope.item.status === 'passed'"
                  type="success"
                  text="通过"></el-tag>
                <el-tag
                  v-if="scope.item.status === 'unpassed'"
                  type="info"
                  text="未通过"></el-tag>
                <el-tag
                  v-if="scope.item.status === 'wait'"
                  type="warning"
                  text="待审批"></el-tag>
              </template>
            </el-table-column-pro>
            <el-table-column-pro
              title="操作"
              colKey="id"
              width="25%">
              <template #cell>
                <div class="text-button">查看详细</div>
              </template>
            </el-table-column-pro>
          </el-table-pro>
        </el-card>
      </el-main>
    </el-container>
    <el-aside>
      <el-card shadow="never" style="margin-top: var(--el-comp-margin-xl)">
        <el-text text="我的应用" slot="header"></el-text>
        <el-flex :gutter="22">
          <el-flex 
            alignment="center" 
            direction="vertical" 
            justify="center"
            v-for="{text, icon} in [
              {icon: 'el-icon-office-building', text: '企业管理'},
              {icon: 'el-icon-platform-eleme', text: '食堂管理'},
              {icon: 'el-icon-user-solid', text: '租户管理'},
              {icon: 'el-icon-cpu', text: '国际化'},
              {icon: 'el-icon-s-goods', text: '采购计划'},
              {icon: 'el-icon-menu', text: '产品库存'}
            ]"
            :key="text"
            >
              <div class="app-icon">
                <el-icon :name="icon"></el-icon>
              </div>
              <el-text size="small">{{ text }}</el-text>
          </el-flex>
        </el-flex>
      </el-card>
      <el-card shadow="never" style="margin-top: var(--el-comp-margin-l)">
        <el-text text="公告" slot="header"></el-text>
        <el-flex>
          <el-flex
            v-for="{label, tagType, text} in [
              {label: '置顶', tagType: 'danger', text: '新版本V3.6上线'},
              {label: '最新', tagType: '', text: '网易内部通过低代码打造一...'},
              {label: '最新', tagType: '', text: 'CodeWave助力国网苏州城'},
              {label: '最新', tagType: '', text: '网易低代码服务平台上线'},
            ]"
            :key="text"
            alignment="center"
          >
            <el-tag size="small" :type="tagType" effect="dark">{{ label }}</el-tag>
            <el-text size="small" overflow="ellipsis">{{ text }}</el-text>
          </el-flex>
        </el-flex>
      </el-card>
      <el-card shadow="never" style="margin-top: var(--el-comp-margin-l);">
        <el-text text="使用帮助" slot="header"></el-text>
        <el-flex>
          <el-text 
            size="normal" 
            :text="text"
            v-for="{text} in [
              {text: '什么是资源监控'},
              {text: '租户资源与平台资源的区别'},
              {text: '应用异常状态如何解决'},
              {text: '租户过期后如何处理'},
              {text: '资产名称重名怎么办'},
              {text: '如何升级应用'},
            ]"
            :key="text"
          ></el-text>
        </el-flex>
      </el-card>
    </el-aside>
  </el-container>
</el-container>
</template>
<script>
import AvatarDefault from '../assets/avatar-default.svg';
import Logo from '../assets/lcap-logo-light.svg'

export default {
  data() {
    return {
      AvatarDefault,
      Logo,
    };
  },
};
</script>
<style>
.dashbord_page_layout {
  padding: var(--space-medium);
  background-color: var(--background-color-disabled-light);
  min-height: 100%;
}

.dashbord_page_layout .main {
  min-height: 100%;
  flex: 1;
}

.dashbord_page_layout .side {
  min-height: 100%;
  width: 285px;
  flex-shrink: 0;
}

.statist-item {
  flex: 1;
}

.statist-item .number {
  line-height: 40px;
  font-size: 32px;
  color: var(--font-fourth-color);
  font-weight: 500;
  text-align: center;
}

.statist-item .desc {
  margin-top: 4px;
  line-height: 22px;
  font-size: var(--font-size-base);
  color: var(--font-second-color);
  text-align: center;
}

.progress-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-item + .divider {
  margin: 0 36px;
  border: none;
  border-left: 1px solid var(--border-color-base);
  height: 40px;
}

.progress-item .text {
  margin-top: 8px;
  font-size: var(--font-size-base);
  color: var(--font-second-color);
  text-align: center;
}

.text-button {
  cursor: pointer;
  color: var(--el-color-primary-6);
}

.app-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--el-color-primary-1);
  color: var(--el-color-primary-6);
}

.app-text {
  font-size: var(--font-size-small);
  color: var(--font-second-color);
  text-align: center;
  white-space: nowrap;
}

.flex-wrap {
  flex-wrap: wrap !important;
}

.flex-shrink {
  flex-shrink: 0;
}

.flex-fill-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  color: var(--font-fourth-color);
}
</style>
