new Vue({el:"#app",mounted:function(){this.getList(),document.addEventListener("touchstart",this.touchstart),document.addEventListener("touchend",this.touchend)},data:{tab:"1",firstTab:"0",firstTabText:["指数增强","主题行业","我的策略"],secondTab:"0",secondTabText:["日安鑫","策略体验"],zthyList:[],zszqList:[],goldPrice:0,silverPrice:0,strategyPrice:0,bjFlag:!1,modalFlag:!1,modalMsg:"您已成功开启对应策略",confirmModalFlag:!1,confirmMsg:{title:"日安鑫",body:"是否在您的账户中授权启动对应策略"},openFlag:!0,rulesModalFlag:!1},methods:{getList:function(){this.$http.get("http://api.wquant.com/API4/Grit/GetStockStrategyList.ashx",{params:{tradetype:1,type:3,pagesize:20,pagenum:1,propid:11}}).then(function(t){this.zszqList=t.data.data}),this.$http.get("http://api.wquant.com/API4/Grit/GetStockStrategyList.ashx",{params:{tradetype:1,type:3,pagesize:20,pagenum:1,propid:12}}).then(function(t){this.zthyList=t.data.data})},changeTab:function(t){this.tab=t},changeSubTab:function(t,i){this[t]=String(i)},showRules:function(){this.rulesModalFlag=!0,this.bjFlag=!0},changeAmount:function(t,i){var a="gold"===i?1e5:1e3;switch(t){case"plus":this[i+"Price"]=this[i+"Price"]+a;break;case"minus":0<this[i+"Price"]&&(this[i+"Price"]=this[i+"Price"]-a)}},open:function(){this.confirmMsg={title:"日安鑫",body:"<h5>是否在您的账户中授权启动对应策略</h5><p>(请认真阅读策略的规则说明，首次操作将签署风险匹配意见书）</p>"},this.openFlag=!0,this.confirmModalFlag=!0,this.bjFlag=!0},sureOpen:function(){this.modalMsg="您已成功开启对应策略",this.confirmModalFlag=!1,this.modalFlag=!0},close:function(){this.confirmMsg={title:"日安鑫",body:"<h5>是否关闭对应策略</h5>"},this.openFlag=!1,this.confirmModalFlag=!0,this.bjFlag=!0},sureClose:function(){this.modalMsg="您已成功关闭对应策略",this.confirmModalFlag=!1,this.modalFlag=!0},closeModal:function(){this.modalFlag=!1,this.confirmModalFlag=!1,this.rulesModalFlag=!1,this.bjFlag=!1},number:function(t){var i=/[^0-9]/g;if(this[t=t+"Price"]=this[t].replace(/\s+/g,""),i.test(this[t]))return this[t]=this[t].replace(i,""),!1},touchstart:function(t){1<t.touches.length&&t.preventDefault()},touchend:function(){var t=(new Date).getTime();t-this.lastTouchEnd<=300&&event.preventDefault(),this.lastTouchEnd=t},isAndroid:function(){var t=navigator.userAgent,i=(navigator.appVersion,-1<t.indexOf("Android")||-1<t.indexOf("Linux"));t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!0==i}}});