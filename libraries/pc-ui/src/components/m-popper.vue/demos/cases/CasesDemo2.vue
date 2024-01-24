<!-- 跟随鼠标测试 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-button>
            click
            <m-popper trigger="click" placement="top-start" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            top
            <m-popper trigger="double-click" placement="top-start" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            right-click
            <m-popper trigger="right-click" placement="top-start" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
</u-linear-layout></div>
</template>