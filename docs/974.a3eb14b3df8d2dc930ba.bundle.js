(self.webpackChunkclient=self.webpackChunkclient||[]).push([[974],{927:(e,t,n)=>{"use strict";n.r(t);var r=n(7294),o=n(3935),a=n(3727),c=n(5977),i=n(7703),u=n(7661),l=n.n(u),s=n(5019),d=n.n(s),f=n(8382),p=n.n(f);function m(){return r.createElement(i.Provider,{store:l()},r.createElement(a.BrowserRouter,{basename:"/vvlt"},r.createElement("div",null,r.createElement("ul",null,r.createElement("li",null,r.createElement(a.Link,{to:"/"},"Home")),r.createElement("li",null,r.createElement(a.Link,{to:"/about"},"About"))),r.createElement("hr",null),r.createElement(c.rs,null,r.createElement(c.AW,{exact:!0,path:"/"},r.createElement(d(),null)),r.createElement(c.AW,{path:"/about"},r.createElement(_,null)),r.createElement(c.AW,{path:"/game"},r.createElement(p(),null))))))}function _(){return r.createElement("div",null,"Whatch'you wanna know about?")}var h=n(1064);const v=document.createElement("div");var C;document.body.appendChild(v),C=v,o.render(r.createElement(m,null),C),l().dispatch((0,h.wsConnect)({host:"wss://salty-mesa-40253.herokuapp.com/connect"}))},3287:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r=n.p+"0d4222d9f543db2cff2278e9c2339cc0.bin"},7661:function(e,t,n){"use strict";var r,o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),c=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return c(t,e),t},u=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var a=arguments[t],c=0,i=a.length;c<i;c++,o++)r[o]=a[c];return r},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0,t.SetID=t.UpdatedRoom=t.RemovedRoom=t.CreatedRoom=t.AllRooms=t.activeRoom=t.ConnectionState=void 0;var s,d=n(7407),f=l(n(1064)),p=i(n(3858));!function(e){e[e.NotConnected=0]="NotConnected",e[e.Connecting=1]="Connecting",e[e.Connected=2]="Connected"}(s=t.ConnectionState||(t.ConnectionState={}));var m={user_id:null,rooms:[],p2p_connection_state:s.NotConnected},_=d.createSlice({name:"root",initialState:m,reducers:{AllRooms:function(e,t){return Object.assign({},e,{rooms:t.payload.rooms})},CreatedRoom:function(e,t){return o(o({},e),{rooms:e.rooms.concat(t.payload.room)})},RemovedRoom:function(e,t){return o(o({},e),{rooms:e.rooms.filter((function(e){return e.id!==t.payload.room_id}))})},UpdatedRoom:function(e,t){return o(o({},e),{rooms:e.rooms.map((function(e){return e.id===t.payload.room.id?t.payload.room:e}))})},SetID:function(e,t){return o(o({},e),{user_id:t.payload.user_id})}},extraReducers:function(e){e.addCase(p.p2pConnected,(function(e,t){return o(o({},e),{p2p_connection_state:s.Connected})})),e.addCase(p.p2pConnect,(function(e,t){return o(o({},e),{p2p_connection_state:s.Connecting})})),e.addCase(p.p2pDisconnect,(function(e,t){return o(o({},e),{p2p_connection_state:s.NotConnected})}))}});t.activeRoom=function(e){if(null!==e.user_id)return e.rooms.find((function(t){var n;return t.host.id===e.user_id||(null===(n=t.peer)||void 0===n?void 0:n.id)===e.user_id}))};var h=u([f.default,p.default],d.getDefaultMiddleware());t.AllRooms=(r=_.actions).AllRooms,t.CreatedRoom=r.CreatedRoom,t.RemovedRoom=r.RemovedRoom,t.UpdatedRoom=r.UpdatedRoom,t.SetID=r.SetID,t.default=d.configureStore({reducer:_.reducer,middleware:h})},3858:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0,t.newDebugCanvas=t.newCanvas=t.p2pSignal=t.p2pSend=t.p2pMessage=t.p2pDisconnect=t.p2pConnected=t.p2pConnecting=t.p2pConnect=void 0;var o=n(7407),a=r(n(8853)),c=n(1064),i=n(7774),u=r(n(8909)),l=r(n(3628)),s=r(n(3287)),d=null;fetch(s.default).then((function(e){return e.arrayBuffer()})).then((function(e){return d=new Uint8Array(e)}));var f=new Image;f.src=u.default;var p,m,_,h,v,C,b,y,E,w=new Image;w.src=l.default,t.p2pConnect=o.createAction("P2P_CONNECT",(function(e){return{payload:e}})),t.p2pConnecting=o.createAction("P2P_CONNECTING"),t.p2pConnected=o.createAction("P2P_CONNECTED"),t.p2pDisconnect=o.createAction("P2P_DISCONNECT"),t.p2pMessage=o.createAction("P2P_MESSAGE"),t.p2pSend=o.createAction("P2P_NEW_MESSAGE",(function(e){return{payload:e}})),t.p2pSignal=o.createAction("P2P_SIGNAL",(function(e){return e})),t.newCanvas=o.createAction("NEW_GAME_CANVAS",(function(e){return{payload:e}})),t.newDebugCanvas=o.createAction("NEW_DEBUG_CANVAS",(function(e){return{payload:e}})),t.default=(p=null,m=null,_=null,h=null,v=null,C=null,b=0,y=0,E=null,function(e){return function(n){return function(r){switch(r.type){case"P2P_CONNECT":return null!==p&&p.destroy(),p=new a.default({initiator:r.payload}),_=r.payload,p.on("signal",function(e){return function(t){e.dispatch(c.wsSend({Signal:{payload:JSON.stringify(t)}}))}}(e)),p.on("connect",function(e){return function(){console.log("p2p","onConnect"),e.dispatch(t.p2pConnected())}}(e)),p.on("error",function(e){return function(){console.log("p2p","onError"),e.dispatch(t.p2pDisconnect()),e.dispatch(c.wsSend("LeaveRoom"))}}(e)),p.on("data",(function(e){var t=m.handle_remote_input(e,performance.now());t&&p.send(t)})),n(r);case"P2P_DISCONNECT":return null!==p&&p.destroy(),p=null,n(r);case"P2P_NEW_MESSAGE":p.send(r.payload);break;case"P2P_SIGNAL":p.signal(JSON.parse(r.payload));break;case"NEW_DEBUG_CANVAS":var o=r.payload;if(null===o){cancelAnimationFrame(E);break}var u=o.getContext("2d"),l=16,s=function(e){var t=0;u.clearRect(0,0,o.width,o.height),u.font="16px serif",u.fillText("Latency (ms): "+m.latency_ms(),3,t+=l),u.fillText("Local Frame: "+b,3,t+=l),u.fillText("Remote Frame: "+m.estimated_remote_frame(),3,t+=l),u.fillText("Synced Frame: "+m.last_synchronized(),3,t+=l),u.fillText("Hashes Sent: "+y,3,t+=l),u.fillText("Stocks (Local Player): "+m.local_stock_count(),3,t+=l),u.fillText("Stocks (Remote Player): "+m.remote_stock_count(),3,t+=l);var n="Running";switch(m.state()){case-1:n="Lost";break;case 1:n="Won!"}u.fillText("Game State: "+n,3,t+=l),E=requestAnimationFrame(s)};E=requestAnimationFrame(s);break;case"NEW_GAME_CANVAS":if(h)break;if(null===(h=r.payload)){cancelAnimationFrame(v),clearInterval(C);break}m=new i.VvltClient(_,d);var S=new i.RendererSettings(h,f,w),g=new i.Renderer(S,m);document.addEventListener("keydown",(function(e){var t=null;switch(e.key){case"ArrowUp":t=m.handle_up_pressed();break;case"ArrowDown":t=m.handle_down_pressed();break;case"ArrowLeft":t=m.handle_left_pressed();break;case"ArrowRight":t=m.handle_right_pressed();break;case" ":t=m.handle_fire_pressed()}t&&(e.preventDefault(),p.send(t))})),document.addEventListener("keyup",(function(e){var t=null;switch(e.key){case"ArrowUp":t=m.handle_up_released();break;case"ArrowDown":t=m.handle_down_released();break;case"ArrowLeft":t=m.handle_left_released();break;case"ArrowRight":t=m.handle_right_released();break;case" ":t=m.handle_fire_released()}t&&(e.preventDefault(),p.send(t))}));var A=function(e){g.render(m),v=requestAnimationFrame(A)};v=requestAnimationFrame(A),C=window.setInterval((function(){var e=m.needs_hash();e&&(y+=1,p.send(e));var t=m.needs_ping(performance.now());t&&p.send(t),m.estimated_remote_frame()+2*Math.max(m.latency_ms(),160)/16>=b&&(b=m.step())}),16);break;default:return n(r)}}}})},1064:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};t.__esModule=!0,t.wsSend=t.wsMessage=t.wsDisconnect=t.wsConnected=t.wsConnecting=t.wsConnect=void 0;var c,i=n(7407),u=a(n(7661)),l=n(3858);t.wsConnect=i.createAction("WS_CONNECT"),t.wsConnecting=i.createAction("WS_CONNECTING"),t.wsConnected=i.createAction("WS_CONNECTED"),t.wsDisconnect=i.createAction("WS_DISCONNECT"),t.wsMessage=i.createAction("WS_MESSAGE"),t.wsSend=i.createAction("WS_NEW_MESSAGE",(function(e){return{payload:e}})),t.default=(c=null,function(e){return function(n){return function(r){switch(r.type){case"WS_CONNECT":null!==c&&c.close(),(c=new WebSocket(r.payload.host)).onmessage=function(e){return function(t){var n=JSON.parse(t.data),r=u[n.type];"function"==typeof r?e.dispatch(r(n.content)):"Signal"==n.type?e.dispatch(l.p2pSignal(n.content)):console.error("unrecognized response!")}}(e),c.onclose=function(e){return function(){e.dispatch(t.wsDisconnect())}}(e),c.onopen=function(e){return function(n){e.dispatch(t.wsConnected())}}(e);break;case"WS_DISCONNECT":null!==c&&c.close(),c=null;break;case"WS_NEW_MESSAGE":c.send(JSON.stringify(r.payload));break;default:return n(r)}}}})},8382:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};t.__esModule=!0;var i=c(n(7294)),u=n(7703),l=n(3858),s=n(7661);t.default=u.connect((function(e,t){return r(r({},t),{user_id:e.user_id,connection_state:e.p2p_connection_state})}),null)((function(e){var t=e.room,n=(e.user_id,e.connection_state),r=u.useDispatch(),o=i.useState(!0),a=o[0],c=o[1],d={position:"absolute",left:0,top:0,right:0,bottom:0,width:"100%"};switch(n){case s.ConnectionState.NotConnected:case s.ConnectionState.Connecting:return i.default.createElement("div",null,"Loading: ",t.name);case s.ConnectionState.Connected:return i.default.createElement("div",null,i.default.createElement("div",null,t.name),i.default.createElement("div",{style:{position:"relative"}},i.default.createElement("canvas",{style:d,width:1920,height:1080,ref:function(e){r(l.newCanvas(e))}}),a?i.default.createElement("canvas",{style:d,width:1920,height:1080,ref:function(e){r(l.newDebugCanvas(e))}}):i.default.createElement(i.default.Fragment,null)),i.default.createElement("div",null,i.default.createElement("label",null,i.default.createElement("input",{onChange:function(e){c(e.target.checked)},type:"checkbox",checked:a}),"Debug: ",a?"true":"false")))}}))},5019:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0;var i=c(n(7294)),u=n(7703),l=n(6396),s=n(3727),d=c(n(8382)),f=a(n(7661)),p=n(1064),m=n(3858),_=c(n(3912)),h=c(n(1548)),v=c(n(5125)),C=c(n(7463)),b=l.makeStyles((function(e){return{root:{}}}));t.default=u.connect((function(e){return{rooms:e.rooms,active_room:f.activeRoom(e)}}),{})((function(e){var t=e.rooms,n=e.active_room,r=b(),o=(s.useHistory(),u.useDispatch()),a=function(e){f.default.dispatch(p.wsSend({JoinRoom:{room_id:e}})),o(m.p2pConnect(!1))};return n?i.default.createElement(d.default,{room:n}):i.default.createElement("div",{className:r.root},i.default.createElement(_.default,{variant:"contained",color:"primary",onClick:function(){o(p.wsSend({CreateRoom:{name:"Test Room "+Math.random()}})),o(m.p2pConnect(!0))}},"Create Room"),i.default.createElement(h.default,{component:"nav"},t.filter((function(e){return!e.peer})).map((function(e,t){return i.default.createElement(v.default,{key:e.id,button:!0,onClick:a.bind(null,e.id)},i.default.createElement(C.default,{primary:e.name}))}))))}))},3628:(e,t,n)=>{"use strict";e.exports=n.p+"1fc2c97db2bdbddca248.png"},8909:(e,t,n)=>{"use strict";e.exports=n.p+"afbb487d80b277a0cf24.png"},1758:()=>{}}]);
//# sourceMappingURL=974.a3eb14b3df8d2dc930ba.bundle.js.map