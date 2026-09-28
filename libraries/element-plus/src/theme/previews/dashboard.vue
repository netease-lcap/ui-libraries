<template>
  <Layout>
    <div class="container">
      <div class="main">
        <XPanel>
          <div class="welcome-card">
            <el-text text="Hi，Welcome!" class="welcome-card-title"></el-text>
            <el-text text="欢迎来到工单管理系统，您可以在此处查看项目整体情况" class="welcome-card-desc"></el-text>
          </div>
        </XPanel>
        <div class="row-cards">
          <div class="row-card">
            <XPanel>
              <div class="todo-statistic-card">
                <div class="todo-statistic-card-main">
                  <el-text text="已完成工单数" class="todo-statistic-card-title"></el-text>
                  <div class="todo-statistic-card-main-value">
                    <el-text text="1200" class="todo-statistic-card-main-value-title"></el-text>
                    <el-text text="+1.30%" class="todo-statistic-card-main-value-percent color-success"></el-text>
                  </div>
                  <el-text text="已解决、关闭、取消" class="todo-statistic-card-main-desc"></el-text>
                </div>
                <div class="todo-statistic-card-status">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="var(--el-color-primary)" fill-opacity="0.1" />
                    <path
                      d="M20 11C17.4821 11 15.2073 12.0326 13.5727 13.7C12.811 14.477 12.1895 15.3908 11.7484 16.4004C11.4989 16.9714 11.307 17.5734 11.18 18.1989C11.0621 18.78 11 19.3823 11 20C11 24.9706 15.0294 29 20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11ZM12.1445 12.3C14.1397 10.2646 16.9231 9 20 9C26.0751 9 31 13.9249 31 20C31 26.0751 26.0751 31 20 31C13.9249 31 9 26.0751 9 20C9 19.2479 9.07563 18.5124 9.22002 17.8011C9.37544 17.0354 9.61036 16.2986 9.91573 15.5996C10.4555 14.3643 11.215 13.248 12.1445 12.3Z"
                      fill="var(--el-color-primary)" />
                    <path
                      d="M14.7853 19.2148C15.1526 18.8023 15.7847 18.7658 16.1971 19.1331L18.7525 21.4091L23.5984 16.4796C23.9843 16.0845 24.6174 16.077 25.0125 16.4629C25.4076 16.8488 25.4151 17.4819 25.0292 17.877L19.5161 23.4898C19.1427 23.8721 18.5346 23.8933 18.1356 23.5378L14.8669 20.6266C14.4545 20.2593 14.418 19.6272 14.7853 19.2148Z"
                      fill="var(--el-color-primary)"
                      fill-opacity="0.5" />
                  </svg>
                </div>
              </div>
            </XPanel>
          </div>
          <div class="row-card">
            <XPanel>
              <div class="todo-statistic-card">
                <div class="todo-statistic-card-main">
                  <el-text text="未响应工单数" class="todo-statistic-card-title"></el-text>
                  <div class="todo-statistic-card-main-value">
                    <el-text text="1200" class="todo-statistic-card-main-value-title"></el-text>
                    <el-text text="+1.30%" class="todo-statistic-card-main-value-percent color-error"></el-text>
                  </div>
                  <el-text text="新建、重新打开" class="todo-statistic-card-main-desc"></el-text>
                </div>
                <div class="todo-statistic-card-status">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="var(--el-color-warning)" fill-opacity="0.1" />
                    <path
                      d="M14.6314 12.9969C15.5927 12.2066 16.7342 11.6043 18.0149 11.2611C22.8161 9.97463 27.7511 12.8239 29.0376 17.6251C30.3241 22.4263 27.4748 27.3613 22.6736 28.6478C17.8725 29.9343 12.9374 27.085 11.6509 22.2838C11.4911 21.6871 11.3952 21.0894 11.3587 20.4975C11.3247 19.9463 10.8503 19.5269 10.2991 19.5609C9.74787 19.5949 9.32853 20.0693 9.36249 20.6205C9.40712 21.345 9.52443 22.075 9.71909 22.8015C11.2915 28.6696 17.3232 32.152 23.1913 30.5796C29.0594 29.0073 32.5418 22.9756 30.9695 17.1074C29.3971 11.2393 23.3654 7.7569 17.4973 9.32926C15.8653 9.76655 14.4174 10.5493 13.2118 11.5772L12.2177 10.5831C11.7773 10.1427 11.0247 10.3523 10.8753 10.957L9.78658 15.3657C9.64227 15.9501 10.1707 16.4785 10.755 16.3342L15.1638 15.2454C15.7684 15.0961 15.9781 14.3435 15.5376 13.9031L14.6314 12.9969Z"
                      fill="var(--el-color-warning)" />
                    <path
                      d="M20.0518 13.6095C20.604 13.6095 21.0518 14.0572 21.0518 14.6095V19.5093L23.6361 21.1537C24.102 21.4502 24.2394 22.0683 23.9429 22.5342C23.6464 23.0002 23.0283 23.1375 22.5624 22.8411L19.5149 20.9019C19.2264 20.7184 19.0518 20.4001 19.0518 20.0582V14.6095C19.0518 14.0572 19.4995 13.6095 20.0518 13.6095Z"
                      fill="var(--el-color-warning)"
                      fill-opacity="0.5" />
                  </svg>
                </div>
              </div>
            </XPanel>
          </div>
          <div class="row-card">
            <XPanel>
              <div class="todo-statistic-card">
                <div class="todo-statistic-card-main">
                  <el-text text="未完成工单数" class="todo-statistic-card-title"></el-text>
                  <div class="todo-statistic-card-main-value">
                    <el-text text="1200" class="todo-statistic-card-main-value-title"></el-text>
                    <el-text text="+1.30%" class="todo-statistic-card-main-value-percent color-error"></el-text>
                  </div>
                  <el-text text="评估中、解决中" class="todo-statistic-card-main-desc"></el-text>
                </div>
                <div class="todo-statistic-card-status">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="var(--el-color-error)" fill-opacity="0.1" />
                    <path
                      d="M20 11C17.4821 11 15.2073 12.0326 13.5727 13.7C12.811 14.477 12.1895 15.3908 11.7484 16.4004C11.4989 16.9714 11.307 17.5734 11.18 18.1989C11.0621 18.78 11 19.3823 11 20C11 24.9706 15.0294 29 20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11ZM12.1445 12.3C14.1397 10.2646 16.9231 9 20 9C26.0751 9 31 13.9249 31 20C31 26.0751 26.0751 31 20 31C13.9249 31 9 26.0751 9 20C9 19.2479 9.07563 18.5124 9.22002 17.8011C9.37544 17.0354 9.61036 16.2986 9.91573 15.5996C10.4555 14.3643 11.215 13.248 12.1445 12.3Z"
                      fill="var(--el-color-error)" />
                    <path
                      d="M21 15.2275C21 14.6753 20.5523 14.2275 20 14.2275C19.4477 14.2275 19 14.6753 19 15.2275V20.6763C19 21.2286 19.4477 21.6763 20 21.6763C20.5523 21.6763 21 21.2286 21 20.6763V15.2275Z"
                      fill="var(--el-color-error)"
                      fill-opacity="0.5" />
                    <path
                      d="M21 24.3447C21 23.7924 20.5523 23.3447 20 23.3447C19.4477 23.3447 19 23.7924 19 24.3447V24.7726C19 25.3249 19.4477 25.7726 20 25.7726C20.5523 25.7726 21 25.3249 21 24.7726V24.3447Z"
                      fill="var(--el-color-error)"
                      fill-opacity="0.5" />
                  </svg>
                </div>
              </div>
            </XPanel>
          </div>
        </div>

        <XPanel title="资源监控" more>
          <div class="progress-list-container">
            <div class="progress-list-item">
              <el-progress type="circle" :width="88" :stroke-width="8" :percentage="25">
                <template #default="{ percentage }">
                  <el-text text="25%" class="progress-list-item-percent"></el-text>
                </template>
              </el-progress>
            </div>
            <div class="divider"></div>
            <div class="progress-list-item">
              <el-progress type="circle" :width="88" :stroke-width="8" :percentage="25" status="warning">
                <template #default="{ percentage }">
                  <el-text text="25%" class="progress-list-item-percent"></el-text>
                </template>
              </el-progress>
            </div>
            <div class="divider"></div>
            <div class="progress-list-item">
              <el-progress type="circle" :width="88" :stroke-width="8" :percentage="25" status="error">
                <template #default="{ percentage }">
                  <el-text text="25%" class="progress-list-item-percent"></el-text>
                </template>
              </el-progress>
            </div>
            <div class="divider"></div>
            <div class="progress-list-item">
              <el-progress type="circle" :width="88" :stroke-width="8" :percentage="25" status="success">
                <template #default="{ percentage }">
                  <el-text text="25%" class="progress-list-item-percent"></el-text>
                </template>
              </el-progress>
            </div>
          </div>
        </XPanel>
        <div class="row-cards">
          <div class="row-card">
            <XPanel title="团队工作量" more style="min-height: 348px">
              <div class="team-work">
                <div class="team-work-header">
                  <div class="team-work-header-name">
                    <el-text text="成员" class="team-work-header-item-title"></el-text>
                  </div>
                  <div class="team-work-header-item">
                    <el-text text="工作分配" class="team-work-header-item-title"></el-text>
                  </div>
                  <div class="team-work-header-count">
                    <el-text text="计数" class="team-work-header-item-title"></el-text>
                  </div>
                </div>
                <div class="team-work-body">
                  <div class="team-work-row" v-for="item in teamData" :key="item.name">
                    <div class="team-work-row-name">
                      <AvatarDefault class="team-work-row-name-avatar" />
                      <el-text :text="item.name" class="team-work-row-item-title"></el-text>
                    </div>
                    <div class="team-work-row-item">
                      <el-progress type="line" :percentage="item.percent" :stroke-width="8" class="team-work-row-item-progress" />
                    </div>
                    <div class="team-work-row-count">
                      <el-text :text="item.count" class="team-work-row-item-count"></el-text>
                    </div>
                  </div>
                </div>
              </div>
            </XPanel>
          </div>
          <div class="row-card">
            <XPanel title="工单处理排名" more style="min-height: 348px">
              <el-table style="width: 100%; border-radius: var(--el-border-radius-base)" :dataSource="taskData">
                <el-table-column label="排名" prop="no" width="10%" align="center">
                  <template #default="{ item }">
                    <div :class="['x-badge', { 'x-badge-active': item.no <= 3 }]">
                      <el-text :text="item.no"></el-text>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="执行人" prop="name" width="20%" />
                <el-table-column label="较上周" prop="diff" width="20%">
                  <template #default="{ item }">
                    <div :class="['x-tag', item.diff > 0 ? 'x-tag-success' : 'x-tag-error']">
                      <svg
                        v-if="item.diff > 0"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.56252 4.37061L4.37201 7.56111L3.7533 6.94239L7.81442 2.88127C7.91693 2.77875 8.08314 2.77875 8.18565 2.88127L12.2468 6.94239L11.6281 7.56111L8.43752 4.37057L8.43737 13.1956L7.56237 13.1956L7.56252 4.37061Z"
                          fill="currentColor" />
                      </svg>
                      <svg
                        v-if="item.diff < 0"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.43748 11.6294L11.628 8.43889L12.2467 9.05761L8.18558 13.1187C8.08307 13.2212 7.91686 13.2212 7.81435 13.1187L3.75322 9.05761L4.37194 8.43889L7.56248 11.6294L7.56263 2.80443L8.43763 2.80444L8.43748 11.6294Z"
                          fill="currentColor" />
                      </svg>
                      <el-text :text="Math.abs(item.diff)"></el-text>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="工单数量" prop="count" width="20%" />
              </el-table>
            </XPanel>
          </div>
        </div>
      </div>
      <div class="aside">
        <XPanel>
          <div class="user-info">
            <AvatarDefault class="user-avatar" />
            <div class="user-info-text">
              <el-text text="用户名称" class="user-info-text-name"></el-text>
              <el-text text="部门名称" class="user-info-text-dept"></el-text>
            </div>
          </div>
          <div class="static-items">
            <div class="static-item">
              <el-text text="1200" class="static-item-title"></el-text>
              <el-text text="标题A" class="static-item-value"></el-text>
            </div>
            <div class="static-item">
              <el-text text="1200" class="static-item-title"></el-text>
              <el-text text="标题B" class="static-item-value"></el-text>
            </div>
            <div class="static-item">
              <el-text text="1200" class="static-item-title"></el-text>
              <el-text text="标题C" class="static-item-value"></el-text>
            </div>
          </div>
        </XPanel>
        <XPanel>
          <div class="todo-statistic-card">
            <div class="todo-statistic-card-main">
              <el-text text="其他工单数" class="todo-statistic-card-title"></el-text>
              <div class="todo-statistic-card-main-value">
                <el-text text="1200" class="todo-statistic-card-main-value-title"></el-text>
                <el-text text="+1.30%" class="todo-statistic-card-main-value-percent color-error"></el-text>
              </div>
              <el-text text="后续解决等" class="todo-statistic-card-main-desc"></el-text>
            </div>
            <div class="todo-statistic-card-status">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="var(--el-color-success)" fill-opacity="0.1" />
                <path
                  d="M20 11C17.4821 11 15.2073 12.0326 13.5727 13.7C12.811 14.477 12.1895 15.3908 11.7484 16.4004C11.4989 16.9714 11.307 17.5734 11.18 18.1989C11.0621 18.78 11 19.3823 11 20C11 24.9706 15.0294 29 20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11ZM12.1445 12.3C14.1397 10.2646 16.9231 9 20 9C26.0751 9 31 13.9249 31 20C31 26.0751 26.0751 31 20 31C13.9249 31 9 26.0751 9 20C9 19.2479 9.07563 18.5124 9.22002 17.8011C9.37544 17.0354 9.61036 16.2986 9.91573 15.5996C10.4555 14.3643 11.215 13.248 12.1445 12.3Z"
                  fill="var(--el-color-success)" />
                <path
                  d="M16.7617 20C16.7617 20.6839 16.2073 21.2383 15.5234 21.2383C14.8396 21.2383 14.2852 20.6839 14.2852 20C14.2852 19.3161 14.8396 18.7617 15.5234 18.7617C16.2073 18.7617 16.7617 19.3161 16.7617 20Z"
                  fill="var(--el-color-success)"
                  fill-opacity="0.5" />
                <path
                  d="M21.2383 20C21.2383 20.6839 20.6839 21.2383 20 21.2383C19.3161 21.2383 18.7617 20.6839 18.7617 20C18.7617 19.3161 19.3161 18.7617 20 18.7617C20.6839 18.7617 21.2383 19.3161 21.2383 20Z"
                  fill="var(--el-color-success)"
                  fill-opacity="0.5" />
                <path
                  d="M24.4766 21.2383C25.1604 21.2383 25.7148 20.6839 25.7148 20C25.7148 19.3161 25.1604 18.7617 24.4766 18.7617C23.7927 18.7617 23.2383 19.3161 23.2383 20C23.2383 20.6839 23.7927 21.2383 24.4766 21.2383Z"
                  fill="var(--el-color-success)"
                  fill-opacity="0.5" />
              </svg>
            </div>
          </div>
        </XPanel>
        <XPanel title="服务产品" more>
          <div class="service-product-list">
            <div class="service-product-item">
              <el-text text="Aa" class="service-product-item-text"></el-text>
            </div>
            <div class="service-product-item">
              <el-text text="Bb" class="service-product-item-text"></el-text>
            </div>
            <div class="service-product-item">
              <el-text text="Cc" class="service-product-item-text"></el-text>
            </div>
            <div class="service-product-item">
              <el-text text="Dd" class="service-product-item-text"></el-text>
            </div>
          </div>
        </XPanel>
        <XPanel title="待办事项" more>
          <div class="todo-card-list"></div>
          <div class="todo-card-list">
            <div class="todo-card-item item-primary">
              <div class="todo-card-item-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.759 12.7678C10.759 11.4364 11.8383 10.3571 13.1697 10.3571H26.8304C28.1619 10.3571 29.2412 11.4364 29.2412 12.7678V28.8392C29.2412 30.1706 28.1619 31.2499 26.8304 31.2499H13.1697C11.8383 31.2499 10.759 30.1706 10.759 28.8392L10.759 12.7678Z"
                    fill="var(--el-color-primary)"
                    fill-opacity="0.2" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5893 8.75C16.7017 8.75 15.9822 9.46954 15.9822 10.3571V11.1607C15.9822 12.0483 16.7017 12.7679 17.5893 12.7679H22.4107C23.2983 12.7679 24.0179 12.0483 24.0179 11.1607V10.3571C24.0179 9.46954 23.2983 8.75 22.4107 8.75H17.5893ZM24.9822 19.9196C25.3816 19.3871 25.2737 18.6316 24.7411 18.2322C24.2085 17.8327 23.453 17.9406 23.0536 18.4732L18.9168 23.9889L17.4543 23.015C16.9007 22.6546 16.1603 22.807 15.7939 23.3566C15.4275 23.9063 15.5716 24.6482 16.1172 25.0208L18.5279 26.6279C19.0601 26.9827 19.7769 26.86 20.1607 26.3482L24.9822 19.9196Z"
                    fill="var(--el-color-primary)" />
                </svg>
              </div>
              <el-text text="待我验证" class="todo-card-item-title"></el-text>
              <el-text text="18" class="todo-card-item-count"></el-text>
            </div>
            <div class="todo-card-item item-warning">
              <div class="todo-card-item-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M29.6429 21.607C29.6429 21.7648 29.6391 21.9225 29.6313 22.0801C29.6236 22.2377 29.6119 22.3951 29.5964 22.5521C29.581 22.7092 29.5617 22.8658 29.5386 23.0219C29.5154 23.178 29.4884 23.3334 29.4576 23.4882C29.4268 23.643 29.3923 23.7969 29.3539 23.95C29.3156 24.1031 29.2735 24.2551 29.2277 24.4061C29.1818 24.5571 29.1323 24.7069 29.0792 24.8555C29.026 25.0042 28.9693 25.1514 28.9089 25.2971C28.8485 25.4429 28.7846 25.5872 28.7171 25.7299C28.6496 25.8725 28.5786 26.0134 28.5043 26.1526C28.4299 26.2918 28.3521 26.429 28.2709 26.5644C28.1898 26.6998 28.1055 26.8331 28.0178 26.9642C27.9301 27.0955 27.8393 27.2245 27.7453 27.3512C27.6512 27.478 27.5541 27.6024 27.4541 27.7244C27.354 27.8464 27.2509 27.9658 27.1449 28.0827C27.0389 28.1997 26.9301 28.3139 26.8186 28.4255C26.707 28.5371 26.5927 28.6459 26.4758 28.7519C26.3589 28.8579 26.2394 28.9609 26.1174 29.061C25.9954 29.1611 25.8711 29.2582 25.7443 29.3522C25.6176 29.4462 25.4886 29.5371 25.3573 29.6247C25.2261 29.7124 25.0928 29.7968 24.9574 29.8779C24.8221 29.959 24.6848 30.0368 24.5457 30.1112C24.4065 30.1856 24.2656 30.2565 24.1229 30.324C23.9803 30.3915 23.836 30.4554 23.6902 30.5159C23.5444 30.5762 23.3972 30.6329 23.2486 30.6861C23.1 30.7393 22.9502 30.7888 22.7992 30.8346C22.6482 30.8804 22.4961 30.9225 22.3431 30.9609C22.19 30.9992 22.036 31.0337 21.8813 31.0645C21.7265 31.0953 21.571 31.1223 21.4149 31.1455C21.2588 31.1687 21.1023 31.1879 20.9452 31.2034C20.7882 31.2189 20.6308 31.2305 20.4732 31.2382C20.3156 31.246 20.1579 31.2499 20 31.2499C19.8422 31.2499 19.6845 31.246 19.5269 31.2382C19.3693 31.2305 19.2119 31.2189 19.0549 31.2034C18.8978 31.1879 18.7412 31.1687 18.5851 31.1455C18.429 31.1223 18.2736 31.0953 18.1188 31.0645C17.964 31.0337 17.8101 30.9992 17.657 30.9609C17.5039 30.9225 17.3519 30.8804 17.2009 30.8346C17.0498 30.7888 16.9 30.7393 16.7515 30.6861C16.6029 30.6329 16.4557 30.5762 16.3099 30.5159C16.1641 30.4554 16.0198 30.3915 15.8772 30.324C15.7345 30.2565 15.5936 30.1856 15.4544 30.1112C15.3152 30.0368 15.178 29.959 15.0426 29.8779C14.9073 29.7968 14.774 29.7124 14.6428 29.6247C14.5115 29.5371 14.3825 29.4462 14.2558 29.3522C14.129 29.2582 14.0047 29.1611 13.8827 29.061C13.7607 28.9609 13.6412 28.8579 13.5243 28.7519C13.4074 28.6459 13.2931 28.5371 13.1815 28.4255C13.0699 28.3139 12.9611 28.1997 12.8552 28.0827C12.7492 27.9658 12.6461 27.8464 12.546 27.7244C12.4459 27.6024 12.3488 27.478 12.2548 27.3512C12.1608 27.2245 12.07 27.0955 11.9823 26.9642C11.8946 26.8331 11.8102 26.6998 11.7291 26.5644C11.6479 26.429 11.5702 26.2918 11.4958 26.1526C11.4214 26.0134 11.3505 25.8725 11.283 25.7299C11.2155 25.5872 11.1516 25.4429 11.0912 25.2971C11.0308 25.1514 10.974 25.0042 10.9209 24.8555C10.8677 24.7069 10.8182 24.5571 10.7724 24.4061C10.7266 24.2551 10.6845 24.1031 10.6462 23.95C10.6078 23.7969 10.5732 23.643 10.5425 23.4882C10.5117 23.3334 10.4847 23.178 10.4615 23.0219C10.4384 22.8658 10.4191 22.7092 10.4036 22.5521C10.3881 22.3951 10.3765 22.2377 10.3688 22.0801C10.361 21.9225 10.3572 21.7648 10.3572 21.607C10.3572 21.4492 10.361 21.2914 10.3688 21.1338C10.3765 20.9762 10.3881 20.8189 10.4036 20.6618C10.4191 20.5048 10.4384 20.3482 10.4615 20.1921C10.4847 20.036 10.5117 19.8805 10.5425 19.7257C10.5732 19.571 10.6078 19.417 10.6462 19.2639C10.6845 19.1109 10.7266 18.9588 10.7724 18.8078C10.8182 18.6568 10.8677 18.507 10.9209 18.3584C10.974 18.2098 11.0308 18.0626 11.0912 17.9168C11.1516 17.771 11.2155 17.6268 11.283 17.4841C11.3505 17.3415 11.4214 17.2005 11.4958 17.0614C11.5702 16.9222 11.6479 16.7849 11.7291 16.6495C11.8102 16.5142 11.8946 16.3809 11.9823 16.2497C12.07 16.1185 12.1608 15.9895 12.2548 15.8627C12.3488 15.736 12.4459 15.6116 12.546 15.4896C12.6461 15.3676 12.7492 15.2482 12.8552 15.1312C12.9611 15.0143 13.0699 14.9 13.1815 14.7884C13.2931 14.6768 13.4074 14.5681 13.5243 14.4621C13.6412 14.3561 13.7607 14.2531 13.8827 14.1529C14.0047 14.0528 14.129 13.9558 14.2558 13.8617C14.3825 13.7677 14.5115 13.6769 14.6428 13.5892C14.774 13.5015 14.9073 13.4171 15.0426 13.336C15.178 13.2549 15.3152 13.1771 15.4544 13.1027C15.5936 13.0283 15.7345 12.9574 15.8772 12.8899C16.0198 12.8225 16.1641 12.7585 16.3099 12.6981C16.4557 12.6377 16.6029 12.581 16.7515 12.5278C16.9 12.4746 17.0498 12.4251 17.2009 12.3793C17.3519 12.3335 17.5039 12.2914 17.657 12.2531C17.8101 12.2147 17.964 12.1802 18.1188 12.1494C18.2736 12.1186 18.429 12.0916 18.5851 12.0685C18.7412 12.0453 18.8978 12.026 19.0549 12.0105C19.2119 11.9951 19.3693 11.9835 19.5269 11.9757C19.6845 11.968 19.8422 11.9641 20 11.9641C20.1579 11.9641 20.3156 11.968 20.4732 11.9757C20.6308 11.9835 20.7882 11.9951 20.9452 12.0105C21.1023 12.026 21.2588 12.0453 21.4149 12.0685C21.571 12.0916 21.7265 12.1186 21.8813 12.1494C22.036 12.1802 22.19 12.2147 22.3431 12.2531C22.4961 12.2914 22.6482 12.3335 22.7992 12.3793C22.9502 12.4251 23.1 12.4746 23.2486 12.5278C23.3972 12.581 23.5444 12.6377 23.6902 12.6981C23.836 12.7585 23.9803 12.8225 24.1229 12.8899C24.2656 12.9574 24.4065 13.0283 24.5457 13.1027C24.6848 13.1771 24.8221 13.2549 24.9574 13.336C25.0928 13.4171 25.2261 13.5015 25.3573 13.5892C25.4886 13.6769 25.6176 13.7677 25.7443 13.8617C25.8711 13.9558 25.9954 14.0528 26.1174 14.1529C26.2394 14.2531 26.3589 14.3561 26.4758 14.4621C26.5927 14.5681 26.707 14.6768 26.8186 14.7884C26.9301 14.9 27.0389 15.0143 27.1449 15.1312C27.2509 15.2482 27.354 15.3676 27.4541 15.4896C27.5541 15.6116 27.6512 15.736 27.7453 15.8627C27.8393 15.9895 27.9301 16.1185 28.0178 16.2497C28.1055 16.3809 28.1898 16.5142 28.2709 16.6495C28.3521 16.7849 28.4299 16.9222 28.5043 17.0614C28.5786 17.2005 28.6496 17.3415 28.7171 17.4841C28.7846 17.6268 28.8485 17.771 28.9089 17.9168C28.9693 18.0626 29.026 18.2098 29.0792 18.3584C29.1323 18.507 29.1818 18.6568 29.2277 18.8078C29.2735 18.9588 29.3156 19.1109 29.3539 19.2639C29.3923 19.417 29.4268 19.571 29.4576 19.7257C29.4884 19.8805 29.5154 20.036 29.5386 20.1921C29.5617 20.3482 29.581 20.5048 29.5964 20.6618C29.6119 20.8189 29.6236 20.9762 29.6313 21.1338C29.6391 21.2914 29.6429 21.4492 29.6429 21.607Z"
                    fill="var(--el-color-warning)"
                    fill-opacity="0.2" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.0372 9.38818C15.3505 9.97617 15.1273 10.7068 14.539 11.0194C13.1441 11.7624 11.8994 12.7581 10.8682 13.9557C10.4274 14.4313 9.68925 14.4729 9.19777 14.0498C8.7063 13.6267 8.6377 12.8905 9.04253 12.3839C10.2682 10.9596 11.7477 9.77542 13.4059 8.89157C13.9939 8.57827 14.7246 8.80142 15.0372 9.38978V9.38818ZM24.9629 9.38818C25.2761 8.80041 26.0066 8.57802 26.5942 8.89157C28.2523 9.77542 29.7319 10.9596 30.9576 12.3839C31.3623 12.8905 31.2938 13.6267 30.8023 14.0498C30.3108 14.4729 29.5727 14.4313 29.1318 13.9557C28.1002 12.7579 26.8549 11.7623 25.4594 11.0194C24.8717 10.7063 24.6493 9.97575 24.9629 9.38818ZM21.0045 16.7859C21.0045 16.2311 20.5548 15.7814 20 15.7814C19.4453 15.7814 18.9956 16.2311 18.9956 16.7859V21.6073C18.9956 22.1618 19.4456 22.6118 20 22.6118H24.0179C24.5727 22.6118 25.0223 22.162 25.0223 21.6073C25.0223 21.0525 24.5727 20.6028 24.0179 20.6028H21.0045V16.7859Z"
                    fill="var(--el-color-warning)" />
                </svg>
              </div>
              <el-text text="待我处理" class="todo-card-item-title"></el-text>
              <el-text text="12" class="todo-card-item-count"></el-text>
            </div>
            <div class="todo-card-item item-error">
              <div class="todo-card-item-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 8.75977C19.0954 8.75975 18.267 9.26613 17.8545 10.0712L17.8513 10.0776L9.01198 27.7546C8.20486 29.3562 9.36715 31.2471 11.1607 31.2501H11.1623H28.8409H28.8441C30.6351 31.2441 31.7944 29.3562 30.9896 27.7562V27.7546L22.1471 10.0776L22.1455 10.0712C21.7331 9.26615 20.9046 8.75977 20 8.75977Z"
                    fill="var(--el-color-error)"
                    fill-opacity="0.2" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.2053 16.585C21.2053 15.9193 20.6657 15.3796 20 15.3796C19.3343 15.3796 18.7946 15.9193 18.7946 16.585V21.8082C18.7946 22.4739 19.3343 23.0136 20 23.0136C20.6657 23.0136 21.2053 22.4739 21.2053 21.8082V16.585ZM20 27.835C20.8876 27.835 21.6071 27.1155 21.6071 26.2279C21.6071 25.3403 20.8876 24.6207 20 24.6207C19.1124 24.6207 18.3928 25.3403 18.3928 26.2279C18.3928 27.1155 19.1124 27.835 20 27.835Z"
                    fill="var(--el-color-error)" />
                </svg>
              </div>
              <el-text text="我的逾期" class="todo-card-item-title"></el-text>
              <el-text text="4" class="todo-card-item-count"></el-text>
            </div>
            <div class="todo-card-item item-success">
              <div class="todo-card-item-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5309 23.9661H15.4708C14.1679 23.9661 12.9322 24.5448 12.0981 25.5457L10.927 26.951C9.73559 28.3808 10.7523 30.5514 12.6134 30.5514H27.3863C29.2474 30.5514 30.2641 28.3808 29.0727 26.951L27.9016 25.5457C27.0674 24.5448 25.8319 23.9661 24.5289 23.9661H22.4693V25.6124C22.4693 26.9763 21.3637 28.0819 19.9998 28.0819C18.636 28.0819 17.5304 26.9763 17.5304 25.6124L17.5309 23.9661Z"
                    fill="var(--el-color-success)"
                    fill-opacity="0.2" />
                  <path
                    d="M20.823 25.6966C20.823 26.1049 20.4544 26.4359 19.9998 26.4359C19.5452 26.4359 19.1766 26.1049 19.1766 25.6966L19.1819 11.8985C19.1819 10.8099 20.1647 9.92737 21.377 9.92737H27.2841C28.1 9.92737 28.6306 10.6984 28.2658 11.3537L27.1103 13.4289C26.9558 13.7064 26.9558 14.033 27.1103 14.3105L28.2658 16.3857C28.6306 17.041 28.1 17.812 27.2841 17.812H20.823V25.6966Z"
                    fill="var(--el-color-success)" />
                </svg>
              </div>
              <el-text text="我的指派" class="todo-card-item-title"></el-text>
              <el-text text="32" class="todo-card-item-count"></el-text>
            </div>
          </div>
        </XPanel>
      </div>
    </div>
  </Layout>
</template>
<script setup>
import AvatarDefault from './avatar-default.vue';
import Layout from './layout.vue';
import XPanel from './x-panel.vue';

const teamData = [
  {
    name: '成员A',
    percent: 50,
    count: 5,
  },
  {
    name: '成员B',
    percent: 30,
    count: 3,
  },
  {
    name: '成员C',
    percent: 20,
    count: 2,
  },
  {
    name: '成员D',
    percent: 10,
    count: 1,
  },
  {
    name: '成员E',
    percent: 10,
    count: 1,
  },
];

const taskData = [
  {
    no: 1,
    name: '成员名称',
    count: 243,
    diff: 4,
  },
  {
    no: 2,
    name: '成员名称',
    count: 198,
    diff: -4,
  },
  {
    no: 3,
    name: '成员名称',
    count: 156,
    diff: 4,
  },
  {
    no: 4,
    name: '成员名称',
    count: 156,
    diff: 4,
  },
  {
    no: 5,
    name: '成员名称',
    count: 156,
    diff: 4,
  },
];
</script>
<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;
  flex: 3;
}

.aside {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;
  flex: 1;
}

.welcome-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  height: 110px;
  padding: 16px;
  background: var(--el-color-primary-light-9);
  border-radius: var(--el-border-radius-base);
}

.welcome-card-title {
  font-weight: 500;
  font-size: var(--el-font-size-extra-large);
  color: var(--el-text-color-primary);
  line-height: calc(var(--el-font-size-extra-large) + 8px);
}

.welcome-card-desc {
  font-size: var(--el-font-size-medium);
  color: var(--el-text-color-regular);
  line-height: calc(var(--el-font-size-large) + 8px);
}

.user-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.user-info-text {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.user-info-text-name {
  font-size: var(--el-font-size-large);
  color: var(--el-text-color-primary);
  line-height: calc(var(--el-font-size-large) + 8px);
  font-weight: 500;
}

.user-info-text-dept {
  color: var(--el-text-color-secondary);
  line-height: calc(var(--el-font-size-small) + 8px);
}

.static-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.static-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.static-item-title {
  font-size: var(--el-font-size-large);
  color: var(--el-text-color-primary);
  line-height: calc(var(--el-font-size-large) + 8px);
  font-weight: 500;
}

.static-item-value {
  color: var(--el-text-color-secondary);
  line-height: calc(var(--el-font-size-large) + 6px);
}

.row-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
}

.row-card {
  flex: 1;
  height: 100%;
}

.todo-statistic-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.todo-statistic-card-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.todo-statistic-card-title {
  font-weight: 500;
  line-height: calc(var(--el-font-size-base) + 8px);
  color: var(--el-text-color-regular);
}

.todo-statistic-card-main-value {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 12px;
}

.todo-statistic-card-main-value-title {
  font-size: 32px;
  color: var(--el-text-color-primary);
  font-weight: 500;
  line-height: 1;
}

.todo-statistic-card-main-value-percent {
  font-size: var(--el-font-size-base);
}

.todo-statistic-card-main-desc {
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-secondary);
  line-height: calc(var(--el-font-size-base) + 8px);
}

.color-success {
  color: var(--el-color-success);
}

.color-error {
  color: var(--el-color-error);
}

.progress-list-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.progress-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.divider {
  width: 1px;
  height: 68px;
  border-left: 1px solid var(--el-border-color);
  margin: 0 12px;
}

.progress-list-item-percent {
  font-size: var(--el-font-size-extra-large);
  color: var(--el-text-color-primary);
  font-weight: 500;
}

.team-work {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;
}

.team-work-row,
.team-work-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}

.team-work-row-item,
.team-work-header-item {
  flex: 1;
}

.team-work-row-name,
.team-work-header-name {
  flex-shrink: 0;
  width: 96px;
}

.team-work-row-count,
.team-work-header-count {
  flex-shrink: 0;
  width: 36px;
}

.team-work-row-item,
.team-work-row-name,
.team-work-row-count {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}

.team-work-row-count {
  justify-content: center;
}

.team-work-header-item,
.team-work-header-name,
.team-work-header-count {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.team-work-header-item-title {
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-regular);
  line-height: calc(var(--el-font-size-base) + 8px);
  font-weight: 500;
}

.team-work-row-name-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.team-work-row-item-title {
  color: var(--el-text-color-primary);
  line-height: calc(var(--el-font-size-base) + 8px);
}

.team-work-row-item-count {
  color: var(--el-color-primary);
  line-height: calc(var(--el-font-size-base) + 8px);
  font-weight: 500;
}

.team-work-row-item-progress {
  flex: 1
}

.team-work-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;
}

.table-view-column-cell-text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.x-badge {
  display: inline-flex;
  width: 20px;
  height: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.x-badge-active {
  border-radius: 50%;
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.x-tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 20px;
  border-radius: var(--el-border-radius-base);
  font-size: var(--el-font-size-base);
  line-height: 1;
}

.x-tag-success {
  background-color: var(--el-color-success-light-9);
  color: var(--el-color-success);
}

.x-tag-error {
  background-color: var(--el-color-error-light-9);
  color: var(--el-color-error);
}

.service-product-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}

.service-product-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--el-color-primary-light-3);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.service-product-item-text {
  font-size: var(--el-font-size-large);
  line-height: calc(var(--el-font-size-large) + 8px);
  font-weight: 500;
}

.todo-card-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 12px;
}

.todo-card-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 12px;
  height: 56px;
  border-radius: var(--el-border-radius-base);
  gap: 12px;
}

.item-primary {
  background-color: var(--el-color-primary-light-9);
}

.item-warning {
  background-color: var(--el-color-warning-light-9);
}

.item-error {
  background-color: var(--el-color-error-light-9);
}

.item-success {
  background-color: var(--el-color-success-light-9);
}

.todo-card-item-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: var(--el-card-bg-color);
  border-radius: var(--el-border-radius-base);
}

.todo-card-item-title {
  font-size: var(--el-font-size-base);
  line-height: calc(var(--el-font-size-base) + 8px);
  font-weight: 500;
  color: var(--el-text-color-primary);
  flex: 1;
}

.todo-card-item-count {
  font-size: var(--el-font-size-medium);
  line-height: calc(var(--el-font-size-medium) + 8px);
  font-weight: 500;
  color: var(--el-text-color-primary);
}
</style>
