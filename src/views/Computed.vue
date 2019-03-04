<template>
    <div class="lobby">
        <ul>
            <li><router-link to="/computed/addition" id="add">Add</router-link></li>
            <li><router-link to="/computed/minus" id="minus">Minus</router-link></li>
            <li><router-link to="/computed/mul" id="mul">Mul</router-link></li>
            <li><router-link to="/computed/divided" id="divided">Divided</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
