<!-- 单行嵌套 -->

<template>
  <div><u-validator>
    <u-linear-layout gap="small">
        <u-validator label="容器端口" rules="required | integer | range(1,65535) @i" muted="message">
            <u-input size="huge normal" placeholder="容器端口，1-65535内的整数"></u-input>
        </u-validator>
        <u-validator label="服务端口" rules="required | integer | range(1,65535) @i" muted="message">
            <u-input size="huge normal" placeholder="服务端口，1-65535内的整数"></u-input>
        </u-validator>
    </u-linear-layout>
</u-validator></div>
</template>