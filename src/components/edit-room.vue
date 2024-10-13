<script scope>

</script>

<template>
    <main>
        <div class="edit-overlay">
            <div class="inner-overlay">
                <h1>hello neil</h1>
                <slot />
                <button class="close-overlay">
                    close
                </button>
            </div>
        
        </div>
    </main>
    
</template>
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
</style>