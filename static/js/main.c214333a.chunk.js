(this["webpackJsonpspreadsheet-visualizer"]=this["webpackJsonpspreadsheet-visualizer"]||[]).push([[0],{76:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},84:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(9),s=n.n(r),c=(n(76),n(77),n(39)),o=n(42),l=n(54),d=n(130),u=n(129),h=n(136),g=n(139),j=n(132),b=n(137),p=n(143),f=n(138),m=n(128),O=n(144),v=n(32),x=n(131),C=n(51),S=n(133),D=n(134),I=n(135),w=n(4),k=n(30),N=n(61),y=function(){function e(){Object(k.a)(this,e)}return Object(N.a)(e,null,[{key:"getCellData",value:function(e){return e&&e.formattedValue?e.formattedValue:""}},{key:"getStudentDetails",value:function(e){return{finalizedUic:this.getCellData(e[5]),commuteTimeOptions:this.getCellData(e[6]).split(","),roomType:this.getCellData(e[7]),roommateNumberPreferences:this.getCellData(e[8]),roomNumberPreferences:this.getCellData(e[9]),mixedHouse:this.getCellData(e[10]),roommateSmokes:this.getCellData(e[11]),roommateDrinks:this.getCellData(e[12]),knowsCooking:this.getCellData(e[13]),foodType:this.getCellData(e[14]),roommateLanguagePreference:this.getCellData(e[16]),origin:this.getCellData(e[17]).split(",")[0],gradYear:this.getCellData(e[17]).split(",")[1],hobbies:this.getCellData(e[18]),extraInfo:this.getCellData(e[19]),visaLocation:this.getCellData(e[20]),company:this.getCellData(e[21]).split(",")[0],experience:this.getCellData(e[21]).split(",")[1],intrestedAreas:this.getCellData(e[23]),socialMediaLinks:this.getCellData(e[22]),budget:this.getCellData(e[26]),smoke:this.getCellData(e[27]),drink:this.getCellData(e[28])}}},{key:"toStudent",value:function(e){var t=this,n=[];return e&&e.length>1&&e.forEach((function(e,a){var i=e.values;if(0!==a){var r={email:t.getCellData(i[1]),name:t.getCellData(i[2]),phone:t.getCellData(i[3]),gender:t.getCellData(i[4]),details:t.getStudentDetails(i)};n.push(r)}})),n}}]),e}(),E=n(122),L=n(125),R=(n(78),n(3));function A(e){return Object(R.jsx)(E.a,{className:"card-detail",children:Object(R.jsxs)(L.a,{children:[Object(R.jsx)(C.a,{variant:"h5",component:"h2",children:"Name"}),e.cardView.name,Object(R.jsx)(C.a,{variant:"h5",component:"h2",children:"Gender"}),e.cardView.gender,Object(R.jsx)(C.a,{variant:"h5",component:"h2",children:"Number"}),e.cardView.phoneNumber,Object(R.jsx)(C.a,{variant:"h5",component:"h2",children:"Email"}),e.cardView.emailId]})})}n(84);function P(e){var t,n=null===(t=e.cardDetails)||void 0===t?void 0:t.map((function(e){return Object(R.jsx)("span",{className:"card",children:Object(R.jsx)(A,{cardView:e})},e.phoneNumber)}));return Object(R.jsx)("div",{className:"card-container",children:n})}function H(e){var t;return Object(R.jsx)("div",{children:Object(R.jsx)(P,{cardDetails:(t=e.data,null===t||void 0===t?void 0:t.map((function(e){return{emailId:e.email,name:e.name,phoneNumber:e.phone,gender:e.gender}})))})})}var T=n(127),F=n(46),V=n(142),B=n(141),$=n(17),_=n(126),J=function e(){var t=this;Object(k.a)(this,e),this.isSignedIn$=new _.a(!1),this.handleSignInClick=function(){var e,n=t.isSignedIn$.getValue();($.a.auth2.getAuthInstance()||$.a.load("client:auth2",t.initClient()),n)||(null===(e=$.a.auth2.getAuthInstance())||void 0===e||e.signIn());n&&console.log("Already Logged In")},this.handleSignOutClick=function(){$.a.auth2.getAuthInstance().signOut()},this.handleClientLoad=function(){$.a.load("client:auth2",t.initClient())},this.isSignedIn=function(){return t.isSignedIn$.asObservable()},this.updateSigninStatus=function(e){localStorage.setItem("login",e.toString()),t.isSignedIn$.next(e)},this.initClient=function(){var e,n="".concat("AIzaSyD-iQ9xEoWgP9C-DpFS-FilnDc4WPSebfI"),a="".concat("781591520624-fb7i0vhhijl77li75ff952vp8k3aohce.apps.googleusercontent.com");null===(e=$.a.client)||void 0===e||e.init({apiKey:n,clientId:a,discoveryDocs:["https://sheets.googleapis.com/$discovery/rest?version=v4"],scope:"https://www.googleapis.com/auth/spreadsheets.readonly"}).then((function(e){$.a.auth2.getAuthInstance().isSignedIn.listen(t.updateSigninStatus),t.updateSigninStatus($.a.auth2.getAuthInstance().isSignedIn.get()),$.a.auth2.getAuthInstance().signIn()}),(function(e){console.error(e)}))}},z=n(140),K=function e(){var t=this;Object(k.a)(this,e),this.data$=new z.a,this.UIC_CS_SHEET="1ysrPxFihdRTRTHc4tKQZnmjCeq_JoSqEK4IE9EPnJX8",this.UIC_GENERAL_SHEET="1iRbHoRSJaKoJNDCKeTZ2kREXPHQL7qZma73-AfQReO0",this.getSpreadsheetData=function(){var e={spreadsheetId:t.UIC_CS_SHEET,ranges:["Form Responses 1"],includeGridData:!0};return $.a.client.sheets.spreadsheets.get(e).then((function(e){var n,a,i,r=null===e||void 0===e||null===(n=e.result)||void 0===n||null===(a=n.sheets[0])||void 0===a||null===(i=a.data[0])||void 0===i?void 0:i.rowData;console.log(r),t.data$.next(r)}),(function(e){console.error("error: "+e.result.error.message)})),t.data$.asObservable()}};function U(e){var t=Object(a.useRef)(new F.a),n=Object(a.useRef)(new J),i=Object(a.useState)(!1),r=Object(o.a)(i,2),s=r[0],c=r[1],l=Object(a.useRef)(!1),d=Object(a.useRef)(new K);Object(a.useEffect)((function(){n.current.handleClientLoad();var a=t.current;return n.current.isSignedIn().pipe(Object(V.a)((function(n){var a;c(a=n),l.current=a,n&&d.current.getSpreadsheetData().pipe(Object(V.a)((function(t){return e.onDataLoaded(t)})),Object(B.a)(t.current)).subscribe()})),Object(B.a)(a)).subscribe(),function(){a.next()}}),[]);var u=Object(R.jsx)(T.a,{variant:"contained",color:"primary",onClick:function(){return n.current.handleSignInClick()},children:"Login"});return Object(R.jsx)("div",{children:s?null:u})}var G=240,Q=Object(m.a)((function(e){return Object(O.a)({root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(G,"px)"),marginLeft:G,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:G,flexShrink:0},drawerPaper:{width:G},drawerHeader:Object(l.a)(Object(l.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-end"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0}})}));function q(){var e=Q(),t=Object(v.a)(),n=Object(a.useState)(!1),i=Object(o.a)(n,2),r=i[0],s=i[1],l=Object(a.useState)(),m=Object(o.a)(l,2),O=m[0],k=m[1];return Object(R.jsxs)("div",{className:e.root,children:[Object(R.jsx)(u.a,{}),Object(R.jsx)(d.a,{position:"fixed",className:Object(w.a)(e.appBar,Object(c.a)({},e.appBarShift,r)),children:Object(R.jsxs)(x.a,{children:[Object(R.jsx)(j.a,{color:"inherit","aria-label":"open drawer",onClick:function(){s(!0)},edge:"start",className:Object(w.a)(e.menuButton,r&&e.hide),children:Object(R.jsx)(S.a,{})}),Object(R.jsx)(C.a,{variant:"h6",noWrap:!0,children:"UIC Housing Form Visualizer"})]})}),Object(R.jsxs)(g.a,{className:e.drawer,variant:"persistent",anchor:"left",open:r,classes:{paper:e.drawerPaper},children:[Object(R.jsx)("div",{className:e.drawerHeader,children:Object(R.jsx)(j.a,{onClick:function(){s(!1)},children:"ltr"===t.direction?Object(R.jsx)(D.a,{}):Object(R.jsx)(I.a,{})})}),Object(R.jsx)(h.a,{}),Object(R.jsx)(b.a,{children:["Inbox","Starred","Send email","Drafts"].map((function(e,t){return Object(R.jsx)(p.a,{button:!0,children:Object(R.jsx)(f.a,{primary:e})},e)}))}),Object(R.jsx)(h.a,{})]}),Object(R.jsxs)("main",{className:Object(w.a)(e.content,Object(c.a)({},e.contentShift,r)),children:[Object(R.jsx)("div",{className:e.drawerHeader}),Object(R.jsx)(U,{onDataLoaded:k}),Object(R.jsx)(H,{data:y.toStudent(O)})]})]})}n(87);function W(){return Object(R.jsx)("div",{className:"app-container",children:Object(R.jsx)(q,{})})}var Z=function(){return Object(R.jsx)("div",{className:"App",children:Object(R.jsx)(W,{})})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,145)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),i(e),r(e),s(e)}))};s.a.render(Object(R.jsx)(i.a.StrictMode,{children:Object(R.jsx)(Z,{})}),document.getElementById("root")),M()}},[[88,1,2]]]);
//# sourceMappingURL=main.c214333a.chunk.js.map