<template>
<table>
    <tr-components v-for="(rowData,index) in tableData" :key="index" :row-data="rowData" :row-index="index"></tr-components>
</table>
</template>
<script>
import TrComponents from './TrComponent';
export default {
    props:{
        tableData:Array,
    },
    components: {
        TrComponents,
    }
}
</script>

<style >

</style>