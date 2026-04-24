<template>
    <header class="header" :class="{ 'is-menu-opened': isMenuOpen }">
        <NuxtLink class="header__home" to="/">
            <img class="header__logo" src="~/assets/images/common/header-logo.png" alt="Wonderful Door Philippines Corp." />
            <p class="header__logo-ttl">Wonderful Door <br/> Philippines Corp.</p>
        </NuxtLink>

        <nav class="header__nav">
            <ul class="header__menu menu">
                <li class="menu__item"><NuxtLink class="menu__link" to="/"><span class="menu__ttl">Home</span></NuxtLink></li>
                <li class="menu__item"><NuxtLink class="menu__link" to="/About"><span class="menu__ttl">About Us</span></NuxtLink></li>
                <li class="menu__item"><NuxtLink class="menu__link" to="/Service"><span class="menu__ttl">Services</span></NuxtLink></li>
                <li class="menu__item"><NuxtLink class="menu__link" to="/portfolio"><span class="menu__ttl">Portfolio</span></NuxtLink></li>
                <li class="menu__item"><NuxtLink class="menu__link"><span class="menu__ttl">Blogs</span></NuxtLink></li>
                <li class="menu__item"><NuxtLink class="menu__link" to="/Careers"><span class="menu__ttl">Careers</span></NuxtLink></li>
                <li class="menu__item"><NuxtLink class="menu__link"><span class="menu__ttl">Contact Us</span></NuxtLink></li>
            </ul>
        </nav>

        <div class="header__bars menu-bar hidden-pc" @click="toggleMenu">
            <span class="menu-bar__middle"></span>
        </div>
    </header>
</template>

<script setup>
const isMenuOpen = ref(false)

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu = () => { isMenuOpen.value = false }
</script>
