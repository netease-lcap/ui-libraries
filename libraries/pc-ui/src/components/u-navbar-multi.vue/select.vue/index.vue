<script>
import { USelect } from '../../u-select.vue';

export default {
    name: 'u-navbar-select-multi',
    groupName: 'u-navbar-select-group-multi',
    childName: 'u-navbar-select-item-multi',
    extends: USelect,
};
</script>

<style module>
@import '../../u-select.vue/index.css';

.root {
    background: none;
    border: none;
    height: var(--navbar-height);
    line-height: var(--navbar-height);
    padding-left: var(--navbar-select-padding-left);
    padding-right: var(--navbar-select-padding-right);
    width: var(--navbar-select-width);
    vertical-align: top;
}

.root:not(:last-child) {
    margin-right: var(--navbar-item-space);
}

.root:focus {
    box-shadow: none;
}

.root:hover {
    background: var(--navbar-select-hover-background);
}

.root[focused] {
    background: var(--navbar-select-focused-background);
}

.root::before {
    font-size: var(--navbar-item-font-size);
    line-height: var(--navbar-height);
}

.root::after {
content: "\e65d";
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
    height: auto;
    line-height: var(--navbar-height);
    color: white;
    font-size: 20px;
    right: 6px;
    top: 0;
}

.placeholder {
    color: white;
    font-size: var(--navbar-item-font-size);
}

.text {
    color: white;
    font-size: var(--navbar-item-font-size);
    line-height: var(--navbar-height);
}

.popper {
    margin-top: 3px;
    box-shadow: var(--navbar-select-box-shadow);
    background: var(--navbar-select-item-background);
    border: none;
}
</style>
