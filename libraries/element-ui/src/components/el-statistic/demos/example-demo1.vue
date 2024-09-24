<!-- 基础用法 -->
<!--  组件提供千分位的展示，不过可以通过 rate 来设置相应万分位等 :::demo -->
<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="value2"
              :title="title"></el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic title="男女比">
              <template slot="formatter"> 456/2 </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              decimal-separator="."
              :value="value1"
              :title="title">
              <template slot="prefix">
                <i class="el-icon-s-flag" style="color: red"></i>
              </template>
              <template slot="suffix">
                <i class="el-icon-s-flag" style="color: blue"></i>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="like ? 521 : 520" title="Feedback">
              <template slot="suffix">
                <span @click="like = !like" class="like">
                  <i
                    class="el-icon-star-on"
                    style="color: red"
                    v-show="!!like"></i>
                  <i class="el-icon-star-off" v-show="!like"></i>
                </span>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      like: true,
      value1: 4154.564,
      value2: 1314,
      title: '增长人数',
    };
  },
};
</script>
