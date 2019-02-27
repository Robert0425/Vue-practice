<template>
    <div class="lobby">
        <ul>
            <li><router-link to="/computed/addition">Add</router-link></li>
            <li><router-link to="/computed/minus">Minus</router-link></li>
            <li><router-link to="/computed/mul">Mul</router-link></li>
            <li><router-link to="/computed/divided">Divided</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
