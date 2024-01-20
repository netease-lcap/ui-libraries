<!-- 跟随鼠标 -->

<template>
  <div><u-linear-layout direction="vertical" style="min-width: 300px; max-width: 550px;">
    <u-linear-layout justify="center" gap="small">
        <u-button>
            上左
            <u-tooltip placement="top-start" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            上边
            <u-tooltip placement="top" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            上右
            <u-tooltip placement="top-end" follow-cursor>Tooltip</u-tooltip>
        </u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: left">
        <u-button>
            左上
            <u-tooltip placement="left-start" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            左边
            <u-tooltip placement="left" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            左下
            <u-tooltip placement="left-end" follow-cursor>Tooltip</u-tooltip>
        </u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: right">
        <u-button>
            右上
            <u-tooltip placement="right-start" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            右边
            <u-tooltip placement="right" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            右下
            <u-tooltip placement="right-end" follow-cursor>Tooltip</u-tooltip>
        </u-button>
    </u-linear-layout>
    <u-linear-layout justify="center" gap="small" style="clear: both">
        <u-button>
            下左
            <u-tooltip placement="bottom-start" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            下边
            <u-tooltip placement="bottom" follow-cursor>Tooltip</u-tooltip>
        </u-button>
        <u-button>
            下右
            <u-tooltip placement="bottom-end" follow-cursor>Tooltip</u-tooltip>
        </u-button>
    </u-linear-layout>
</u-linear-layout></div>
</template>