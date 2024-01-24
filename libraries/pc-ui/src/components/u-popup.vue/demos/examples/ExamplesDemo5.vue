<!-- 弹出方位 -->

<template>
  <div><u-linear-layout direction="vertical" style="min-width: 300px; max-width: 550px;">
    <u-linear-layout justify="center" gap="small">
        <u-button>
            上左
            <u-popup placement="top-start">Popup</u-popup>
        </u-button>
        <u-button>
            上边
            <u-popup placement="top">Popup</u-popup>
        </u-button>
        <u-button>
            上右
            <u-popup placement="top-end">Popup</u-popup>
        </u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: left">
        <u-button>
            左上
            <u-popup placement="left-start">Popup</u-popup>
        </u-button>
        <u-button>
            左边
            <u-popup placement="left">Popup</u-popup>
        </u-button>
        <u-button>
            左下
            <u-popup placement="left-end">Popup</u-popup>
        </u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: right">
        <u-button>
            右上
            <u-popup placement="right-start">Popup</u-popup>
        </u-button>
        <u-button>
            右边
            <u-popup placement="right">Popup</u-popup>
        </u-button>
        <u-button>
            右下
            <u-popup placement="right-end">Popup</u-popup>
        </u-button>
    </u-linear-layout>
    <u-linear-layout justify="center" gap="small" style="clear: both;">
        <u-button>
            下左
            <u-popup placement="bottom-start">Popup</u-popup>
        </u-button>
        <u-button>
            下边
            <u-popup placement="bottom">Popup</u-popup>
        </u-button>
        <u-button>
            下右
            <u-popup placement="bottom-end">Popup</u-popup>
        </u-button>
    </u-linear-layout>
</u-linear-layout></div>
</template>