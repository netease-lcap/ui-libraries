<!-- 基本用法 -->

<template>
  <div><u-linear-layout>
    <u-button>
        内容
        <u-popup>使用 content 属性添加内容</u-popup>
    </u-button>
    <u-button>
        标题
        <u-popup title="标题">使用 title 属性添加标题</u-popup>
    </u-button>
    <u-button>
        使用 slot
        <u-popup>
            <span slot="title">标题 <u-badge :value="3"></u-badge></span>
            <span>使用 <u-link>slot</u-link> 可以添加一些复杂功能</span>
        </u-popup>
    </u-button>
</u-linear-layout></div>
</template>