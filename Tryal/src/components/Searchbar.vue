<template>
    <form action="">
        <div class="search">
            <img class="search-icon" src="../assets/svg/search-svgrepo-com.svg" alt="search-icon" width="30px">
            <input class="search-input" type="text" name="" id="" placeholder="Search here...">
            <img class="filter-icon" src="../assets/svg/filters-2-svgrepo-com.svg" alt="filter-icon" width="30px">
            <img class="sort-icon" src="../assets/svg/sort-vertical-svgrepo-com.svg" alt="sort-icon" width="30px">
            
        </div>
    </form>
</template>

<style scoped>
    
    .search {
        --padding: 14px;

        width: max-content;
        display: flex;
        align-items: center;
        padding: var(--padding);
        border-radius: 12px;
        background: #f6f6f6;
        width: 75%;
    }
    .search-input {
        font-size: 16px;
        font-family: sans-serif;
        color: black;
        margin-left: var(--padding);
        margin-right: var(--padding);
        outline: none;
        border: none;
        background: transparent;
        flex: 1;
    }
    .search-icon, .sort-icon, .filter-icon {
        cursor: pointer;
    }
    .sort-icon, .filter-icon {
        margin-left: 12px;
    }
</style>
