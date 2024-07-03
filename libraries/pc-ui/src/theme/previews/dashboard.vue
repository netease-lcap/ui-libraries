<template>
  <u-multi-layout
    direction="vertical"
    style="height: 100vh; font-family: var(--font-family-zh-CN)">
    <u-multi-layout-item style="height: 60px; background-color: #000">
      <u-navbar-multi>
        <template #right>
          <u-multi-layout-item alignItems="center" justify="end">
            <u-dropdown style="margin-right: 10px">
              <template #default>
                <u-dropdown-item>
                  <u-text text="安全退出"></u-text>
                </u-dropdown-item>
              </template>
              <template #title>
                <img
                  :src="AvatarDefault"
                  fit="cover"
                  style="
                    width: 36px;
                    height: 36px;
                    vertical-align: middle;
                  "></img>
                <span
                  style="
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 10px;
                    margin-right: 10px;
                  ">
                  <u-text text="DEVACC-examtemplate"></u-text>
                </span>
              </template>
            </u-dropdown>
          </u-multi-layout-item>
        </template>
        <template #left>
          <u-multi-layout-item align-items="center" style="width: 200px">
            <img
              fit="cover"
              :src="Logo"
              style="
                width: 28px;
                height: 28px;
                margin: 16px 14px;
                --custom-start: auto;
                vertical-align: middle;
              "></img>
            <u-text
              size="large"
              text="应用名称"
              style="--custom-start: auto; vertical-align: middle"></u-text>
          </u-multi-layout-item>
        </template>
        <u-navbar-item-multi destination="">
          <u-text text="顶部导航1"></u-text>
        </u-navbar-item-multi>
        <u-navbar-item-multi target="_self">
          <u-text text="顶部导航2"></u-text>
        </u-navbar-item-multi>
      </u-navbar-multi>
    </u-multi-layout-item>
    <u-multi-layout-item>
      <u-multi-layout>
        <u-multi-layout-item style="width: 200px">
          <u-sidebar
            :router="false"
            value="dashboard"
            style="--sidebar-item-icon-color-selected: var(--brand-primary)">
            <u-sidebar-item icon="home" value="dashboard">
              <u-text text="Dashboard"></u-text>
            </u-sidebar-item>
            <u-sidebar-item icon="edit" value="form">
              <u-text text="表单页"></u-text>
            </u-sidebar-item>
          </u-sidebar>
        </u-multi-layout-item>
        <u-multi-layout-item>
          <u-linear-layout
            type="flex"
            direction="horizontal"
            gap="normal"
            class="dashbord_page_layout">
            <u-linear-layout
              type="flex"
              direction="vertical"
              gap="normal"
              class="main">
              <u-panel>
                <u-linear-layout type="flex" direction="vertical" gap="normal">
                  <u-alert
                    type="info"
                    title="Informational Notes 信息提示"></u-alert>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="none">
                    <div class="statist-item">
                      <div class="number">34</div>
                      <div class="desc">处理中的申请</div>
                    </div>
                    <div class="statist-item">
                      <div class="number">8</div>
                      <div class="desc">待处理申请</div>
                    </div>
                    <div class="statist-item">
                      <div class="number">64</div>
                      <div class="desc">待查看消息</div>
                    </div>
                    <div class="statist-item">
                      <div class="number">3</div>
                      <div class="desc">异常应用</div>
                    </div>
                    <div class="statist-item">
                      <div class="number">0</div>
                      <div class="desc">过期租户</div>
                    </div>
                  </u-linear-layout>
                </u-linear-layout>
              </u-panel>
              <u-panel title="资源监控">
                <u-linear-layout
                  type="flex"
                  direction="horizontal"
                  gap="none"
                  alignment="center">
                  <div class="progress-item">
                    <u-circular-progress
                      :percent="65.2"
                      size="large"></u-circular-progress>
                    <div class="text">CPU用量</div>
                  </div>
                  <div class="divider"></div>
                  <div class="progress-item">
                    <u-circular-progress
                      :percent="65.3"
                      size="large"></u-circular-progress>
                    <div class="text">内存用量</div>
                  </div>
                  <div class="divider"></div>
                  <div class="progress-item">
                    <u-circular-progress
                      :percent="96.2"
                      size="large"></u-circular-progress>
                    <div class="text">磁盘用量</div>
                  </div>
                </u-linear-layout>
              </u-panel>
              <u-panel>
                <u-tabs appear="line">
                  <u-tab title="租户资源">
                    <u-linear-layout
                      type="flex"
                      direction="vertical"
                      alignment="stretch"
                      gap="normal">
                      <u-linear-layout
                        type="flex"
                        direction="horizontal"
                        gap="small">
                        <u-select placeholder="请选择状态" value="">
                          <u-select-item value="wait">待审批</u-select-item>
                          <u-select-item value="passed">通过</u-select-item>
                          <u-select-item value="approving"
                            >审批中</u-select-item
                          >
                          <u-select-item value="unpassed">未通过</u-select-item>
                        </u-select>
                        <u-button color="primary" text="查询"></u-button>
                      </u-linear-layout>
                      <u-linear-layout
                        type="flex"
                        direction="vertical"
                        alignment="stretch">
                        <u-table-view
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
                          <u-table-view-column
                            title="资源名称"
                            field="name"
                            width="25%"></u-table-view-column>
                          <u-table-view-column
                            title="资源描述"
                            field="desc"
                            width="25%"></u-table-view-column>
                          <u-table-view-column
                            title="状态"
                            field="status"
                            width="25%">
                            <template #cell="scope">
                              <u-label
                                v-if="scope.value === 'passed'"
                                color="success"
                                text="通过"></u-label>
                              <u-label
                                v-if="scope.value === 'unpassed'"
                                text="未通过"></u-label>
                              <u-label
                                v-if="scope.value === 'wait'"
                                color="warning"
                                text="待审批"></u-label>
                            </template>
                          </u-table-view-column>
                          <u-table-view-column
                            title="操作"
                            field="id"
                            width="25%">
                            <template #cell>
                              <div class="text-button">查看详细</div>
                            </template>
                          </u-table-view-column>
                        </u-table-view>
                      </u-linear-layout>
                    </u-linear-layout>
                  </u-tab>
                  <u-tab title="平台资源">
                    <u-linear-layout
                      type="flex"
                      direction="vertical"
                      alignment="stretch"
                      gap="normal">
                      <u-linear-layout
                        type="flex"
                        direction="horizontal"
                        gap="small">
                        <u-select placeholder="请选择状态" value="">
                          <u-select-item value="wait">待审批</u-select-item>
                          <u-select-item value="passed">通过</u-select-item>
                          <u-select-item value="approving"
                            >审批中</u-select-item
                          >
                          <u-select-item value="unpassed">未通过</u-select-item>
                        </u-select>
                        <u-button color="primary" text="查询"></u-button>
                      </u-linear-layout>
                      <u-linear-layout
                        type="flex"
                        direction="vertical"
                        alignment="stretch">
                        <u-table-view
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
                          <u-table-view-column
                            title="资源名称"
                            field="name"
                            width="25%"></u-table-view-column>
                          <u-table-view-column
                            title="资源描述"
                            field="desc"
                            width="25%"></u-table-view-column>
                          <u-table-view-column
                            title="状态"
                            field="status"
                            width="25%">
                            <template #cell="scope">
                              <u-label
                                v-if="scope.value === 'passed'"
                                color="success"
                                text="通过"></u-label>
                              <u-label
                                v-if="scope.value === 'unpassed'"
                                text="未通过"></u-label>
                              <u-label
                                v-if="scope.value === 'wait'"
                                color="warning"
                                text="待审批"></u-label>
                            </template>
                          </u-table-view-column>
                          <u-table-view-column
                            title="操作"
                            field="id"
                            width="25%">
                            <template #cell>
                              <div class="text-button">查看详细</div>
                            </template>
                          </u-table-view-column>
                        </u-table-view>
                      </u-linear-layout>
                    </u-linear-layout>
                  </u-tab>
                </u-tabs>
              </u-panel>
            </u-linear-layout>
            <u-linear-layout
              type="flex"
              direction="vertical"
              gap="normal"
              class="side">
              <u-panel title="我的应用">
                <u-linear-layout
                  type="flex"
                  direction="horizontal"
                  gap="normal"
                  class="flex-wrap">
                  <u-linear-layout
                    type="flex"
                    direction="vertical"
                    alignment="center"
                    gap="mini">
                    <div class="app-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="none"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 20.000102996826172 20.000102996826172">
                        <g>
                          <path
                            d="M5.416035625,5.8333940234375C5.416035625,5.6032740234375,5.602585625,5.416724023437499,5.832705625,5.416724023437499L9.999395625,5.416724023437499C10.229515625,5.416724023437499,10.416065625,5.6032740234375,10.416065625,5.8333940234375C10.416065625,6.0635140234375005,10.229515625,6.2500640234375,9.999395625,6.2500640234375L5.832705625,6.2500640234375C5.602585625,6.2500640234375,5.416035625,6.0635140234375005,5.416035625,5.8333940234375M5.416015625,9.333404023437499C5.416015625,9.103294023437499,5.602555625,8.9167440234375,5.832675625,8.9167440234375L9.999355625,8.9167440234375C10.229475625,8.9167440234375,10.416015625,9.103294023437499,10.416015625,9.333404023437499C10.416015625,9.563514023437499,10.229475625,9.7500640234375,9.999355625,9.7500640234375L5.832675625,9.7500640234375C5.602555625,9.7500640234375,5.416015625,9.563514023437499,5.416015625,9.333404023437499M5.416015625,12.8333740234375C5.416015625,12.6032740234375,5.602555625,12.4167740234375,5.832675625,12.4167740234375L9.999355625,12.4167740234375C10.229475625,12.4167740234375,10.416015625,12.6032740234375,10.416015625,12.8333740234375C10.416015625,13.0634740234375,10.229475625,13.2500740234375,9.999355625,13.2500740234375L5.832675625,13.2500740234375C5.602555625,13.2500740234375,5.416015625,13.0634740234375,5.416015625,12.8333740234375M17.499415624999997,17.0834740234375L17.499415624999997,7.5000640234375C17.499415624999997,7.2699440234375,17.312915625000002,7.0833940234375,17.082715625,7.0833940234375L14.582715625,7.0833940234375C14.352615625,7.0833940234375,14.166115625,7.2699440234375,14.166115625,7.5000640234375L14.166115625,17.0834740234375L13.332715625,17.0834740234375L13.332715625,2.9179620234375C13.332715625,2.4580060234375,12.960615625,2.0847517034375,12.500615625,2.0833740234375L3.3314456249999997,2.0833740234375C2.871205625,2.0840637244375,2.498662625,2.4577220234375,2.499353625,2.9179620234375L2.499353625,17.0834740234375L2.082683625,17.0834740234375C1.852564625,17.0834740234375,1.666015625,17.2699740234375,1.666015625,17.5000740234375C1.666015625,17.730274023437502,1.852564625,17.916774023437497,2.082683625,17.916774023437497L17.916115625,17.916774023437497C18.146215625,17.916774023437497,18.332815625,17.730274023437502,18.332815625,17.5000740234375C18.332815625,17.2699740234375,18.146215625,17.0834740234375,17.916115625,17.0834740234375L17.499415624999997,17.0834740234375Z"
                            fill="currentColor"
                            fill-opacity="1" />
                        </g>
                      </svg>
                    </div>
                    <span class="app-text">企业管理</span>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="vertical"
                    alignment="center"
                    gap="mini">
                    <div class="app-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="none"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20">
                        <g>
                          <path
                            d="M18.0819,15.7964L1.918666,15.7964C1.410479,15.7964,1,16.177500000000002,1,16.6485C1,17.1189,1.410479,17.5,1.918666,17.5L18.0813,17.5C18.589,17.5,19,17.1189,19,16.6485C19,16.1781,18.589,15.7964,18.0813,15.7964L18.0819,15.7964ZM1.560227,13.2525C1.560227,13.7213,1.9372509999999998,14.1024,2.40455,14.1024C2.4226,14.1024,2.4411899999999997,14.1024,2.4592400000000003,14.1008L17.5354,14.1008C17.5535,14.1024,17.5721,14.1024,17.5901,14.1024C18.0553,14.1024,18.4345,13.7229,18.4345,13.2525C18.4345,13.2044,18.4361,13.1573,18.4361,13.1087C18.4361,8.85687,15.2244,5.3480799999999995,11.0713,4.8247599999999995C11.2784,4.57887,11.4059,4.26081,11.4059,3.91175C11.4056,3.130515,10.77528,2.49793502,9.9992,2.50000500455C9.22415,2.50000323858,8.59535,3.131546,8.593589999999999,3.91175C8.593589999999999,4.25867,8.71838,4.57726,8.92601,4.8247599999999995C4.77078,5.3438099999999995,1.55704,8.855260000000001,1.55704,13.1087C1.55704,13.1573,1.55704,13.206,1.558633,13.253L1.560757,13.253L1.560227,13.2525ZM10.86796,6.92394C10.97416,6.57915,11.3576,6.38244,11.7202,6.484C13.6425,7.02764,15.2462,8.327670000000001,16.1208,10.04945C16.2865,10.37445,16.1431,10.76361,15.8022,10.92183C15.7089,10.96494,15.6075,10.98719,15.5048,10.98705C15.2505,10.98705,15.0046,10.85127,14.8878,10.61821C14.1805,9.2241,12.8826,8.17371,11.3294,7.73324C10.96672,7.63168,10.76122,7.26872,10.86742,6.92394L10.86796,6.92394Z"
                            fill="currentColor"
                            fill-opacity="1" />
                        </g>
                      </svg>
                    </div>
                    <span class="app-text">食堂管理</span>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="vertical"
                    alignment="center"
                    gap="mini">
                    <div class="app-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="none"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20">
                        <g>
                          <path
                            d="M12.916015625,2.44140625C10.844935625,2.44140625,9.166015625,4.12057625,9.166015625,6.19140625C9.166015625,8.26223625,10.844935625,9.94140625,12.916015625,9.94140625C14.987115625,9.94140625,16.666015625,8.26223625,16.666015625,6.19140625C16.666015625,4.12057625,14.987115625,2.44140625,12.916015625,2.44140625ZM6.666015625,3.27473925C4.825095624999999,3.27473925,3.332685625,4.76723625,3.332685625,6.60807625C3.332685625,8.44890625,4.825095624999999,9.94140625,6.666015625,9.94140625C7.357185625,9.94140625,7.988095625,9.75142625,8.543345625,9.36309625C7.119345625,7.24642625,7.321185625,5.21973625,8.097265625,3.58723625C7.654015625,3.37723925,7.167185625,3.27473925,6.666015625,3.27473925ZM4.218095625,11.06139625C2.689685625,11.69223625,1.666015625,13.23810625,1.666015625,14.94140625C1.666015625,14.94140625,1.666015625,16.60810625,1.666015625,16.60810625C1.666015625,17.06810625,2.039098625,17.44140625,2.499348625,17.44140625C2.499348625,17.44140625,5.960015625,17.44310625,5.960015625,17.44310625C5.765015625,16.809706249999998,5.822345625,15.78310625,5.835185625,14.95220625C5.862265625,13.18810625,6.591845625,11.92971625,6.877595625,11.59805625C6.352435625,11.59388625,5.722185625,11.46639625,5.259765625,11.26973625C5.148095625,11.22223625,5.083265625,11.18473625,4.869185625,11.08723625C4.659265625,10.99140625,4.431265625,10.97306625,4.218095625,11.06139625ZM10.051435625,11.06139625C8.523015625,11.69223625,7.499345625,13.23810625,7.499345625,14.94140625C7.499345625,14.94140625,7.499345625,16.60810625,7.499345625,16.60810625C7.499345625,17.06810625,7.872435625,17.44140625,8.332685625,17.44140625C8.332685625,17.44140625,17.499315625,17.44140625,17.499315625,17.44140625C17.959615625,17.44140625,18.332715625,17.06810625,18.332715625,16.60810625C18.332715625,16.60810625,18.332715625,14.94140625,18.332715625,14.94140625C18.332715625,13.27810625,17.303315625,11.76974625,15.780615625,11.11307625C15.566215625,11.02057625,15.316515625,11.01807625,15.103515625,11.11307625C14.366215625,11.44390625,13.647815625,11.60807625,12.916015625,11.60807625C12.186715625,11.60807625,11.465845625,11.43473625,10.702515625,11.08723625C10.492595625,10.99140625,10.264595625,10.97306625,10.051435625,11.06139625Z"
                            fill="currentColor"
                            fill-opacity="1" />
                        </g>
                      </svg>
                    </div>
                    <span class="app-text">租户管理</span>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="vertical"
                    alignment="center"
                    gap="mini"
                    style="margin-right: 0">
                    <div class="app-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="none"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20">
                        <g>
                          <path
                            d="M9.99890625,1.678466796875C8.92140625,1.678466796875,7.70641625,4.970126796875,7.55057625,9.178456796875C7.55057625,9.178456796875,12.44720625,9.178456796875,12.44720625,9.178456796875C12.29140625,4.970966796875,11.07640625,1.678466796875,9.99890625,1.678466796875ZM7.36889625,2.095132796875C4.29639625,3.119296796875,1.98307325,5.929296796875,1.69140625,9.178456796875C1.69140625,9.178456796875,5.88390625,9.178456796875,5.88390625,9.178456796875C5.97640625,6.312626796875,6.49389625,3.770966796875,7.36889625,2.095132796875ZM12.62890625,2.095132796875C13.50390625,3.770966796875,14.02140625,6.312626796875,14.11390625,9.178456796875C14.11390625,9.178456796875,18.28060625,9.178456796875,18.28060625,9.178456796875C17.97890625,5.890956796875,15.73140625,3.137626796875,12.62890625,2.095132796875ZM1.71724445,10.845116796875C2.01724425,14.184266796875,4.335566249999999,16.920066796875,7.39473625,17.928466796875C6.52056625,16.252566796875,5.97640625,13.710966796875,5.88390625,10.845116796875C5.88390625,10.845116796875,1.71724445,10.845116796875,1.71724445,10.845116796875ZM7.55057625,10.845116796875C7.70641625,15.052566796875,8.92140625,18.345066796875,9.99890625,18.345066796875C11.07640625,18.345066796875,12.29140625,15.053466796875,12.44720625,10.845116796875C12.44720625,10.845116796875,7.55057625,10.845116796875,7.55057625,10.845116796875ZM14.11390625,10.845116796875C14.02140625,13.710966796875,13.47720625,16.252566796875,12.60310625,17.928466796875C15.74560625,16.859266796874998,17.97390625,14.078466796875,18.28060625,10.845116796875C18.28060625,10.845116796875,14.11390625,10.845116796875,14.11390625,10.845116796875Z"
                            fill="currentColor"
                            fill-opacity="1" />
                        </g>
                      </svg>
                    </div>
                    <span class="app-text">国际化</span>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="vertical"
                    alignment="center"
                    gap="mini"
                    style="margin-top: var(--space-base)">
                    <div class="app-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="none"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20">
                        <g>
                          <path
                            d="M4.998046875,2.49224853515625C3.617206875,2.49224853515625,2.498046875,3.61149853515625,2.498046875,4.99224853515625C2.498046875,4.99224853515625,2.498046875,6.65891853515625,2.498046875,6.65891853515625C2.498046875,6.65891853515625,2.498046875,14.15894853515625,2.498046875,14.15894853515625C2.498046875,15.99974853515625,3.9905468749999997,17.49224853515625,5.831376875,17.49224853515625C5.831376875,17.49224853515625,14.164646875,17.49224853515625,14.164646875,17.49224853515625C16.005546875,17.49224853515625,17.498046875,15.99974853515625,17.498046875,14.15894853515625C17.498046875,14.15894853515625,17.498046875,6.65891853515625,17.498046875,6.65891853515625C17.498046875,6.19866853515625,17.124646875,5.82557853515625,16.664646875000003,5.82557853515625C16.664646875000003,5.82557853515625,14.245546875,5.82557853515625,12.498026875,5.82557853515625C11.868866875,5.82557853515625,11.666366875,5.62149853515625,11.169706875,4.62766853515625C10.417206875,3.12149853515625,9.785536875,2.49224853515625,8.331366875,2.49224853515625C8.331366875,2.49224853515625,4.998046875,2.49224853515625,4.998046875,2.49224853515625ZM4.998046875,4.15891853515625C4.998046875,4.15891853515625,8.331366875,4.15891853515625,8.331366875,4.15891853515625C8.960536874999999,4.15891853515625,9.163026875,4.36299853515625,9.659696875,5.35682853515625C9.768026875,5.57441853515625,9.813036875,5.64382853515625,9.919706875,5.82557853515625C7.048046875,5.82557853515625,4.985546875,5.82557853515625,4.164706875,5.82557853515625C4.164706875,5.82557853515625,4.164706875,4.99224853515625,4.164706875,4.99224853515625C4.164706875,4.53199853515625,4.538046875,4.15891853515625,4.998046875,4.15891853515625ZM9.998036875,9.15891853515625C10.458036875000001,9.15891853515625,10.831366875,9.53224853515625,10.831366875,9.99224853515625C10.831366875,9.99224853515625,10.831366875,10.82557853515625,10.831366875,10.82557853515625C10.831366875,10.82557853515625,11.664696875,10.82557853515625,11.664696875,10.82557853515625C12.124696875,10.82557853515625,12.498026875,11.19891853515625,12.498026875,11.65891853515625C12.498026875,12.11891853515625,12.124696875,12.49224853515625,11.664696875,12.49224853515625C11.664696875,12.49224853515625,10.831366875,12.49224853515625,10.831366875,12.49224853515625C10.831366875,12.49224853515625,10.831366875,13.32554853515625,10.831366875,13.32554853515625C10.831366875,13.78554853515625,10.458036875000001,14.15894853515625,9.998036875,14.15894853515625C9.538036875,14.15894853515625,9.164706875,13.78554853515625,9.164706875,13.32554853515625C9.164706875,13.32554853515625,9.164706875,12.49224853515625,9.164706875,12.49224853515625C9.164706875,12.49224853515625,8.331366875,12.49224853515625,8.331366875,12.49224853515625C7.871366875,12.49224853515625,7.498036875,12.11891853515625,7.498036875,11.65891853515625C7.498036875,11.19891853515625,7.871366875,10.82557853515625,8.331366875,10.82557853515625C8.331366875,10.82557853515625,9.164706875,10.82557853515625,9.164706875,10.82557853515625C9.164706875,10.82557853515625,9.164706875,9.99224853515625,9.164706875,9.99224853515625C9.164706875,9.53224853515625,9.538036875,9.15891853515625,9.998036875,9.15891853515625Z"
                            fill="currentColor"
                            fill-opacity="1" />
                        </g>
                      </svg>
                    </div>
                    <span class="app-text">采购计划</span>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="vertical"
                    alignment="center"
                    gap="mini"
                    style="margin-top: var(--space-base)">
                    <div class="app-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="none"
                        version="1.1"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20">
                        <g>
                          <path
                            d="M9.9790528125,2.49256703415625C9.3832128125,2.49923370515625,8.8065428125,2.61923853515625,8.3640428125,2.83090553515625C7.5977128125,3.19840553515625,3.3382158125,5.33090853515625,3.3382158125,5.33090853515625C4.7777128125,6.05090853515625,8.5382128125,7.93090853515625,9.0148728125,8.16924853515625C9.534042812500001,8.428408535156251,10.4757128125,8.429248535156251,10.9948828125,8.16924853515625C10.9948828125,8.16924853515625,16.7231828125,5.35755853515625,16.7231828125,5.35755853515625C16.7240828125,5.35755853515625,12.8948828125,3.41590553515625,11.6973828125,2.83090553515625C11.1907128125,2.58340533515625,10.5740528125,2.48590036515625,9.9790528125,2.49256703415625ZM2.5048828125,6.65923853515625C2.5048828125,6.65923853515625,2.5048828125,12.44089853515625,2.5048828125,12.44089853515625C2.5049661458,13.44834853515625,3.1877968125000002,14.54254853515625,4.0933828125,14.99254853515625C4.0933828125,14.99254853515625,9.1715428125,17.49254853515625,9.1715428125,17.49254853515625C9.1715428125,17.49254853515625,9.1715428125,9.914238535156251,9.1715428125,9.914238535156251C8.9407128125,9.882578535156249,8.5173828125,9.755918535156251,8.2600428125,9.62757853515625C8.2600428125,9.62757853515625,2.9736328125,6.99757853515625,2.9736328125,6.99757853515625C2.6651328125,6.84423853515625,2.5048828125,6.65923853515625,2.5048828125,6.65923853515625ZM17.5048828125,6.65923853515625C17.5048828125,6.65923853515625,17.3448828125,6.84423853515625,17.0365828125,6.99757853515625C17.0365828125,6.99757853515625,11.7498828125,9.62757853515625,11.7498828125,9.62757853515625C11.4923828125,9.755918535156251,11.0690428125,9.882578535156249,10.8382128125,9.914238535156251C10.8382128125,9.914238535156251,10.8382128125,17.49254853515625,10.8382128125,17.49254853515625C10.8382128125,17.49254853515625,15.9165828125,14.99254853515625,15.9165828125,14.99254853515625C16.8215828125,14.54254853515625,17.5048828125,13.44834853515625,17.5048828125,12.44089853515625C17.5048828125,12.44089853515625,17.5048828125,6.65923853515625,17.5048828125,6.65923853515625Z"
                            fill="currentColor"
                            fill-opacity="1" />
                        </g>
                      </svg>
                    </div>
                    <span class="app-text">产品库存</span>
                  </u-linear-layout>
                </u-linear-layout>
              </u-panel>
              <u-panel title="公告">
                <u-linear-layout type="flex" direction="vertical" gap="normal">
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <u-label
                      class="flex-shrink"
                      color="error"
                      text="置顶"></u-label>
                    <div class="flex-fill-text">新版本V3.6上线</div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <u-label
                      class="flex-shrink"
                      color="primary"
                      text="最新"></u-label>
                    <div class="flex-fill-text">
                      网易内部通过低代码打造一网易内部通过低代码打造一...
                    </div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <u-label
                      class="flex-shrink"
                      color="primary"
                      text="最新"></u-label>
                    <div class="flex-fill-text">CodeWave助力国网苏州城</div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <u-label
                      class="flex-shrink"
                      color="primary"
                      text="最新"></u-label>
                    <div class="flex-fill-text">网易低代码服务平台上线</div>
                  </u-linear-layout>
                </u-linear-layout>
              </u-panel>
              <u-panel title="使用帮助" style="height: 362px">
                <u-linear-layout type="flex" direction="vertical" gap="normal">
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <div class="flex-fill-text">什么是资源监控</div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <div class="flex-fill-text">租户资源与平台资源的区别</div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <div class="flex-fill-text">应用异常状态如何解决</div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <div class="flex-fill-text">租户过期后如何处理</div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <div class="flex-fill-text">资产名称重名怎么办</div>
                  </u-linear-layout>
                  <u-linear-layout
                    type="flex"
                    direction="horizontal"
                    gap="small">
                    <div class="flex-fill-text">如何升级应用</div>
                  </u-linear-layout>
                </u-linear-layout>
              </u-panel>
            </u-linear-layout>
          </u-linear-layout>
        </u-multi-layout-item>
      </u-multi-layout>
    </u-multi-layout-item>
  </u-multi-layout>
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
  color: var(--brand-primary);
}

.app-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--brand-primary-lightest);
  color: var(--brand-primary);
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
