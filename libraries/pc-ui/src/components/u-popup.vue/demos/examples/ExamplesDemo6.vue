<!-- 跟随鼠标 -->

<template>
  <div><u-linear-layout direction="vertical" style="min-width: 300px; max-width: 550px;">
    <u-linear-layout justify="center" gap="small">
        <u-button>
            上左
            <u-popup placement="top-start" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            上边
            <u-popup placement="top" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            上右
            <u-popup placement="top-end" follow-cursor>Popup</u-popup>
        </u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: left">
        <u-button>
            左上
            <u-popup placement="left-start" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            左边
            <u-popup placement="left" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            左下
            <u-popup placement="left-end" follow-cursor>Popup</u-popup>
        </u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: right">
        <u-button>
            右上
            <u-popup placement="right-start" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            右边
            <u-popup placement="right" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            右下
            <u-popup placement="right-end" follow-cursor>Popup</u-popup>
        </u-button>
    </u-linear-layout>
    <u-linear-layout justify="center" gap="small" style="clear: both;">
        <u-button>
            下左
            <u-popup placement="bottom-start" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            下边
            <u-popup placement="bottom" follow-cursor>Popup</u-popup>
        </u-button>
        <u-button>
            下右
            <u-popup placement="bottom-end" follow-cursor>Popup</u-popup>
        </u-button>
    </u-linear-layout>
</u-linear-layout></div>
</template>