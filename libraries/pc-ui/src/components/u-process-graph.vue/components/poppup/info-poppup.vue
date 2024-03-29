<template>
    <div :class="$style.wrapper" right>
        <div :class="$style.root" mini>
            <div :class="$style.header">
                <div>
                    {{ title }}  
                </div>
                <div :class="$style.status" :status="status">
                    {{ status }}
                </div>
            </div>
            <div v-if="completeInfo && completeInfo.length" :class="$style.body">
                <div v-for="info in completeInfo" :class="$style.info">
                    <div :class="$style.infoHeader">
                        <div>
                            处理人：{{info.assignee || '-'}}
                        </div>
                        <div :class="$style.infoStatus" :completed="info.completed">
                            {{ info.completed ? '已处理' : '未处理'}}
                        </div>
                    </div>
                    <div :class="$style.infoBody">
                        处理时间：{{info.completeTime || '-'}}
                    </div>
                    <div :class="$style.infoBody" v-if="node.current && !info.assignee">
                        处理候选人：{{(info.candidates || []).slice(0, 10).join('、') || '-'}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        meta: Object,
    },
    computed: {    
        node() {
            return this.meta.target;
        },
        title() {
            return this.node.title || this.node.name;
        },
        status() {
            return this.node.current ? '处理中' : this.node.completed ? '已处理' : '未处理';
        },
        completeInfo() {
            return this.node.completeInfos;
        }
    },
};
</script>

<style module>
.wrapper{
    font-family: PingFang SC;
    background: transparent;
    position: absolute;
    right: 0;
    width: max-content;
    transform: translateY(-50%);
}
.limitw{
    max-width: 320px;
}
.root{
    background: #fff;
    color: #666666;
    border-radius: 4px;
    
    position: relative;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
}
.header{ 
    font-size: 14px;
    line-height: 22px;
    color: #333333;
    font-weight: 500;
    display: flex; 
    min-width: 244px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    column-gap: 12px;
    
}
.status{
   
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    padding: 0 8px;
    border-radius: 4px;
}
.status[status="处理中"] {
    background-color: #337EFF;
}
.status[status="已处理"] {
    background-color: #26BD71;
}
.status[status="未处理"] {
    background-color: #CCCCCC;
}
.body {
    border-top: 1px solid #e5e5e5;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}
.info{
    font-size: 14px;
    color: #666666;
}
.infoHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 12px;
}

.infoStatus[completed]{
    color: #26BD71;
}
.infoStatus{
    color: #F24957;
}
.infoBody{

}
.limitw .root {
    word-wrap: break-word;
    word-break: break-all;
}
.root[isType] {
    white-space: nowrap;
}
.wrapper .root::after {
    display: block;
    content: ' ';
    position: absolute;
    width: 8px;
    height: 8px;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%) rotate(45deg);
    background: #fff;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
}

.wrapper[right] {
    right: auto;
    left: 0;
}
.wrapper[right] .root::after {
    right: auto;
    left: 0;
    transform: translate(-50%, -50%) rotate(45deg);
}
.wrapper[top] {
    transform: translate(-50%, 0px);
    right: auto;
    bottom: 0;
}
.wrapper[top] .root{
    transform: translate(0, -7px);
}
.wrapper[top] .root::after {
    transform: translate(-50%, 80%) rotate(45deg);
    top: auto;
    left: 50%;
}
.wrapper[top]  .root[mini]::after {
   transform: translate(-50%, 1px) rotate(45deg);
}
.wrapper[bottom] {
    transform: translate(-50%, 100%);
    right: auto;
    bottom: 0;
}
.wrapper[bottom] .root::after {
    transform: translate(-50%, -50%) rotate(45deg);
    top: 0;
    left: 50%;
}
.root[isType] {
    /* border-bottom: 4px solid #21B892; */
}
.wrapper[isType] .root::after {
    background: #21B892;
}
.wrapper[isType] .root::before {
    display: block;
    content: ' ';
    position: absolute;
    background: #21B892;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 100%;
    height: 6px;
    left: 0;
    bottom: -1px;
    z-index: 9;
}
</style>
