<!-- 倒计时 -->
<!--  -->
<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-card shadow="hover" style="width: 100%">
            <div style="width: 100%; display: inline-block">
              <el-statistic
                :value="deadline2"
                time-indices
                title="🎉商品降价🎉">
                <template slot="suffix"> 抢购即将开始 </template>
              </el-statistic>
            </div>
          </el-card>
          <el-card shadow="hover" style="width: 100%; margin-top: 20px">
            <div style="width: 100%; display: inline-block">
              <el-statistic
                @finish="hilarity"
                :value="deadline3"
                time-indices
                title="时间游戏">
                <template slot="suffix">
                  <el-button type="primary " size="mini" @click="add"
                    >add 10s</el-button
                  >
                </template>
              </el-statistic>
            </div>
          </el-card>
          <el-card shadow="hover" style="width: 100%; margin-top: 20px">
            <div style="width: 100%; display: inline-block">
              <el-statistic
                format="DD天HH小时mm分钟"
                :value="deadline5"
                time-indices
                title="🚩距离立夏还有：">
              </el-statistic>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card shadow="hover" style="width: 100%">
            <div slot="header" class="clearfix">
              <span>文嘉《明日歌》</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="clickFn"
                >暂停</el-button
              >
            </div>
            <div style="font-size: 18px; text-align: center; margin-top: 35px">
              明日复明日
            </div>
            <div style="font-size: 18px; text-align: center">明日何其多</div>
            <div style="font-size: 18px; text-align: center">我生待明日</div>
            <div style="font-size: 18px; text-align: center">万事成蹉跎</div>
            <div style="margin-top: 35px"></div>
            <el-statistic
              ref="statistic"
              @finish="hilarity"
              format="HH:mm:ss"
              :value="deadline4"
              title="距离明日："
              time-indices>
            </el-statistic>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deadline2: Date.now() + 1000 * 60 * 60 * 8,
      deadline3: Date.now() + 1000 * 60 * 30,
      deadline4: Date.now() + (new Date().setHours(23, 59, 59) - Date.now()),
      deadline5: new Date('2023-05-06'),
      stop: true,
    };
  },
  methods: {
    hilarity() {
      this.$notify({
        title: '提示',
        message: '时间已到',
        duration: 0,
      });
    },
    clickFn() {
      this.$refs.statistic.suspend(this.stop);
      this.stop = !this.stop;
    },
    add() {
      this.deadline3 = this.deadline3 + 1000 * 10;
    },
  },
};
</script>
