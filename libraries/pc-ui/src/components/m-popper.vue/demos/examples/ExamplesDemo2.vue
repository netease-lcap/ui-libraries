<!-- 自动触发 -->

<template>
  <div><u-linear-layout>
    <u-button>
        click（默认）
        <m-popper trigger="click">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
    <u-button>
        hover
        <m-popper trigger="hover">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
    <u-button>
        right-click
        <m-popper trigger="right-click">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
    <u-button>
        double-click
        <m-popper trigger="double-click">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
</u-linear-layout></div>
</template>