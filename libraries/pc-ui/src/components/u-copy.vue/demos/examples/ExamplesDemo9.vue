<!-- 提示位置 -->

<template>
  <div><u-linear-layout direction="vertical" style="min-width: 300px; max-width: 550px;">
    <u-linear-layout justify="center" gap="small">
        <u-copy value="需要 copy 的内容" placement="top-start">
            <u-button>上左</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="top">
            <u-button>上边</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="top-end">
            <u-button>上右</u-button>
        </u-copy>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: left;">
        <u-copy value="需要 copy 的内容" placement="left-start">
            <u-button>左上</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="left">
            <u-button>左边</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="left-end">
            <u-button>左下</u-button>
        </u-copy>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: right;">
        <u-copy value="需要 copy 的内容" placement="right-start">
            <u-button>右上</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="right">
            <u-button>右边</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="right-end">
            <u-button>右下</u-button>
        </u-copy>
    </u-linear-layout>
    <u-linear-layout justify="center" gap="small" style="clear: both;">
        <u-copy value="需要 copy 的内容" placement="bottom-start">
            <u-button>下左</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="bottom">
            <u-button>下边</u-button>
        </u-copy>
        <u-copy value="需要 copy 的内容" placement="bottom-end">
            <u-button>下右</u-button>
        </u-copy>
    </u-linear-layout>
</u-linear-layout></div>
</template>