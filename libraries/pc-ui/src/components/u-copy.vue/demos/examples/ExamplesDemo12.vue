<!-- toast 提示 -->

<template>
  <div><u-linear-layout>
    <u-copy value="需要 copy 的内容" :hide-delay="500" feedback="toast">
        <u-button>500毫秒</u-button>
    </u-copy>
    <u-copy value="需要 copy 的内容" :hide-delay="2000" feedback="toast">
        <u-button>2秒</u-button>
    </u-copy>
    <u-copy value="需要 copy 的内容" :hide-delay="4000" feedback="toast">
        <u-button>4秒</u-button>
    </u-copy>
</u-linear-layout></div>
</template>