<!-- 触发方式 -->

<template>
  <div><u-linear-layout>
    <u-button>
        hover
        <u-popup trigger="hover">Popup</u-popup>
    </u-button>
    <u-button>
        click（默认）
        <u-popup trigger="click">Popup</u-popup>
    </u-button>
    <u-button>
        right-click
        <u-popup trigger="right-click">Popup</u-popup>
    </u-button>
    <u-button>
        double-click
        <u-popup trigger="double-click">Popup</u-popup>
    </u-button>
</u-linear-layout></div>
</template>