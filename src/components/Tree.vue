<template>
    <div class="cust-container-top-buttom" v-html="legacySystemHTML">
    </div>
</template>


<script>
    import git from '../git'
    export default {
        data() {
            return {
                legacySystemHTML: '<div></div>'
            }
        },
        ready() {
            git.getTree(this, this.$route.path.replace('/repo', '')).then(result => {
                    // this.git = result.data;

                    this.legacySystemHTML = result.data.repoContent;
                },
                error => {
                    this.error = error;
                }
            );

        },
    }
</script>