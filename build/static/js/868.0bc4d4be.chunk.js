"use strict";(self.webpackChunkhiloramart=self.webpackChunkhiloramart||[]).push([[868],{1042:function(i,e,l){l.r(e),l.d(e,{default:function(){return h}});var n=l(3433),d=l(5861),r=l(9439),t=l(4687),s=l.n(t),c=l(2791),o=(l.p,l(6871)),a=l(5299),u=l(8818),v=l(2488),x=l(9433),f=l(184);var h=function(){var i,e,l,t,h,p,j,m,g,y,b,I,N,k,S,_,O,w,A,C,F,D,E,R,T,Z,P,U,z,K,L,V=(0,o.UO)().orderId,q=(0,c.useContext)(a.Vo).dispatch,B=(0,c.useState)(),M=(0,r.Z)(B,2),Q=M[0],Y=M[1],G=(0,c.useState)(!1),H=(0,r.Z)(G,2),J=H[0],W=H[1],X=(0,c.useState)([]),$=(0,r.Z)(X,2),ii=$[0],ei=$[1],li=function(){var i=(0,d.Z)(s().mark((function i(){var e;return s().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return q({type:u.o4,orderId:V,setOrderDetails:Y,setLoading:W}),i.prev=1,W(!0),ei([]),i.next=6,(0,v.KF)("253861686");case 6:200===(null===(e=i.sent)||void 0===e?void 0:e.status)&&ei((function(i){var l,d,r;return[].concat((0,n.Z)(i),[{data:null===e||void 0===e||null===(l=e.data)||void 0===l||null===(d=l.tracking_data)||void 0===d||null===(r=d.shipment_track_activities)||void 0===r?void 0:r.filter((function(i){return"PICKED UP"===i["sr-status-label"]||"IN TRANSIT"===i["sr-status-label"]||"OUT FOR DELIVERY"===i["sr-status-label"]}))}])})),W(!1),i.next=15;break;case 11:i.prev=11,i.t0=i.catch(1),console.log(i.t0),W(!1);case 15:case"end":return i.stop()}}),i,null,[[1,11]])})));return function(){return i.apply(this,arguments)}}();return(0,c.useEffect)((function(){li()}),[V]),(0,f.jsx)(f.Fragment,{children:J?(0,f.jsx)("div",{style:{width:"100%",height:"90vh",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,f.jsx)(x.Z,{color:"orange"})}):(0,f.jsxs)("div",{className:"tracking-box w-93",children:[(0,f.jsxs)("div",{className:"alignC",children:[(0,f.jsx)("h2",{children:"Tracking"}),(0,f.jsx)("p",{children:"ESTIMATED DATE"}),(0,f.jsx)("p",{children:null===Q||void 0===Q?void 0:Q.etd_date.split(" ")[0]}),1===(null===Q||void 0===Q?void 0:Q.cod)?(0,f.jsx)("p",{children:"Cash On Delivery"}):(0,f.jsx)("p",{children:"Prepaid"})]}),(0,f.jsx)("div",{className:"mb-2 align-tracker",children:(0,f.jsx)("div",{class:"",children:(0,f.jsx)("div",{class:"row",children:(0,f.jsx)("div",{class:"col-12 col-md-12  pb20",children:(0,f.jsxs)("div",{class:"row",children:[(0,f.jsxs)("div",{class:"order-tracking col-3 completed",children:[(0,f.jsx)("span",{class:"is-complete"}),(0,f.jsxs)("p",{children:["Ordered",(0,f.jsx)("br",{}),(0,f.jsx)("span",{children:null===Q||void 0===Q?void 0:Q.order_date})]})]}),(0,f.jsxs)("div",{class:"order-tracking col-3 ".concat((null===ii||void 0===ii||null===(i=ii.filter((function(i){return i.orderId===V}))[0])||void 0===i||null===(e=i.data)||void 0===e?void 0:e.filter((function(i){return i.activity.includes("Shipment picked up")})))&&"completed"),children:[(0,f.jsx)("span",{class:"is-complete"}),(0,f.jsxs)("p",{children:["Assigned",(null===ii||void 0===ii||null===(l=ii.filter((function(i){return i.orderId===V}))[0])||void 0===l||null===(t=l.data)||void 0===t?void 0:t.filter((function(i){return i.activity.includes("Shipment picked up")})))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsx)("span",{children:null===ii||void 0===ii||null===(h=ii.filter((function(i){return i.orderId===V}))[0])||void 0===h||null===(p=h.data)||void 0===p||null===(j=p.filter((function(i){return i.activity.includes("Shipment picked up")}))[0])||void 0===j?void 0:j.date.slice(0,10)}),(0,f.jsx)("br",{}),(0,f.jsx)("span",{children:null===ii||void 0===ii||null===(m=ii.filter((function(i){return i.orderId===V}))[0])||void 0===m||null===(g=m.data)||void 0===g||null===(y=g.filter((function(i){return i.activity.includes("Shipment picked up")}))[0])||void 0===y?void 0:y.date.slice(11,16)})]})]})]}),(0,f.jsxs)("div",{class:"order-tracking col-3 ".concat((null===ii||void 0===ii||null===(b=ii.filter((function(i){return i.orderId===V}))[0])||void 0===b||null===(I=b.data)||void 0===I?void 0:I.filter((function(i){return i.activity.includes("Shipment Received at Facility")})))&&"completed"),children:[(0,f.jsx)("span",{class:"is-complete"}),(0,f.jsxs)("p",{children:["Shipped",(null===ii||void 0===ii||null===(N=ii.filter((function(i){return i.orderId===V}))[0])||void 0===N||null===(k=N.data)||void 0===k?void 0:k.filter((function(i){return i.activity.includes("Shipment Received at Facility")})))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsx)("span",{children:null===ii||void 0===ii||null===(S=ii.filter((function(i){return i.orderId===V}))[0])||void 0===S||null===(_=S.data)||void 0===_||null===(O=_.filter((function(i){return i.activity.includes("Shipment Received at Facility")}))[0])||void 0===O?void 0:O.date.slice(0,10)}),(0,f.jsx)("br",{}),(0,f.jsx)("span",{children:null===ii||void 0===ii||null===(w=ii.filter((function(i){return i.orderId===V}))[0])||void 0===w||null===(A=w.data)||void 0===A||null===(C=A.filter((function(i){return i.activity.includes("Shipment Received at Facility")}))[0])||void 0===C?void 0:C.date.slice(11,16)})]})]})]}),(0,f.jsxs)("div",{class:"order-tracking col-3 ".concat((null===ii||void 0===ii||null===(F=ii.filter((function(i){return i.orderId===V}))[0])||void 0===F||null===(D=F.data)||void 0===D?void 0:D.filter((function(i){return i.activity.includes("Out for delivery")})))&&"completed"),children:[(0,f.jsx)("span",{class:"is-complete"}),(0,f.jsxs)("p",{children:["Out for Delivery",(null===ii||void 0===ii||null===(E=ii.filter((function(i){return i.orderId===V}))[0])||void 0===E||null===(R=E.data)||void 0===R?void 0:R.filter((function(i){return i.activity.includes("Out for delivery")})))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsx)("span",{children:null===ii||void 0===ii||null===(T=ii.filter((function(i){return i.orderId===V}))[0])||void 0===T||null===(Z=T.data)||void 0===Z||null===(P=Z.filter((function(i){return i.activity.includes("Out for delivery")}))[0])||void 0===P?void 0:P.date.slice(0,10)}),(0,f.jsx)("br",{}),(0,f.jsx)("span",{children:null===ii||void 0===ii||null===(U=ii.filter((function(i){return i.orderId===V}))[0])||void 0===U||null===(z=U.data)||void 0===z||null===(K=z.filter((function(i){return i.activity.includes("Out for delivery")}))[0])||void 0===K?void 0:K.date.slice(11,16)})]})]})]})]})})})})}),(0,f.jsxs)("div",{className:"alignC details-box",children:[(0,f.jsxs)("h4",{children:["Details of Order #",null===Q||void 0===Q?void 0:Q.id]}),(0,f.jsx)("div",{className:"row d-flex justify-content-center addressAlign mt-4",children:(0,f.jsxs)("div",{className:"col-9 addAlignC",children:[(0,f.jsx)("h4",{children:"Shipping and Billing Address:"}),(0,f.jsxs)("div",{className:"mt-4 details-size ",children:[(0,f.jsxs)("p",{children:[null===Q||void 0===Q?void 0:Q.customer_address,", ",null===Q||void 0===Q?void 0:Q.customer_address_2," "]}),(0,f.jsxs)("p",{children:[null===Q||void 0===Q?void 0:Q.customer_city," - ",null===Q||void 0===Q?void 0:Q.customer_pincode]}),(0,f.jsx)("p",{children:null===Q||void 0===Q?void 0:Q.customer_state}),(0,f.jsx)("p",{children:null===Q||void 0===Q?void 0:Q.customer_country})]})]})})]}),null===Q||void 0===Q||null===(L=Q.products)||void 0===L?void 0:L.map((function(i){return(0,f.jsxs)("div",{style:{border:"1px solid orange",padding:"10px",borderRadius:"10px",boxShadow:"0 0 1px orange"},children:[(0,f.jsxs)("div",{className:"row ",children:[(0,f.jsx)("div",{className:"col-3 alignS",children:"Order Id"}),(0,f.jsx)("div",{className:"col-3 alignS",children:"Item"}),(0,f.jsx)("div",{className:"col-3 alignC",children:"Quantity"}),(0,f.jsx)("div",{className:"col-3 alignE",children:"Total"})]}),(0,f.jsxs)("div",{className:"row mt-4 mb-4 ",children:[(0,f.jsx)("div",{className:"col-3 d-flex align-items-center fontAlign",children:null===i||void 0===i?void 0:i.order_id}),(0,f.jsx)("div",{className:"col-3",children:(0,f.jsx)("div",{className:"d-flex ",children:(0,f.jsx)("div",{className:"order-box ",children:(0,f.jsx)("p",{className:"details-size",children:null===i||void 0===i?void 0:i.name})})})}),(0,f.jsx)("div",{className:"col-3 d-flex align-items-center justify-content-center fontAlign",children:null===i||void 0===i?void 0:i.quantity}),(0,f.jsxs)("div",{className:"col-3 d-flex align-items-center justify-content-end fontAlign",children:["\u20b9 ",null===i||void 0===i?void 0:i.selling_price]})]})]})}))]})})}}}]);
//# sourceMappingURL=868.0bc4d4be.chunk.js.map