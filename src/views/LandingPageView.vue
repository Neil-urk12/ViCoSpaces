<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="background">
    <div class="bg">
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div id="stars4" />
    </div>
    <header class="header">
      <nav class="nav">
        <div class="logo">
          <div class="logo-placeholder">
            <img
              class="vico-logo"
              src="../assets/images/logo/Logo.png"
              alt=""
              width="200"
            >
          </div>
          <span class="logo-text" />
        </div>
        <button
          class="menu-toggle"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          ☰
        </button>
        <div :class="['nav-links', { 'is-open': menuOpen }]">
          <RouterLink
            to="/star-map"
            class="nav-link"
          >
            Star Map
          </RouterLink>
          <RouterLink
            to="/mission"
            class="nav-link"
          >
            Our Mission
          </RouterLink>
          <RouterLink
            to="/login"
            class="nav-link login-link"
          >
            Sign In
          </RouterLink>
          <RouterLink
            to="/register"
            class="nav-link cta-button"
          >
            Sign Up
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="main">
      <div class="main-content">
        <h1 class="title">
          <span>ViCo</span>Spaces
        </h1>
        <p class="description">
          "A collaborative virtual workspace, built to enhance productivity for collaborators through seamless collaboration."
        </p>
        <div class="features">
          <div class="feature one">
            <div class="feature-icon">
              👨‍🚀
            </div>
            <h3>Virtual Offices</h3>
            <p>Customizable spaces for your team</p>
          </div>
          <div class="feature two">
            <div class="feature-icon">
              💬
            </div>
            <h3>Real-time Chat</h3>
            <p>Instant communication across the cosmos</p>
          </div>
          <div class="feature three">
            <div class="feature-icon">
              ✅
            </div>
            <h3>Task Management</h3>
            <p>Organize your mission with ease</p>
          </div>
          <div class="feature four">
            <div class="feature-icon">
              📊
            </div>
            <h3>Analytics</h3>
            <p>Track your team's progress</p>
          </div>
        </div>
        <div class="signin-info">
          <button class="btn">
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              class="border"
            >
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                class="bg-line"
              />
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                class="hl-line"
              />
            </svg>
            <span class="sj"> <RouterLink
              to="/register"
              class="register-bottom"
            >
              Start Your Journey
            </RouterLink></span>
          </button>
        </div>
        <p class="cta-subtext">
          Free Forever.
        </p>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-links">
        <RouterLink to="/about">
          About Us
        </RouterLink>
        <RouterLink to="/contact">
          Contact
        </RouterLink>
        <RouterLink to="/privacy">
          Privacy Policy
        </RouterLink>
        <RouterLink to="/terms">
          Terms of Service
        </RouterLink>
      </div>
      <p class="copyright">
        &copy; 2024 ViCo. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style scoped>
:root {
  --color-primary: #3a1f5d;
  --color-secondary: #c779d0;
  --color-accent: #4bc0c8;
  --color-background: #f4f7f9;
  --color-text: #333;
  --color-text-light: #fff;
  --font-main: 'Roboto', sans-serif;
  --font-heading: 'Montserrat', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
  overflow-y:unset;
  margin: 0;
  min-height: 100%;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.background {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #0a192f;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
}

/* Header and Navigation */
.header {
  background-color: rgba(246, 246, 246, 0.074); 
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.nav {
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-placeholder {
  width: 40px;
  height: 40px;
  background-color: var(--color-accent);
  border-radius: 50%;
  margin-right: 0.5rem;
}

.logo-text {
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.2rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
}
.vico-logo{
  position: absolute;
  top: -40px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.nav-link {
  color: var(--color-text-light);
  font-weight: 500;
  position: relative;
  transition: transform 0.3s ease, color 0.3s ease;
}
.nav-link:hover{
  color: #faae33;
}

.login-link {
  border: 1px solid var(--color-text-light);
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.cta-button {
  background-color: var(--color-accent);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;

}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
}

.main-content {
  text-align: center;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 2rem;

}

.title {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--color-primary);
  color: white;

}

.title span {
  color: var(--color-secondary);
}

.description {
  margin: 1rem auto;
  font-size: 1.1rem;
  max-width: 700px;
  color: #fff;
  margin-bottom: 90px;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 4px; 
  margin: 0;
  padding: 0
}
.feature{
  width: 100% ;
}

.features .feature {
  padding: 20px;
  background-color: whitesmoke;
  text-align: center;
  transition: transform 0.3s ease, background-color 0.3s ease, border 0.3s ease;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  width: 250px; 
  gap: 2%;
}

.features .feature:hover {
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.features .feature-icon {
  font-size: 3rem;
  margin-bottom: 10px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.features .feature:hover .feature-icon {
  transform: scale(1.2);
  color: #ffd700;
}

.features h3 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.features p {
  font-size: 1rem;
  color: #8b8b8b;
  transition: color 0.3s ease;
}

.features .feature:hover h3 {
  color: #ffd700;
}
.features .feature:hover p {
  color: #fff;
}
.signin-info{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  padding-top: 10%;
}
.btn {
  position: relative;
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #91C9FF;
  outline: none;
  transition: 1s ease-in-out;
}

.register-bottom {
  color: white;
  text-decoration: none;
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;
}

.btn:hover {
  transition: 1s ease-in-out;
  background: #022d59;
}

.btn:hover svg {
  stroke-dashoffset: -480;
}

.btn span {
  color: white;
  font-size: 18px;
  font-weight: 100;
}
.sj{
  padding: 3px;
}
.cta-subtext{
  padding-top: 80px;
  color: white;
}

/* Footer */
.footer {
  background-color: var(--color-primary);
  padding: 1rem;
  text-align: center;
  color: #fff;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-links a {
  color: var(--color-text-light);
  font-size: 0.9rem;
  transition: transform 0.3s ease, color 0.3s ease;
}
.footer-links a:hover{
  color: #faae33;
}


@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(58, 31, 93, 0.9);
  }

  .nav-links.is-open {
    display: flex;
  }

  .features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 0.9rem;
  }
}
.full-wh {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 100%;
}

.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

}
@media (max-width: 375px){
  .header {
    background-color: rgba(157, 154, 154, 0.187); 
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
  }
}

#stars, #starts2, #starts3{
  overflow: hidden;
}

#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 117px 1613px #c49952, 1488px 635px #c49952, 944px 914px #c49952, 647px 277px #c49952, 1792px 1205px #c49952, 656px 1517px #c49952, 820px 1839px #c49952, 1153px 1400px #c49952, 870px 13px #c49952, 550px 702px #c49952, 1155px 1056px #c49952, 88px 1709px #c49952, 1450px 1090px #c49952, 1929px 457px, 1731px 1759px #c49952, 1378px 1390px #c49952, 1815px 1364px #c49952, 960px 270px #c49952, 1343px 427px #c49952, 1963px 1045px #c49952, 119px 1136px #c49952;
  -webkit-animation: animStar 50s linear infinite;
  -moz-animation: animStar 50s linear infinite;
  -ms-animation: animStar 50s linear infinite;
  animation: animStar 50s linear infinite;
}

#stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 117px 1613px #c49952, 1488px 635px #c49952, 944px 914px #c49952, 647px 277px #c49952, 1792px 1205px #c49952, 656px 1517px #c49952, 820px 1839px #c49952, 1153px 1400px #c49952, 870px 13px #c49952, 550px 702px #c49952, 1155px 1056px #c49952, 88px 1709px #c49952, 1450px 1090px #c49952, 1929px 457px #c49952, 1390px 905px #c49952, 1771px 269px #c49952, 1741px 669px #c49952, 432px 64px #c49952, 563px 996px #c49952, 1918px 1873px #c49952, 1845px 1211px #c49952, 231px 1503px #c49952,#c49952, 1290px 1119px #c49952, 137px 1793px #c49952, 1052px 1470px #c49952, 1561px 226px #c49952, 1156px 402px #c49952, 709px 693px #c49952, 1040px 1911px #c49952, 1624px 1115px #c49952, 551px 475px #c49952, 416px 1090px #c49952, 1183px 451px #c49952, 58px 765px #c49952, 743px 1016px #c49952, 198px 369px #c49952, 1645px 1503px #c49952, 997px 22px #c49952, 1447px 1323px #c49952, 379px 883px #c49952, 1171px 1195px #c49952, 919px 133px #c49952, 1400px 517px #c49952, 725px 804px #c49952, 1600px 699px #c49952, 357px 581px #c49952, 266px 1713px #c49952, 848px 1749px #c49952, 1963px 1045px #c49952, 119px 1136px #c49952;
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1117px 1306px #c49952, 1078px 1783px #c49952, 1179px 1085px #c49952, 1145px 920px #c49952, 422px 1233px #c49952, 387px 98px #c49952, 1153px 637px #c49952, 1084px 782px #c49952, 476px 453px #c49952, 926px 1306px #c49952, 60px 1086px #c49952, 753px 1575px #c49952, 272px 1684px #c49952, 1285px 750px #c49952, 1416px 1327px, 1184px 1057px #c49952, 835px 451px #c49952, 896px 594px #c49952, 35px 893px #c49952, 895px 542px #c49952, 706px 225px #c49952, 56px 1040px #c49952, 1954px 108px #c49952, 1439px 1423px #c49952, 26px 1881px #c49952, 802px 1564px #c49952, 273px 708px #c49952, 40px 31px #c49952, 859px 108px #c49952;
  -webkit-animation: animStar 100s linear infinite;
  -moz-animation: animStar 100s linear infinite;
  -ms-animation: animStar 100s linear infinite;
  animation: animStar 100s linear infinite;
}

#stars2:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1117px 1306px #c49952, 1078px 1783px #c49952, 1179px 1085px #c49952, 1145px 920px #c49952, 422px 1233px #c49952, 387px 98px #c49952, 1153px 637px #c49952, 1084px 782px #c49952, 476px 453px #c49952, 926px 1306px #c49952, 60px 1086px #c49952, 753px 1575px #c49952, 272px 1684px #c49952, 1285px 750px #c49952, 1416px 1327px #c49952, 1931px 473px #c49952, 736px 1395px #c49952, 1816px 763px #c49952, 438px 879px #c49952, 665px 1902px #c49952, 1341px 677px #c49952, 1404px 1073px #c49952, 100px 597px #c49952, 357px 1689px #c49952, 1044px 1342px #c49952, 1954px 502px #c49952, 1192px 1308px #c49952, 540px 1239px #c49952, 1360px 552px #c49952, 89px 752px #c49952, 659px 1253px #c49952, 62px 517px #c49952, 1375px 1705px #c49952, 1343px 1511px #c49952, 1659px 1922px #c49952, 1560px, 1184px 1057px #c49952, 835px 451px #c49952, 896px 594px #c49952, 35px 893px #c49952, 895px 542px #c49952, 706px 225px #c49952, 56px 1040px #c49952, 1954px 108px #c49952, 1439px 1423px #c49952, 26px 1881px #c49952, 802px 1564px #c49952, 273px 708px #c49952, 40px 31px #c49952, 859px 108px #c49952;
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 940px 1360px #c49952, 1071px 539px #c49952, 1710px 1414px #c49952, 836px 299px #c49952, 1944px 1420px #c49952, 253px 1449px #c49952, 1257px 1250px #c49952, 1588px 1830px #c49952, 1077px 1204px #c49952, 273px 1081px #c49952, 1993px 766px #c49952, 1808px 479px #c49952, 917px 263px #c49952, 663px 1820px #c49952, 342px 1988px #c49952, 727px 1250px #c49952, 636px 1666px #c49952, 692px 1112px #c49952, 248px 1211px #c49952, 1422px 1121px #c49952, 881px 46px #c49952, 1531px 1977px #c49952, 1643px 1023px #c49952, 684px 1071px #c49952, 1142px 1873px #c49952, 292px 1313px #c49952, 256px 1237px #c49952, 89px 912px #c49952, 964px 1783px #c49952, 877px 760px #c49952, 1641px 1474px #c49952, 1492px 24px #c49952, 1776px 1642px #c49952, 183px 602px #c49952, 1998px 62px #c49952, 1560px 367px #c49952, 1333px 995px #c49952, 704px 1815px #c49952, 1809px 712px #c49952, 1503px 288px #c49952, 630px 556px #c49952, 1715px 125px #c49952, 353px 1878px #c49952, 975px 333px #c49952, 1740px 1409px #c49952, 1341px 1871px #c49952, 1279px 1064px #c49952, 169px 874px #c49952, 161px 528px #c49952, 1671px 1669px #c49952, 169px 632px #c49952, 547px 1724px #c49952, 1904px 110px #c49952, 679px 1670px #c49952, 196px 123px #c49952, 786px 871px #c49952, 1840px 324px #c49952, 356px 967px #c49952, 61px 549px #c49952, 99px 677px #c49952, 1719px 87px #c49952, 1713px 1990px #c49952, 1717px 1358px #c49952, 108px 1187px #c49952, 51px 869px #c49952, 1461px 902px #c49952, 1034px 891px #c49952, 962px 1881px #c49952, 1723px 595px #c49952, 479px 901px #c49952, 1546px 1823px #c49952, 285px 1208px #c49952, 1056px 347px #c49952, 261px 988px #c49952, 466px 990px #c49952, 1657px 648px #c49952, 1249px 933px #c49952, 1552px 1555px #c49952, 147px 62px #c49952, 292px 1157px #c49952, 1816px 423px #c49952, 1714px 757px #c49952, 1036px 961px #c49952, 1955px 710px #c49952, 1842px 516px #c49952, 479px 1870px #c49952, 1579px 1445px #c49952, 1225px 1309px #c49952, 1965px 566px #c49952, 1575px 1072px #c49952, 923px 329px #c49952, 651px 1514px #c49952, 865px 1100px #c49952, 782px 1873px #c49952, 115px 299px #c49952, 14px 1668px #c49952, 1666px 1817px #c49952, 1096px 1068px #c49952, 1462px 742px #c49952, 1384px 1750px #c49952;
  -webkit-animation: animStar 150s linear infinite;
  -moz-animation: animStar 150s linear infinite;
  -ms-animation: animStar 150s linear infinite;
  animation: animStar 150s linear infinite;
}

#stars3:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 940px 1360px #c49952, 1071px 539px #c49952, 1710px 1414px #c49952, 836px 299px #c49952, 1944px 1420px #c49952, 253px 1449px #c49952, 1257px 1250px #c49952, 1588px 1830px #c49952, 1077px 1204px #c49952, 273px 1081px #c49952, 1993px 766px #c49952, 1808px 479px #c49952, 917px 263px #c49952, 663px 1820px #c49952, 342px 1988px #c49952, 727px 1250px #c49952, 636px 1666px #c49952, 692px 1112px #c49952, 248px 1211px #c49952, 1422px 1121px, 89px 912px #c49952, 964px 1783px #c49952, 877px 760px #c49952, 1641px 1474px #c49952, 1492px 24px #c49952, 1776px 1642px #c49952, 183px 602px #c49952, 1998px 62px #c49952, 1560px 367px #c49952, 1333px 995px #c49952, 704px 1815px #c49952, 1809px 712px #c49952, 1503px 288px #c49952, 1384px 1750px #c49952;
}

#stars4 {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 233px 1976px #c49952, 1196px 1119px #c49952, 646px 740px #c49952, 335px 645px #c49952, 1119px 1452px #c49952, 176px 1870px #c49952, 639px 1711px #c49952, 647px 1388px #c49952, 1516px 1108px #c49952, 464px 66px #c49952, 331px 344px #c49952, 772px 1189px #c49952, 1516px 1850px #c49952, 1500px 1463px #c49952, 1275px 876px #c49952, 1107px 645px #c49952, 977px 478px #c49952, 583px 1179px #c49952, 284px 395px #c49952, 1220px 461px #c49952, 632px 158px #c49952;
  -webkit-animation: animStar 600s linear infinite;
  -moz-animation: animStar 600s linear infinite;
  -ms-animation: animStar 600s linear infinite;
  animation: animStar 600s linear infinite;
}

#stars4:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 233px 1976px #c49952, 1196px 1119px #c49952, 646px 740px #c49952, 335px 645px #c49952, 1119px 1452px #c49952, 176px 1870px #c49952, 639px 1711px #c49952, 647px 1388px #c49952, 1516px 1108px #c49952, 464px 66px #c49952, 331px 344px #c49952, 772px 1189px #c49952, 1516px 1850px #c49952, 1500px 1463px #c49952, 1275px 876px #c49952, 1107px 645px #c49952, 977px 478px #c49952, 583px 1179px #c49952, 284px 395px #c49952, 1220px 461px #c49952, 1160px 249px #c49952, 196px 865px #c49952, 670px 1915px #c49952, 1449px 382px #c49952, 1191px 546px #c49952, 1329px 605px #c49952, 1945px 632px 158px #c49952;
}

@-webkit-keyframes animStar {
  from {
      -webkit-transform: translateY(0px);
  }
  to {
      -webkit-transform: translateY(-2000px);
  }
}

@-moz-keyframes animStar {
  from {
      -moz-transform: translateY(0px);
  }
  to {
      -moz-transform: translateY(-2000px);
  }
}

@-ms-keyframes animStar {
  from {
      -ms-transform: translateY(0px);
  }
  to {
      -ms-transform: translateY(-2000px);
  }
}

@keyframes animStar {
  from {
      transform: translateY(0px);
  }
  to {
      transform: translateY(-2000px);
  }
}
</style>
