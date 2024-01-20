<!-- 单位展示 -->
<template>
    <div>
        <div>普通前缀</div> 
        <u-number-input placeholder="abcdsdf"></u-number-input>
        <u-number-input :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf"></u-number-input>
        <u-number-input :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf" clearable></u-number-input>
        <u-number-input :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf" hideButtons></u-number-input>
        <u-number-input :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf" clearable hideButtons></u-number-input>
        <div>普通后缀</div> 
        <u-number-input placeholder="abcdsdf"></u-number-input>
        <u-number-input :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf"></u-number-input>
        <u-number-input :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf" clearable></u-number-input>
        <u-number-input :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf" hideButtons></u-number-input>
        <u-number-input :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf" clearable hideButtons></u-number-input>
        <div>两边前缀</div>
        <u-number-input button-display="bothEnds" placeholder="abcdsdf"></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf"></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf" clearable></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf" hideButtons></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'prefix',value:'$'}" placeholder="abcdsdf" clearable hideButtons></u-number-input>
        <div>两边后缀</div>
        <u-number-input button-display="bothEnds" placeholder="abcdsdf"></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf"></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf" clearable></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf" hideButtons></u-number-input>
        <u-number-input button-display="bothEnds" :unit="{type:'suffix',value:'$'}" placeholder="abcdsdf" clearable hideButtons></u-number-input>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '',
        };
    },
    methods: {
        handleKeydown(e, sender) {
            console.log('keydown', e, sender);
        },
        handleKeyup(e, sender) {
            console.log('keyup', e, sender);
        },
    },
};
</script>