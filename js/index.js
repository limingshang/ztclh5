new Vue({el:"#app",mounted:function(){sessionStorage.getItem("firstTab")&&(this.firstTab=sessionStorage.getItem("firstTab")),Vue.http.options.emulateJSON=!0,Vue.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"};var t=this.getUrlPara("mobile"),s=this.getUrlPara("fundcode");s?(sessionStorage.setItem("count","0"),sessionStorage.setItem(t,s||""),sessionStorage.setItem("flag",t||"")):sessionStorage.getItem("count")&&"0"!==sessionStorage.getItem("count")||(sessionStorage.setItem("count","0"),t&&sessionStorage.setItem(t,""),sessionStorage.setItem("flag",t||"")),this.getList(),document.addEventListener("touchstart",this.touchstart),document.addEventListener("touchend",this.touchend)},data:{ajaxUrl:"https://tdcl.wkzq.com.cn/",tab:"1",firstTab:"0",firstTabText:["指数增强","主题行业","我的策略"],secondTab:"0",secondTabText:["日安鑫","策略体验"],zthyList:[],zszqList:[],myList:[],goldPrice:0,silverPrice:0,strategyPrice:0,bjFlag:!1,modalFlag:!1,modalMsg:"您已成功开启对应策略",confirmModalFlag:!1,confirmMsg:{title:"日安鑫",body:"是否在您的账户中授权启动对应策略"},openFlag:!0,rulesModalFlag:!1,rulesRnjjModalFlag:!1},methods:{getUrlPara:function(t){var s=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),e=window.location.search.substr(1).match(s);return null!=e?e[2]:null},getList:function(){this.$http.post(this.ajaxUrl+"home/strategy/getStrategyList",{strategy_type:0,strategy_status:1}).then(function(t){this.zszqList=t.data.result}),this.$http.post(this.ajaxUrl+"home/strategy/getStrategyList",{strategy_type:1,strategy_status:1}).then(function(t){this.zthyList=t.data.result}),this.$http.post(this.ajaxUrl+"home/strategy/getFocusList",{phone_num:this.getUrlPara("mobile"),focus_status:0}).then(function(t){this.myList=t.data.result.focus_info})},changeTab:function(t){if("2"===t)return this.modalMsg="准备中，敬请期待！",this.confirmModalFlag=!1,this.modalFlag=!0,void(this.bjFlag=!0);this.tab=t},changeSubTab:function(t,s){"firstTab"===t&&sessionStorage.setItem("firstTab",s),this[t]=String(s)},changeAmount:function(t,s){var e="gold"===s?1e5:1e3;switch(t){case"plus":this[s+"Price"]=this[s+"Price"]+e;break;case"minus":0<this[s+"Price"]&&(this[s+"Price"]=this[s+"Price"]-e)}},open:function(){this.confirmMsg={title:"日安鑫",body:"<h5>是否在您的账户中授权启动对应策略</h5><p>(请认真阅读策略的规则说明，首次操作将签署风险匹配意见书）</p>"},this.openFlag=!0,this.confirmModalFlag=!0,this.bjFlag=!0},sureOpen:function(){this.modalMsg="您已成功开启对应策略",this.confirmModalFlag=!1,this.modalFlag=!0},showRules:function(){this.rulesModalFlag=!0,this.bjFlag=!0},showRnjjRules:function(){this.rulesRnjjModalFlag=!0,this.bjFlag=!0},close:function(){this.confirmMsg={title:"日安鑫",body:"<h5>是否关闭对应策略</h5>"},this.openFlag=!1,this.confirmModalFlag=!0,this.bjFlag=!0},sureClose:function(){this.modalMsg="您已成功关闭对应策略",this.confirmModalFlag=!1,this.modalFlag=!0},closeModal:function(){this.modalFlag=!1,this.rulesModalFlag=!1,this.rulesRnjjModalFlag=!1,this.confirmModalFlag=!1,this.bjFlag=!1},number:function(t){var s=/[^0-9]/g;if(this[t=t+"Price"]=this[t].replace(/\s+/g,""),s.test(this[t]))return this[t]=this[t].replace(s,""),!1},touchstart:function(t){1<t.touches.length&&t.preventDefault()},touchend:function(){var t=(new Date).getTime();t-this.lastTouchEnd<=300&&event.preventDefault(),this.lastTouchEnd=t},isAndroid:function(){var t=navigator.userAgent,s=(navigator.appVersion,-1<t.indexOf("Android")||-1<t.indexOf("Linux"));t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!0==s}}});