<template>
    <div class="container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component({})
export default class <%= componentName %> extends Vue {
    @Prop()
    xxx ?: string;
}
</script>
<style lang="scss" scoped>
</style>
