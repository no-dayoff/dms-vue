<!--
 * @Author: lihuazheng
 * @Date: 2020-12-24 20:05:10
 * @LastEditTime: 2020-12-24 21:08:17
 * @FilePath: \dms-vue\src\components\component\particles.vue
-->
<template>
  <div id="particles-js"></div>
</template>

<script>
import particles from 'particles.js'
import particlesConfig from '../../../public/particles.json'
export default {
  data() {
    return {
      
    }
  },
      mounted(){
    particlesJS("particles-js",particlesConfig);
}
}
</script>

<style>
html,body{ 
	width:100%;
	height:100%;
}

html{
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body{
  font:normal 75% Arial, Helvetica, sans-serif;
  margin: 0;
}

canvas{
  display:block;
  
}


/* ---- stats.js ---- */

.count-particles{
  background: #000022;
  position: absolute;
  top: 48px;
  left: 0;
  width: 80px;
  color: #13E8E9;
  font-size: .8em;
  text-align: left;
  text-indent: 4px;
  line-height: 14px;
  padding-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
}

.js-count-particles{
  font-size: 1.1em;
}

#stats,
.count-particles{
  -webkit-user-select: none;
  margin-top: 5px;
  margin-left: 5px;
}

#stats{
  border-radius: 3px 3px 0 0;
  overflow: hidden;
}

.count-particles{
  border-radius: 0 0 3px 3px;
}


/* ---- particles.js container ---- */

#particles-js{
  width: 100%;
  height: 100%;
  background-color: rgb(21, 16, 25);
  background-image: url('');
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
</style>