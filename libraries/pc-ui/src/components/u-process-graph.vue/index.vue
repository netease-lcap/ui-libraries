<template>
  <div :class="$style.root">
    <div :class="$style.designerImage" v-if="noData">
        <img :class="[$style.img, $style.lb]" :src="leftBottomImg" />
        <img :class="[$style.img, $style.rt]" :src="rightTopImg" />
        <img :class="[$style.img, $style.md]" :src="middleImg" />
      </div>
    <div :class="$style.graph">
      <u-loading v-if="loading"></u-loading>
      <process-graph v-if="!loading && !noData" :ast="ast" 
        :initialZoom="initialZoom"></process-graph>
    </div>
  </div>
</template>

<script>
import Graph from './graph.vue';
import axios from 'axios';
import leftBottomImg from './assets/leftbottom.png';
import middleImg from './assets/middle.png';
import rightTopImg from './assets/righttop.png';

// import DATA from './data.json';

export default {
    name: "u-process-graph",
    components: {
      'process-graph': Graph,
    },
    props:{
      taskId:{
        type: String,
        default: "63755d0d-d6b3-11ee-86b2-2e236991a5ca"
      },
      initialZoom: {
        type: String,
        default: undefined,
      }
    },
    data() {
        return {
          loading: true,
          noData: false,
          ast: undefined, 
          leftBottomImg,
        middleImg,
        rightTopImg
        }
    },
    watch: {
      processId(){
        this.loadProcess();
      }
    },
    mounted() {
      this.loadProcess();
    },
    methods: {
      async loadProcess() {
        this.loading = true;
        this.noData = false;
        debugger
        try{
            const result = await axios.post('/api/processV2/getProcInstGraph?taskId=' + this.taskId);
            const data = result.data;
            console.log(data)
            if(data && data.procInstId) {
                this.ast = data;
            } else {
                this.$toast.show('暂无流程数据')
                this.noData = true;
            }
            this.loading = false;
        }catch(err) {
            this.$toast.show('暂无流程数据')
            this.noData = true;
            this.loading = false;
        }
        // const result = await axios.post('/api/processV2/getProcInstGraph?taskId=' + this.taskId);
        // const data = DATA.data //result.data;
        // debugger
        // if(data && data.procInstId) {
        //   this.ast = data;
        // } else {
        //   this.$toast.show('暂无流程数据')
        //   this.noData = true;
        // }
        // this.loading = false;
      
      },
      reload() {
        this.loadProcess();
      }
    }
   
}
</script>

<style module src="./index.css"></style>