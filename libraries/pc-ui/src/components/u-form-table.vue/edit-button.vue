<script>
import UButton from '../u-button.vue';

export default { name: 'u-form-table-edit-button', extends: UButton };
</script>

<style module>
.root {}

.root[disabled] {
    cursor: var(--cursor-not-allowed);
    color: var(--brand-disabled);
}

.root::before {
    font-size: var(--font-size-huge);
    display: inline-block;
    vertical-align: middle;
content: "\e670";
    font-family: "lcap-ui-icons";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-decoration: inherit;
    text-rendering: optimizeLegibility;
    text-transform: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
}
</style>
