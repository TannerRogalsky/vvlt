(self.webpackChunkclient=self.webpackChunkclient||[]).push([[974],{927:(e,t,n)=>{"use strict";n.r(t);var r=n(7294),o=n(3935),a=n(3727),c=n(5977),l=n(7703),s=n(7661),i=n.n(s),u=n(5019),d=n.n(u),p=n(8382),m=n.n(p);function f(){return r.createElement(l.Provider,{store:i()},r.createElement(a.BrowserRouter,{basename:"/vvlt"},r.createElement("div",null,r.createElement("ul",null,r.createElement("li",null,r.createElement(a.Link,{to:"/"},"Home")),r.createElement("li",null,r.createElement(a.Link,{to:"/about"},"About"))),r.createElement("hr",null),r.createElement(c.rs,null,r.createElement(c.AW,{exact:!0,path:"/"},r.createElement(d(),null)),r.createElement(c.AW,{path:"/about"},r.createElement(_,null)),r.createElement(c.AW,{path:"/game"},r.createElement(m(),null))))))}function _(){return r.createElement("div",null,"Whatch'you wanna know about?")}var h=n(2933);const E=document.createElement("div");var v;document.body.appendChild(E),v=E,o.render(r.createElement(f,null),v),i().dispatch((0,h.wsConnect)({host:"wss://salty-mesa-40253.herokuapp.com/connect"}))},4720:(e,t,n)=>{"use strict";n.r(t),n.d(t,{p2pConnect:()=>p,p2pConnecting:()=>m,p2pConnected:()=>f,p2pDisconnect:()=>_,p2pMessage:()=>h,p2pSend:()=>E,p2pSignal:()=>v,newCanvas:()=>S,default:()=>C});var r=n(7407),o=n(8853),a=n.n(o),c=n(2933),l=n(89),s=n(8909),i=n(3628);const u=new Image;u.src=s;const d=new Image;d.src=i;const p=(0,r.createAction)("P2P_CONNECT",(function(e){return{payload:e}})),m=(0,r.createAction)("P2P_CONNECTING"),f=(0,r.createAction)("P2P_CONNECTED"),_=(0,r.createAction)("P2P_DISCONNECT"),h=(0,r.createAction)("P2P_MESSAGE"),E=(0,r.createAction)("P2P_NEW_MESSAGE",(function(e){return{payload:e}})),v=(0,r.createAction)("P2P_SIGNAL",(function(e){return e})),S=(0,r.createAction)("NEW_GAME_CANVAS",(function(e){return{payload:e}})),C=(()=>{let e=null,t=null,n=null,r=null;return o=>s=>i=>{switch(i.type){case"P2P_CONNECT":null!==e&&e.destroy(),console.log("P2P_CONNECT",i.payload),e=new(a())({initiator:i.payload}),n=i.payload,e.on("signal",(e=>t=>{e.dispatch((0,c.wsSend)({Signal:{payload:JSON.stringify(t)}}))})(o)),e.on("connect",(e=>()=>{console.log("p2p","onConnect"),e.dispatch(f())})(o)),e.on("error",(e=>t=>{console.log("p2p","onError"),e.dispatch((0,c.wsSend)("LeaveRoom"))})(o)),e.on("data",(e=>{t.handle_remote_input(e)}));break;case"P2P_DISCONNECT":null!==e&&e.destroy(),e=null;break;case"P2P_NEW_MESSAGE":e.send(i.payload);break;case"P2P_SIGNAL":e.signal(JSON.parse(i.payload));break;case"NEW_GAME_CANVAS":let p=i.payload;if(null===p){cancelAnimationFrame(r);break}const m=new l.cQI(p,u,d),_=new l.Thl(m);_.set_width_height(512,512),t=new l.jaY(n),document.addEventListener("keydown",(e=>{e.preventDefault();let n=null;switch(e.key){case"ArrowUp":n=t.handle_up_pressed();break;case"ArrowDown":n=t.handle_down_pressed();break;case"ArrowLeft":n=t.handle_left_pressed();break;case"ArrowRight":n=t.handle_right_pressed();break;case" ":n=t.handle_fire_pressed()}n&&o.dispatch(E(n))})),document.addEventListener("keyup",(e=>{e.preventDefault();let n=null;switch(e.key){case"ArrowUp":n=t.handle_up_released();break;case"ArrowDown":n=t.handle_down_released();break;case"ArrowLeft":n=t.handle_left_released();break;case"ArrowRight":n=t.handle_right_released();break;case" ":n=t.handle_fire_released()}n&&o.dispatch(E(n))}));const h=e=>{t.step(),t.render(_),r=requestAnimationFrame(h)};r=requestAnimationFrame(h);break;default:return s(i)}}})()},2933:(e,t,n)=>{"use strict";n.r(t),n.d(t,{wsConnect:()=>c,wsConnecting:()=>l,wsConnected:()=>s,wsDisconnect:()=>i,wsMessage:()=>u,wsSend:()=>d,default:()=>p});var r=n(7407),o=n(7661),a=n(4720);const c=(0,r.createAction)("WS_CONNECT"),l=(0,r.createAction)("WS_CONNECTING"),s=(0,r.createAction)("WS_CONNECTED"),i=(0,r.createAction)("WS_DISCONNECT"),u=(0,r.createAction)("WS_MESSAGE"),d=(0,r.createAction)("WS_NEW_MESSAGE",(function(e){return{payload:e}})),p=(()=>{let e=null;return t=>n=>r=>{switch(r.type){case"WS_CONNECT":null!==e&&e.close(),e=new WebSocket(r.payload.host),e.onmessage=(e=>t=>{const n=JSON.parse(t.data);"function"==typeof o[n.type]?e.dispatch(o[n.type](n.content)):"Signal"==n.type?e.dispatch((0,a.p2pSignal)(n.content)):console.error("unrecognized response!")})(t),e.onclose=(e=>()=>{e.dispatch(i())})(t),e.onopen=(e=>t=>{e.dispatch(s(t.target.url))})(t);break;case"WS_DISCONNECT":null!==e&&e.close(),e=null;break;case"WS_NEW_MESSAGE":e.send(JSON.stringify(r.payload));break;default:return n(r)}}})()},7661:function(e,t,n){"use strict";var r,o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var a=arguments[t],c=0,l=a.length;c<l;c++,o++)r[o]=a[c];return r},c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0,t.SetID=t.JoinedRoom=t.RemovedRoom=t.CreatedRoom=t.AllRooms=void 0;var l=n(7407),s=c(n(2933)),i=c(n(4720)),u=l.createSlice({name:"root",initialState:{user_id:null,rooms:[],active_room:null},reducers:{AllRooms:function(e,t){return Object.assign({},e,{rooms:t.payload.rooms})},CreatedRoom:function(e,t){return o(o({},e),{rooms:e.rooms.concat(t.payload.room)})},RemovedRoom:function(e,t){return o(o({},e),{rooms:e.rooms.filter((function(e){return e.id!==t.payload.room_id})),active_room:e.active_room==t.payload.room_id?null:e.active_room})},JoinedRoom:function(e,t){return o(o({},e),{active_room:t.payload.room_id})},SetID:function(e,t){return o(o({},e),{user_id:t.payload.user_id})}},extraReducers:function(e){}}),d=a([s.default,i.default],l.getDefaultMiddleware());t.AllRooms=(r=u.actions).AllRooms,t.CreatedRoom=r.CreatedRoom,t.RemovedRoom=r.RemovedRoom,t.JoinedRoom=r.JoinedRoom,t.SetID=r.SetID,t.default=l.configureStore({reducer:u.reducer,middleware:d})},8382:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0;var a=o(n(7294)),c=n(7703),l=n(4720);t.default=c.connect((function(e,t){return r(r({},t),{user_id:e.user_id})}),null)((function(e){var t=e.room,n=(e.user_id,c.useDispatch());return a.default.createElement("div",null,t.name,a.default.createElement("canvas",{width:512,height:512,ref:function(e){n(l.newCanvas(e))}}))}))},5019:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};t.__esModule=!0;var o=r(n(7294)),a=n(7703),c=n(6396),l=n(3727),s=r(n(8382)),i=r(n(7661)),u=n(2933),d=n(4720),p=r(n(3912)),m=r(n(1548)),f=r(n(5125)),_=r(n(7463)),h=c.makeStyles((function(e){return{root:{}}}));t.default=a.connect((function(e){return{rooms:e.rooms,active_room:e.active_room}}),{})((function(e){var t=e.rooms,n=e.active_room,r=h(),c=(l.useHistory(),a.useDispatch()),E=function(e){i.default.dispatch(u.wsSend({JoinRoom:{room_id:e}})),c(d.p2pConnect(!1))};if(n){var v=t.find((function(e){return e.id==n}));return o.default.createElement(s.default,{room:v})}return o.default.createElement("div",{className:r.root},o.default.createElement(p.default,{variant:"contained",color:"primary",onClick:function(){c(u.wsSend({CreateRoom:{name:"Test Room "+Math.random()}})),c(d.p2pConnect(!0))}},"Create Room"),o.default.createElement(m.default,{component:"nav"},t.map((function(e,t){return o.default.createElement(f.default,{key:e.id,button:!0,onClick:E.bind(null,e.id)},o.default.createElement(_.default,{primary:e.name}))}))))}))},3628:(e,t,n)=>{"use strict";e.exports=n.p+"1fc2c97db2bdbddca248.png"},8909:(e,t,n)=>{"use strict";e.exports=n.p+"afbb487d80b277a0cf24.png"},1758:()=>{}}]);
//# sourceMappingURL=974.da0b59f68126479d9438.bundle.js.map