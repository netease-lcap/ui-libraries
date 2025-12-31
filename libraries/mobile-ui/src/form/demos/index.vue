<template>
  <demo-section>
    <basic-usage />
    <disabled-demo />
  </demo-section>
</template>

<script>
import BasicUsage from './BasicUsage';
import ValidateRules from './ValidateRules';
import FieldType from './FieldType';
import DisabledDemo from './DisabledDemo';

export default {
  components: {
    BasicUsage,
    FieldType,
    ValidateRules,
    DisabledDemo,
  },
};
</script>
