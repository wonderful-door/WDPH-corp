<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__info">
                <div class="footer__logo-wrap">
                    <img class="footer__logo-img" src="~/assets/images/common/footer-logo.png" alt="Wonderful Door Philippines Corp." />
                    <p class="footer__logo-ttl">
                        Wonderful Door <br /> Philippines Corp.
                    </p>
                </div>
                <ul class="footer-menu01">
                    <li class="footer-menu01__item">
                        <h3 class="footer-menu01__ttl">About Us</h3>
                        <ul class="footer__menu02 footer-menu02">
                            <li class="footer-menu02__item">
                                <NuxtLink class="footer-menu02__link"><span class="footer-menu02__ttl">Who We Are</span></NuxtLink>
                            </li>
                            <li class="footer-menu02__item">
                                <NuxtLink class="footer-menu02__link"><span class="footer-menu02__ttl">Careers</span></NuxtLink>
                            </li>
                        </ul>
                    </li>
                    <li class="footer-menu01__item">
                        <h3 class="footer-menu01__ttl">Services</h3>
                        <ul class="footer__menu02 footer-menu02">
                            <li class="footer-menu02__item">
                                <NuxtLink class="footer-menu02__link"><span class="footer-menu02__ttl">Website Design &amp; Development</span></NuxtLink>
                            </li>
                            <li class="footer-menu02__item">
                                <NuxtLink class="footer-menu02__link"><span class="footer-menu02__ttl">Website Hosting</span></NuxtLink>
                            </li>
                            <li class="footer-menu02__item">
                                <NuxtLink class="footer-menu02__link"><span class="footer-menu02__ttl">CRM Solutions</span></NuxtLink>
                            </li>
                            <li class="footer-menu02__item">
                                <NuxtLink class="footer-menu02__link"><span class="footer-menu02__ttl">Digital Marketing Services</span></NuxtLink>
                            </li>
                        </ul>
                    </li>
                    <li class="footer-menu01__item">
                        <h3 class="footer-menu01__ttl">Location</h3>
                        <ul class="footer__menu02 footer-menu02">
                            <li class="footer-menu02__item">
                                <span class="footer-menu02__ttl02">Philippines</span><br />
                                <span class="footer-menu02__txt">Unit 1010, Tycoon Centre Ortigas Center, <br />Pasig City</span>
                            </li>
                            <li class="footer-menu02__item">
                                <a class="footer-menu02__link" href="https://wonderful-door.jp/" target="_blank" rel="noopener noreferrer">
                                    <span class="footer-menu02__ttl02">Japan <i class="fa-solid fa-arrow-up-right-from-square"></i></span><br />
                                    <span class="footer-menu02__txt">Saitama City, Minami-ku,<br />Minami-Urawa 3-3-17 Toyoyo Building 2F</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="footer-menu01__item">
                        <h3 class="footer-menu01__ttl">Newsletter</h3>
                        <form class="footer__newsletter">
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </li>
                </ul>
            </div>
            <div class="footer__wrap">
                <div class="footer__language">
                    <img class="footer__language-img" src="~/assets/images/common/footer-lang.png" alt="Language" />
                    <select name="language" id="language-selector">
                        <option value="en">English</option>
                        <option value="ja">Japan</option>
                    </select>
                </div>
                <NuxtLink class="footer__txt">Terms &amp; Privacy</NuxtLink>
                <p class="footer__txt">© {{ new Date().getFullYear() }} WD Philippines</p>
            </div>
        </div>
    </footer>
</template>
