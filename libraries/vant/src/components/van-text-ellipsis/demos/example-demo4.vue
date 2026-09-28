<template>
  <div> 
    <van-text text="开头省略" />
    <van-text-ellipsis rows="1" :content="text" expand-text="展开" collapse-text="收起" position="start" />
    <br />
    <van-text text="中间省略" />
    <van-text-ellipsis rows="2" :content="text" expand-text="展开" collapse-text="收起" position="middle" />
    <br />
    <van-text text="结尾省略" />
    <van-text-ellipsis rows="3" :content="text" expand-text="展开" collapse-text="收起" position="end" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const text = ref('那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。');
</script>