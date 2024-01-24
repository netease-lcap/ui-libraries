<!-- 路由模式 -->

<template>
  <div><m-singlex router disabled>
    <m-singlex-item to="/components/m-singlex">MSinglex</m-singlex-item>
    <m-singlex-item exact to="/components/m-singlex">MSinglex Exact</m-singlex-item>
    <m-singlex-item to="/components/m-singlex/cases">Cases</m-singlex-item>
    <m-singlex-item to="/components/m-multiplex">MMultiplex</m-singlex-item>
    <m-singlex-item to="/components/m-multiplex" disabled>MMultiplex Disabled</m-singlex-item>
    <m-singlex-item href="/">Href</m-singlex-item>
    <m-singlex-item href="/" disabled>Href Disabled</m-singlex-item>
</m-singlex></div>
</template>